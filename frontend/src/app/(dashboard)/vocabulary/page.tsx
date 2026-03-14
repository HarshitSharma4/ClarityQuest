'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockVocabulary } from '@/lib/mock-data';
import { Volume2, Plus, CheckCircle2, BookOpen, Brain, Sparkles, X, ChevronRight, Speaker } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function VocabularyPage() {
  const [words, setWords] = useState(mockVocabulary);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleMastered = (id: string) => {
    setWords((prev) => prev.map((w) => w.id === id ? { ...w, mastered: !w.mastered } : w));
  };

  const masteryProgress = (words.filter(w => w.mastered).length / words.length) * 100;

  if (!mounted) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Lexicon Builder</h1>
          <p className="text-muted-foreground text-sm">
            Curated keywords and phrases to elevate your professional discourse.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end mr-2">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mb-1">Mastery Progress</span>
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-success transition-all duration-1000" style={{ width: `${masteryProgress}%` }} />
            </div>
          </div>
          <Button 
            variant={quizMode ? 'primary' : 'secondary'} 
            size="lg" 
            onClick={() => { setQuizMode(!quizMode); setCurrentQuiz(0); setShowAnswer(false); }} 
            icon={quizMode ? <X size={18} /> : <Brain size={18} />}
            className="rounded-2xl h-12 px-6 font-black uppercase tracking-widest text-xs"
          >
            {quizMode ? 'Exit Training' : 'Smart Quiz'}
          </Button>
        </div>
      </div>

      {quizMode ? (
        <div className="max-w-3xl mx-auto py-10 animate-fade-in">
          <Card padding="none" premium className="overflow-hidden bg-gradient-to-br from-card to-muted/5 border-primary/20 shadow-2xl">
            <div className="p-8 md:p-12 text-center space-y-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-primary">Training Mode</span>
                </div>
                <Badge variant="secondary" className="bg-muted/50 border-none font-black text-xs h-6 px-3">
                  {currentQuiz + 1} / {words.filter(w => !w.mastered).length}
                </Badge>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em]">Recall the meaning</p>
                <div className="py-6">
                    <h2 className="text-5xl font-black tracking-tighter text-foreground mb-4">{words.filter(w => !w.mastered)[currentQuiz]?.word}</h2>
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-muted/50 rounded-2xl border border-border/50 backdrop-blur-sm group cursor-pointer hover:bg-muted transition-colors">
                        <span className="text-sm font-mono text-muted-foreground">{words.filter(w => !w.mastered)[currentQuiz]?.pronunciation}</span>
                        <div className="h-4 w-px bg-border" />
                        <Volume2 size={16} className="text-primary group-hover:scale-110 transition-transform" />
                    </div>
                </div>
              </div>

              <div className="min-h-[160px] flex items-center justify-center">
                {!showAnswer ? (
                  <Button 
                    size="lg" 
                    onClick={() => setShowAnswer(true)} 
                    icon={<Sparkles size={18} />}
                    className="h-16 px-10 rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1"
                  >
                    Reveal Answer
                  </Button>
                ) : (
                  <div className="animate-fade-in space-y-8 w-full max-w-md">
                    <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 text-left relative overflow-hidden group">
                      <div className="absolute -top-4 -right-4 text-primary/10 opacity-20 transition-transform group-hover:scale-110 group-hover:rotate-12">
                          <BookOpen size={120} />
                      </div>
                      <p className="font-bold text-lg mb-4 text-foreground leading-snug">{words.filter(w => !w.mastered)[currentQuiz]?.meaning}</p>
                      <div className="bg-muted/50 p-4 rounded-xl border-l-4 border-primary">
                        <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">&quot;{words.filter(w => !w.mastered)[currentQuiz]?.example}&quot;</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <Button 
                        variant="ghost" 
                        size="lg" 
                        className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs border border-border/50"
                        onClick={() => { setShowAnswer(false); setCurrentQuiz((p) => (p + 1) % words.filter(w => !w.mastered).length); }}
                      >
                        Still Learning
                      </Button>
                      <Button 
                        variant="accent" 
                        size="lg" 
                        className="flex-1 h-14 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-accent/10"
                        onClick={() => {
                            const unmast = words.filter(w => !w.mastered);
                            if (unmast[currentQuiz]) toggleMastered(unmast[currentQuiz].id);
                            setShowAnswer(false);
                            if (unmast.length > 1) {
                                setCurrentQuiz((p) => p % (unmast.length - 1));
                            } else {
                                setQuizMode(false);
                            }
                        }} 
                        icon={<CheckCircle2 size={18} />}
                      >
                        Mastered
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {words.map((word) => (
            <Card key={word.id} padding="none" hover className={cn(
                'overflow-hidden transition-all duration-300 border-border/40 group bg-card/40',
                word.mastered && 'opacity-50 grayscale-[0.5]'
            )}>
              <div className="p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-xl tracking-tighter group-hover:text-primary transition-colors">{word.word}</h3>
                      <button className="p-1.5 rounded-lg hover:bg-muted transition-colors text-primary opacity-0 group-hover:opacity-100 focus:opacity-100">
                        <Volume2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] font-bold text-muted-foreground font-mono uppercase tracking-widest">{word.pronunciation}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={word.difficulty as any} className="text-[8px] h-4 py-0 uppercase font-black border-none bg-muted/50">
                        {word.difficulty}
                    </Badge>
                    <button 
                        onClick={() => toggleMastered(word.id)} 
                        className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer border border-border/50",
                            word.mastered ? "bg-success text-white border-success/20" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                        )}
                    >
                      <CheckCircle2 size={16} className={word.mastered ? 'scale-110' : 'opacity-40'} />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                    <p className="text-sm font-bold text-foreground/80 leading-relaxed">{word.meaning}</p>
                    <div className="bg-muted/30 p-3 rounded-xl border border-border/20 group-hover:bg-muted/50 transition-colors">
                        <p className="text-xs text-muted-foreground font-medium italic">&quot;{word.example}&quot;</p>
                    </div>
                </div>
              </div>
            </Card>
          ))}
          
          <button className="h-full min-h-[220px] rounded-3xl border-2 border-dashed border-border/30 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/[0.02] transition-all group p-6">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <Plus size={32} />
            </div>
            <div className="text-center">
                <p className="font-black text-xs uppercase tracking-widest mb-1">Add Custom Phrase</p>
                <p className="text-[10px] text-muted-foreground font-medium max-w-[140px]">Save interesting words from your reports</p>
            </div>
          </button>
        </div>
      )}

      {/* Mastery Section Footer */}
      {!quizMode && (
        <div className="flex items-center gap-6 p-6 bg-card/30 backdrop-blur-md rounded-3xl border border-border/50">
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center text-success">
                    <CheckCircle2 size={20} />
                </div>
                <div>
                    <p className="text-xl font-black tracking-tight">{words.filter(w => w.mastered).length}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Mastered</p>
                </div>
            </div>
            <div className="h-10 w-px bg-border/50" />
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <BookOpen size={20} />
                </div>
                <div>
                    <p className="text-xl font-black tracking-tight">{words.filter(w => !w.mastered).length}</p>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Remaining</p>
                </div>
            </div>
            <div className="flex-1" />
            <div className="hidden sm:block">
                <Button variant="ghost" className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">Clear Mastery Data</Button>
            </div>
        </div>
      )}
    </div>
  );
}
