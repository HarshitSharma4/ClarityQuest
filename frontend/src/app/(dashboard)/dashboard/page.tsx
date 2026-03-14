'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, JobChip, ScoreBadge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockUser, mockJobs, mockLessons } from '@/lib/mock-data';
import { getGreeting, formatDuration, cn } from '@/lib/utils';
import {
  Mic,
  Play,
  Target,
  Upload,
  BookOpen,
  Flame,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
} from 'lucide-react';

export default function DashboardPage() {
  const greeting = getGreeting();
  const processingJobs = mockJobs.filter((j) => j.status === 'processing' || j.status === 'queued');

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      {/* Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">
            {greeting}, {mockUser.name} 👋
          </h1>
          <p className="text-muted text-sm mt-1">
            {processingJobs.length > 0
              ? `You have ${processingJobs.length} recording${processingJobs.length > 1 ? 's' : ''} processing — we'll notify you when results are ready.`
              : 'Ready to practice? Your personalized plan is waiting.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="warning" className="px-3 py-1.5 h-auto">
            <Flame size={14} className="mr-1.5" />
            {mockUser.streak} day streak
          </Badge>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {([
          { href: '/goals', label: 'Start Assessment', icon: Target, variant: 'primary', desc: 'Take diagnostic' },
          { href: '/record', label: 'Upload Recording', icon: Upload, variant: 'accent', desc: 'Record 2 min' },
          { href: '/practice', label: 'Practice Now', icon: Mic, variant: 'warning', desc: 'Pronunciation drill' },
          { href: '/lessons', label: 'Browse Lessons', icon: BookOpen, variant: 'success', desc: '6 new lessons' },
        ] as const).map((a) => (
          <Link key={a.href} href={a.href} className="no-underline">
            <Card hover className="text-center group p-4">
              <div className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors',
                a.variant === 'primary' && 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
                a.variant === 'accent' && 'bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground',
                a.variant === 'warning' && 'bg-warning/10 text-warning group-hover:bg-warning group-hover:text-warning-foreground',
                a.variant === 'success' && 'bg-success/10 text-success group-hover:bg-success group-hover:text-success-foreground'
              )}>
                <a.icon size={22} />
              </div>
              <p className="font-bold text-sm">{a.label}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1">{a.desc}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Today's Practice */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Today&apos;s Practice</h2>
              <Badge variant="primary" dot>Recommended</Badge>
            </div>
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-5 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mic size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">Record a 2-minute self-introduction</h3>
                  <p className="text-sm text-muted mb-3">
                    Focus on clear pronunciation and reducing filler words. Speak naturally about your background and goals.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/record">
                      <Button size="sm" icon={<Mic size={14} />}>Start recording</Button>
                    </Link>
                    <Button size="sm" variant="ghost" icon={<Sparkles size={14} />}>Skip today</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Lesson */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Continue Learning</h2>
              <Link href="/lessons" className="text-sm text-primary font-medium flex items-center gap-1 no-underline hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockLessons.slice(0, 3).map((lesson) => (
                <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="no-underline">
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface transition-colors group">
                    <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Play size={18} className="text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{lesson.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted flex items-center gap-1">
                          <Clock size={10} /> {formatDuration(lesson.duration)}
                        </span>
                        <Badge>{lesson.difficulty}</Badge>
                        {lesson.watched && <Badge variant="success">Watched</Badge>}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Recent Results */}
          <Card padding="lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Results</h2>
              <Link href="/history" className="text-sm text-primary font-medium flex items-center gap-1 no-underline hover:underline">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {mockJobs.map((job) => (
                <Link key={job.id} href={job.status === 'done' ? `/results/${job.id}` : `/jobs/${job.id}`} className="no-underline">
                  <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border/30">
                    <ScoreBadge score={job.status === 'done' ? 72 : 0} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{job.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase font-bold mt-0.5 tracking-tighter">
                        {new Date(job.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <JobChip status={job.status} />
                  </div>
                </Link>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weekly Progress */}
          <Card padding="lg">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              Weekly Progress
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Pronunciation', score: 68, prev: 60 },
                { label: 'Grammar', score: 78, prev: 72 },
                { label: 'Fluency', score: 70, prev: 65 },
                { label: 'Overall', score: 72, prev: 65 },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{s.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold">{s.score}</span>
                      <span className="text-[10px] text-success">+{s.score - s.prev}</span>
                    </div>
                  </div>
                  <ProgressBar value={s.score} />
                </div>
              ))}
            </div>
            <Link href="/progress">
              <Button variant="ghost" size="sm" className="w-full mt-4" icon={<ArrowRight size={14} />}>
                View full report
              </Button>
            </Link>
          </Card>

          {/* Recommended Drill */}
          <Card padding="lg" className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-primary" />
              <h3 className="font-semibold text-sm">Recommended Drill</h3>
            </div>
            <p className="text-sm font-medium mb-1">/v/ vs /w/ Practice</p>
            <p className="text-xs text-muted mb-4">
              Practice 10 words focusing on the /v/ sound. Repeat each 3 times.
            </p>
            <Link href="/practice">
              <Button size="sm" className="w-full">Start drill</Button>
            </Link>
          </Card>

          {/* Streak Calendar Mini */}
          <Card padding="lg">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <Flame size={16} className="text-warning" />
              This Week
            </h3>
            <div className="flex gap-2 justify-between">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-[10px] text-muted">{day}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                    i < 5 ? 'bg-accent/20 text-accent' : i === 5 ? 'bg-primary/10 text-primary border border-primary/30' : 'bg-surface text-muted'
                  }`}>
                    {i < 5 ? '✓' : i === 5 ? '•' : ''}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
