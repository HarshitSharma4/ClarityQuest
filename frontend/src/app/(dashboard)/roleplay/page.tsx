'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { mockScenarios } from '@/lib/mock-data';
import { Mic, Send, MessageSquare, Lightbulb, Clock, History, ArrowRight, ChevronLeft, Play, Sparkles, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RoleplayPage() {
  const [activeCategory, setActiveCategory] = useState('HR');
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = mockScenarios.filter((s) => s.category === activeCategory);
  const scenario = mockScenarios.find((s) => s.id === selectedScenario);

  const handleRecord = () => {
    setIsRecording(true);
    setTimeout(() => setIsRecording(false), 3000);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Conversation Simulator</h1>
        <p className="text-muted-foreground text-sm">
          Master high-stakes communication through AI-simulated roleplay.
        </p>
      </div>

      {!selectedScenario ? (
        <div className="space-y-6">
          <Tabs
            tabs={[
              { id: 'HR', label: 'HR Interview', icon: <MessageSquare size={14} /> },
              { id: 'Technical', label: 'Technical Rounds', icon: <Sparkles size={14} /> },
              { id: 'Managerial', label: 'Leadership/Managerial', icon: <Users size={14} /> },
            ]}
            activeTab={activeCategory}
            onTabChange={setActiveCategory}
            className="mb-8"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((s) => (
              <Card key={s.id} hover padding="none" className="overflow-hidden bg-card/40 border-border/40 hover:border-primary/40 group" onClick={() => setSelectedScenario(s.id)}>
                <div className="flex items-start p-6 gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MessageSquare size={24} className="text-primary group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base mb-1.5 tracking-tight group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">{s.description}</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-muted/50 text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                        <Clock size={12} /> ~{s.questions.length * 2} MIN
                      </div>
                      <Badge variant="secondary" className="text-[9px] font-bold py-0 h-4 border-none bg-primary/10 text-primary">
                        {s.questions.length} QUESTIONS
                      </Badge>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : scenario ? (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Card padding="none" premium className="overflow-hidden bg-gradient-to-br from-card to-muted/5 border-primary/10">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-8">
                  <button 
                    onClick={() => { setSelectedScenario(null); setCurrentQ(0); setSubmitted(false); }} 
                    className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest cursor-pointer group"
                  >
                    <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back
                  </button>
                  <div className="px-4 py-1.5 bg-card border border-border/50 rounded-xl shadow-sm flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Question</span>
                    <span className="text-sm font-black text-primary">{currentQ + 1} <span className="text-muted-foreground">/ {scenario.questions.length}</span></span>
                  </div>
                </div>

                {/* Scenario Title Header */}
                <div className="mb-10 text-center">
                  <h2 className="text-2xl font-black tracking-tight mb-2">{scenario.title}</h2>
                  <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                </div>

                {/* Question Area */}
                <div className="bg-muted/30 border border-border/40 rounded-[2rem] p-8 md:p-12 text-center mb-10 relative overflow-hidden group">
                  <div className="absolute top-4 left-6 text-primary/10 pointer-events-none">
                    <Sparkles size={40} />
                  </div>
                  <p className="text-xl md:text-2xl font-bold leading-relaxed text-foreground/90 italic serif italic">
                    &quot;{scenario.questions[currentQ]}&quot;
                  </p>
                </div>

                {/* Interaction Zone */}
                {!submitted ? (
                  <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                      <button
                        onClick={handleRecord}
                        className={cn(
                          'w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 premium-shadow group relative overflow-hidden cursor-pointer z-10',
                          isRecording ? 'bg-destructive animate-recording-pulse scale-110 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'bg-primary hover:bg-primary/90 hover:scale-105 active:scale-95'
                        )}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isRecording ? <div className="w-8 h-8 bg-white rounded-sm" /> : <Mic size={40} className="text-white" />}
                      </button>
                      {isRecording && (
                        <div className="absolute inset-0 rounded-full border-4 border-destructive/20 animate-ping -z-10" />
                      )}
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className={cn(
                        "text-xs font-black uppercase tracking-[0.3em] transition-colors",
                        isRecording ? "text-destructive" : "text-muted-foreground"
                      )}>
                        {isRecording ? 'Capturing Response' : 'Tap to start speaking'}
                      </p>
                      {!isRecording && (
                        <p className="text-[10px] text-muted-foreground font-medium opacity-60">Ideal duration: 45–90 seconds</p>
                      )}
                    </div>

                    <div className="w-full flex justify-center pt-4 border-t border-border/30">
                      <Button 
                        size="lg" 
                        onClick={() => setSubmitted(true)} 
                        icon={<Send size={18} />} 
                        disabled={isRecording}
                        className="rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-sm"
                      >
                        Submit Response
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 space-y-8 animate-fade-in">
                    <div className="w-24 h-24 rounded-full bg-success/10 border border-success/20 flex items-center justify-center mx-auto relative">
                      <div className="absolute inset-0 rounded-full bg-success/5 animate-pulse" />
                      <Send size={40} className="text-success" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl font-black tracking-tight">Response captured!</p>
                        <p className="text-sm text-muted-foreground font-medium">Processing your answer with Clarity AI...</p>
                    </div>
                    
                    <div className="flex gap-4 justify-center pt-6">
                      {currentQ < scenario.questions.length - 1 ? (
                        <Button 
                          size="lg" 
                          onClick={() => { setCurrentQ((p) => p + 1); setSubmitted(false); }} 
                          icon={<ArrowRight size={18} />}
                          iconPosition="right"
                          className="rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-sm"
                        >
                          Next Question
                        </Button>
                      ) : (
                        <Button 
                          size="lg"
                          variant="secondary"
                          onClick={() => { setSelectedScenario(null); setCurrentQ(0); setSubmitted(false); }}
                          className="rounded-2xl px-10 h-14 font-black uppercase tracking-widest text-sm"
                        >
                          Complete Session
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Expert Guidance Sidebar */}
          <div className="space-y-6">
            <Card padding="none" className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/40">
              <div className="p-4 bg-muted/40 border-b border-border/50 flex items-center gap-2">
                <Lightbulb size={16} className="text-warning" />
                <h3 className="font-black text-[10px] uppercase tracking-widest">Expert Tips</h3>
              </div>
              <div className="p-5 space-y-4">
                {scenario.tips.map((tip, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <p className="text-[11px] leading-relaxed text-muted-foreground font-medium group-hover:text-foreground transition-colors">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card padding="none" className="overflow-hidden bg-muted/40 opacity-60">
              <div className="p-4 border-b border-border/50 flex items-center gap-2">
                <History size={16} className="text-muted-foreground" />
                <h3 className="font-black text-[10px] uppercase tracking-widest">Previous Results</h3>
              </div>
              <div className="p-8 text-center text-xs text-muted-foreground font-bold italic">
                No history yet. Completing this session will create your first data point.
              </div>
            </Card>
          </div>
        </div>
      ) : null}
    </div>
  );
}
