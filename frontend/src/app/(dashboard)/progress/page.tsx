'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { mockProgressData, mockBadges } from '@/lib/mock-data';
import { TrendingUp, Download, Award, Flame, Calendar, BarChart3, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { cn } from '@/lib/utils';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">Performance Metrics</h1>
            <Badge variant="accent" className="font-black text-[9px] uppercase h-5 tracking-tighter">Gold Tier</Badge>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            <TrendingUp size={16} className="text-success" />
            <span className="font-semibold text-foreground">Top 12%</span> of learners this month — your filler word reduction is significant.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Share2 size={16} />} className="rounded-xl font-bold text-xs uppercase tracking-widest">Share Report</Button>
          <Button variant="secondary" size="sm" icon={<Download size={16} />} className="rounded-xl font-bold text-xs uppercase tracking-widest">Export Dataset</Button>
        </div>
      </div>

      {/* High-Level KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Clarity Index', value: '72', change: '+7.4', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Consistency Streak', value: '7 Days', change: 'Personal Best', icon: Flame, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Drills Completed', value: '24', change: '+3 this wk', icon: Calendar, color: 'text-accent', bg: 'bg-accent/10' },
          { label: 'Milestones', value: '3/6', change: 'Next at 5', icon: Award, color: 'text-success', bg: 'bg-success/10' },
        ].map((s) => (
          <Card key={s.label} padding="lg" premium className="bg-card/40 backdrop-blur-md border-border/40 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-1 translate-y-1 group-hover:scale-110 transition-transform">
                <s.icon size={64} />
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
                <s.icon size={20} className={s.color} />
              </div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{s.label}</p>
            </div>
            <div className="flex items-baseline gap-2">
                <p className="text-3xl font-black tracking-tighter">{s.value}</p>
                {s.change && <p className="text-[10px] font-bold text-success uppercase tracking-tighter">{s.change}</p>}
            </div>
          </Card>
        ))}
      </div>

      {/* Main Trajectory Chart */}
      <Card padding="none" premium className="bg-card/30 backdrop-blur-md overflow-hidden border-border/40">
        <div className="p-6 md:p-8 border-b border-border/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp size={20} />
            </div>
            <div>
                <h2 className="font-black text-xs uppercase tracking-[0.2em] text-foreground/80">Skill Acquisition Trajectory</h2>
                <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-primary rounded-sm shadow-[0_0_8px_rgba(15,111,255,0.4)]" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Overall</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 bg-success rounded-sm shadow-[0_0_8px_rgba(0,184,148,0.4)]" /><span className="text-[10px] font-bold text-muted-foreground uppercase">Phonology</span></div>
                </div>
            </div>
          </div>
          <div className="flex p-1 bg-muted/40 rounded-xl border border-border/30 overflow-x-auto no-scrollbar">
            {['1m', '3m', 'all'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeRange(t)}
                className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all",
                    timeRange === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockProgressData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPronun" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--success)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--success)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.3} vertical={false} />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 9, fill: 'var(--muted)', fontWeight: 700 }} 
                tickFormatter={(v) => new Date(v).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }).toUpperCase()} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 9, fill: 'var(--muted)', fontWeight: 700 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                    backgroundColor: 'var(--card)', 
                    borderRadius: '16px', 
                    border: '1px solid var(--border)', 
                    fontSize: '11px',
                    fontWeight: 'bold',
                    boxShadow: 'var(--shadow-xl)'
                }} 
              />
              <Area type="monotone" dataKey="overall" stroke="var(--primary)" strokeWidth={4} fill="url(#colorOverall)" name="Overall Master" />
              <Area type="monotone" dataKey="pronunciation" stroke="var(--success)" strokeWidth={3} fill="url(#colorPronun)" name="Phonetics" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Growth Vectors */}
        <Card padding="none" className="overflow-hidden bg-card/40 backdrop-blur-md border-border/40">
           <div className="p-4 bg-muted/40 border-b border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-primary" />
                    <h3 className="font-black text-[10px] uppercase tracking-widest">Growth Vectors</h3>
                </div>
                <button className="text-[10px] font-black text-primary hover:underline uppercase tracking-tighter">Drill Down</button>
            </div>
          <div className="p-6 space-y-6">
            {[
              { label: 'Phonological Precision', from: 40, to: 68, change: '+28%', color: 'var(--primary)' },
              { label: 'Syntactic Complexity', from: 50, to: 78, change: '+28%', color: 'var(--success)' },
              { label: 'Lexical Diversity', from: 42, to: 70, change: '+28%', color: 'var(--accent)' },
            ].map((item) => (
              <div key={item.label} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-tight text-foreground/80">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black bg-success/10 text-success px-2 py-0.5 rounded-lg border border-success/20">{item.change}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-muted-foreground w-6">{item.from}</span>
                    <ProgressBar value={item.to} className="flex-1" />
                    <span className="text-[10px] font-black text-foreground w-6">{item.to}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievement Matrix */}
        <Card padding="none" className="overflow-hidden bg-card/40 backdrop-blur-md border-border/40">
          <div className="p-4 bg-muted/40 border-b border-border/50 flex items-center gap-2">
                <Award size={16} className="text-success" />
                <h3 className="font-black text-[10px] uppercase tracking-widest">Achievement Matrix</h3>
            </div>
          <div className="p-6 grid grid-cols-3 gap-4">
            {mockBadges.map((badge) => (
              <div
                key={badge.id}
                className={cn(
                    "relative flex flex-col items-center p-4 rounded-2xl border transition-all duration-500 group overflow-hidden",
                    badge.earned ? "border-primary/20 bg-primary/[0.03] premium-shadow" : "border-border/30 opacity-30 saturate-0 scale-95"
                )}
              >
                {badge.earned && (
                    <div className="absolute top-0 right-0 p-1 opacity-20"><Sparkles size={8} /></div>
                )}
                <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</span>
                <span className="text-[9px] font-black text-center uppercase tracking-tighter leading-tight h-6 flex items-center">{badge.title}</span>
                {badge.earned && badge.date && (
                  <span className="text-[8px] font-bold text-muted-foreground/60 mt-1 uppercase tracking-widest">{new Date(badge.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
