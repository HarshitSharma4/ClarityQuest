'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Video, Upload, Eye, Hand, Smile, AlertTriangle, Shield, Lightbulb, Mic, ChevronRight, Play, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NonVerbalPage() {
  const [hasVideo, setHasVideo] = useState(false);
  const [consent, setConsent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Kinesics Analysis</h1>
        <p className="text-muted-foreground text-sm">
          Optimize your presence through AI-powered body language and gesture tracking.
        </p>
      </div>

      {/* Privacy Consent */}
      {!consent && (
        <Card padding="none" className="border-warning/30 bg-warning/[0.02] overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch">
            <div className="md:w-1 bg-warning" />
            <div className="p-8 flex items-start gap-5">
              <div className="w-12 h-12 rounded-2xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                <Shield size={24} className="text-warning" />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">Privacy & Data Sovereignty</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Video analysis requires momentary access to your camera feed. Your biometric data is encrypted, processed in real-time, and can be configured for automatic purging after session completion.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    onClick={() => setConsent(true)}
                    className="rounded-xl px-8 h-12 font-black uppercase tracking-widest text-xs"
                  >
                    Accept & Initialize
                  </Button>
                  <Button variant="ghost" size="lg" className="rounded-xl px-6 h-12 font-bold text-xs uppercase tracking-widest text-muted-foreground">Detailed Policy</Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {consent && !hasVideo && (
        <Card padding="none" premium className="overflow-hidden bg-gradient-to-b from-card to-muted/5">
          <div className="flex flex-col items-center py-20 px-8 text-center space-y-8">
            <div className="relative">
                <div className="w-24 h-24 rounded-[2rem] bg-primary/10 border border-primary/20 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Video size={40} className="text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-lg flex items-center justify-center text-white border-2 border-background shadow-xl scale-110">
                    <Sparkles size={12} />
                </div>
            </div>
            
            <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">Virtual Presence Studio</h3>
                <p className="text-sm text-muted-foreground font-medium max-w-md mx-auto leading-relaxed">
                  Record a short introductory clip to analyze eye positioning, hand movements, and shoulder alignment.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                icon={<Mic size={18} />} 
                onClick={() => setHasVideo(true)}
                className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-sm shadow-xl shadow-primary/10"
              >
                Launch Recorder
              </Button>
              <Button 
                variant="secondary" 
                size="lg"
                icon={<Upload size={18} />} 
                onClick={() => setHasVideo(true)}
                className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-sm"
              >
                Upload Footage
              </Button>
            </div>
            
            <div className="flex items-center gap-6 pt-6 opacity-40">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Eye size={14} /> Eye Tracking</div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Hand size={14} /> Gesture Density</div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><Smile size={14} /> Micro-expessions</div>
            </div>
          </div>
        </Card>
      )}

      {consent && hasVideo && (
        <div className="space-y-8 animate-fade-in">
          {/* Main Visualizer */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card padding="none" className="overflow-hidden border-border/50 bg-black/90 group relative shadow-2xl rounded-[2rem]">
                <div className="w-full aspect-video flex items-center justify-center relative">
                  {/* Decorative Scanlines */}
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />
                  
                  <div className="text-center z-10 transition-opacity group-hover:opacity-100">
                    <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                        <Play size={32} className="text-white fill-white ml-1" />
                    </div>
                    <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Playback Active Coverage</p>
                  </div>

                  {/* Smart HUD Overlays */}
                  <div className="absolute top-6 right-6 flex flex-col items-end gap-3 z-20">
                    <div className="bg-success/20 backdrop-blur-xl border border-success/30 text-success text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      Eye contact: 78%
                    </div>
                    <div className="bg-warning/20 backdrop-blur-xl border border-warning/30 text-warning text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl">
                      <div className="w-2 h-2 rounded-full bg-warning" />
                      Gestures: Fluid
                    </div>
                    <div className="bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl flex items-center gap-3 shadow-xl">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      Posture: Aligned
                    </div>
                  </div>

                  {/* Bottom Scan Trace */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
                </div>
                
                <div className="p-6 bg-card flex items-center justify-between border-t border-border/50">
                    <div className="flex items-center gap-4">
                        <button className="text-primary hover:scale-110 transition-transform"><RotateCcw size={20} /></button>
                        <div className="h-1.5 w-48 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-2/3" />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">00:42 / 01:10</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase tracking-widest h-8 px-4 rounded-lg border border-border/50">Switch Angles</Button>
                </div>
              </Card>
            </div>

            {/* Metrics Sidebar */}
            <div className="space-y-4 flex flex-col">
              {[
                { label: 'Eye Orientation', val: 78, icon: Eye, color: 'text-success', bg: 'bg-success/5', border: 'border-success/20', note: 'Consistent engagement' },
                { label: 'Manual Punctuation', val: 55, icon: Hand, color: 'text-warning', bg: 'bg-warning/5', border: 'border-warning/20', note: 'Expand hand usage' },
                { label: 'Torso Alignment', val: 82, icon: Smile, color: 'text-primary', bg: 'bg-primary/5', border: 'border-primary/20', note: 'Great verticality' },
              ].map((m) => (
                <Card key={m.label} padding="lg" className={cn("flex-1 bg-card/50 backdrop-blur-sm transition-all hover:bg-card border-border/30", m.border)}>
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", m.bg)}>
                        <m.icon size={20} className={m.color} />
                    </div>
                    <span className={cn("text-xl font-black tracking-tighter", m.color)}>{m.val}%</span>
                  </div>
                  <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2">{m.label}</p>
                  <ProgressBar value={m.val} size="sm" className="mb-3" />
                  <p className="text-[10px] font-bold text-muted-foreground leading-relaxed italic opacity-80">{m.note}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Actionable Feedback */}
            <Card padding="none" className="overflow-hidden bg-card/40 backdrop-blur-md border-border/40">
              <div className="p-4 bg-muted/40 border-b border-border/50 flex items-center gap-2">
                <Lightbulb size={16} className="text-warning" />
                <h3 className="font-black text-[10px] uppercase tracking-widest">Growth Recommendations</h3>
              </div>
              <div className="p-6 space-y-4">
                {[
                  'Position optics at horizontal eye level to simulate mutual proximity.',
                  'Leverage palmar exposure to project authenticity during key assertions.',
                  'Neutralize spinal curvature; maintain 90-degree femoral alignment.',
                  'Incorporate subtle facial activation (Duchenne smile) during greetings.',
                ].map((tip, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-[10px] font-black text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground font-medium group-hover:text-foreground transition-all self-center">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Privacy Confirmation */}
            <Card padding="lg" className="bg-primary/[0.02] border-primary/20 flex flex-col justify-center items-center text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                    <CheckCircle2 size={32} />
                </div>
                <div className="space-y-2">
                    <h3 className="font-bold tracking-tight">Analysis Complete</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
                        High-fidelity kinesics report is now synchronized with your progress tracker.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4 w-full pt-4 border-t border-border/30">
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        <Shield size={14} className="text-muted-foreground/40" /> Automatic self-destruct in 24h
                    </div>
                    <Button variant="outline" className="w-full rounded-xl h-10 text-[10px] font-black uppercase tracking-widest">Purge Data Now</Button>
                </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
