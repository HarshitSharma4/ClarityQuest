'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Badge, ScoreBadge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { formatDate, cn } from '@/lib/utils';
import { Search, Star, Calendar, ArrowRight, Clock, Mic, MessageSquare, Target } from 'lucide-react';

const historyItems = [
  { id: 'h1', title: 'Interview intro practice', type: 'recording', score: 72, date: '2026-03-07', tags: ['interview'], starred: true },
  { id: 'h2', title: 'Pronunciation drill — /v/ sounds', type: 'exercise', score: 68, date: '2026-03-06', tags: ['pronunciation'], starred: false },
  { id: 'h3', title: 'Presentation opening', type: 'recording', score: 85, date: '2026-03-04', tags: ['presentation'], starred: true },
  { id: 'h4', title: 'Grammar practice session', type: 'exercise', score: 78, date: '2026-03-02', tags: ['grammar'], starred: false },
  { id: 'h5', title: 'Tell me about yourself (roleplay)', type: 'roleplay', score: 65, date: '2026-02-28', tags: ['interview', 'roleplay'], starred: false },
  { id: 'h6', title: 'Fluency exercise — no fillers', type: 'exercise', score: 45, date: '2026-02-25', tags: ['fluency'], starred: false },
];

export default function HistoryPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const filtered = historyItems.filter((item) => {
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || item.type === filter;
    return matchSearch && matchFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'recording': return <Mic size={16} />;
      case 'exercise': return <Target size={16} />;
      case 'roleplay': return <MessageSquare size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getVariant = (type: string) => {
    switch (type) {
      case 'recording': return 'primary';
      case 'exercise': return 'accent';
      case 'roleplay': return 'success';
      default: return 'secondary';
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">History & Activity</h1>
        <p className="text-muted-foreground text-sm">Review your past performances and track improvement.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input 
            icon={<Search size={18} />} 
            placeholder="Search recordings, tags, topics..." 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            className="h-12 rounded-xl bg-card border-border/50"
          />
        </div>
        <div className="flex p-1 bg-muted/50 rounded-xl border border-border/50 overflow-x-auto custom-scrollbar no-scrollbar">
          {['all', 'recording', 'exercise', 'roleplay'].map((f) => (
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

      <div className="grid gap-3">
        {filtered.map((item) => (
          <Link key={item.id} href={`/results/${item.id}`} className="no-underline block group">
            <Card hover padding="none" className="overflow-hidden border-border/40 group-hover:border-primary/40 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center p-4 gap-5">
                <div className="flex-shrink-0 relative">
                  <ScoreBadge score={item.score} size="md" />
                  {item.starred && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center text-white border-2 border-background shadow-lg scale-110">
                      <Star size={10} className="fill-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="font-bold text-sm truncate group-hover:text-primary transition-colors">{item.title}</p>
                    <Badge variant={getVariant(item.type) as any} className="text-[8px] h-4 py-0 uppercase px-1.5 font-black border-none bg-muted/50">
                      {getIcon(item.type)} <span className="ml-1 tracking-tighter">{item.type}</span>
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar size={12} /> {formatDate(item.date)}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {item.tags.map((t) => (
                        <span key={t} className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex flex-col items-end">
                    <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Detail</p>
                    <ArrowRight size={18} className="text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all sm:hidden">
                    <ArrowRight size={18} />
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
            <Search size={40} className="mx-auto text-muted-foreground/30 mb-4" />
            <p className="text-muted-foreground font-bold">No results found for &quot;{search}&quot;</p>
            <button onClick={() => { setSearch(''); setFilter('all'); }} className="text-primary text-xs font-bold uppercase mt-2 hover:underline cursor-pointer">Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
