"use client";

import { useActionState, useEffect } from "react";
import { signup } from "@/app/(auth)/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ArrowRight, Loader2, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { FluidBackground } from "@/components/FluidBackground";

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen bg-[#050505]">
      {/* Left Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-12 relative order-2 lg:order-1">
        {/* Subtle background glow for mobile */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] lg:hidden pointer-events-none" />

        <div className="w-full max-w-md relative z-10">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10">
            <Link href="/" className="lg:hidden w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.4)] mb-6">
              <Bot className="w-6 h-6 text-white" />
            </Link>
            <h2 className="text-3xl font-bold tracking-tight text-white">Create Account</h2>
            <p className="text-muted-foreground mt-2">Initialize your autonomous venture studio.</p>
          </div>

          <form action={formAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/90">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-secondary transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <Input 
                  name="email"
                  type="email" 
                  required
                  placeholder="founder@example.com"
                  className="bg-white/5 border-white/10 h-14 pl-12 pr-4 rounded-xl focus-visible:ring-1 focus-visible:ring-secondary focus-visible:border-secondary transition-all text-white placeholder:text-white/30"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/90">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-secondary transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <Input 
                  name="password"
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="bg-white/5 border-white/10 h-14 pl-12 pr-4 rounded-xl focus-visible:ring-1 focus-visible:ring-secondary focus-visible:border-secondary transition-all text-white placeholder:text-white/30"
                />
              </div>
              <p className="text-xs text-white/40 mt-1">Must be at least 6 characters.</p>
            </div>

            <Button 
              disabled={isPending}
              type="submit" 
              className="mt-2 h-14 rounded-xl bg-gradient-primary text-white font-semibold text-lg shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_35px_rgba(168,85,247,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Initialize Studio
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-white/50 mt-10">
            Already have an account?{" "}
            <Link href="/login" className="text-white font-medium hover:text-secondary transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Visual/Brand */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden items-center justify-center p-12 order-1 lg:order-2">
        <div className="absolute inset-0 z-0">
          <FluidBackground intensity="low" />
          <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay" />
        </div>
        
        {/* Glass overlay for text */}
        <div className="relative z-10 max-w-lg glass-modal p-10 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md bg-black/20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.5)] mb-8">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white mb-6 leading-tight">
            Stop typing prompts. <br/>Start directing <span className="text-transparent bg-clip-text bg-gradient-primary">Genius.</span>
          </h1>
          <p className="text-lg text-white/70">
            Deploy an entire executive team in seconds. Your CEO, CTO, and CPO are ready to execute your vision from day one.
          </p>
        </div>
      </div>
    </div>
  );
}
