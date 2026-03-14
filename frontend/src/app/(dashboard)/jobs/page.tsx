'use client';
import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { JobChip } from '@/components/ui/Badge';
import { mockJobs } from '@/lib/mock-data';
import { formatDate, formatTime } from '@/lib/utils';
import { Plus, Clock, ExternalLink } from 'lucide-react';

export default function JobsPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Upload Queue</h1>
          <p className="text-muted text-sm mt-1">Track your submitted recordings and their analysis progress.</p>
        </div>
        <Link href="/record">
          <Button icon={<Plus size={16} />}>Upload another</Button>
        </Link>
      </div>

      {/* Microcopy */}
      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 text-sm">
        <p className="text-primary font-medium">Queued — we&apos;ll analyze pronunciation, grammar and provide tips.</p>
        <p className="text-muted text-xs mt-1">Processing typically takes 3–8 minutes depending on recording length.</p>
      </div>

      {/* Job List */}
      <div className="space-y-3">
        {mockJobs.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`} className="no-underline block">
            <Card hover padding="md">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  job.status === 'done' ? 'bg-success/10' : job.status === 'processing' ? 'bg-primary/10' : job.status === 'queued' ? 'bg-warning/10' : 'bg-danger/10'
                }`}>
                  <Clock size={20} className={
                    job.status === 'done' ? 'text-success' : job.status === 'processing' ? 'text-primary' : job.status === 'queued' ? 'text-warning' : 'text-danger'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm truncate">{job.title}</p>
                    <JobChip status={job.status} />
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted">
                      {formatDate(job.createdAt)} at {formatTime(job.createdAt)}
                    </span>
                    {job.queuePosition && (
                      <span className="text-xs text-warning">Queue position: #{job.queuePosition}</span>
                    )}
                    {job.estimatedTime && (
                      <span className="text-xs text-muted">~{job.estimatedTime} min</span>
                    )}
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="px-2 py-0.5 bg-surface rounded-full text-[10px] text-muted">{tag}</span>
                    ))}
                  </div>
                </div>
                <ExternalLink size={16} className="text-muted flex-shrink-0" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
