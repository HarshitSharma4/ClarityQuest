'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockLessons } from '@/lib/mock-data';
import { formatDuration } from '@/lib/utils';
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Mic,
  BookmarkPlus,
  Clock,
  ChevronRight,
} from 'lucide-react';

export default function LessonDetailPage() {
  const lesson = mockLessons[0];
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(45);

  const speeds = [0.75, 1, 1.25, 1.5];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/lessons" className="p-2 rounded-xl hover:bg-surface transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{lesson.title}</h1>
          <div className="flex items-center gap-2 mt-1">
            <Badge>{lesson.difficulty}</Badge>
            <span className="text-xs text-muted flex items-center gap-1"><Clock size={10} /> {formatDuration(lesson.duration)}</span>
          </div>
        </div>
        <Button variant="ghost" size="sm" icon={<BookmarkPlus size={14} />}>Save</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <Card padding="sm">
            {/* Video Area */}
            <div className="w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center relative overflow-hidden mb-3">
              <button
                onClick={() => setPlaying(!playing)}
                className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer"
              >
                {playing ? <Pause size={28} className="text-white" /> : <Play size={28} className="text-white ml-1" />}
              </button>
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/60">
                {/* Progress */}
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs text-white/80 font-mono">{formatDuration(currentTime)}</span>
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    setCurrentTime(Math.round((x / rect.width) * lesson.duration));
                  }}>
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(currentTime / lesson.duration) * 100}%` }} />
                  </div>
                  <span className="text-xs text-white/80 font-mono">{formatDuration(lesson.duration)}</span>
                </div>
                {/* Controls */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setCurrentTime(Math.max(0, currentTime - 10))} className="text-white/80 hover:text-white cursor-pointer"><SkipBack size={18} /></button>
                    <button onClick={() => setPlaying(!playing)} className="text-white cursor-pointer">{playing ? <Pause size={22} /> : <Play size={22} />}</button>
                    <button onClick={() => setCurrentTime(Math.min(lesson.duration, currentTime + 10))} className="text-white/80 hover:text-white cursor-pointer"><SkipForward size={18} /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    {speeds.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSpeed(s)}
                        className={`text-xs px-2 py-0.5 rounded cursor-pointer ${speed === s ? 'bg-primary text-white' : 'text-white/60 hover:text-white'}`}
                      >
                        {s}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Practice CTA */}
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Mic size={18} className="text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Practice what you learned</p>
                <p className="text-xs text-muted">Record yourself applying the techniques from this lesson.</p>
              </div>
              <Link href="/record"><Button size="sm">Practice this</Button></Link>
            </div>
          </Card>
        </div>

        {/* Transcript Sidebar */}
        <div>
          <Card padding="md">
            <h3 className="font-semibold text-sm mb-3">Chapters</h3>
            <div className="space-y-1">
              {lesson.chapters.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTime(ch.timestamp)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                    currentTime >= ch.timestamp && (i === lesson.chapters.length - 1 || currentTime < lesson.chapters[i + 1].timestamp)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-surface text-muted hover:text-foreground'
                  }`}
                >
                  <span className="text-xs font-mono w-10">{formatDuration(ch.timestamp)}</span>
                  <span className="text-xs font-medium flex-1">{ch.title}</span>
                  <ChevronRight size={12} />
                </button>
              ))}
            </div>
          </Card>

          {/* Description */}
          <Card className="mt-4">
            <h3 className="font-semibold text-sm mb-2">About this lesson</h3>
            <p className="text-xs text-muted leading-relaxed">{lesson.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {lesson.tags.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
