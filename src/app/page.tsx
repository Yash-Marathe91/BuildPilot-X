"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Rocket,
  Sparkles,
  Briefcase,
  GitMerge,
  DollarSign,
  Megaphone,
  Scale,
  TrendingUp,
  PenTool,
  Terminal,
  Play,
  Cloud,
  Cpu,
  Layers,
  Database,
  Network,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const Beams = dynamic(() => import("@/components/Beams"), { ssr: false });

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
        stagger: 0.1,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: "#features",
          start: "top 75%",
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

    // Engineered For Scroll Animation
    gsap.fromTo(
      ".engineered-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#engineered",
          start: "top 75%",
        }
      }
    );

    gsap.fromTo(
      ".engineered-image",
      { opacity: 0, scale: 0.95, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#engineered",
          start: "top 75%",
        }
      }
    );

  }, { scope: container });

  const agents = [
    {
      icon: <Briefcase className="size-6 text-purple-400" />,
      color: "bg-purple-400/10",
      border: "hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(192,132,252,0.15)]",
      glow: "bg-purple-400/20",
      desc: "Drives overall vision, mediates disputes, and ensures the startup aligns with market realities."
    },
    {
      icon: <Code2 className="size-6 text-cyan-400" />,
      color: "bg-cyan-400/10",
      border: "hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
      glow: "bg-cyan-400/20",
      desc: "Architects the tech stack, evaluates technical feasibility, and oversees the Software Architect."
    },
    {
      icon: <GitMerge className="size-6 text-orange-400" />,
      color: "bg-orange-400/10",
      border: "hover:border-orange-400/50 hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]",
      glow: "bg-orange-400/20",
      desc: "Defines feature roadmaps, prioritizes user stories, and ensures product-market fit."
    },
    {
      icon: <DollarSign className="size-6 text-emerald-400" />,
      color: "bg-emerald-400/10",
      border: "hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
      glow: "bg-emerald-400/20",
      desc: "Manages burn rate, constructs financial models, and plans monetization strategies."
    },
    {
      icon: <Megaphone className="size-6 text-pink-400" />,
      color: "bg-pink-400/10",
      border: "hover:border-pink-400/50 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]",
      glow: "bg-pink-400/20",
      desc: "Crafts go-to-market strategies, brand voice, and customer acquisition channels."
    },
    {
      icon: <Scale className="size-6 text-blue-400" />,
      color: "bg-blue-400/10",
      border: "hover:border-blue-400/50 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)]",
      glow: "bg-blue-400/20",
      desc: "Flags compliance risks, drafts privacy policies, and structures equity."
    },
    {
      icon: <TrendingUp className="size-6 text-yellow-400" />,
      color: "bg-yellow-400/10",
      border: "hover:border-yellow-400/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)]",
      glow: "bg-yellow-400/20",
      desc: "Plays devil's advocate, interrogates the pitch deck, and simulates pitch meetings."
    },
    {
      icon: <PenTool className="size-6 text-rose-400" />,
      color: "bg-rose-400/10",
      border: "hover:border-rose-400/50 hover:shadow-[0_0_30px_rgba(251,113,133,0.15)]",
      glow: "bg-rose-400/20",
      desc: "Creates wireframes, defines user flows, and establishes the visual design system."
    },
    {
      icon: <Terminal className="size-6 text-teal-400" />,
      color: "bg-teal-400/10",
      border: "hover:border-teal-400/50 hover:shadow-[0_0_30px_rgba(45,212,191,0.15)]",
      glow: "bg-teal-400/20",
      desc: "Writes the boilerplate, sets up the repository, and provisions cloud infrastructure."
    }
  ];

  return (
    <div ref={container} className="flex flex-col min-h-screen relative overflow-hidden bg-[#050505]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/10 transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="size-8 rounded-lg bg-gradient-primary flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300">
              <Rocket className="size-4 text-white group-hover:animate-bounce" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">BuildPilot X</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition-colors">Features</Link>
            <Link href="#about" className="text-sm text-white/60 hover:text-white transition-colors">About Us</Link>
            <Link href="#engineered" className="text-sm text-white/60 hover:text-white transition-colors">Engineered For</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" render={<Link href="/login" />} className="hidden md:flex text-white/60 hover:text-white transition-colors duration-300">
              Login
            </Button>
            <Button render={<Link href="/register" />} className="rounded-full bg-gradient-primary border-none text-white hover:brightness-110 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300">
              Start Building
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 md:pt-40 md:pb-24">
          <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
            
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white mb-6 leading-[1.05] drop-shadow-2xl">
              Your AI Executive Team. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">From Idea to Fundable Startup.</span>
            </h1>
            
            <p className="hero-description text-lg md:text-xl text-white/60 max-w-3xl mb-12 leading-relaxed font-light">
              Nine autonomous AI executives collaborate to build your startup from scratch. Stop typing prompts and start directing a board of brilliant minds.
            </p>
            
            <div className="hero-buttons flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Button render={<Link href="/register" />} size="lg" className="rounded-full h-14 px-10 bg-gradient-primary border-none text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] hover:-translate-y-1 transition-all duration-300 font-semibold text-base w-full sm:w-auto group">
                Start Building
              </Button>
              <Button render={<Link href="https://github.com/Yash-Marathe91/BuildPilot-X" target="_blank" rel="noopener noreferrer" />} variant="outline" size="lg" className="rounded-full h-14 px-10 border-white/10 bg-black/50 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 font-semibold text-white text-base w-full sm:w-auto backdrop-blur-md group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-5 mr-2 opacity-80 group-hover:opacity-100 transition-opacity"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                GitHub Repository
              </Button>
            </div>
          </div>
        </section>

        {/* 9 Agents Grid */}
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="features-title text-center mb-24">
              <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed">
                Nine specialized AI agents working synchronously. They debate, strategy, and execute. You hold the veto power.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-16 max-w-6xl mx-auto">
              {agents.map((agent, i) => (
                <div key={i} className={`feature-card group flex flex-col items-center text-center`}>
                  <div className={`size-16 rounded-full ${agent.color} flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:scale-110`}>
                    <div className={`absolute inset-0 rounded-full ${agent.glow} blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    {agent.icon}
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors duration-300">
                    {agent.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative z-10 border-t border-white/5">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">About BuildPilot X</h2>
            <p className="text-lg text-white/70 leading-relaxed font-light mb-8">
              We believe the future of entrepreneurship shouldn't be bottlenecked by technical execution. BuildPilot X was created to bridge the gap between visionary ideas and functional realities. By deploying a team of autonomous, specialized AI executives, we empower solo founders to operate with the capacity of a fully-funded venture studio. 
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="glass-card px-6 py-3 rounded-full text-white/80 text-sm font-medium border border-white/10 bg-white/5">100% Autonomous</div>
              <div className="glass-card px-6 py-3 rounded-full text-white/80 text-sm font-medium border border-white/10 bg-white/5">No Placeholder Code</div>
              <div className="glass-card px-6 py-3 rounded-full text-white/80 text-sm font-medium border border-white/10 bg-white/5">AMD Hardware Powered</div>
            </div>
          </div>
        </section>

        {/* Engineered For Section */}
        <section id="engineered" className="py-32 border-t border-white/5 relative bg-black/40">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              
              {/* Left Content */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-white mb-12 engineered-item">Engineered for</h3>
                
                <div className="space-y-12">
                  <div className="flex gap-6 engineered-item">
                    <div className="mt-1">
                      <div className="size-10 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                        <Bot className="size-5 text-purple-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">AI-Driven Strategy</h4>
                      <p className="text-white/50 leading-relaxed font-light text-sm md:text-base">
                        Our models aren't just wrappers. They are heavily fine-tuned on decades of Y-Combinator data, successful pitch decks, and post-mortem failure analyses.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 engineered-item">
                    <div className="mt-1">
                      <div className="size-10 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                        <Users className="size-5 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Real-time Collaboration</h4>
                      <p className="text-white/50 leading-relaxed font-light text-sm md:text-base">
                        Watch the board debate in real-time. The CTO and CPO will argue over feature bloat while the CFO counts the pennies. You get the distilled output.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-6 engineered-item">
                    <div className="mt-1">
                      <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        <TrendingUp className="size-5 text-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Investor Mode</h4>
                      <p className="text-white/50 leading-relaxed font-light text-sm md:text-base">
                        Toggle Investor Mode to have the system stress-test your assumptions. Get a brutally honest critique before you ever step into a real VC meeting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Content - Dashboard Abstract */}
              <div className="w-full lg:w-1/2 engineered-image">
                <div className="relative rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-3xl overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.15)] group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50" />
                  
                  {/* Decorative Dashboard UI Elements */}
                  <div className="relative p-6 md:p-8 aspect-square md:aspect-[4/3] flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                      <div className="size-8 rounded bg-gradient-primary flex items-center justify-center">
                        <Rocket className="size-4 text-white" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold text-sm">BUILD PILOT X</h5>
                        <p className="text-white/30 text-xs">AI-POWERED STARTUP ACCELERATOR PLATFORM</p>
                      </div>
                    </div>
                    
                    {/* Main Content Area */}
                    <div className="flex-1 flex gap-4">
                      {/* Left Column */}
                      <div className="w-1/2 flex flex-col gap-4">
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex-1 relative overflow-hidden group-hover:border-purple-500/30 transition-colors">
                          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:10px_10px]" />
                          <h6 className="text-white/70 text-xs font-semibold mb-3 relative z-10">Real-Time Agent Analysis</h6>
                          <div className="space-y-2 relative z-10">
                            <div className="h-2 w-3/4 bg-purple-500/40 rounded-full animate-pulse" />
                            <div className="h-2 w-1/2 bg-cyan-500/40 rounded-full animate-pulse delay-75" />
                            <div className="h-2 w-5/6 bg-emerald-500/40 rounded-full animate-pulse delay-150" />
                          </div>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 h-24 flex items-end gap-1">
                          {[40, 70, 45, 90, 65, 80, 55, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-purple-600/50 to-cyan-400/50 rounded-t-sm" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Column */}
                      <div className="w-1/2 flex flex-col gap-4">
                        <div className="flex gap-4">
                          <div className="flex-1 bg-black/40 rounded-xl p-3 border border-white/5">
                            <p className="text-white/40 text-[10px]">Valuation</p>
                            <p className="text-white font-mono text-sm">$1.4M</p>
                          </div>
                          <div className="flex-1 bg-black/40 rounded-xl p-3 border border-white/5">
                            <p className="text-white/40 text-[10px]">Growth</p>
                            <p className="text-emerald-400 font-mono text-sm">+28%</p>
                          </div>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 flex-1 relative overflow-hidden">
                          {/* Abstract 3D shape or complex graph placeholder */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-50">
                             <div className="absolute inset-0 border border-cyan-500/30 rounded-lg transform rotate-12 scale-75" />
                             <div className="absolute inset-0 border border-purple-500/30 rounded-lg transform -rotate-6 scale-90" />
                             <div className="absolute inset-0 border border-emerald-500/30 rounded-lg transform rotate-3 scale-100" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Subtle edge glow */}
                  <div className="absolute -bottom-px left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm" />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12 bg-black relative z-10">
        <div className="container mx-auto px-4 flex justify-center">
          <p className="text-white/30 text-sm font-light">© 2026 BuildPilot X. All rights reserved. The future is built autonomously.</p>
        </div>
      </footer>
    </div>
  );
}
