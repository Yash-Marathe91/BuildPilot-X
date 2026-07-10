"use client";
import { Hammer } from "lucide-react";
export default function ConstructingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
        <Hammer className="w-10 h-10 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-4">Module Initializing</h1>
      <p className="text-muted-foreground text-lg max-w-md mx-auto">
        This autonomous venture module is currently generating its foundation. Check back shortly as the AI finalizes the infrastructure.
      </p>
    </div>
  );
}
