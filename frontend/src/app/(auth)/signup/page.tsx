'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, User, Briefcase, ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { api } from '@/lib/api';

export default function SignUpPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'professional' });
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.signup(form.name, form.email, form.password, form.role);
      localStorage.setItem('token', res.access_token);
      window.location.href = '/goals';
    } catch {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-pulse delay-700" />

      <div className="w-full max-w-[460px] z-10 animate-fade-in py-10">
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-base">CQ</span>
            </div>
            <span className="font-black text-3xl tracking-tighter gradient-text">ClarityQuest</span>
          </Link>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Deploy Your Persona</h2>
            <p className="text-muted-fg text-[10px] uppercase font-black tracking-[0.2em] opacity-60">Join 40k+ Elite Learners</p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border border-border/40 shadow-[var(--shadow-premium)] p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <Input
                  label="FULL IDENTIFIER"
                  icon={<User size={16} />}
                  placeholder="Lexington Aris"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all"
                  required
                />
                <Input
                  label="CORPO RATE EMAIL"
                  type="email"
                  icon={<Mail size={16} />}
                  placeholder="aris@nexus.ai"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="KEY"
                      type="password"
                      icon={<Lock size={16} />}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all"
                      required
                    />
                    <Input
                      label="VERIFY KEY"
                      type="password"
                      icon={<Lock size={16} />}
                      placeholder="••••••••"
                      value={form.confirm}
                      onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                      className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all"
                      required
                    />
                </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-muted-fg uppercase tracking-widest ml-1">Current Sector</label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: 'student', label: 'Student', icon: User, desc: 'Academic path' },
                  { value: 'professional', label: 'Expert', icon: Briefcase, desc: 'Corporate track' },
                ].map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.value })}
                    className={cn(
                        "flex flex-col items-center gap-3 p-4 rounded-2xl border transition-all duration-300 group cursor-pointer text-left h-36 justify-center",
                        form.role === r.value 
                        ? "bg-primary border-primary shadow-lg shadow-primary/20 scale-105" 
                        : "bg-muted/10 border-border/40 text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                        form.role === r.value ? "bg-white/20 text-white" : "bg-muted/50 text-muted-fg group-hover:bg-primary/10 group-hover:text-primary"
                    )}>
                        <r.icon size={20} />
                    </div>
                    <div className="text-center">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest", form.role === r.value ? "text-white" : "text-foreground")}>{r.label}</p>
                        <p className={cn("text-[8px] font-bold uppercase tracking-tighter mt-1", form.role === r.value ? "text-white/60" : "text-muted-fg")}>{r.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/10 hover:-translate-y-1 active:scale-95 transition-all mt-4" 
                loading={loading} 
                icon={<ArrowRight size={18} />}
            >
              Initialize Node
            </Button>
          </form>
        </div>

        <div className="mt-12 text-center space-y-4">
            <p className="text-[11px] font-bold text-muted-fg uppercase tracking-widest">
              Existing Node?{' '}
              <Link href="/login" className="text-primary font-black hover:underline px-2">Access Credentials</Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-fg/60 hover:text-foreground transition-colors group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Nexus
            </Link>
        </div>
      </div>
    </div>
  );
}
