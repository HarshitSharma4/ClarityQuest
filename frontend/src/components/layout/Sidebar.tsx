'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Target,
  BookOpen,
  Mic,
  BarChart3,
  Video,
  History,
  Bell,
  Settings,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MessageSquare,
  BookMarked,
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Target, label: 'Goals', href: '/goals' },
  { icon: BookOpen, label: 'Lessons', href: '/lessons' },
  { icon: Mic, label: 'Record', href: '/record' },
  { icon: BarChart3, label: 'Practice', href: '/practice' },
  { icon: MessageSquare, label: 'Role-play', href: '/roleplay' },
  { icon: Sparkles, label: 'AI Mentor', href: '/ai-mentor' },
  { icon: BookMarked, label: 'Vocabulary', href: '/vocabulary' },
  { icon: BarChart3, label: 'Progress', href: '/progress' },
  { icon: Video, label: 'Non-Verbal', href: '/nonverbal' },
  { icon: History, label: 'History', href: '/history' },
  { icon: Bell, label: 'Alerts', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: ShieldCheck, label: 'Coach Panel', href: '/admin' },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0 transition-all duration-500 border-r border-border/50 bg-card/50 backdrop-blur-xl z-50',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-6 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
            <Sparkles size={18} className="text-white" />
          </div>
          {!collapsed && (
            <span className="font-bold text-lg tracking-tight gradient-text">ClarityQuest</span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-2 custom-scrollbar">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative',
                active
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-muted-fg hover:bg-secondary hover:text-foreground'
              )}
            >
              <item.icon
                size={20}
                className={cn(
                  'transition-transform duration-200 group-hover:scale-110',
                  active ? 'text-primary' : 'text-muted-fg group-hover:text-foreground'
                )}
              />
              {!collapsed && <span className="text-sm">{item.label}</span>}
              {active && (
                <div className="absolute left-[-12px] w-1 h-6 bg-primary rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer / Collapse */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-muted text-muted-fg transition-colors cursor-pointer"
        >
          {collapsed ? <ChevronRight size={18} /> : <div className="flex items-center gap-2"><ChevronLeft size={18} /><span className="text-xs font-semibold uppercase tracking-wider">Collapse</span></div>}
        </button>
      </div>
    </aside>
  );
};
