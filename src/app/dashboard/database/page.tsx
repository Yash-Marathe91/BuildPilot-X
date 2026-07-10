"use client";

import { useState, useRef, useEffect } from "react";
import { Database, Plus, Save, TableProperties, Key, Link as LinkIcon, Sparkles, Code, Play, DollarSign, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const mockTables = [
  {
    name: "users",
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "email", type: "text", isPrimary: false },
      { name: "created_at", type: "timestamp", isPrimary: false },
      { name: "role", type: "text", isPrimary: false },
    ]
  },
  {
    name: "projects",
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "user_id", type: "uuid", isPrimary: false, isForeign: true },
      { name: "title", type: "text", isPrimary: false },
    ]
  }
];

const AGENTS = [
  { id: "dba", name: "Linus", role: "DBA", icon: DollarSign, color: "text-emerald-400", border: "border-emerald-400/30" },
  { id: "cto", name: "David", role: "CTO", icon: Terminal, color: "text-cyan-400", border: "border-cyan-400/30" },
];

export default function DatabaseDesignerPage() {
  const [tables] = useState(mockTables);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ dba: "", cto: "" });
  
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);
  
  const handleAutoGenerate = async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ dba: "", cto: "" });

    try {
      await AIClient.streamDatabase(
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
            toast.error("Failed to stream database schema.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("Database architecture generated.");
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium w-fit mb-2">
            <Database className="w-4 h-4 text-emerald-500" />
            Engineering
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Database Designer</h1>
          <p className="text-muted-foreground text-lg mt-1">Design your PostgreSQL schema and generate migrations automatically.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleAutoGenerate}
            disabled={isGenerating}
            variant="outline"
            className="rounded-xl h-11 px-6 border-white/10 hover:bg-white/5"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-emerald-500" />
                Architecting DB...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                AI Generate Schema
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)] font-semibold">
            <Play className="w-4 h-4 mr-2" />
            Deploy to Supabase
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        
        {/* Visual Schema Canvas */}
        <div className="glass-card rounded-2xl border-white/10 p-6 flex flex-col relative overflow-hidden bg-black/40 h-[600px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TableProperties className="w-5 h-5" />
              Core Entities
            </h2>
            <Button size="sm" variant="ghost" className="rounded-lg hover:bg-white/5">
              <Plus className="w-4 h-4 mr-2" /> Add Table
            </Button>
          </div>

          <div className="flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-4 pr-2">
            {tables.map((table, idx) => (
              <div key={idx} className="bg-background/80 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden shadow-lg">
                <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-sm">{table.name}</span>
                  <span className="text-xs text-muted-foreground font-mono">public</span>
                </div>
                <div className="p-2 flex flex-col gap-1">
                  {table.columns.map((col, cIdx) => (
                    <div key={cIdx} className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-white/5 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-2">
                        {col.isPrimary ? (
                          <Key className="w-3.5 h-3.5 text-amber-500" />
                        ) : col.isForeign ? (
                          <LinkIcon className="w-3.5 h-3.5 text-blue-400" />
                        ) : (
                          <div className="w-3.5 h-3.5" />
                        )}
                        <span className="text-sm">{col.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono group-hover:text-foreground transition-colors">{col.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Agent Streaming Panel */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Database Architecture Protocol</h3>
          {AGENTS.map((agent) => (
            <div key={agent.id} className={cn("glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-500 flex-1 min-h-[250px]", isGenerating ? "border-white/20 shadow-lg" : "border-white/5")}>
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0 border", agent.border, agent.color.replace('text', 'bg').replace('400', '400/10'))}>
                  <agent.icon className={cn("size-5", agent.color)} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white/90">{agent.role}</h3>
                  <p className="text-xs text-muted-foreground uppercase">{agent.name}</p>
                </div>
                {isGenerating && (
                  <span className="relative flex h-2 w-2">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", agent.color.replace('text-', 'bg-'))}></span>
                    <span className={cn("relative inline-flex rounded-full h-2 w-2", agent.color.replace('text-', 'bg-'))}></span>
                  </span>
                )}
              </div>
              <div 
                ref={(el) => { scrollRefs.current[agent.id] = el; }}
                className="flex-1 overflow-y-auto pr-2 text-sm text-white/80 font-light leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-white/10"
              >
                {agentResponses[agent.id] ? agentResponses[agent.id] : (
                  <span className="text-white/20 italic text-center block mt-4">Waiting to write SQL definitions...</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
