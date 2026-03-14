'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Mail, Lock, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/dashboard';
    }, 1000);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] animate-pulse delay-700" />

      <div className="w-full max-w-[440px] z-10 animate-fade-in">
        {/* Header / Logo */}
        <div className="text-center mb-10 space-y-4">
          <Link href="/" className="inline-flex items-center gap-3 no-underline group">
            <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-base">CQ</span>
            </div>
            <span className="font-black text-3xl tracking-tighter gradient-text">ClarityQuest</span>
          </Link>
          <div className="space-y-1">
            <h2 className="text-xl font-bold tracking-tight">Access Your Training</h2>
            <p className="text-muted-fg text-xs uppercase font-black tracking-widest opacity-60">Authentication Required</p>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-card/40 backdrop-blur-2xl rounded-[2.5rem] border border-border/40 shadow-[var(--shadow-premium)] p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold p-4 rounded-xl flex items-center gap-3 animate-slide-up" role="alert">
                <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                {error}
              </div>
            )}
            
            <div className="space-y-5">
                <Input
                  label="CORPORATE EMAIL"
                  type="email"
                  icon={<Mail size={16} />}
                  placeholder="nexus@clarityquest.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all placeholder:text-muted-fg/30 font-medium"
                  required
                />
                
                <div className="space-y-1">
                    <Input
                      label="SECURE KEY"
                      type="password"
                      icon={<Lock size={16} />}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:bg-card transition-all placeholder:text-muted-fg/30 font-medium"
                      required
                    />
                    <div className="flex justify-end pr-1">
                        <button type="button" className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline transition-all">Recover Credential</button>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-5 h-5 rounded-lg border-2 border-border group-hover:border-primary/50 transition-all peer-checked:bg-primary peer-checked:border-primary" />
                    <CheckCircle2 size={12} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Persist Session</span>
              </label>
            </div>

            <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/10 hover:-translate-y-1 active:scale-95 transition-all" 
                loading={loading} 
                icon={<ArrowRight size={18} />}
            >
              Initialize Access
            </Button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40" />
            </div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.3em]">
              <span className="bg-background/20 backdrop-blur-md px-4 text-muted-foreground">Universal SSO</span>
            </div>
          </div>

          <button className="w-full h-14 flex items-center justify-center gap-4 rounded-2xl border border-border/50 bg-muted/10 hover:bg-muted/30 transition-all text-[10px] font-black uppercase tracking-widest group">
            <svg width="20" height="20" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Connect with Global Identity
          </button>
        </div>

        <div className="mt-12 text-center space-y-4">
            <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
              Standard Membership?{' '}
              <Link href="/signup" className="text-primary font-black hover:underline px-2">Register Hierarchy</Link>
            </p>
            <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 hover:text-foreground transition-colors group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Nexus
            </Link>
        </div>
      </div>
    </div>
  );
}
