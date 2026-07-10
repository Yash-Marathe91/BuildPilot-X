from typing import List, Dict, Any, AsyncGenerator
from backend.core.llm_provider import llm

class BaseAgent:
    def __init__(self, name: str, role: str, system_prompt: str):
        self.name = name
        self.role = role
        self.system_prompt = system_prompt

    def _build_messages(self, context: str, user_prompt: str) -> List[Dict[str, str]]:
        return [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"Context: {context}\n\nTask: {user_prompt}"}
        ]

    async def execute(self, context: str, user_prompt: str) -> str:
        messages = self._build_messages(context, user_prompt)
        return await llm.generate_response(messages)

    async def execute_stream(self, context: str, user_prompt: str) -> AsyncGenerator[str, None]:
        messages = self._build_messages(context, user_prompt)
        async for chunk in llm.generate_stream(messages):
            yield chunk
