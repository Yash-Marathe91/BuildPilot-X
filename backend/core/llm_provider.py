import logging
import asyncio
from typing import List, Dict, Any, AsyncGenerator
from openai import AsyncOpenAI
from backend.core.config import settings

logger = logging.getLogger(__name__)

class LLMProvider:
    def __init__(self):
        self.use_local_hf = settings.USE_LOCAL_HF
        self.hf_pipeline = None
        
        # Initialize Hugging Face pipeline if running in AMD Notebook context
        if self.use_local_hf:
            logger.info("Initializing Hugging Face model for AMD GPU...")
            try:
                # We import torch/transformers inside the try block to avoid crashing if not installed locally
                import torch
                from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
                
                # In the actual AMD Notebook, this will load Gemma/Llama onto the ROCm GPU.
                # device_map="auto" works seamlessly with Accelerate on AMD GPUs.
                self.tokenizer = AutoTokenizer.from_pretrained(settings.HF_MODEL_NAME)
                self.model = AutoModelForCausalLM.from_pretrained(
                    settings.HF_MODEL_NAME, 
                    device_map="auto", 
                    torch_dtype=torch.float16
                )
                self.hf_pipeline = pipeline(
                    "text-generation",
                    model=self.model,
                    tokenizer=self.tokenizer,
                    max_new_tokens=2048,
                    return_full_text=False
                )
                logger.info(f"Successfully loaded {settings.HF_MODEL_NAME} locally.")
            except Exception as e:
                logger.error(f"Failed to load Hugging Face model locally: {e}. Defaulting to Fallback.")
                self.use_local_hf = False
        
        # Fallback client (Fireworks AI)
        self.fallback_client = None
        if settings.FIREWORKS_API_KEY:
            self.fallback_client = AsyncOpenAI(
                base_url=settings.FIREWORKS_URL,
                api_key=settings.FIREWORKS_API_KEY
            )

    def _format_messages_for_hf(self, messages: List[Dict[str, str]]) -> str:
        # Simple formatting for models like Gemma/Llama
        prompt = ""
        for msg in messages:
            role = msg["role"]
            content = msg["content"]
            if role == "system":
                prompt += f"<|system|>\n{content}\n"
            elif role == "user":
                prompt += f"<|user|>\n{content}\n"
            elif role == "assistant":
                prompt += f"<|model|>\n{content}\n"
        prompt += "<|model|>\n"
        return prompt

    async def generate_response(self, messages: List[Dict[str, str]]) -> str:
        if self.use_local_hf and self.hf_pipeline:
            try:
                # Run HF pipeline in threadpool to not block asyncio event loop
                prompt = self._format_messages_for_hf(messages)
                loop = asyncio.get_event_loop()
                result = await loop.run_in_executor(
                    None, 
                    lambda: self.hf_pipeline(prompt, temperature=0.7, do_sample=True)
                )
                return result[0]["generated_text"].strip()
            except Exception as e:
                logger.warning(f"Local HF generation failed: {e}. Falling back.")
                
        # Fallback to Fireworks API
        if self.fallback_client is None:
            raise Exception("No Fireworks API key configured and local AMD model failed.")
            
        try:
            response = await self.fallback_client.chat.completions.create(
                model=settings.FALLBACK_MODEL,
                messages=messages,
                temperature=0.7,
                max_tokens=2048
            )
            return response.choices[0].message.content
        except Exception as fallback_error:
            logger.error(f"Fallback LLM provider failed: {fallback_error}")
            raise Exception("AI inference failed on both AMD Notebook and Fallback.")

    async def generate_stream(self, messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
        if self.use_local_hf and self.hf_pipeline:
            # Note: Streaming with HF pipeline requires TextIteratorStreamer.
            # For simplicity in this architecture, we yield the whole block or implement streamer.
            try:
                import torch
                from transformers import TextIteratorStreamer
                from threading import Thread
                
                prompt = self._format_messages_for_hf(messages)
                inputs = self.tokenizer(prompt, return_tensors="pt").to(self.model.device)
                streamer = TextIteratorStreamer(self.tokenizer, skip_prompt=True, skip_special_tokens=True)
                
                generation_kwargs = dict(
                    **inputs,
                    streamer=streamer,
                    max_new_tokens=2048,
                    temperature=0.7,
                    do_sample=True
                )
                
                thread = Thread(target=self.model.generate, kwargs=generation_kwargs)
                thread.start()
                
                for text in streamer:
                    # Yield slightly asynchronously to allow other agents to stream
                    await asyncio.sleep(0.01) 
                    yield text
                return
            except Exception as e:
                logger.warning(f"Local HF streaming failed: {e}. Falling back.")

        # Fallback to Fireworks API Streaming
        if self.fallback_client is None:
            yield "Error: No Fireworks API key configured and local AMD model failed."
            return

        try:
            stream = await self.fallback_client.chat.completions.create(
                model=settings.FALLBACK_MODEL,
                messages=messages,
                temperature=0.7,
                max_tokens=2048,
                stream=True
            )
            async for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
        except Exception as fallback_error:
            logger.error(f"Fallback stream failed: {fallback_error}")
            yield f"Error: AI providers unavailable."

llm = LLMProvider()
