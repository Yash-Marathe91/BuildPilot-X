"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Rocket, Bot, Component, LineChart, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { Button } from "@/components/ui/button";

type Project = Database['public']['Tables']['projects']['Row'];

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) return;

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (!error && data) {
          setProjects(data);
        } else {
          // If error is table doesn't exist, ignore
          if (error?.code !== '42P01') {
            console.error("Error fetching projects:", error);
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <div className="flex flex-col gap-10 pb-12">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Welcome to BuildPilot X</h1>
          <p className="text-muted-foreground text-lg">Your autonomous venture studio is ready.</p>
        </div>
        <Button render={<Link href="/dashboard/create" />} size="lg" className="rounded-full h-12 px-6 bg-white text-black hover:bg-gray-200">
          <Plus className="w-5 h-5 mr-2" />
          New Venture
        </Button>
      </div>

      {/* Active Ventures Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b border-white/5 pb-4">Active Ventures</h2>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-6 rounded-2xl h-48 animate-pulse flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5" />
                  <div className="h-6 bg-white/5 w-1/2 rounded" />
                  <div className="h-4 bg-white/5 w-3/4 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <Link key={project.id} href={`/dashboard/project/${project.id}`}>
                <div className="glass-card p-6 rounded-2xl flex flex-col h-full gap-4 group cursor-pointer hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <Rocket className="w-6 h-6 text-white" />
                    </div>
                    <div className="px-2.5 py-1 rounded-full text-xs font-medium border glass bg-white/5 uppercase tracking-wider">
                      {project.status.replace('_', ' ')}
                    </div>
                  </div>
                  
                  <div className="mt-2 flex-1">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.description}</p>
                  </div>
                  
                  <div className="flex items-center text-sm font-medium text-primary pt-4 border-t border-white/5 mt-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    Open Workspace <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="glass-card flex flex-col items-center justify-center p-12 text-center rounded-2xl border-dashed">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
              <Rocket className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No active ventures</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              You haven&apos;t initialized any projects yet. Start by defining your first venture.
            </p>
            <Button render={<Link href="/dashboard/create" />} className="rounded-full bg-gradient-primary">
              <Plus className="w-4 h-4 mr-2" /> Initialize Venture
            </Button>
          </div>
        )}
      </section>

      {/* Quick Actions / Modules */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b border-white/5 pb-4">Studio Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/executive-board">
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:border-white/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">AI Executive Board</h3>
                <p className="text-muted-foreground text-sm mt-1">Consult with your virtual team of specialized AI agents for strategic decisions.</p>
              </div>
            </div>
          </Link>
          
          <Link href="/dashboard/architecture">
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:border-white/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Component className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Architecture Designer</h3>
                <p className="text-muted-foreground text-sm mt-1">Automatically generate robust cloud architectures and database schemas.</p>
              </div>
            </div>
          </Link>

          <Link href="/dashboard/competitors">
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4 group hover:border-white/20 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <LineChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Market Intelligence</h3>
                <p className="text-muted-foreground text-sm mt-1">Real-time competitor analysis and market positioning insights.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
