'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, ScoreBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockResult } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Download,
  Share2,
  ChevronDown,
  ChevronUp,
  Mic,
  Lightbulb,
  AlertTriangle,
  BookOpen,
  BarChart3,
  MessageSquare,
  Wand2,
} from 'lucide-react';

const Section = ({ 
  id, 
  title, 
  icon, 
  isOpen, 
  onToggle, 
  children 
}: { 
  id: string; 
  title: string; 
  icon: React.ReactNode; 
  isOpen: boolean; 
  onToggle: (id: string) => void; 
  children: React.ReactNode 
}) => {
  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden bg-card/30 backdrop-blur-sm transition-all duration-300">
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between p-5 hover:bg-muted/50 transition-colors cursor-pointer group"
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-sm",
            isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          )}>
            {icon}
          </div>
          <span className="font-bold text-sm tracking-tight">{title}</span>
        </div>
        {isOpen ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
      </button>
      {isOpen && (
        <div className="px-5 pb-6 border-t border-border/50 pt-6 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

export default function ResultPage() {
  const r = mockResult;
  const [expandedSections, setExpandedSections] = useState<string[]>(['transcript', 'pronunciation']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/history" className="p-2 rounded-xl hover:bg-muted transition-all text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">Analysis Result</h1>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Interview intro practice · 7 Mar 2026</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Share2 size={14} />}>Share</Button>
          <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export PDF</Button>
        </div>
      </div>

      {/* Top Summary */}
      <Card padding="lg" premium className="bg-gradient-to-br from-card to-muted/10 border-primary/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
          <ScoreBadge score={r.overallScore} size="lg" />
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              {Object.entries(r.subscores).map(([key, val]) => (
                <div key={key} className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{key}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold">{val}</span>
                    <ProgressBar value={val} size="sm" className="flex-1" />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10 flex items-start gap-3">
              <Lightbulb size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Coach Note</p>
                <p className="text-sm leading-relaxed text-foreground/80 italic">&quot;{r.coachNote}&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Expandable Sections */}
      <div className="space-y-4">
        {/* Transcript */}
        <Section 
          id="transcript" 
          title="Transcript Analysis" 
          icon={<MessageSquare size={18} />} 
          isOpen={expandedSections.includes('transcript')}
          onToggle={toggleSection}
        >
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-1">Original Transcript & Issues</p>
              <div className="bg-muted/20 border border-border/50 rounded-2xl p-5 text-sm leading-relaxed flex flex-wrap gap-2">
                {r.transcript.split(' ').map((word, i) => {
                  const cleanWord = word.toLowerCase().replace(/[.,]/g, '');
                  const issue = r.pronunciationIssues.find(p => p.word.toLowerCase() === cleanWord);
                  const isGrammar = r.grammarErrors.some(g => g.original.toLowerCase().includes(cleanWord));
                  
                  return (
                    <span
                      key={i}
                      className={cn(
                        "px-1.5 py-0.5 rounded-md transition-all cursor-help relative group",
                        issue ? "bg-destructive/10 text-destructive border-b-2 border-destructive/40 font-semibold" : 
                        isGrammar ? "bg-warning/10 text-warning border-b-2 border-warning/40" : "text-foreground/80 hover:text-foreground hover:bg-muted/50"
                      )}
                      title={issue?.tip}
                    >
                      {word}
                      {(issue || isGrammar) && (
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border text-xs rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none premium-shadow border-primary/20">
                          <span className="text-muted-foreground block mb-1">{issue ? 'Pronunciation Tip:' : 'Grammar Note:'}</span>
                          <span className={cn("font-bold", issue ? "text-destructive" : "text-warning")}>
                            {issue ? `${issue.phoneme} → ${issue.correctPhoneme}` : 'Needs correction'}
                          </span>
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-1 text-success">Recommended Rephrasing</p>
              <div className="bg-success/5 rounded-2xl p-5 text-sm leading-relaxed border border-success/10 text-foreground/90 italic font-medium">
                &quot;{r.correctedTranscript}&quot;
              </div>
            </div>
          </div>
        </Section>

        {/* Pronunciation */}
        <Section 
          id="pronunciation" 
          title="Pronunciation Breakdown" 
          icon={<BarChart3 size={18} />} 
          isOpen={expandedSections.includes('pronunciation')}
          onToggle={toggleSection}
        >
          <div className="space-y-6">
            <div className="bg-muted/20 border border-border/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phoneme Accuracy Waveform</p>
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary/40 rounded-sm" /> High Confidence</div>
                  <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-destructive/60 rounded-sm" /> Issue Detected</div>
                </div>
              </div>
              <div className="flex items-end gap-1 h-20 px-2">
                {Array.from({ length: 80 }).map((_, i) => {
                  const isIssue = i > 30 && i < 40;
                  return (
                    <div
                      key={i}
                      className={cn(
                        "w-full rounded-full transition-all duration-500", 
                        isIssue ? "bg-destructive/60" : "bg-primary/30"
                      )}
                      style={{ height: `${20 + ((i * 17) % 80)}%` }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Specific Word Improvements</p>
              {r.pronunciationIssues.map((issue, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-card/50 border border-border/30 hover:border-primary/30 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive group-hover:text-white transition-all">
                    <AlertTriangle size={20} className="text-destructive transition-colors group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-sm tracking-tight">&quot;{issue.word}&quot;</span>
                      <Badge variant="danger" className="text-[9px] uppercase font-bold py-0">{issue.phoneme} → {issue.correctPhoneme}</Badge>
                      <span className="text-[10px] text-muted-foreground font-bold ml-auto uppercase tracking-tighter">Score: {issue.score}</span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium">{issue.tip}</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-wider">Practice Word</Button>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Fluency */}
        <Section 
          id="fluency" 
          title="Fluency & Pacing" 
          icon={<BarChart3 size={18} />} 
          isOpen={expandedSections.includes('fluency')}
          onToggle={toggleSection}
        >
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card padding="md" className="text-center bg-muted/20 border-none">
              <p className="text-3xl font-black tracking-tighter mb-1">{r.fluencyMetrics.wpm}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Words Per Minute</p>
              <div className="mt-3 inline-flex items-center px-2 py-0.5 rounded bg-primary/10 text-[9px] font-bold text-primary">
                Ideal: {r.fluencyMetrics.idealRange[0]}–{r.fluencyMetrics.idealRange[1]}
              </div>
            </Card>
            <Card padding="md" className="text-center bg-muted/20 border-none">
              <p className="text-3xl font-black tracking-tighter mb-1 text-warning">{r.fluencyMetrics.fillerCount}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Filler Words Used</p>
            </Card>
            <Card padding="md" className="text-center bg-muted/20 border-none">
              <p className="text-3xl font-black tracking-tighter mb-1">{r.fluencyMetrics.smoothnessIndex}</p>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Smoothness Index</p>
            </Card>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 ml-1">Filler Word Examples</p>
            <div className="flex flex-wrap gap-2">
              {r.fluencyMetrics.fillerExamples.map((f, i) => (
                <Badge key={i} variant="warning" className="px-3 py-1.5 h-auto rounded-lg text-xs font-bold bg-warning/5 border-warning/20">
                  <Mic size={12} className="mr-2" /> &quot;{f}&quot;
                </Badge>
              ))}
            </div>
          </div>
        </Section>

        {/* Grammar */}
        <Section 
          id="grammar" 
          title="Grammatical Excellence" 
          icon={<BookOpen size={18} />} 
          isOpen={expandedSections.includes('grammar')}
          onToggle={toggleSection}
        >
          <div className="space-y-4">
            {r.grammarErrors.map((err, i) => (
              <div key={i} className="rounded-2xl border border-border/50 overflow-hidden bg-card/30">
                <div className="grid sm:grid-cols-2">
                  <div className="p-5 bg-destructive/[0.03] border-b sm:border-b-0 sm:border-r border-border/50">
                    <p className="text-[10px] font-bold text-destructive uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-destructive/10 rounded-md flex items-center justify-center text-[10px]">✕</span>
                      As Spoken ({err.type})
                    </p>
                    <p className="text-sm font-medium text-muted-foreground line-through decoration-destructive/50 leading-relaxed italic">&quot;{err.original}&quot;</p>
                  </div>
                  <div className="p-5 bg-success/[0.03]">
                    <p className="text-[10px] font-bold text-success uppercase tracking-widest mb-3 flex items-center gap-2">
                      <span className="w-5 h-5 bg-success/10 rounded-md flex items-center justify-center text-[10px]">✓</span>
                      Recommended
                    </p>
                    <p className="text-sm font-bold text-foreground leading-relaxed">&quot;{err.corrected}&quot;</p>
                  </div>
                </div>
                <div className="p-4 bg-muted/20 border-t border-border/50 flex items-start gap-3">
                  <Lightbulb size={16} className="text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    <span className="text-foreground font-bold">Why: </span>{err.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Tone */}
        <Section 
          id="tone" 
          title="Vocal Variety & Tone" 
          icon={<Wand2 size={18} />} 
          isOpen={expandedSections.includes('tone')}
          onToggle={toggleSection}
        >
          <div className="mb-8 p-6 bg-muted/20 rounded-2xl border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Monotone Index (Lower is Better)</span>
              <span className="text-lg font-black tracking-tight">{r.toneAnalysis.monotoneIndex}%</span>
            </div>
            <ProgressBar value={100 - r.toneAnalysis.monotoneIndex} className="h-3" />
            <p className="text-[10px] text-muted-foreground font-medium mt-3 italic">
              Vocal pitch variety is key for engagement. Aim for below 30% for high-stakes presentations.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Suggestions from Coach</p>
            {r.toneAnalysis.suggestions.map((s, i) => (
              <div key={i} className="flex gap-4 p-4 bg-card/50 rounded-2xl border border-border/30">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                  <Lightbulb size={18} />
                </div>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed self-center">{s}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Action Plan */}
        <Section 
          id="actions" 
          title="Personalized Daily Plan" 
          icon={<Lightbulb size={18} />} 
          isOpen={expandedSections.includes('actions')}
          onToggle={toggleSection}
        >
          <div className="space-y-3">
            {r.actionPlan.map((action, i) => (
              <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all premium-shadow group">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110",
                  action.type === 'daily' ? 'bg-primary/10 text-primary' : action.type === 'drill' ? 'bg-accent/10 text-accent' : 'bg-warning/10 text-warning'
                )}>
                  {action.type === 'daily' ? <Mic size={22} /> : action.type === 'drill' ? <BarChart3 size={22} /> : <BookOpen size={22} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-bold text-sm tracking-tight">{action.title}</p>
                    <Badge variant="secondary" className="text-[8px] uppercase tracking-tighter py-0 h-4 border-none bg-muted/50">{action.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{action.description}</p>
                  <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-2">{action.duration} Minute Workout</p>
                </div>
                <Link href="/practice">
                  <Button size="sm" className="h-9 px-4 rounded-lg text-xs font-bold uppercase tracking-wider">Start</Button>
                </Link>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
