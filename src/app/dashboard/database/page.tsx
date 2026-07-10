"use client";

import { useState } from "react";
import { Database, Plus, Save, TableProperties, Key, Link as LinkIcon, Sparkles, Code, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      { name: "status", type: "text", isPrimary: false },
    ]
  },
  {
    name: "subscriptions",
    columns: [
      { name: "id", type: "uuid", isPrimary: true },
      { name: "user_id", type: "uuid", isPrimary: false, isForeign: true },
      { name: "plan", type: "text", isPrimary: false },
      { name: "active_until", type: "timestamp", isPrimary: false },
    ]
  }
];

export default function DatabaseDesignerPage() {
  const [tables] = useState(mockTables);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const handleAutoGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium w-fit mb-2">
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
                Analyzing Context...
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

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6 flex-1 min-h-0">
        
        {/* Visual Schema Canvas */}
        <div className="glass-card rounded-2xl border-white/10 p-6 flex flex-col relative overflow-hidden bg-black/40">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <TableProperties className="w-5 h-5" />
              Tables
            </h2>
            <Button size="sm" variant="ghost" className="rounded-lg hover:bg-white/5">
              <Plus className="w-4 h-4 mr-2" /> Add Table
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto custom-scrollbar pb-4 pr-2">
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
                  <button className="flex items-center gap-2 px-2 py-2 mt-1 rounded-md text-xs text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors border border-dashed border-white/10">
                    <Plus className="w-3.5 h-3.5" /> Add Column
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SQL Preview Panel */}
        <div className="glass-card rounded-2xl border-white/10 p-0 flex flex-col overflow-hidden">
          <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm font-semibold flex items-center gap-2">
              <Code className="w-4 h-4" />
              SQL Migration Preview
            </h2>
            <Button size="icon" variant="ghost" className="w-8 h-8 rounded-lg hover:bg-white/10">
              <Save className="w-4 h-4" />
            </Button>
          </div>
          <div className="p-4 bg-[#0d1117] flex-1 overflow-y-auto custom-scrollbar font-mono text-sm leading-relaxed">
            <span className="text-purple-400">create table</span> <span className="text-blue-400">public.users</span> (
            <br />
            &nbsp;&nbsp;id uuid <span className="text-emerald-400">primary key</span>,
            <br />
            &nbsp;&nbsp;email text <span className="text-emerald-400">unique not null</span>,
            <br />
            &nbsp;&nbsp;created_at timestamp <span className="text-emerald-400">default now()</span>
            <br />
            );
            <br /><br />
            <span className="text-purple-400">create table</span> <span className="text-blue-400">public.projects</span> (
            <br />
            &nbsp;&nbsp;id uuid <span className="text-emerald-400">primary key</span>,
            <br />
            &nbsp;&nbsp;user_id uuid <span className="text-emerald-400">references</span> users(id),
            <br />
            &nbsp;&nbsp;title text <span className="text-emerald-400">not null</span>,
            <br />
            &nbsp;&nbsp;status text <span className="text-emerald-400">default</span> &apos;draft&apos;
            <br />
            );
            <br /><br />
            <span className="text-gray-500">-- Generated by BuildPilot X AI</span>
          </div>
        </div>

      </div>
    </div>
  );
}
