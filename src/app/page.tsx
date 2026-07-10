"use client";

import Link from "next/link";
import { ArrowRight, Bot, Code2, Rocket, Sparkles, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FluidBackground } from "@/components/FluidBackground";

gsap.registerPlugin(ScrollTrigger);

export default function LandingPage() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-badge",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2 }
    )
    .fromTo(
      ".hero-title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      ".hero-description",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(
      ".hero-buttons",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      "-=0.5"
    );

    // Features Scroll Animation
    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#features",
          start: "top 80%",
        }
      }
    );

    gsap.fromTo(
      ".features-title",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: "#features",
          start: "top 85%",
        }
      }
    );
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col min-h-screen relative overflow-hidden">
      <FluidBackground />
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/10 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Rocket className="size-4 text-white group-hover:animate-bounce" />
            </div>
            <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">BuildPilot X</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" render={<Link href="/login" />} className="hidden md:flex text-muted-foreground hover:text-white transition-colors duration-300">
              Sign In
            </Button>
            <Button render={<Link href="/register" />} className="rounded-full bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300">
              Get Started
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 md:pt-40 md:pb-48">
          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
              <Sparkles className="size-4 text-primary animate-pulse" />
              <span className="text-white/90 tracking-wide">The Next Generation of Venture Building</span>
            </div>
            
            <h1 className="hero-title text-6xl md:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 mb-8 leading-[1.05] drop-shadow-2xl">
              Your Autonomous <br className="hidden md:block" /> AI Venture Studio.
            </h1>
            
            <p className="hero-description text-xl md:text-2xl text-muted-foreground max-w-3xl mb-14 leading-relaxed font-light">
              BuildPilot X integrates elite AI executives, automated architecture design, and intelligent market research into a single, seamless platform. <strong className="font-medium text-white/80">Go from idea to production in minutes, not months.</strong>
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row items-center gap-6">
              <Button render={<Link href="/register" />} size="lg" className="rounded-full h-14 px-10 bg-gradient-primary shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 font-semibold text-lg w-full sm:w-auto group border border-purple-500/30">
                Initialize Your Venture
                <ArrowRight className="ml-3 size-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Button>
              <Button render={<Link href="#features" />} variant="outline" size="lg" className="rounded-full h-14 px-10 border-white/20 bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 font-semibold text-lg w-full sm:w-auto backdrop-blur-md">
                Explore Platform
              </Button>
            </div>
          </div>
        </section>

        {/* Value Prop Cards */}
        <section id="features" className="py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 -z-10" />
          <div className="container mx-auto px-4">
            <div className="features-title text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Enterprise-Grade Intelligence</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">Everything you need to scale, engineered with precision and premium aesthetics.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              <div className="feature-card glass-modal p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/30 rounded-full blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="size-14 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 border border-primary/30 group-hover:scale-110 transition-transform duration-500">
                  <Bot className="size-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">AI Executive Board</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">Consult with a virtual C-Suite. Get real-time strategic advice from specialized AI agents.</p>
              </div>

              <div className="feature-card glass-modal p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-secondary/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/30 rounded-full blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="size-14 rounded-2xl bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/30 group-hover:scale-110 transition-transform duration-500">
                  <Code2 className="size-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">Automated Architecture</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">Generate scalable tech stacks and visualize your entire infrastructure in seconds.</p>
              </div>

              <div className="feature-card glass-modal p-10 rounded-[2.5rem] relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)]">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/30 rounded-full blur-[60px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="size-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-8 border border-emerald-500/30 group-hover:scale-110 transition-transform duration-500">
                  <Shield className="size-7 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">Enterprise Security</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-light">Built on Supabase with strict Row Level Security, ensuring your data remains isolated and secure.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-16 bg-black relative z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded bg-white/5 flex items-center justify-center">
              <Rocket className="size-4 text-white/70" />
            </div>
            <span className="font-semibold text-white/70 tracking-wide text-lg">BuildPilot X</span>
          </div>
          <p className="text-white/40 font-light">© 2026 BuildPilot X. All rights reserved. Crafted for the future.</p>
        </div>
      </footer>
    </div>
  );
}
