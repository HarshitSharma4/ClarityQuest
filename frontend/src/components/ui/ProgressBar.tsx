import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({ value, max = 100, color, size = 'md', showLabel, className }: ProgressBarProps) {
  const percent = Math.min((value / max) * 100, 100);
  const barColor = color || (percent >= 80 ? 'bg-success' : percent >= 60 ? 'bg-accent' : percent >= 40 ? 'bg-warning' : 'bg-danger');

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-surface rounded-full overflow-hidden', size === 'sm' ? 'h-1.5' : 'h-2.5')}>
        <div
          className={cn('h-full rounded-full transition-all duration-700 ease-out', barColor)}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted min-w-[36px] text-right">{Math.round(percent)}%</span>
      )}
    </div>
  );
}
