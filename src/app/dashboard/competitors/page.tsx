"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, Briefcase, Megaphone, Target, Crosshair } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const AGENTS = [
  { id: "ceo", name: "Alexander", role: "CEO", icon: Briefcase, color: "text-purple-400", border: "border-purple-400/30" },
  { id: "cmo", name: "Marcus", role: "CMO", icon: Megaphone, color: "text-pink-400", border: "border-pink-400/30" },
];

export default function CompetitorsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ ceo: "", cmo: "" });
  
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);

  const runAnalysis = async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ ceo: "", cmo: "" });

    try {
      await AIClient.streamCompetitors(
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
            toast.error("Failed to stream competitor analysis.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("Competitor analysis complete.");
            setIsGenerating(false);
            setIsComplete(true);
          }
        }
      );
    } catch (e) {
      toast.error("Analysis failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-sm font-medium w-fit mb-2">
            <Target className="w-4 h-4 text-red-400" />
            Market Intelligence
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Competitor Analysis</h1>
          <p className="text-muted-foreground text-lg mt-1">Identify market gaps and synthesize strategic advantages against incumbents.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={runAnalysis}
            disabled={isGenerating}
            className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-red-400" />
                Scanning Market...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-400" />
                Analyze Competitors
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-red-500 hover:bg-red-600 text-white font-semibold shadow-[0_0_15px_rgba(239,68,68,0.3)]">
            <Crosshair className="w-4 h-4 mr-2" />
            Generate Battle Card
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
                <h3 className="font-semibold text-lg text-white/90">{agent.role} Perspective</h3>
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
                  <Search className="w-8 h-8 opacity-20" />
                  Awaiting competitor data...
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
