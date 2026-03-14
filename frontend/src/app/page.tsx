'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Mic,
  BarChart3,
  Video,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Play,
  BookOpen,
  Target,
  Users,
  Globe,
  Zap,
  Star,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function WelcomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary-foreground overflow-x-hidden">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 py-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-500">
              <span className="text-white font-black text-sm">CQ</span>
            </div>
            <span className="font-black text-2xl tracking-tighter gradient-text">ClarityQuest</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 text-xs font-black uppercase tracking-widest text-muted-fg">
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#impact" className="hover:text-primary transition-colors">Impact</Link>
                <Link href="#methodology" className="hover:text-primary transition-colors">Method</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" className="text-xs font-black uppercase tracking-widest px-6 h-10 rounded-xl hover:bg-muted">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button className="text-xs font-black uppercase tracking-widest px-8 h-10 rounded-xl shadow-lg shadow-primary/20">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative z-10 space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-primary/10 backdrop-blur-md rounded-2xl border border-primary/20 text-primary text-[11px] font-black uppercase tracking-[0.2em] shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              Next-Gen Learning Architecture
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.05] tracking-tight text-foreground">
              Master English <br />
              <span className="gradient-text">with Clinical Precision.</span>
            </h1>
            
            <p className="text-lg text-muted-fg leading-relaxed max-w-xl font-medium">
              Bridging the gap for Indian professionals. A high-fidelity, asynchronous training ecosystem that polishes your phonetics, syntax, and kinesics—delivered through AI.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/signup">
                <Button size="lg" className="rounded-2xl h-16 px-10 font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 group">
                  Initialize Training <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="secondary" size="lg" className="rounded-2xl h-16 px-8 font-black uppercase tracking-[0.2em] text-sm backdrop-blur-md bg-muted/30 border border-border/40 hover:bg-muted/50 transition-all flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Play size={16} className="fill-primary" />
                </div>
                View Demo
              </Button>
            </div>

            {/* Performance Indicators */}
            <div className="flex flex-wrap gap-10 pt-10 border-t border-border/40">
                {[
                  { label: 'Learners', val: '40k+', sub: 'Globally Distributed' },
                  { label: 'Retention', val: '92%', sub: 'Avg. Improvement' },
                  { label: 'Feedback', val: '0.4s', sub: 'Latent Analysis' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-black tracking-tighter text-foreground">{stat.val}</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-fg mt-1">{stat.label}</p>
                  </div>
                ))}
            </div>
          </div>

          {/* Premium Preview Component */}
          <div className="relative group animate-slide-up">
            <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-3xl opacity-20 -z-10 animate-pulse" />
            <div className="relative bg-card/40 backdrop-blur-2xl rounded-[3rem] shadow-[var(--shadow-premium)] border border-primary/10 p-4 lg:p-6 overflow-hidden">
                {/* Internal HUD UI */}
                <div className="bg-card rounded-[2rem] border border-border/40 shadow-sm overflow-hidden">
                    <div className="p-6 md:p-8 flex items-center justify-between border-b border-border/40 bg-muted/20">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center text-success text-2xl font-black">
                                84
                            </div>
                            <div>
                                <h3 className="font-black text-sm uppercase tracking-widest text-foreground">Session Analysis</h3>
                                <p className="text-[10px] font-bold text-muted-fg uppercase opacity-60">Professional Interview Prep</p>
                            </div>
                        </div>
                        <Badge variant="success" className="h-6 px-3 text-[10px] font-black uppercase tracking-widest border-none">Exceptional</Badge>
                    </div>
                    
                    <div className="p-8 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-muted-fg">
                                <span>Phonetic Accuracy</span>
                                <span className="text-primary">92%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                <div className="h-full bg-primary w-[92%] shadow-[0_0_10px_rgba(15,111,255,0.5)]" />
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <Card padding="md" className="bg-muted/30 border-border/40 text-center">
                                <div className="flex justify-center mb-2"><TrendingUp size={16} className="text-success" /></div>
                                <p className="text-xs font-black uppercase tracking-tighter">Filler Reduction</p>
                                <p className="text-lg font-black text-success">-14%</p>
                            </Card>
                            <Card padding="md" className="bg-muted/30 border-border/40 text-center">
                                <div className="flex justify-center mb-2"><Eye size={16} className="text-primary" /></div>
                                <p className="text-xs font-black uppercase tracking-tighter">Eye Engagement</p>
                                <p className="text-lg font-black text-primary">High</p>
                            </Card>
                        </div>

                        <div className="p-5 bg-primary/[0.03] rounded-2xl border border-primary/10 relative group-hover:translate-y-[-2px] transition-transform">
                            <div className="flex items-center gap-3 mb-2">
                                <Sparkles size={14} className="text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">AI Recommendation</span>
                            </div>
                            <p className="text-xs text-muted-fg leading-relaxed font-medium">
                                "The aspirated <span className="text-foreground font-bold italic">/p/</span> sound in 'Professional' needs 20ms more explosive force for native resonance."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-20 border-y border-border/40 bg-muted/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-muted-fg/60 mb-12">Empowering talent at global institutions</p>
            <div className="flex flex-wrap justify-center gap-x-12 lg:gap-x-24 gap-y-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Globe size={24} /> GLOBAL TECH</div>
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Zap size={24} /> NIMBUS CORP</div>
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><Star size={24} /> APEX SYSTEMS</div>
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter"><ShieldCheck size={24} /> SECURE LOGIC</div>
            </div>
        </div>
      </section>

      {/* Core Methodology / Features */}
      <section id="features" className="py-24 lg:py-40 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                <Badge variant="secondary" className="bg-muted/50 border-none font-black text-[10px] tracking-[0.2em] px-4 py-1.5 h-7">ECOSYSTEM OVERVIEW</Badge>
                <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-none">Complete 360° Polishing.</h2>
                <p className="text-muted-fg font-medium text-lg leading-relaxed pt-2">Beyond grammar. We analyze the subconscious layers of communication.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Acoustic Mastery', desc: 'Deep phoneme level analysis using spectral graphing to match native intonations.', icon: Mic, color: 'text-primary', bg: 'bg-primary/5' },
                  { title: 'Conversation Sim', icon: Users, desc: 'High-stakes interaction scenarios with branching AI response logic.', color: 'text-accent', bg: 'bg-accent/5' },
                  { title: 'Kinesics Tracking', icon: Video, desc: 'Video-based body language analysis focusing on professional presence.', color: 'text-success', bg: 'bg-success/5' },
                ].map((feat) => (
                  <Card key={feat.title} padding="none" className="overflow-hidden group hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 bg-card/30">
                    <div className="p-8 space-y-6">
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:rotate-6", feat.bg)}>
                            <feat.icon size={28} className={feat.color} />
                        </div>
                        <div className="space-y-3">
                            <h3 className="text-xl font-black tracking-tight">{feat.title}</h3>
                            <p className="text-sm text-muted-fg leading-relaxed font-medium">{feat.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary pt-2 group-hover:gap-4 transition-all">
                            Learn more <ChevronRight size={14} />
                        </div>
                    </div>
                  </Card>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="py-24 lg:py-40 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/[0.02] -z-10" />
        <div className="max-w-4xl mx-auto text-center space-y-10 animate-fade-in relative z-10">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tighter leading-none">
                Ready to find <br />
                <span className="gradient-text">your clear voice?</span>
            </h2>
            <p className="text-lg text-muted-fg font-medium max-w-xl mx-auto leading-relaxed">
                Join 40,000+ professionals who have transformed their communication impact with ClarityQuest.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/signup">
                    <Button size="lg" className="rounded-2xl h-16 px-12 font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-primary/30">Start Free Trial</Button>
                </Link>
                <Link href="/contact">
                    <Button variant="ghost" size="lg" className="rounded-2xl h-16 px-8 font-black uppercase tracking-[0.2em] text-sm border border-border/50">Schedule Demo</Button>
                </Link>
            </div>
            
            <div className="pt-10 flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-fg/40">
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> No credit card</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Personalized roadmap</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} /> Cancel anytime</span>
            </div>
        </div>
      </section>
      
      {/* Mini Footer */}
      <footer className="py-12 border-t border-border/40 px-6 lg:px-12 bg-card/10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center text-white text-xs font-black">CQ</div>
                <span className="font-black text-lg tracking-tight">ClarityQuest</span>
            </div>
            <p className="text-[10px] font-bold text-muted-fg uppercase tracking-widest">&copy; 2026 ClarityQuest Inc. All rights reserved.</p>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-muted-fg">
                <Link href="/privacy" className="hover:text-primary">Privacy</Link>
                <Link href="/terms" className="hover:text-primary">Terms</Link>
                <Link href="/security" className="hover:text-primary">Security</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}
