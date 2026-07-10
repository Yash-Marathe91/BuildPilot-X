"use client";

import { useState, useRef, useEffect } from "react";
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { Presentation, Download, Share2, TrendingUp, DollarSign, Users, Briefcase, Sparkles, BriefcaseBusiness } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIClient } from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const revenueData = [
  { month: "Q1", revenue: 120000, projected: 150000 },
  { month: "Q2", revenue: 180000, projected: 220000 },
  { month: "Q3", revenue: 290000, projected: 310000 },
  { month: "Q4", revenue: 450000, projected: 480000 },
];

const userGrowthData = [
  { month: "Jan", users: 1000 },
  { month: "Feb", users: 2500 },
  { month: "Mar", users: 4200 },
  { month: "Apr", users: 6800 },
  { month: "May", users: 11000 },
  { month: "Jun", users: 18500 },
];

const AGENTS = [
  { id: "investor", name: "Victor", role: "VC", icon: TrendingUp, color: "text-yellow-400", border: "border-yellow-400/30" },
  { id: "ceo", name: "Alexander", role: "CEO", icon: BriefcaseBusiness, color: "text-purple-400", border: "border-purple-400/30" },
];

export default function InvestorRoomPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({ investor: "", ceo: "" });
  const [showPitchSim, setShowPitchSim] = useState(false);
  
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [agentResponses]);

  const simulatePitch = async () => {
    setShowPitchSim(true);
    setIsGenerating(true);
    setIsComplete(false);
    setAgentResponses({ investor: "", ceo: "" });

    try {
      await AIClient.streamInvestorReview(
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
            toast.error("Failed to stream investor feedback.");
            setIsGenerating(false);
            setIsComplete(true);
          },
          onComplete: () => {
            toast.success("Pitch simulation complete.");
            setIsGenerating(false);
            setIsComplete(true);
          }
        }
      );
    } catch (e) {
      toast.error("Simulation failed.");
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium w-fit mb-2">
            <Presentation className="w-4 h-4 text-[#ffb4ab]" />
            Strategy
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Investor Data Room</h1>
          <p className="text-muted-foreground text-lg mt-1">Pitch deck generator and real-time traction metrics for fundraising.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            onClick={simulatePitch}
            disabled={isGenerating}
            className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-spin text-yellow-400" />
                VC Interrogating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                Simulate Pitch Meeting
              </span>
            )}
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-[#ffb4ab] hover:bg-[#ffb4ab]/80 text-black font-semibold shadow-[0_0_15px_rgba(255,180,171,0.3)]">
            <Download className="w-4 h-4 mr-2" />
            Export Pitch Deck
          </Button>
        </div>
      </div>

      {showPitchSim && (
        <div className="glass-card rounded-2xl p-6 border-white/10 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-500">
          <h3 className="text-xl font-semibold flex items-center gap-2 border-b border-white/5 pb-4">
            <BriefcaseBusiness className="w-5 h-5 text-yellow-400" />
            Live Pitch Simulation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENTS.map((agent) => (
              <div key={agent.id} className={cn("glass-card rounded-xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-500 h-[300px]", isGenerating ? "border-white/20 shadow-lg" : "border-white/5")}>
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
                    <span className="text-white/20 italic">Awaiting response...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">ARR (Run Rate)</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-bold">$1.8M</div>
          <div className="text-xs text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +24% MoM
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Active Users</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-3xl font-bold">18.5k</div>
          <div className="text-xs text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% MoM
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center justify-between text-muted-foreground mb-2">
            <span className="text-sm font-medium">Burn Rate</span>
            <TrendingUp className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-3xl font-bold">$45k/mo</div>
          <div className="text-xs text-muted-foreground">14 months runway</div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffb4ab]/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center justify-between text-[#ffb4ab] mb-2">
            <span className="text-sm font-medium">Fundraising Goal</span>
            <Briefcase className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold">$2.5M</div>
          <div className="text-xs text-foreground/80 font-medium">Seed Round • $15M Post-Money</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border-white/10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">Revenue Trajectory</h3>
              <p className="text-sm text-muted-foreground">Actual vs. Projected (YTD)</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
              Exceeding Targets
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Actual Revenue" />
                <Bar dataKey="projected" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} name="Projected" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/10 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">User Growth Velocity</h3>
            <p className="text-sm text-muted-foreground">Cumulative active users over time.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
