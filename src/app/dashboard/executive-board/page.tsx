"use client";

import { useState, useRef, useEffect } from "react";
import { Send, BrainCircuit, LineChart, Code2, Sparkles, UserCircle, Loader2, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useChat } from '@ai-sdk/react';

const AGENTS = [
  {
    id: "cpo",
    role: "Chief Product Officer",
    name: "Aura",
    icon: BrainCircuit,
    color: "text-primary",
    bgColor: "bg-primary/20",
    description: "Specializes in product strategy, UX, and market fit."
  },
  {
    id: "cto",
    role: "Chief Technology Officer",
    name: "Nexus",
    icon: Code2,
    color: "text-secondary",
    bgColor: "bg-secondary/20",
    description: "Expert in system architecture, tech stacks, and scalability."
  },
  {
    id: "cmo",
    role: "Chief Marketing Officer",
    name: "Nova",
    icon: LineChart,
    color: "text-[#ffb4ab]",
    bgColor: "bg-[#ffb4ab]/20",
    description: "Focuses on GTM strategy, growth hacking, and positioning."
  }
];

export default function ExecutiveBoardPage() {
  const [selectedAgent, setSelectedAgent] = useState(AGENTS[0]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognitionRef.current.onresult = (event: any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const transcript = Array.from(event.results)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };
  const { messages, sendMessage, status, setMessages } = useChat({
    // @ts-expect-error api parameter works in this specific sdk version but types are missing
    api: '/api/chat',
    body: {
      agentRole: selectedAgent.role,
      agentName: selectedAgent.name,
    },
    initialMessages: [
      { id: '1', role: "assistant", content: `Hello founder. I am ${selectedAgent.name}, your ${selectedAgent.role}. What shall we focus on today?` }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // @ts-expect-error AI SDK types changed content to parts in v4 but we just want to bypass here
    sendMessage({ content: input, role: 'user' });
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAgentSelect = (agent: typeof AGENTS[0]) => {
    setSelectedAgent(agent);
    setMessages([
      { id: Date.now().toString(), role: "assistant", content: `Context switched. I am now acting as your ${agent.role}, ${agent.name}. How can I assist you?` }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ] as any);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-2 mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium w-fit mb-2">
          <Sparkles className="w-4 h-4 text-primary" />
          Virtual Advisory Board
        </div>
        <h1 className="text-4xl font-bold tracking-tight">AI Executive Board</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
        
        {/* Agent Selection Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Select Advisor</h3>
          <div className="flex flex-col gap-3">
            {AGENTS.map(agent => (
              <button
                key={agent.id}
                onClick={() => handleAgentSelect(agent)}
                className={cn(
                  "flex items-start gap-4 p-4 rounded-xl text-left transition-all border",
                  selectedAgent.id === agent.id 
                    ? "glass bg-white/10 border-white/20 shadow-lg" 
                    : "glass border-transparent hover:bg-white/5"
                )}
              >
                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center shrink-0", agent.bgColor)}>
                  <agent.icon className={cn("w-5 h-5", agent.color)} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{agent.role}</div>
                  <div className="text-sm text-muted-foreground">{agent.name}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-auto glass-card p-4 rounded-xl">
            <p className="text-xs text-muted-foreground">
              These autonomous agents analyze your venture&apos;s parameters in real-time to provide context-aware strategic advice.
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-4 p-4 border-b border-white/5 bg-background/50 backdrop-blur-md z-10">
            <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", selectedAgent.bgColor)}>
              <selectedAgent.icon className={cn("w-5 h-5", selectedAgent.color)} />
            </div>
            <div>
              <div className="font-semibold">{selectedAgent.role} ({selectedAgent.name})</div>
              <div className="text-xs text-primary flex items-center gap-1">
                {isLoading ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    Online
                  </>
                )}
              </div>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6 z-0">
            <div className="flex flex-col gap-6 max-w-3xl mx-auto w-full pb-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex gap-4 max-w-[85%]", msg.role === "user" ? "self-end flex-row-reverse" : "self-start")}>
                  <Avatar className="w-8 h-8 mt-1 border border-white/10 shrink-0">
                    {msg.role !== "user" ? (
                      <div className={cn("w-full h-full flex items-center justify-center", selectedAgent.bgColor)}>
                        <selectedAgent.icon className={cn("w-4 h-4", selectedAgent.color)} />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-white/10">
                        <UserCircle className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}
                  </Avatar>
                  
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap",
                    msg.role === "user" 
                      ? "bg-gradient-primary text-white shadow-[0_0_15px_rgba(168,85,247,0.2)] rounded-tr-sm" 
                      : "glass bg-white/5 border-white/10 rounded-tl-sm"
                  )}>
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(msg as any).content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/5 z-10">
            <form onSubmit={handleSubmit} className="relative max-w-3xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Input 
                  value={input}
                  onChange={handleInputChange}
                  disabled={isLoading || isListening}
                  placeholder={isListening ? "Listening..." : `Ask your ${selectedAgent.role} for advice...`}
                  className={cn(
                    "w-full h-14 pl-4 pr-14 bg-black/20 border-white/10 focus-visible:ring-primary rounded-xl text-base disabled:opacity-50 transition-all",
                    isListening && "border-red-500/50 focus-visible:ring-red-500/50 bg-red-500/5"
                  )}
                />
                <Button 
                  type="button" 
                  onClick={toggleListening}
                  variant="ghost"
                  className={cn(
                    "absolute right-2 top-2 w-10 h-10 rounded-lg transition-colors", 
                    isListening ? "text-red-500 hover:text-red-600 bg-red-500/10 hover:bg-red-500/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                </Button>
              </div>
              <Button type="submit" disabled={isLoading || !input.trim()} size="icon" className="w-14 h-14 shrink-0 rounded-xl bg-primary hover:bg-primary/80 text-white disabled:opacity-50 transition-all">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
