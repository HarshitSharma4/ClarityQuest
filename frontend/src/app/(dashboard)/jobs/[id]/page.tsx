'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { JobChip } from '@/components/ui/Badge';
import { mockJobs } from '@/lib/mock-data';
import { formatTime } from '@/lib/utils';
import { ArrowLeft, RefreshCw, Share2, CheckCircle2, Loader2, Circle, XCircle } from 'lucide-react';

export default function JobDetailPage() {
  const job = mockJobs[1]; // processing job

  const stageIcons: Record<string, React.ReactNode> = {
    success: <CheckCircle2 size={18} className="text-success" />,
    running: <Loader2 size={18} className="text-primary animate-spin" />,
    pending: <Circle size={18} className="text-muted-light" />,
    failed: <XCircle size={18} className="text-danger" />,
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link href="/jobs" className="p-2 rounded-xl hover:bg-surface transition-colors text-muted hover:text-foreground">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">{job.title}</h1>
            <JobChip status={job.status} />
          </div>
          <p className="text-xs text-muted mt-0.5">Job ID: {job.id} · Created: {formatTime(job.createdAt)}</p>
        </div>
      </div>

      <Card padding="lg">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-semibold">Processing Pipeline</h2>
          <Button variant="ghost" size="sm" icon={<RefreshCw size={14} />}>Refresh</Button>
        </div>
        <p className="text-xs text-muted mb-6">
          Transcribing with Whisper (high-accuracy model) — this may take a few minutes.
        </p>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-primary rounded-full transition-all duration-1000"
            style={{ width: `${(job.stages.filter(s => s.status === 'success').length / job.stages.length) * 100}%` }}
          />
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {job.stages.map((stage, i) => (
            <div key={stage.name} className="relative flex gap-4">
              {/* Connector line */}
              {i < job.stages.length - 1 && (
                <div className="absolute left-[21px] top-[36px] w-0.5 h-[calc(100%-12px)]">
                  <div className={`w-full h-full ${stage.status === 'success' ? 'bg-success' : 'bg-border'}`} />
                </div>
              )}
              <div className="flex-shrink-0 w-[42px] flex justify-center pt-1.5">
                {stageIcons[stage.status]}
              </div>
              <div className={`flex-1 pb-6 ${i === job.stages.length - 1 ? 'pb-0' : ''}`}>
                <div className="flex items-center justify-between">
                  <p className={`font-medium text-sm ${stage.status === 'pending' ? 'text-muted' : 'text-foreground'}`}>
                    {stage.name}
                  </p>
                  {stage.timestamp && (
                    <span className="text-xs text-muted">{formatTime(stage.timestamp)}</span>
                  )}
                </div>
                {stage.status === 'running' && (
                  <p className="text-xs text-primary mt-1">In progress...</p>
                )}
                {stage.status === 'failed' && (
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-danger">Failed — </p>
                    <button className="text-xs text-primary font-medium hover:underline cursor-pointer">Retry</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Link href="/record"><Button variant="secondary" icon={<RefreshCw size={14} />}>Upload another</Button></Link>
        <Link href="/dashboard"><Button variant="ghost">Go to Dashboard</Button></Link>
        <Button variant="ghost" icon={<Share2 size={14} />} disabled>Share</Button>
      </div>
    </div>
  );
}
