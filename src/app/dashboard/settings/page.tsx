"use client";

import { useState } from "react";
import { User, Bell, Shield, Save, KeySquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [apiKey, setApiKey] = useState("sk-********************************");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate saving process
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Settings updated successfully");
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 max-w-4xl mx-auto w-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your account, API keys, and platform preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8 mt-4">
        {/* Settings Navigation */}
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 text-foreground font-medium transition-colors">
            <User className="w-4 h-4" /> Profile
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
            <KeySquare className="w-4 h-4" /> API Keys
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors">
            <Shield className="w-4 h-4" /> Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex flex-col gap-8">
          {/* Profile Section */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border-white/10">
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-white/5">Profile Information</h2>
            
            <form onSubmit={handleSave} className="flex flex-col gap-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border border-white/10">
                  <AvatarFallback className="bg-white/5 text-xl font-medium">BP</AvatarFallback>
                </Avatar>
                <div>
                  <Button type="button" variant="outline" className="h-9 px-4 rounded-lg bg-transparent border-white/10 hover:bg-white/5">
                    Change Avatar
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input defaultValue="Founder" className="h-11 bg-black/20 border-white/10 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input defaultValue="founder@buildpilotx.com" disabled className="h-11 bg-black/20 border-white/10 rounded-xl opacity-50" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Company / Venture Studio Name</label>
                  <Input defaultValue="Acme Studio" className="h-11 bg-black/20 border-white/10 rounded-xl" />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isSaving} className="rounded-xl px-6 bg-white text-black hover:bg-gray-200">
                  {isSaving ? "Saving..." : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                </Button>
              </div>
            </form>
          </section>

          {/* API Keys Section */}
          <section className="glass-card p-6 md:p-8 rounded-2xl border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/2" />
            
            <h2 className="text-xl font-semibold mb-6 pb-4 border-b border-white/5">AI API Configuration</h2>
            
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground mb-2">
                Provide your OpenAI API key to power the AI Executive Board. Keys are securely stored and never shared.
              </p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">OpenAI API Key</label>
                <div className="flex gap-4">
                  <Input 
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="h-11 bg-black/20 border-white/10 rounded-xl flex-1 font-mono" 
                  />
                  <Button variant="outline" className="h-11 px-6 rounded-xl border-white/10 hover:bg-white/5">
                    Update Key
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="p-6 md:p-8 rounded-2xl border border-destructive/20 bg-destructive/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-lg font-semibold text-destructive mb-1">Delete Account</h2>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all associated projects.</p>
            </div>
            <Button variant="destructive" className="rounded-xl px-6">
              Delete Account
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
}
