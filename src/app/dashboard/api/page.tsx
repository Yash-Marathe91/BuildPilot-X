"use client";
import { Terminal, Copy, CheckCircle2, Play, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const ENDPOINTS = [
  { method: "GET", path: "/api/v1/users", status: "Active", latency: "45ms" },
  { method: "POST", path: "/api/v1/auth/login", status: "Active", latency: "120ms" },
  { method: "GET", path: "/api/v1/projects", status: "Active", latency: "65ms" },
  { method: "PUT", path: "/api/v1/projects/:id", status: "Active", latency: "80ms" },
  { method: "DELETE", path: "/api/v1/projects/:id", status: "Active", latency: "95ms" },
];

export default function ApiStudioPage() {
  return (
    <div className="flex flex-col gap-8 pb-12 h-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium w-fit mb-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            Engineering Module
          </div>
          <h1 className="text-4xl font-bold tracking-tight">API Studio</h1>
          <p className="text-muted-foreground text-lg mt-1">Auto-generated REST API endpoints based on your system architecture.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button className="rounded-xl h-11 px-6 bg-white/5 hover:bg-white/10 text-foreground border border-white/10">
            <Code2 className="w-4 h-4 mr-2" />
            Export OpenAPI Spec
          </Button>
          <Button className="rounded-xl h-11 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Play className="w-4 h-4 mr-2" />
            Deploy Serverless
          </Button>
        </div>
      </div>

      <div className="glass-card rounded-2xl border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-white/90">Production Endpoints</h3>
          <span className="text-xs text-muted-foreground">Base URL: https://api.buildpilotx.com</span>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Method</th>
                <th className="px-6 py-4 font-medium">Endpoint Path</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Avg Latency</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ENDPOINTS.map((ep, i) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' : ep.method === 'POST' ? 'bg-blue-500/10 text-blue-400' : ep.method === 'PUT' ? 'bg-amber-500/10 text-amber-400' : 'bg-red-500/10 text-red-400'}`}>
                      {ep.method}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-white/80">{ep.path}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" />
                      {ep.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{ep.latency}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
