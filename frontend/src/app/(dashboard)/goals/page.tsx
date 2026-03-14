'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { cn } from '@/lib/utils';
import {
  Target,
  Briefcase,
  Presentation,
  MessageSquare,
  Users,
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Clock,
} from 'lucide-react';

const goals = [
  { id: 'campus', label: 'Campus Interviews', icon: Users, desc: 'Prepare for college placement interviews' },
  { id: 'tech', label: 'Technical Interview', icon: Briefcase, desc: 'System design, coding rounds, HR rounds' },
  { id: 'presentation', label: 'Presentations', icon: Presentation, desc: 'Deliver confident, clear presentations' },
  { id: 'conversation', label: 'Everyday Conversation', icon: MessageSquare, desc: 'Improve daily English communication' },
];

const timelines = [
  { value: '6w', label: '6 Weeks', desc: 'Intensive' },
  { value: '3m', label: '3 Months', desc: 'Standard' },
  { value: 'custom', label: 'Custom', desc: 'Set your own' },
];

export default function GoalsPage() {
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState('3m');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDone, setRecordingDone] = useState(false);
  const [timer, setTimer] = useState(0);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const startRecording = () => {
    setIsRecording(true);
    setRecordingDone(false);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setIsRecording(false);
          setRecordingDone(true);
          return 90;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const steps = ['Choose Goals', 'Set Timeline', 'Diagnostic'];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Set Up Your Goals</h1>
        <p className="text-muted text-sm mt-1">
          Don&apos;t worry about mistakes — this helps us customize your plan.
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3">
        {steps.map((s, i) => (
          <React.Fragment key={s}>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < step ? 'bg-accent text-white' : i === step ? 'bg-primary text-white' : 'bg-surface text-muted'
              }`}>
                {i < step ? <CheckCircle2 size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === step ? 'text-foreground' : 'text-muted'}`}>{s}</span>
            </div>
            {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-surface rounded-full"><div className={`h-full rounded-full bg-primary transition-all duration-500`} style={{ width: i < step ? '100%' : '0%' }} /></div>}
          </React.Fragment>
        ))}
      </div>

      {/* Step 0: Goals */}
      {step === 0 && (
        <Card padding="lg">
          <h2 className="font-semibold text-lg mb-1">What are you preparing for?</h2>
          <p className="text-sm text-muted mb-5">Select one or more goals</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {goals.map((g) => (
              <button
                key={g.id}
                onClick={() => toggleGoal(g.id)}
                className={cn(
                  'flex items-start gap-4 p-5 rounded-2xl border text-left transition-all cursor-pointer group',
                  selectedGoals.includes(g.id)
                    ? 'border-primary bg-primary/5 premium-shadow'
                    : 'border-border/50 bg-muted/30 hover:border-primary/30'
                )}
              >
                <div className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                  selectedGoals.includes(g.id) ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground group-hover:text-primary'
                )}>
                  <g.icon size={22} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm mb-1">{g.label}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{g.desc}</p>
                </div>
                {selectedGoals.includes(g.id) && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white scale-110">
                    <CheckCircle2 size={12} />
                  </div>
                )}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-6">
            <Button
              disabled={selectedGoals.length === 0}
              onClick={() => setStep(1)}
              icon={<ArrowRight size={16} />}
            >
              Next
            </Button>
          </div>
        </Card>
      )}

      {/* Step 1: Timeline */}
      {step === 1 && (
        <Card padding="lg">
          <h2 className="font-semibold text-lg mb-1">Set your timeline</h2>
          <p className="text-sm text-muted mb-5">How much time do you have to prepare?</p>
          <div className="grid grid-cols-3 gap-3">
            {timelines.map((t) => (
              <button
                key={t.value}
                onClick={() => setSelectedTimeline(t.value)}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                  selectedTimeline === t.value
                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <Clock size={20} className={`mx-auto mb-2 ${selectedTimeline === t.value ? 'text-primary' : 'text-muted'}`} />
                <p className="font-semibold text-sm">{t.label}</p>
                <p className="text-xs text-muted">{t.desc}</p>
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            <Button variant="ghost" onClick={() => setStep(0)} icon={<ArrowLeft size={16} />}>Back</Button>
            <Button onClick={() => setStep(2)} icon={<ArrowRight size={16} />}>Next</Button>
          </div>
        </Card>
      )}

      {/* Step 2: Diagnostic */}
      {step === 2 && (
        <Card padding="lg">
          <h2 className="font-semibold text-lg mb-1">Quick Diagnostic</h2>
          <p className="text-sm text-muted mb-5">
            Record a 60–90 second introduction. Speak naturally about your background and goals.
          </p>

          {/* Recorder */}
          <div className="flex flex-col items-center py-8">
            {!recordingDone ? (
              <>
                <div className="relative mb-6">
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-danger/20 animate-ping" />
                  )}
                  <button
                    onClick={isRecording ? () => { setIsRecording(false); setRecordingDone(true); } : startRecording}
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isRecording ? 'bg-danger text-white animate-recording-pulse' : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                  >
                    <Mic size={32} />
                  </button>
                </div>
                <p className="text-lg font-mono font-semibold mb-2">
                  {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </p>
                <p className="text-sm text-muted">
                  {isRecording ? 'Recording... Speak naturally.' : 'Tap to start recording'}
                </p>
                {/* Waveform Placeholder */}
                  <div className="flex items-center gap-1.5 mt-8 h-16">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-primary rounded-full animate-wave"
                        style={{
                          height: `${20 + ((i * 17) % 80)}%`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    ))}
                  </div>
              </>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 size={36} className="text-success" />
                </div>
                <p className="font-semibold mb-1">Recording complete!</p>
                <p className="text-sm text-muted mb-6">We&apos;ll analyze this to build your personalized plan.</p>

                {/* Baseline Preview */}
                <div className="w-full bg-surface rounded-xl p-4 space-y-3">
                  <p className="text-xs font-semibold text-muted uppercase">Estimated Baseline</p>
                  {[
                    { label: 'Pronunciation', score: 55 },
                    { label: 'Fluency', score: 60 },
                    { label: 'Grammar', score: 65 },
                  ].map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs">{s.label}</span>
                        <span className="text-xs font-semibold">{s.score}/100</span>
                      </div>
                      <ProgressBar value={s.score} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <Button variant="ghost" onClick={() => { setStep(1); setRecordingDone(false); setTimer(0); }} icon={<ArrowLeft size={16} />}>Back</Button>
            <Button
              disabled={!recordingDone}
              onClick={() => window.location.href = '/dashboard'}
              icon={<ArrowRight size={16} />}
            >
              Complete Setup
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
