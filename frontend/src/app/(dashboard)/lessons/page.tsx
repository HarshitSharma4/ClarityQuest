'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { mockLessons } from '@/lib/mock-data';
import { cn, formatDuration } from '@/lib/utils';
import { Search, Play, ArrowRight } from 'lucide-react';

export default function LessonsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filtered = mockLessons.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) || l.tags.some(t => t.includes(search.toLowerCase()));
    const matchFilter = filter === 'all' || l.difficulty === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Lesson Library</h1>
        <p className="text-muted text-sm mt-1">Short 3–6 min lessons designed for daily practice.</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            icon={<Search size={16} />}
            placeholder="Search lessons by title or tag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex bg-muted/50 p-1 rounded-xl border border-border/50">
          {['all', 'beginner', 'intermediate', 'advanced'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer capitalize whitespace-nowrap',
                filter === f 
                  ? 'bg-card text-foreground premium-shadow' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((lesson) => (
          <Link key={lesson.id} href={`/lessons/${lesson.id}`} className="no-underline">
            <Card hover premium padding="none" className="h-full flex flex-col group overflow-hidden border-border/40">
              {/* Thumbnail Placeholder */}
              <div className="w-full aspect-video bg-muted/50 flex items-center justify-center relative overflow-hidden transition-colors group-hover:bg-primary/5">
                <div className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play size={20} className="text-primary ml-1" />
                </div>
                {lesson.watched && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="success" className="bg-success text-success-foreground border-none px-2 shadow-sm">Watched</Badge>
                  </div>
                )}
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-md font-bold">
                  {formatDuration(lesson.duration)}
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-sm mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">{lesson.title}</h3>
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  <Badge variant="outline" className="text-[9px] px-1.5">{lesson.difficulty}</Badge>
                  {lesson.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-[10px] text-muted-foreground font-medium">#{t}</span>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-border/30 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Start Lesson</span>
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
