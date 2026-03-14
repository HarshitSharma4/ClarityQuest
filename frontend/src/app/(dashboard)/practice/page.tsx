'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Mic, Play, Volume2, RotateCcw, CheckCircle2, Flame, ArrowRight, SkipForward, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const drills = [
  { target: 'Very valuable advice for everyone.', focus: '/v/', difficulty: 'medium' },
  { target: 'I have worked on various projects.', focus: '/v/ vs /w/', difficulty: 'hard' },
  { target: 'The weather was wonderful yesterday.', focus: '/w/', difficulty: 'easy' },
  { target: 'We should invest in innovative solutions.', focus: '/v/', difficulty: 'hard' },
  { target: 'Every volunteer contributed valuable time.', focus: '/v/', difficulty: 'medium' },
];

export default function PracticePage() {
  const [currentDrill, setCurrentDrill] = useState(0);
  const [reps, setReps] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [mounted, setMounted] = useState(false);
  const maxReps = 5;
  const drill = drills[currentDrill];

  useEffect(() => setMounted(true), []);

  const handleRecord = () => {
    setIsRecording(true);
    setShowResult(false);
    setTimeout(() => {
      setIsRecording(false);
      setShowResult(true);
      setReps((p) => Math.min(p + 1, maxReps));
    }, 2500);
  };

  const nextDrill = () => {
    setCurrentDrill((p) => (p + 1) % drills.length);
    setReps(0);
    setShowResult(false);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Acoustic Drills</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Build muscle memory through targeted repetition. Clarity over speed.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-2xl border border-border/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Session Reps</p>
          <div className="flex gap-1.5">
            {Array.from({ length: maxReps }).map((_, i) => (
              <div key={i} className={cn(
                "w-3.5 h-3.5 rounded-full border border-black/5 dark:border-white/10 transition-all duration-500",
                i < reps ? "bg-accent scale-110 shadow-[0_0_8px_rgba(245,158,11,0.5)]" : "bg-muted/50"
              )} />
            ))}
          </div>
        </div>
      </div>

      {/* Main Practice Stage */}
      <Card padding="none" premium className="overflow-hidden bg-gradient-to-b from-card to-muted/5">
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-primary/10 rounded-lg text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">
                Focus: {drill.focus}
              </div>
              <Badge variant={drill.difficulty === 'hard' ? 'danger' : drill.difficulty === 'medium' ? 'warning' : 'success'} className="text-[9px] h-6 px-2 font-black uppercase border-none">
                {drill.difficulty}
              </Badge>
            </div>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <Info size={18} />
            </button>
          </div>

          <div className="text-center py-10 px-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Repeat after the model</p>
            <h2 className="text-3xl font-bold tracking-tight leading-tight max-w-2xl mx-auto italic text-foreground/90 font-serif">
              &quot;{drill.target}&quot;
            </h2>
          </div>

          <div className="flex justify-center items-center gap-8">
            <div className="flex flex-col items-center gap-3">
              <button 
                className="w-20 h-20 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-muted transition-all active:scale-95 group relative overflow-hidden cursor-pointer"
                title="Listen to model"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Volume2 size={32} className="text-accent group-hover:scale-110 transition-transform" />
              </button>
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Model</span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleRecord}
                disabled={isRecording}
                className={cn(
                  'w-32 h-32 rounded-[2rem] flex items-center justify-center transition-all duration-500 premium-shadow group relative overflow-hidden cursor-pointer',
                  isRecording 
                    ? 'bg-destructive animate-recording-pulse scale-105' 
                    : 'bg-primary hover:bg-primary/90 hover:-translate-y-1 active:scale-95'
                )}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isRecording ? <div className="w-8 h-8 bg-white rounded-sm" /> : <Mic size={48} className="text-white" />}
              </button>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-colors",
                isRecording ? "text-destructive animate-pulse" : "text-primary"
              )}>
                {isRecording ? 'Listening' : 'Tap to Record'}
              </span>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button 
                className={cn(
                  "w-20 h-20 rounded-2xl flex items-center justify-center transition-all bg-muted/30 border border-border/30 group relative overflow-hidden",
                  showResult ? "hover:bg-muted cursor-pointer" : "opacity-30 cursor-not-allowed"
                )}
                disabled={!showResult}
              >
                <Play size={32} className="text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
              <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verify</span>
            </div>
          </div>

          {/* Visualization Layer */}
          <div className="min-h-[140px] flex flex-col justify-center">
            {showResult ? (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Native Rhythm</p>
                    <div className="flex items-end gap-1 h-12 bg-muted/20 rounded-xl p-2 px-3 overflow-hidden border border-border/30 opacity-50">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-1 bg-accent/60 rounded-full" style={{ height: `${30 + Math.sin(i * 0.45) * 40 + 30}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest ml-1">Your Rhythm</p>
                    <div className="flex items-end gap-1 h-12 bg-primary/5 rounded-xl p-2 px-3 overflow-hidden border border-primary/10">
                      {Array.from({ length: 50 }).map((_, i) => (
                        <div key={i} className="w-1 bg-primary/80 rounded-full" style={{ height: `${20 + ((i * 13) % 80)}%` }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-success/5 rounded-2xl border border-success/20 animate-slide-up">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0 text-success">
                    <CheckCircle2 size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-success uppercase tracking-wider">Strong Attempt</p>
                      <span className="text-lg font-black text-success tracking-tight">74/100</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">Your intonation is matching well. Focus slightly more on the <span className="text-foreground font-bold italic">/v/</span> sound in &quot;valuable&quot;.</p>
                  </div>
                </div>
              </div>
            ) : isRecording ? (
              <div className="flex items-center justify-center gap-1.5 h-20 px-8">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-destructive rounded-full"
                    style={{
                      height: `${20 + ((i * 7) % 70)}%`,
                      animation: `recording-wave 1s ease-in-out infinite`,
                      animationDelay: `${i * 0.02}s`
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 opacity-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em]">Waveform feedback will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Controls */}
        <div className="border-t border-border/50 bg-muted/10 p-5 flex items-center justify-between">
          <Button variant="ghost" onClick={() => { setReps(0); setShowResult(false); }} icon={<RotateCcw size={14} />} className="text-xs uppercase font-bold tracking-widest">Reset Progress</Button>
          <div className="flex gap-3">
            <Button variant="outline" className="h-10 px-6 rounded-xl text-xs font-bold uppercase tracking-wider" icon={<SkipForward size={14} />}>Skip</Button>
            <Button 
              onClick={nextDrill} 
              icon={<ArrowRight size={16} />} 
              iconPosition="right" 
              className="h-10 px-8 rounded-xl text-xs font-bold uppercase tracking-wider"
              disabled={reps < 1}
            >
              Continue Practice
            </Button>
          </div>
        </div>
      </Card>

      {/* Drill Library Sidebar/Bottom */}
      <Card padding="none" className="overflow-hidden border-border/30">
        <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card/50 backdrop-blur-md">
          <h3 className="font-bold text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
            <Flame size={14} className="text-accent" /> Available Exercises
          </h3>
          <span className="text-[10px] font-black text-muted-foreground pr-2">{drills.length} Drills Total</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-1 divide-y divide-border/30">
          {drills.map((d, i) => (
            <button
              key={i}
              onClick={() => { setCurrentDrill(i); setReps(0); setShowResult(false); }}
              className={cn(
                'w-full flex items-center gap-4 px-5 py-4 text-left transition-all group cursor-pointer',
                i === currentDrill ? 'bg-primary/5' : 'hover:bg-muted/30'
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] transition-all",
                i === currentDrill ? "bg-primary text-white scale-110" : "bg-muted/50 text-muted-foreground"
              )}>
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "text-xs leading-tight mb-1 transition-colors",
                  i === currentDrill ? "font-bold text-foreground" : "font-medium text-muted-foreground group-hover:text-foreground"
                )}>{d.target}</p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-black uppercase text-muted-foreground/60 tracking-tighter">Phoneme: {d.focus}</span>
                </div>
              </div>
              <Badge variant={d.difficulty as any} className="text-[8px] h-4 py-0 uppercase border-none opacity-40 group-hover:opacity-100 transition-opacity">
                {d.difficulty}
              </Badge>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
