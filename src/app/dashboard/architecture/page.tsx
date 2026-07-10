"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { 
  ReactFlow, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  Panel,
  BackgroundVariant
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Sparkles, Save, Server, Database, Globe, Smartphone, Component, Code2, Terminal, DollarSign } from "lucide-react";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Initial nodes
const initialNodes: Node[] = [
  {
    id: "frontend",
    type: "default",
    position: { x: 250, y: 50 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-2 p-2">
          <Globe className="w-5 h-5 text-primary" />
          <span className="font-bold">Next.js Frontend</span>
          <span className="text-xs text-muted-foreground">Vercel Edge Network</span>
        </div>
      ) 
    },
    className: "glass-card !border-primary/50 !rounded-xl w-48 text-center",
  },
  {
    id: "api",
    type: "default",
    position: { x: 250, y: 200 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-2 p-2">
          <Server className="w-5 h-5 text-secondary" />
          <span className="font-bold">Server Actions</span>
          <span className="text-xs text-muted-foreground">API / Edge Handlers</span>
        </div>
      ) 
    },
    className: "glass-card !border-secondary/50 !rounded-xl w-48 text-center",
  },
  {
    id: "db",
    type: "default",
    position: { x: 150, y: 350 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-2 p-2">
          <Database className="w-5 h-5 text-emerald-500" />
          <span className="font-bold">PostgreSQL DB</span>
          <span className="text-xs text-muted-foreground">Supabase</span>
        </div>
      ) 
    },
    className: "glass-card !border-emerald-500/50 !rounded-xl w-40 text-center",
  },
];

const initialEdges: Edge[] = [
  { id: "e-front-api", source: "frontend", target: "api", animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: "e-api-db", source: "api", target: "db", animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
];

const AGENTS = [
  { id: "cto", name: "David", role: "CTO", icon: Code2, color: "text-cyan-400" },
  { id: "architect", name: "Elena", role: "Architect", icon: Terminal, color: "text-teal-400" },
  { id: "dba", name: "Linus", role: "DBA", icon: DollarSign, color: "text-emerald-400" },
];

export default function ArchitectureDesignerPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ cto: "", architect: "", dba: "" });
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);

  const generateArchitecture = async () => {
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ cto: "", architect: "", dba: "" });

    try {
      await AIClient.streamArchitecture(
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
            toast.error("Failed to stream architecture data.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("Architecture assessment complete.");
            setIsGenerating(false);
            setIsComplete(true);
            
            // Auto-add new nodes after assessment
            const newNode: Node = {
              id: "redis",
              type: "default",
              position: { x: 350, y: 350 },
              data: { 
                label: (
                  <div className="flex flex-col items-center gap-2 p-2">
                    <Database className="w-5 h-5 text-red-500" />
                    <span className="font-bold">Redis Cache</span>
                    <span className="text-xs text-muted-foreground">Upstash / Streaming</span>
                  </div>
                ) 
              },
              className: "glass-card !border-red-500/50 !rounded-xl w-40 text-center",
            };
            setNodes((nds) => [...nds, newNode]);
            setEdges((eds) => [...eds, { id: "e-api-redis", source: "api", target: "redis", animated: true, style: { stroke: '#ef4444', strokeWidth: 2 } }]);
          }
        }
      );
    } catch (e) {
      toast.error("Initialization failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium w-fit mb-2">
            <Component className="w-4 h-4 text-secondary" />
            System Design
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Architecture Designer</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={generateArchitecture}
            disabled={isGenerating}
            className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-primary" />
                Analyzing Systems...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                AI Architecture Review
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-gradient-primary shadow-[0_0_15px_rgba(168,85,247,0.3)] font-semibold">
            <Save className="w-4 h-4 mr-2" />
            Save Architecture
          </Button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        
        {/* ReactFlow Canvas */}
        <div className="flex-1 glass-card rounded-2xl overflow-hidden relative border-white/10">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            className="bg-transparent"
          >
            <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="rgba(255, 255, 255, 0.1)" />
            <Controls className="!bg-black/50 !border-white/10 !backdrop-blur-md !fill-white" />
            <Panel position="bottom-left" className="p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 m-4">
              <h3 className="font-semibold text-sm mb-1">Architecture Config</h3>
              <p className="text-xs text-muted-foreground">Drag nodes to reposition. Click nodes to edit.</p>
            </Panel>
          </ReactFlow>
        </div>

        {/* AI Agent Analysis Sidebar */}
        <div className="w-[400px] flex flex-col gap-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Engineering Assessment</h3>
          
          {AGENTS.map((agent) => (
            <div key={agent.id} className={cn("glass-card rounded-xl p-4 flex flex-col gap-3 relative overflow-hidden transition-all duration-500 flex-1 min-h-[200px]", isGenerating ? "border-white/20 shadow-lg" : "border-white/5")}>
              
              <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                  <agent.icon className={cn("size-4", agent.color)} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-white/90">{agent.role}</h3>
                  <p className="text-[10px] text-muted-foreground uppercase">{agent.name}</p>
                </div>
                {isGenerating && (
                  <span className="relative flex h-2 w-2">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-primary")}></span>
                    <span className={cn("relative inline-flex rounded-full h-2 w-2 bg-primary")}></span>
                  </span>
                )}
              </div>

              <div 
                ref={(el) => { scrollRefs.current[agent.id] = el; }}
                className="flex-1 overflow-y-auto pr-2 text-xs text-white/70 font-light leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-white/10"
              >
                {agentResponses[agent.id] ? agentResponses[agent.id] : (
                  <span className="text-white/20 italic">Awaiting trigger...</span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
