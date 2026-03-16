'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Mic,
  Upload,
  Pause,
  Play,
  Square,
  Send,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  Tag,
} from 'lucide-react';
import { api } from '@/lib/api';
import { mockPracticePrompts as fallbackPrompts } from '@/lib/mock-data';

type RecordState = 'idle' | 'recording' | 'paused' | 'preview' | 'uploading' | 'submitted';

export default function RecordPage() {
  const [prompts, setPrompts] = useState<string[]>(fallbackPrompts);
  const [state, setState] = useState<RecordState>('idle');
  const [timer, setTimer] = useState(0);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [tags, setTags] = useState<string[]>(['interview']);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    api.getPrompts().then((data: any) => setPrompts(data)).catch(() => {});
  }, []);

  const waveformData = React.useMemo(() => [
    { height: 45, duration: 0.8 }, { height: 72, duration: 0.6 }, { height: 35, duration: 0.9 }, { height: 88, duration: 0.5 }, { height: 52, duration: 0.7 },
    { height: 61, duration: 0.8 }, { height: 33, duration: 0.6 }, { height: 77, duration: 0.9 }, { height: 44, duration: 0.5 }, { height: 92, duration: 0.7 },
    { height: 28, duration: 0.8 }, { height: 65, duration: 0.6 }, { height: 41, duration: 0.9 }, { height: 83, duration: 0.5 }, { height: 55, duration: 0.7 },
    { height: 68, duration: 0.8 }, { height: 39, duration: 0.6 }, { height: 74, duration: 0.9 }, { height: 47, duration: 0.5 }, { height: 81, duration: 0.7 },
    { height: 31, duration: 0.8 }, { height: 63, duration: 0.6 }, { height: 43, duration: 0.9 }, { height: 86, duration: 0.5 }, { height: 58, duration: 0.7 },
    { height: 70, duration: 0.8 }, { height: 37, duration: 0.6 }, { height: 79, duration: 0.9 }, { height: 50, duration: 0.5 }, { height: 95, duration: 0.7 },
    { height: 34, duration: 0.8 }, { height: 67, duration: 0.6 }, { height: 46, duration: 0.9 }, { height: 80, duration: 0.5 }, { height: 53, duration: 0.7 },
    { height: 71, duration: 0.8 }, { height: 38, duration: 0.6 }, { height: 75, duration: 0.9 }, { height: 49, duration: 0.5 }, { height: 84, duration: 0.7 },
    { height: 29, duration: 0.8 }, { height: 60, duration: 0.6 }, { height: 42, duration: 0.9 }, { height: 82, duration: 0.5 }, { height: 56, duration: 0.7 },
    { height: 69, duration: 0.8 }, { height: 36, duration: 0.6 }, { height: 73, duration: 0.9 }, { height: 48, duration: 0.5 }, { height: 87, duration: 0.7 }
  ], []);

  const startRecording = () => {
    setState('recording');
    timerRef.current = setInterval(() => setTimer((p) => p + 1), 1000);
  };

  const pauseRecording = () => {
    setState('paused');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resumeRecording = () => {
    setState('recording');
    timerRef.current = setInterval(() => setTimer((p) => p + 1), 1000);
  };

  const stopRecording = () => {
    setState('preview');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const submitRecording = () => {
    setState('uploading');
    setTimeout(() => setState('submitted'), 2000);
  };

  const reset = () => {
    setState('idle');
    setTimer(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Record & Upload</h1>
        <p className="text-muted text-sm mt-1">
          Record your speech for AI analysis. Speak naturally — we&apos;ll provide detailed feedback.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Main Recorder */}
        <div className="lg:col-span-3">
          <Card padding="lg">
            {/* Prompt */}
            <div className="bg-surface rounded-xl p-4 mb-6">
              <p className="text-xs text-muted uppercase font-semibold mb-2">Prompt</p>
              <p className="font-medium">{mockPracticePrompts[selectedPrompt]}</p>
              <button
                onClick={() => setSelectedPrompt((p) => (p + 1) % mockPracticePrompts.length)}
                className="text-xs text-primary font-medium mt-2 hover:underline cursor-pointer"
              >
                Try a different prompt →
              </button>
            </div>

            {/* Recorder Area */}
            <div className="flex flex-col items-center py-8">
              {state === 'submitted' ? (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} className="text-success" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Recording submitted!</h3>
                  <p className="text-sm text-muted mb-6">
                    Analysis usually completes within 5 minutes — you&apos;ll be notified.
                  </p>
                  <div className="flex gap-3 justify-center">
                    <Button variant="secondary" onClick={reset} icon={<RefreshCw size={14} />}>Record another</Button>
                    <Button onClick={() => window.location.href = '/jobs'} icon={<Send size={14} />}>View queue</Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Record Button */}
                  <div className="relative mb-6">
                    {state === 'recording' && (
                      <div className="absolute inset-[-12px] rounded-full border-4 border-danger/30 animate-ping" />
                    )}
                    <button
                      onClick={
                        state === 'idle' ? startRecording :
                        state === 'recording' ? pauseRecording :
                        state === 'paused' ? resumeRecording :
                        undefined
                      }
                      disabled={state === 'preview' || state === 'uploading'}
                      className={`relative w-28 h-28 rounded-full flex items-center justify-center transition-all cursor-pointer disabled:opacity-50 ${
                        state === 'recording'
                          ? 'bg-danger text-white shadow-lg shadow-danger/30'
                          : state === 'paused'
                          ? 'bg-warning text-white'
                          : 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/30'
                      }`}
                      aria-label={
                        state === 'idle' ? 'Start recording' :
                        state === 'recording' ? 'Pause recording' :
                        state === 'paused' ? 'Resume recording' : 'Recording control'
                      }
                    >
                      {state === 'recording' ? <Pause size={36} /> : state === 'paused' ? <Play size={36} /> : <Mic size={36} />}
                    </button>
                  </div>

                  {/* Timer */}
                  <p className="text-3xl font-mono font-bold mb-2">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </p>

                  {/* Status */}
                  <p className="text-sm text-muted mb-4">
                    {state === 'idle' && 'Tap the button to start recording'}
                    {state === 'recording' && 'Recording... Speak clearly.'}
                    {state === 'paused' && 'Paused — tap to resume'}
                    {state === 'preview' && 'Review your recording before submitting'}
                    {state === 'uploading' && 'Uploading...'}
                  </p>

                  {/* Waveform */}
                  {(state === 'recording') && (
                    <div className="flex items-center gap-0.5 h-16 mb-4">
                      {waveformData.map((data, i) => (
                        <div
                          key={i}
                          className="w-1 bg-danger/50 rounded-full"
                          style={{
                            height: `${data.height}%`,
                            animationName: 'wave',
                            animationDuration: `${data.duration}s`,
                            animationTimingFunction: 'ease-in-out',
                            animationIterationCount: 'infinite',
                            animationDelay: `${i * 0.03}s`,
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex gap-3">
                    {(state === 'recording' || state === 'paused') && (
                      <Button variant="destructive" size="sm" onClick={stopRecording} icon={<Square size={14} />}>
                        Stop
                      </Button>
                    )}
                    {state === 'preview' && (
                      <>
                        <Button variant="ghost" size="sm" onClick={reset} icon={<RefreshCw size={14} />}>
                          Retake
                        </Button>
                        <Button size="sm" onClick={submitRecording} loading={state === 'uploading' as never} icon={<Send size={14} />}>
                          Submit for analysis
                        </Button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Upload Option */}
            {state === 'idle' && (
              <div className="border-t border-border/50 pt-4 mt-2">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-border hover:border-primary/30 transition-colors cursor-pointer">
                  <Upload size={20} className="text-muted" />
                  <div>
                    <p className="text-sm font-medium">Or upload a file</p>
                    <p className="text-xs text-muted">MP3, WAV, M4A — max 50MB</p>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tips */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-warning" />
              <h3 className="font-semibold text-sm">Tips</h3>
            </div>
            <ul className="space-y-2 text-xs text-muted">
              <li className="flex gap-2"><span>•</span>Speak slowly and clearly</li>
              <li className="flex gap-2"><span>•</span>Avoid background noise</li>
              <li className="flex gap-2"><span>•</span>Use a clear microphone</li>
              <li className="flex gap-2"><span>•</span>Aim for 60–120 seconds</li>
              <li className="flex gap-2"><span>•</span>Don&apos;t worry about mistakes!</li>
            </ul>
          </Card>

          {/* Tags */}
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-primary" />
              <h3 className="font-semibold text-sm">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {['interview', 'presentation', 'pronunciation', 'fluency', 'grammar'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    tags.includes(t)
                      ? 'bg-primary/10 text-primary border border-primary/30'
                      : 'bg-surface text-muted border border-transparent hover:border-border'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Card>

          {/* Permission Alert */}
          <div className="flex items-start gap-2 p-3 bg-warning/5 rounded-xl border border-warning/20 text-xs text-warning">
            <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
            <span>Make sure microphone permissions are enabled in your browser settings.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
