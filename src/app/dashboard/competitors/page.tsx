"use client";

import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Radar, Target, TrendingUp, Users, Zap, Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

const trendData = [
  { month: "Jan", marketSize: 4000, competitorA: 2400, yourProjected: 1000 },
  { month: "Feb", marketSize: 4500, competitorA: 2800, yourProjected: 1200 },
  { month: "Mar", marketSize: 5100, competitorA: 2900, yourProjected: 1800 },
  { month: "Apr", marketSize: 5800, competitorA: 3100, yourProjected: 2400 },
  { month: "May", marketSize: 6400, competitorA: 3300, yourProjected: 3800 },
  { month: "Jun", marketSize: 7200, competitorA: 3500, yourProjected: 4900 },
];

const sentimentData = [
  { name: "Brand Sentiment", positive: 75, neutral: 20, negative: 5 },
  { name: "Feature Satisfaction", positive: 65, neutral: 25, negative: 10 },
  { name: "Pricing Model", positive: 45, neutral: 40, negative: 15 },
  { name: "Customer Support", positive: 85, neutral: 10, negative: 5 },
];

export default function CompetitorsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium w-fit mb-2">
            <Radar className="w-4 h-4 text-[#ffb4ab]" />
            Market Intelligence
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Competitor Analysis</h1>
          <p className="text-muted-foreground text-lg mt-1">Real-time market trends and positioning data.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Analyze a specific competitor..." 
            className="pl-9 h-11 bg-black/20 border-white/10 rounded-xl"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">TAM (Total Addressable Market)</span>
          </div>
          <div className="text-3xl font-bold">$14.2B</div>
          <div className="text-xs text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12.5% YoY
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Users className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Active Competitors</span>
          </div>
          <div className="text-3xl font-bold">128</div>
          <div className="text-xs text-[#ffb4ab] flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 5 new this quarter
          </div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <Zap className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Market Saturation</span>
          </div>
          <div className="text-3xl font-bold">Medium</div>
          <div className="text-xs text-muted-foreground">High barrier to entry</div>
        </div>
        <div className="glass-card p-6 rounded-2xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center gap-2 text-primary mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Strategy Recommendation</span>
          </div>
          <p className="text-sm leading-relaxed font-medium">
            &quot;Focus on enterprise workflow integration to capture unmet needs in the upper-mid market.&quot;
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-2xl border-white/10 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Market Growth vs. Projections</h3>
            <p className="text-sm text-muted-foreground">Comparative analysis of industry growth.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorMarket" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="marketSize" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorMarket)" />
                <Area type="monotone" dataKey="yourProjected" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorProjected)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border-white/10 flex flex-col gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-1">Competitor Feature Sentiment</h3>
            <p className="text-sm text-muted-foreground">Public feedback analysis across top 3 competitors.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sentimentData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis type="number" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} width={120} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}
                />
                <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="rgba(255,255,255,0.2)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="negative" stackId="a" fill="#ef4444" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
