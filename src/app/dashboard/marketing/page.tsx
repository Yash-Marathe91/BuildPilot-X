"use client";

import { useState, useRef, useEffect } from "react";
import { Megaphone, Sparkles, PenTool, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AGENTS = [
  { id: "cmo", name: "Marcus", role: "CMO", icon: Megaphone, color: "text-pink-400", border: "border-pink-400/30" },
  { id: "cdo", name: "Maya", role: "UI/UX", icon: PenTool, color: "text-rose-400", border: "border-rose-400/30" },
];

export default function MarketingPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ cmo: "", cdo: "" });
  
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);

  const generateStrategy = async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ cmo: "", cdo: "" });

    try {
      await AIClient.streamMarketing(
        { idea: "A high-performance enterprise SaaS platform requiring real-time multi-agent orchestration." },
        {
          onMessage: (data) => {
            if (data.agent && data.chunk) {
              setAgentResponses(prev => ({
                ...prev,
                [data.agent]: prev[data.agent] + data.chunk
              }));
            }
          },
          onError: (error) => {
            console.error(error);
            toast.error("Failed to stream marketing strategy.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("Go-to-market strategy complete.");
            setIsGenerating(false);
            setIsComplete(true);
          }
        }
      );
    } catch (e) {
      toast.error("Generation failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-sm font-medium w-fit mb-2">
            <Megaphone className="w-4 h-4 text-pink-400" />
            Growth Engine
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Marketing & Brand</h1>
          <p className="text-muted-foreground text-lg mt-1">Autonomous Go-To-Market strategy and Brand Identity generation.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={generateStrategy}
            disabled={isGenerating}
            className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-pink-400" />
                Crafting Campaign...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                Generate Brand Strategy
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-pink-500 hover:bg-pink-600 text-white font-semibold shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <BarChart className="w-4 h-4 mr-2" />
            View Conversion Metrics
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[500px]">
        {AGENTS.map((agent) => (
          <div key={agent.id} className={cn("glass-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden transition-all duration-500", isGenerating ? "border-white/20 shadow-lg" : "border-white/5")}>
            <div className="flex items-center gap-4 border-b border-white/5 pb-4">
              <div className={cn("size-12 rounded-xl flex items-center justify-center shrink-0 border", agent.border, agent.color.replace('text', 'bg').replace('400', '400/10'))}>
                <agent.icon className={cn("size-6", agent.color)} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-white/90">{agent.role} Strategy</h3>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">{agent.name}</p>
              </div>
              {isGenerating && (
                <span className="relative flex h-3 w-3">
                  <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", agent.color.replace('text-', 'bg-'))}></span>
                  <span className={cn("relative inline-flex rounded-full h-3 w-3", agent.color.replace('text-', 'bg-'))}></span>
                </span>
              )}
            </div>
            
            <div 
              ref={(el) => { scrollRefs.current[agent.id] = el; }}
              className="flex-1 overflow-y-auto pr-4 text-sm text-white/80 font-light leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-white/10"
            >
              {agentResponses[agent.id] ? agentResponses[agent.id] : (
                <div className="h-full flex flex-col items-center justify-center text-white/20 italic text-center gap-2">
                  <agent.icon className="w-8 h-8 opacity-20" />
                  Waiting to synthesize GTM data...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
