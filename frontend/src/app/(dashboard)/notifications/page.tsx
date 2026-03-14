'use client';
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { mockNotifications } from '@/lib/mock-data';
import { Bell, CheckCheck, Settings, BarChart3, Lightbulb, Award, Mic, Trash2, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const clearAll = () => setNotifications([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'result': return <BarChart3 size={20} />;
      case 'reminder': return <Mic size={20} />;
      case 'achievement': return <Award size={20} />;
      case 'tip': return <Lightbulb size={20} />;
      default: return <Bell size={20} />;
    }
  };

  const getColors = (type: string) => {
    switch (type) {
      case 'result': return 'bg-primary/10 text-primary';
      case 'reminder': return 'bg-accent/10 text-accent';
      case 'achievement': return 'bg-warning/10 text-warning';
      case 'tip': return 'bg-success/10 text-success';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const groupByDate = (items: typeof notifications) => {
    const today = new Date().toDateString();
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const yesterday = d.toDateString();
    const groups: { label: string; items: typeof notifications }[] = [
      { label: 'Today', items: [] },
      { label: 'Yesterday', items: [] },
      { label: 'Earlier', items: [] },
    ];
    items.forEach((n) => {
      const d = new Date(n.createdAt).toDateString();
      if (d === today) groups[0].items.push(n);
      else if (d === yesterday) groups[1].items.push(n);
      else groups[2].items.push(n);
    });
    return groups.filter((g) => g.items.length > 0);
  };

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Activity Alerts</h1>
          <p className="text-muted-foreground text-sm flex items-center gap-2 mt-1">
            {unreadCount > 0 ? (
              <>
                <Badge variant="primary" className="h-5 px-1.5 font-black text-[10px] tracking-tighter">{unreadCount}</Badge>
                <span className="font-medium text-foreground">unseen updates for you</span>
              </>
            ) : (
              'You are completely caught up!'
            )}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead} icon={<CheckCheck size={16} />} className="rounded-xl font-bold text-xs uppercase tracking-wider">Read All</Button>
          )}
          <Button variant="ghost" size="sm" onClick={clearAll} icon={<Trash2 size={16} />} className="rounded-xl opacity-50 hover:opacity-100" />
          <Button variant="ghost" size="sm" icon={<Settings size={16} />} className="rounded-xl opacity-50 hover:opacity-100" />
        </div>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-24 bg-card/30 backdrop-blur-sm rounded-3xl border border-dashed border-border/50">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-border/50">
            <Bell size={32} className="text-muted-foreground/30" />
          </div>
          <p className="text-muted-foreground font-bold text-lg mb-1">Silence is golden.</p>
          <p className="text-muted-foreground text-sm opacity-60">Try taking a lesson or recording to get started!</p>
        </div>
      ) : (
        <div className="space-y-10">
          {groupByDate(notifications).map((group) => (
            <div key={group.label} className="space-y-4">
              <div className="flex items-center gap-4 px-1">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{group.label}</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="grid gap-2">
                {group.items.map((n) => (
                  <Card 
                    key={n.id} 
                    padding="none" 
                    className={cn(
                      'overflow-hidden transition-all duration-300 border-border/40 group relative',
                      !n.read ? 'bg-primary/[0.03] border-primary/20 premium-shadow' : 'bg-card/50 opacity-80 hover:opacity-100 hover:bg-muted/20'
                    )}
                  >
                    {!n.read && <div className="absolute top-0 left-0 bottom-0 w-1 bg-primary" />}
                    <div className="flex items-start gap-4 p-4">
                      <div className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-black/5 dark:border-white/5',
                        getColors(n.type)
                      )}>
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0 pr-8">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={cn(
                            'text-sm tracking-tight',
                            !n.read ? 'font-bold text-foreground' : 'font-semibold text-muted-foreground'
                          )}>{n.title}</p>
                        </div>
                        <p className="text-xs text-muted-foreground font-medium leading-relaxed">{n.body}</p>
                        <p className="text-[10px] font-bold text-muted-foreground/40 mt-2 uppercase tracking-widest">
                          {new Date(n.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      <button className="absolute top-4 right-4 p-1.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg hover:bg-muted text-muted-foreground">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
