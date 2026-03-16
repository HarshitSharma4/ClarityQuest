'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import {
  Bell,
  Search,
  User,
  Sun,
  Moon,
  Laptop,
  Sparkles,
} from 'lucide-react';
import { mockNotifications } from '@/lib/mock-data';
import { api } from '@/lib/api';

export const AppHeader = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [unreadCount, setUnreadCount] = useState(mockNotifications.filter((n) => !n.read).length);

  useEffect(() => {
    setMounted(true);
    api.getNotifications().then((data: any) => {
      setUnreadCount(data.filter((n: any) => !n.read).length);
    }).catch(() => {});
  }, []);

  if (!mounted) return null;

  return (
    <header className="h-16 border-b border-border/50 bg-background/50 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-8 flex items-center justify-between">
      {/* Mobile Logo */}
      <div className="flex lg:hidden items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
          <Sparkles size={18} className="text-white" />
        </div>
        <span className="font-bold text-lg gradient-text">CQ</span>
      </div>

      {/* Desktop Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-8 relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-fg transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          placeholder="Search lessons, recordings..."
          className="w-full h-10 bg-muted/30 border border-border/50 rounded-xl pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Theme Toggle */}
        <div className="flex items-center bg-secondary/50 rounded-xl p-1 border border-border/50">
          <button
            onClick={() => setTheme('light')}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-200 cursor-pointer',
              theme === 'light' ? 'bg-card text-foreground premium-shadow' : 'text-muted-fg hover:text-foreground'
            )}
            title="Light Mode"
          >
            <Sun size={16} />
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-200 cursor-pointer',
              theme === 'dark' ? 'bg-card text-foreground premium-shadow' : 'text-muted-fg hover:text-foreground'
            )}
            title="Dark Mode"
          >
            <Moon size={16} />
          </button>
          <button
            onClick={() => setTheme('system')}
            className={cn(
              'p-1.5 rounded-lg transition-all duration-200 cursor-pointer',
              theme === 'system' ? 'bg-card text-foreground premium-shadow' : 'text-muted-fg hover:text-foreground'
            )}
            title="System Mode"
          >
            <Laptop size={16} />
          </button>
        </div>

        {/* Notifications */}
        <Link
          href="/notifications"
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-muted-fg hover:bg-muted hover:text-foreground transition-all relative group"
        >
          <Bell size={20} className="transition-transform group-hover:rotate-12" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-4 h-4 bg-destructive text-destructive-fg text-[10px] font-bold flex items-center justify-center rounded-full animate-fade-in border-2 border-background">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* Profile */}
        <Link
          href="/settings"
          className="flex items-center gap-3 pl-2 pr-1 h-10 rounded-xl hover:bg-secondary/50 transition-all border border-transparent hover:border-border/50 active:scale-95"
        >
          <span className="hidden sm:inline text-sm font-medium">Harshit</span>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-lg shadow-primary/20">
            <User size={18} className="text-white" />
          </div>
        </Link>
      </div>
    </header>
  );
};
