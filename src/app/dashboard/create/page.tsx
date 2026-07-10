"use client";

import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { 
  Bot, Rocket, Settings2, Sparkles, UploadCloud, 
  Briefcase, Code2, GitMerge, DollarSign, Megaphone, 
  Scale, TrendingUp, PenTool, Terminal, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { AIClient } from "@/lib/api-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().min(2, "Project name must be at least 2 characters."),
  description: z.string().min(10, "Please provide a more detailed description."),
  industry: z.string().min(1, "Please select an industry."),
  target_audience: z.string().min(1, "Please define your target audience."),
});

// The 9 Agents
const AGENTS = [
  { id: "ceo", name: "Alexander", role: "CEO", icon: Briefcase, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/30" },
  { id: "cto", name: "David", role: "CTO", icon: Code2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/30" },
  { id: "pm", name: "Sarah", role: "CPO", icon: GitMerge, color: "text-orange-400", bg: "bg-orange-400/10", border: "border-orange-400/30" },
  { id: "cmo", name: "Marcus", role: "CMO", icon: Megaphone, color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/30" },
  { id: "investor", name: "Victor", role: "VC", icon: TrendingUp, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30" },
  { id: "architect", name: "Elena", role: "Architect", icon: Terminal, color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/30" },
  { id: "dba", name: "Linus", role: "DBA", icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30" },
  { id: "cdo", name: "Maya", role: "UI/UX", icon: PenTool, color: "text-rose-400", bg: "bg-rose-400/10", border: "border-rose-400/30" },
  { id: "clo", name: "Harvey", role: "Legal", icon: Scale, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/30" },
];

export default function CreateProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orchestrationMode, setOrchestrationMode] = useState(false);
  const [agentResponses, setAgentResponses] = useState<Record<string, string>>({});
  const [isComplete, setIsComplete] = useState(false);

  // Auto-scroll refs for each agent card
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      industry: "",
      target_audience: "",
    },
  });

  // Auto-scroll to bottom as streams arrive
  useEffect(() => {
    Object.keys(agentResponses).forEach(id => {
      const el = scrollRefs.current[id];
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  }, [agentResponses]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Transition to Orchestration UI
    setOrchestrationMode(true);
    setIsComplete(false);
    
    // Clear previous responses
    const initialResponses: Record<string, string> = {};
    AGENTS.forEach(a => initialResponses[a.id] = "");
    setAgentResponses(initialResponses);

    const idea = values.title;
    const context = \`Industry: \${values.industry}. Target Audience: \${values.target_audience}. Description: \${values.description}\`;

    try {
      await AIClient.streamStartup(
        { idea, context },
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
            console.error("Stream failed:", error);
            toast.error("Failed to connect to AMD Inference Backend.");
            setIsComplete(true);
            setIsSubmitting(false);
          },
          onComplete: () => {
            toast.success("Venture architecture complete.");
            setIsComplete(true);
            setIsSubmitting(false);
          }
        }
      );
    } catch (e) {
      toast.error("An error occurred during initialization.");
      setIsSubmitting(false);
      setIsComplete(true);
    }
  }

  if (orchestrationMode) {
    return (
      <div className="flex flex-col h-full max-w-7xl mx-auto w-full gap-6 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary w-fit mb-2">
              {isComplete ? <CheckCircle2 className="w-4 h-4" /> : <Bot className="w-4 h-4 animate-pulse" />}
              {isComplete ? "Initialization Complete" : "Agents Synchronizing..."}
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{form.getValues("title")}</h1>
            <p className="text-muted-foreground text-sm">Real-time inference running on AMD GPU backend.</p>
          </div>
          {isComplete && (
            <Button onClick={() => setOrchestrationMode(false)} variant="outline" className="glass-modal">
              Reset Protocol
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {AGENTS.map((agent) => (
            <div key={agent.id} className={cn("glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden transition-all duration-500", !isComplete && agentResponses[agent.id] ? "border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]" : "border-white/5")}>
              
              {/* Agent Header */}
              <div className="flex items-center gap-3">
                <div className={cn("size-10 rounded-xl flex items-center justify-center shrink-0", agent.bg, agent.border, "border")}>
                  <agent.icon className={cn("size-5", agent.color)} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white/90">{agent.role}</h3>
                  <p className="text-xs text-muted-foreground">{agent.name}</p>
                </div>
                {!isComplete && (
                  <span className="relative flex h-2 w-2">
                    <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", agent.bg.replace('/10', ''))}></span>
                    <span className={cn("relative inline-flex rounded-full h-2 w-2", agent.bg.replace('/10', ''))}></span>
                  </span>
                )}
              </div>

              {/* Streaming Content */}
              <div 
                ref={(el) => { scrollRefs.current[agent.id] = el; }}
                className="flex-1 overflow-y-auto pr-2 text-sm text-white/70 font-light leading-relaxed whitespace-pre-wrap scrollbar-thin scrollbar-thumb-white/10"
                style={{ maxHeight: '200px' }}
              >
                {agentResponses[agent.id] ? agentResponses[agent.id] : (
                  <span className="text-white/20 italic animate-pulse">Awaiting parameters...</span>
                )}
              </div>
              
              {/* Active glow effect while streaming */}
              {!isComplete && agentResponses[agent.id] && (
                 <div className={cn("absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r via-transparent to-transparent opacity-50", \`from-\${agent.color.replace('text-', '')}\`)} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto w-full pb-12">
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary w-fit mb-2">
          <Sparkles className="w-4 h-4" />
          Venture Initialization Protocol
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight">Create New Venture</h1>
        <p className="text-muted-foreground text-lg">
          Provide the foundational parameters for your new startup. Your AI team will use this to architect the entire platform concurrently.
        </p>
      </div>

      <div className="glass-card p-6 md:p-8 rounded-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <Rocket className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-semibold">Core Identity</h3>
              </div>
              
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Project Name</FormLabel>
                    <FormDescription>The internal or public name of your venture.</FormDescription>
                    <FormControl>
                      <Input placeholder="e.g. BuildPilot X" className="h-12 bg-black/20 border-white/10 focus-visible:ring-primary rounded-xl text-base" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Elevator Pitch</FormLabel>
                    <FormDescription>Describe what you are building in 1-2 sentences.</FormDescription>
                    <FormControl>
                      <Textarea 
                        placeholder="An autonomous AI venture studio that builds enterprise SaaS platforms..." 
                        className="resize-none h-24 bg-black/20 border-white/10 focus-visible:ring-primary rounded-xl text-base" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                <Settings2 className="w-5 h-5 text-secondary" />
                <h3 className="text-xl font-semibold">Market Parameters</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Industry Sector</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 bg-black/20 border-white/10 focus-visible:ring-secondary rounded-xl text-base">
                            <SelectValue placeholder="Select an industry" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="glass-modal">
                          <SelectItem value="saas">B2B SaaS</SelectItem>
                          <SelectItem value="fintech">Fintech</SelectItem>
                          <SelectItem value="healthtech">HealthTech</SelectItem>
                          <SelectItem value="ecommerce">E-Commerce</SelectItem>
                          <SelectItem value="ai">Artificial Intelligence</SelectItem>
                          <SelectItem value="web3">Web3 / Crypto</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="target_audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Target Audience</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Enterprise HR teams" className="h-12 bg-black/20 border-white/10 focus-visible:ring-secondary rounded-xl text-base" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/5">
              <Button type="button" variant="ghost" className="rounded-xl h-12 px-6">
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting} className="rounded-xl h-12 px-8 bg-gradient-primary shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all font-semibold">
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Bot className="w-5 h-5 animate-pulse" />
                    Initializing Server...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UploadCloud className="w-5 h-5" />
                    Deploy Architecture
                  </span>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
