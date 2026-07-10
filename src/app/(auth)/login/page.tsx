"use client";

import { useActionState, useEffect } from "react";
import { login } from "@/app/(auth)/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  useEffect(() => {
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      
      <div className="glass-modal p-8 rounded-3xl w-full max-w-md flex flex-col gap-8 shadow-2xl relative overflow-hidden">
        {/* Glow effect inside card */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
        
        <div className="flex flex-col items-center text-center relative z-10">
          <Link href="/" className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] mb-6">
            <Bot className="w-6 h-6 text-white" />
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your venture studio</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4 relative z-10">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <Input 
              name="email"
              type="email" 
              required
              placeholder="founder@example.com"
              className="bg-black/20 border-white/10 h-12 px-4 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Password</label>
              <Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>
            <Input 
              name="password"
              type="password" 
              required
              placeholder="••••••••"
              className="bg-black/20 border-white/10 h-12 px-4 rounded-xl focus-visible:ring-primary focus-visible:border-primary transition-all"
            />
          </div>

          <Button 
            disabled={isPending}
            type="submit" 
            className="mt-4 h-12 rounded-xl bg-gradient-primary text-white font-semibold text-md shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground relative z-10">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-foreground font-medium hover:text-primary transition-colors">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
