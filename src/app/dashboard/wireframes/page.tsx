"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, PenTool, GitMerge, Layout, MonitorSmartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AGENTS = [
  { id: "cdo", name: "Maya", role: "UI/UX", icon: PenTool, color: "text-rose-400", border: "border-rose-400/30" },
  { id: "pm", name: "Sarah", role: "CPO", icon: GitMerge, color: "text-orange-400", border: "border-orange-400/30" },
];

export default function WireframesPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ cdo: "", pm: "" });
  
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);

  const runDesign = async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ cdo: "", pm: "" });

    try {
      await AIClient.streamWireframes(
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
            toast.error("Failed to stream wireframes design.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("UX/UI Architecture complete.");
            setIsGenerating(false);
            setIsComplete(true);
          }
        }
      );
    } catch (e) {
      toast.error("Design failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-sm font-medium w-fit mb-2">
            <Layout className="w-4 h-4 text-rose-400" />
            Product Design
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Wireframes & UX Flows</h1>
          <p className="text-muted-foreground text-lg mt-1">Generate logical screen flows and user journey maps for the MVP.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={runDesign}
            disabled={isGenerating}
            className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-rose-400" />
                Designing UI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-400" />
                Generate UX Flow
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-rose-500 hover:bg-rose-600 text-white font-semibold shadow-[0_0_15px_rgba(244,63,94,0.3)]">
            <MonitorSmartphone className="w-4 h-4 mr-2" />
            Export to Figma
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
                <h3 className="font-semibold text-lg text-white/90">{agent.role} Focus</h3>
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
                  <Layout className="w-8 h-8 opacity-20" />
                  Awaiting UX structure...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
