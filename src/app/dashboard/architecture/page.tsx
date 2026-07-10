"use client";

import { useState, useCallback } from "react";
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
import { Sparkles, Save, Server, Database, Globe, Smartphone, Component } from "lucide-react";

// Initial nodes for a modern Next.js + Supabase architecture
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
  {
    id: "auth",
    type: "default",
    position: { x: 350, y: 350 },
    data: { 
      label: (
        <div className="flex flex-col items-center gap-2 p-2">
          <Component className="w-5 h-5 text-blue-500" />
          <span className="font-bold">Authentication</span>
          <span className="text-xs text-muted-foreground">Supabase Auth</span>
        </div>
      ) 
    },
    className: "glass-card !border-blue-500/50 !rounded-xl w-40 text-center",
  },
];

const initialEdges: Edge[] = [
  { id: "e-front-api", source: "frontend", target: "api", animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } },
  { id: "e-api-db", source: "api", target: "db", animated: true, style: { stroke: '#10b981', strokeWidth: 2 } },
  { id: "e-api-auth", source: "api", target: "auth", animated: true, style: { stroke: '#3b82f6', strokeWidth: 2 } },
];

export default function ArchitectureDesignerPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isGenerating, setIsGenerating] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#a855f7', strokeWidth: 2 } }, eds)),
    [setEdges]
  );

  const generateArchitecture = () => {
    setIsGenerating(true);
    // Simulate AI generation of a new node (e.g. Mobile App)
    setTimeout(() => {
      const newNode: Node = {
        id: "mobile",
        type: "default",
        position: { x: 50, y: 50 },
        data: { 
          label: (
            <div className="flex flex-col items-center gap-2 p-2">
              <Smartphone className="w-5 h-5 text-orange-500" />
              <span className="font-bold">React Native</span>
              <span className="text-xs text-muted-foreground">Mobile App</span>
            </div>
          ) 
        },
        className: "glass-card !border-orange-500/50 !rounded-xl w-40 text-center",
      };

      const newEdge: Edge = {
        id: "e-mobile-api",
        source: "mobile",
        target: "api",
        animated: true,
        style: { stroke: '#f97316', strokeWidth: 2 }
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
      setIsGenerating(false);
    }, 1500);
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
                Designing...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                Auto-Generate Mobile
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-gradient-primary shadow-[0_0_15px_rgba(168,85,247,0.3)] font-semibold">
            <Save className="w-4 h-4 mr-2" />
            Save Architecture
          </Button>
        </div>
      </div>

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
          <Background 
            variant={BackgroundVariant.Dots} 
            gap={24} 
            size={1.5} 
            color="rgba(255, 255, 255, 0.1)" 
          />
          <Controls className="!bg-black/50 !border-white/10 !backdrop-blur-md !fill-white" />
          <Panel position="bottom-left" className="p-4 bg-black/50 backdrop-blur-md rounded-xl border border-white/10 m-4">
            <h3 className="font-semibold text-sm mb-1">Architecture Details</h3>
            <p className="text-xs text-muted-foreground">Drag nodes to reposition. Click nodes to edit configuration.</p>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
