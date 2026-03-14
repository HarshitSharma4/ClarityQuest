'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge, ScoreBadge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import {
  Users,
  Search,
  Flag,
  Clock,
  MessageSquare,
  BarChart3,
  AlertTriangle,
  ArrowRight,
  Filter,
  MoreVertical,
} from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';

const mockStudents = [
  { id: 's1', name: 'Priya Sharma', score: 72, sessions: 24, streak: 7, flag: false },
  { id: 's2', name: 'Rahul Verma', score: 58, sessions: 12, streak: 3, flag: true },
  { id: 's3', name: 'Ananya Patel', score: 85, sessions: 30, streak: 14, flag: false },
  { id: 's4', name: 'Vikram Singh', score: 45, sessions: 8, streak: 0, flag: true },
  { id: 's5', name: 'Meera Joshi', score: 67, sessions: 18, streak: 5, flag: false },
];

const pendingReviews = [
  { id: 'pr1', student: 'Rahul Verma', recording: 'Interview practice', difficulty: 'Hard', submitted: '2 hours ago' },
  { id: 'pr2', student: 'Vikram Singh', recording: 'Pronunciation drill', difficulty: 'Easy', submitted: '4 hours ago' },
  { id: 'pr3', student: 'Priya Sharma', recording: 'Presentation opening', difficulty: 'Medium', submitted: '1 day ago' },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [search, setSearch] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Coach Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Oversee student progress and provide expert-level manual feedback.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" icon={<Filter size={14} />}>Filters</Button>
          <Button size="sm" icon={<BarChart3 size={14} />}>Analytics Report</Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Pending Reviews', value: '3', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Active Students', value: '1,284', icon: Users, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'Flagged Activity', value: '12', icon: Flag, color: 'text-destructive', bg: 'bg-destructive/10' },
          { label: 'Avg. Progress', value: '+14%', icon: BarChart3, color: 'text-success', bg: 'bg-success/10' },
        ].map((s) => (
          <Card key={s.label} padding="lg" premium className="bg-card/50 backdrop-blur-md">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", s.bg)}>
                <s.icon size={20} className={s.color} />
              </div>
              <Badge variant="secondary" className="bg-muted/50 border-none text-[10px] uppercase font-bold tracking-widest">Live</Badge>
            </div>
            <p className="text-3xl font-black tracking-tighter mb-1">{s.value}</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <Tabs
          tabs={[
            { id: 'reviews', label: 'Manual Feedback Required', icon: <Clock size={14} /> },
            { id: 'students', label: 'All Students', icon: <Users size={14} /> },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          className="mb-2"
        />

        {activeTab === 'reviews' && (
          <div className="grid gap-3">
            {pendingReviews.map((review) => (
              <Card key={review.id} hover padding="none" className="overflow-hidden border-border/40 hover:border-primary/40 bg-card/40 group">
                <div className="flex items-center p-4 gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                    <MessageSquare size={22} className="text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-sm tracking-tight">{review.student}</p>
                      <Badge variant={review.difficulty === 'Hard' ? 'danger' : review.difficulty === 'Medium' ? 'warning' : 'success'} className="text-[8px] uppercase font-black px-1.5 h-4 py-0 border-none leading-none">
                        {review.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium text-muted-foreground">{review.recording}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">{review.submitted}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-9 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">Preview</Button>
                    <Button size="sm" className="h-9 px-6 rounded-xl text-xs font-bold uppercase tracking-wider">Start Review</Button>
                    <button className="p-2 rounded-xl hover:bg-muted transition-colors text-muted-foreground">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
            {pendingReviews.length === 0 && (
              <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
                <Clock size={40} className="mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground font-bold">Inbox cleared!</p>
                <p className="text-muted-foreground text-sm opacity-60">No pending reviews at the moment.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'students' && (
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <Input 
                  icon={<Search size={18} />} 
                  placeholder="Search by name, ID, or email..." 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  className="h-12 rounded-xl bg-card border-border/50"
                />
              </div>
              <Button variant="secondary" className="h-12 px-6 rounded-xl">Advanced Search</Button>
            </div>
            
            <div className="grid gap-2">
              {mockStudents
                .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
                .map((student) => (
                  <Card key={student.id} hover padding="none" className="overflow-hidden border-border/40 hover:border-primary/40 bg-card/40 group">
                    <div className="flex items-center p-4 gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center flex-shrink-0 font-black text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/20 transition-all uppercase tracking-tighter">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <p className="font-bold text-sm tracking-tight group-hover:text-foreground transition-colors">{student.name}</p>
                          {student.flag && (
                            <div className="px-1.5 py-0.5 rounded bg-destructive/10 text-destructive text-[9px] font-black uppercase flex items-center gap-1">
                              <AlertTriangle size={10} /> Needs Attention
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Users size={12} /> {student.sessions} Sessions</span>
                          <span className="flex items-center gap-1.5 text-warning"><span className="text-xs">🔥</span> {student.streak} Day Streak</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-end">
                          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Mastery</p>
                          <ScoreBadge score={student.score} size="sm" />
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
