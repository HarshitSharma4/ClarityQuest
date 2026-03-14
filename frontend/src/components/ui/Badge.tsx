'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'accent' | 'outline';
  dot?: boolean;
}

export const Badge = ({ className, variant = 'primary', dot, children, ...props }: BadgeProps) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary text-secondary-fg border-border',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    danger: 'bg-destructive/10 text-destructive border-destructive/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    outline: 'bg-transparent border-border text-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border',
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
      {children}
    </span>
  );
};

export const JobChip = ({ status }: { status: 'queued' | 'processing' | 'done' | 'failed' }) => {
  const configs = {
    queued: { label: 'Queued', variant: 'warning' as const },
    processing: { label: 'Processing', variant: 'primary' as const, dot: true },
    done: { label: 'Complete', variant: 'success' as const },
    failed: { label: 'Failed', variant: 'danger' as const },
  };

  const { label, variant, dot } = configs[status];
  return <Badge variant={variant} dot={dot}>{label}</Badge>;
};

export const ScoreBadge = ({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' | 'lg' }) => {
  const colorClass = score >= 80 ? 'text-success' : score >= 60 ? 'text-accent' : score >= 40 ? 'text-warning' : 'text-destructive';
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-xl',
    lg: 'w-20 h-20 text-3xl',
  };

  return (
    <div className={cn(
      'rounded-xl border border-border/50 bg-card flex flex-col items-center justify-center font-bold premium-shadow',
      sizeClasses[size],
      colorClass
    )}>
      {score}
      {size === 'lg' && <span className="text-[10px] text-muted-foreground uppercase mt-1 font-medium">Score</span>}
    </div>
  );
};
