'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, BookOpen, Mic, BarChart3, Settings } from 'lucide-react';

const mobileNavItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/record', label: 'Record', icon: Mic, isMain: true },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/settings', label: 'More', icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/90 backdrop-blur-md border-t border-border/50 safe-bottom" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-16 px-2">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          if (item.isMain) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-6 no-underline"
              >
                <div className="w-14 h-14 rounded-full gradient-bg flex items-center justify-center shadow-lg">
                  <item.icon size={24} className="text-white" />
                </div>
                <span className="text-[10px] font-medium mt-1 text-primary">{item.label}</span>
              </Link>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1 no-underline',
                isActive ? 'text-primary' : 'text-muted'
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
