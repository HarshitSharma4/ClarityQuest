'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full h-11 bg-muted/30 border border-border/50 rounded-lg px-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60 text-sm',
              icon && 'pl-10',
              error && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-destructive font-medium ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            'w-full min-h-[120px] bg-muted/30 border border-border/50 rounded-lg p-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary placeholder:text-muted-foreground/60 text-sm resize-none',
            error && 'border-destructive focus:ring-destructive/20 focus:border-destructive',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive font-medium ml-1">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
