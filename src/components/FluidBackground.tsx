"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function FluidBackground({ intensity = "high" }: { intensity?: "high" | "low" }) {
  const container = useRef<HTMLDivElement>(null);
  const opacityClass = intensity === "high" ? "opacity-60" : "opacity-20";
  const opacityClassSecondary = intensity === "high" ? "opacity-50" : "opacity-15";
  const opacityClassTertiary = intensity === "high" ? "opacity-40" : "opacity-10";

  useGSAP(() => {
    const orbs = gsap.utils.toArray(".fluid-orb");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    orbs.forEach((orb: any, i) => {
      gsap.to(orb, {
        x: "random(-300, 300, 5)",
        y: "random(-300, 300, 5)",
        scale: "random(0.8, 1.5)",
        duration: "random(10, 20)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: i * -2,
      });
    });
  }, { scope: container });

  return (
    <div ref={container} className="fixed inset-0 overflow-hidden pointer-events-none -z-20 bg-[#050505]">
      <div className={`fluid-orb absolute top-1/4 left-1/4 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] ${opacityClass}`} />
      <div className={`fluid-orb absolute top-1/2 right-1/4 w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] bg-secondary/20 rounded-full mix-blend-screen filter blur-[120px] ${opacityClassSecondary}`} />
      <div className={`fluid-orb absolute bottom-1/4 left-1/3 w-[90vw] h-[90vw] max-w-[900px] max-h-[900px] bg-purple-600/10 rounded-full mix-blend-screen filter blur-[140px] ${opacityClassTertiary}`} />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Noise overlay for extra texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );
}
