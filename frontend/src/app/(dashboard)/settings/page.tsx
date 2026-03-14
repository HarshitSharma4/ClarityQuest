'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { mockUser } from '@/lib/mock-data';
import { useTheme } from 'next-themes';
import {
  User,
  Globe,
  Target,
  Bell,
  Shield,
  Save,
  LogOut,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [accent, setAccent] = useState('neutral');
  const [retention, setRetention] = useState('30');
  const [modelQuality, setModelQuality] = useState('standard');
  const [notifications, setNotifications] = useState({ email: true, push: true, reminders: true });
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your preferences, appearance, and account.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile */}
          <Card padding="lg">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal details here.</CardDescription>
            </CardHeader>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl gradient-bg flex items-center justify-center shadow-xl shadow-primary/20 border-4 border-card">
                <User size={32} className="text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="font-bold text-xl">{mockUser.name}</h2>
                <div className="flex gap-2">
                  <Badge variant="primary">{mockUser.role}</Badge>
                  <Badge variant="accent">Streak: {mockUser.streak} days</Badge>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={mockUser.name} readOnly />
              <Input label="Email" type="email" value={mockUser.email} readOnly />
            </div>
          </Card>

          {/* Language & Accent */}
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-primary" />
                <CardTitle>Language & Accent</CardTitle>
              </div>
              <CardDescription>Choose your preferred target accent for analysis.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'us', label: 'US English' },
                { value: 'uk', label: 'UK English' },
                { value: 'neutral', label: 'Indian Neutral' },
              ].map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAccent(a.value)}
                  className={cn(
                    'p-4 rounded-xl border text-center text-sm font-semibold transition-all cursor-pointer',
                    accent === a.value 
                      ? 'border-primary bg-primary/10 text-primary premium-shadow' 
                      : 'border-border bg-muted/30 text-muted-foreground hover:border-primary/50'
                  )}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </Card>

          {/* Privacy & Storage */}
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-destructive" />
                <CardTitle>Privacy & Storage</CardTitle>
              </div>
              <CardDescription>Control how long we store your data.</CardDescription>
            </CardHeader>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold mb-3 ml-1 uppercase tracking-wider text-muted-foreground">Recording Retention</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: '7', label: '7 days' },
                    { value: '30', label: '30 days' },
                    { value: 'forever', label: 'Keep forever' },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRetention(r.value)}
                      className={cn(
                        'p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer',
                        retention === r.value 
                          ? 'border-primary bg-primary/10 text-primary premium-shadow' 
                          : 'border-border bg-muted/30 text-muted-foreground'
                      )}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-8">
          {/* Appearance */}
          <Card padding="lg" className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sun size={18} className="text-orange-500" />
                <CardTitle>Appearance</CardTitle>
              </div>
              <CardDescription>Customize the app theme.</CardDescription>
            </CardHeader>
            <div className="space-y-3">
              {[
                { value: 'light', label: 'Light Mode', icon: Sun },
                { value: 'dark', label: 'Dark Mode', icon: Moon },
                { value: 'system', label: 'System', icon: Laptop },
              ].map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={cn(
                    'w-full flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer font-medium',
                    theme === t.value 
                      ? 'border-primary bg-card text-foreground premium-shadow' 
                      : 'border-border/50 bg-background/50 text-muted-foreground hover:border-primary/30'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <t.icon size={18} />
                    <span>{t.label}</span>
                  </div>
                  {theme === t.value && <div className="w-2 h-2 rounded-full bg-primary" />}
                </button>
              ))}
            </div>
          </Card>

          {/* Notifications */}
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell size={18} className="text-warning" />
                <CardTitle>Notifications</CardTitle>
              </div>
            </CardHeader>
            <div className="space-y-3">
              {[
                { key: 'email', label: 'Email Report' },
                { key: 'push', label: 'Push Alerts' },
                { key: 'reminders', label: 'Reminders' },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 border border-border/50">
                  <p className="text-sm font-semibold">{n.label}</p>
                  <button
                    onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key as keyof typeof prev] }))}
                    className={cn(
                      'w-10 h-6 rounded-full transition-all cursor-pointer relative',
                      notifications[n.key as keyof typeof notifications] ? 'bg-primary' : 'bg-muted'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 rounded-full bg-white shadow-sm transition-transform absolute top-1',
                      notifications[n.key as keyof typeof notifications] ? 'left-5' : 'left-1'
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* User Goals */}
          <Card padding="lg">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target size={18} className="text-accent" />
                <CardTitle>Your Goals</CardTitle>
              </div>
            </CardHeader>
            <div className="flex flex-wrap gap-2">
              {mockUser.goals.map((g) => (
                <Badge key={g} variant="accent">{g}</Badge>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2 text-xs">Edit Goals</Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button className="flex-1" size="lg" icon={<Save size={18} />}>Save Preferences</Button>
        <Button variant="destructive" size="lg" icon={<LogOut size={18} />}>Sign Out</Button>
      </div>
    </div>
  );
}
