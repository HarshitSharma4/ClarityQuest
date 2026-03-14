'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  mockMentors, 
  mockVoices, 
  mockTopics,
  Mentor,
  Voice,
  Topic 
} from '@/lib/mock-data';
import { 
  Mic, 
  Bot, 
  User, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Check,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Target,
  Users,
  History,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

type Message = {
  id: string;
  role: 'ai' | 'user';
  text: string;
  type?: 'question' | 'feedback' | 'status';
  timestamp: Date;
};

export default function AIMentorPage() {
  const [step, setStep] = useState<'mentor' | 'voice' | 'topic' | 'chat'>('mentor');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const startChat = () => {
    if (!selectedMentor || !selectedTopic) return;
    
    setStep('chat');
    const introMsg: Message = {
      id: '1',
      role: 'ai',
      text: `Hello! I'm ${selectedMentor.name}, your ${selectedMentor.role}. I'm here to help you practice ${selectedTopic.name}.`,
      type: 'status',
      timestamp: new Date(),
    };
    
    const firstQuestion: Message = {
      id: '2',
      role: 'ai',
      text: `Shall we begin? To start, what's your main goal for today's ${selectedTopic.name} session?`,
      type: 'question',
      timestamp: new Date(),
    };
    
    setMessages([introMsg]);
    setTimeout(() => {
      setMessages(prev => [...prev, firstQuestion]);
    }, 1000);
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      const userMsg: Message = {
        id: Math.random().toString(),
        role: 'user',
        text: "I want to improve my confidence and handle tough questions better.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMsg]);

      setTimeout(() => {
        const feedback: Message = {
          id: Math.random().toString(),
          role: 'ai',
          text: `That's a great goal! Confidence comes with practice. Let's dive deeper.`,
          type: 'feedback',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, feedback]);
      }, 1500);
    } else {
      setIsRecording(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex flex-col pt-4">
      <AnimatePresence mode="wait">
        {step === 'mentor' && (
          <motion.div 
            key="mentor"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <h1 className="text-3xl font-black tracking-tight mb-2">Choose Your AI Mentor</h1>
              <p className="text-muted-foreground font-medium">Select a specialist to guide your conversation practice.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {mockMentors.map((mentor) => (
                <Card 
                  key={mentor.id}
                  padding="none"
                  hover
                  className={cn(
                    "overflow-hidden cursor-pointer transition-all border-2",
                    selectedMentor?.id === mentor.id ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-border/40"
                  )}
                  onClick={() => setSelectedMentor(mentor)}
                >
                  <div className="aspect-[4/3] bg-muted relative flex items-center justify-center">
                    <Bot size={64} className="text-primary/20" />
                    {selectedMentor?.id === mentor.id && (
                      <div className="absolute top-4 right-4 bg-primary text-white p-1.5 rounded-full shadow-lg">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <Badge variant="secondary" className="text-[10px] uppercase font-black">{mentor.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{mentor.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((exp, i) => (
                        <span key={i} className="text-[10px] font-black uppercase tracking-tighter text-primary bg-primary/10 px-2 py-0.5 rounded">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-auto flex justify-end py-6">
              <Button 
                size="lg" 
                disabled={!selectedMentor}
                onClick={() => setStep('voice')}
                className="rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-sm"
              >
                Next: Select Voice <ChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'voice' && (
          <motion.div 
            key="voice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <button onClick={() => setStep('mentor')} className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-primary mb-4 uppercase tracking-widest transition-colors">
                <ChevronLeft size={16} /> Back to Mentor
              </button>
              <h1 className="text-3xl font-black tracking-tight mb-2">Select a Voice</h1>
              <p className="text-muted-foreground font-medium">How should your mentor sound during the practice?</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockVoices.map((voice) => (
                <Card 
                  key={voice.id}
                  padding="lg"
                  hover
                  className={cn(
                    "cursor-pointer text-center flex flex-col items-center gap-4 border-2 transition-all",
                    selectedVoice?.id === voice.id ? "border-primary bg-primary/5 shadow-lg" : "border-border/40"
                  )}
                  onClick={() => setSelectedVoice(voice)}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-3xl flex items-center justify-center transition-colors",
                    selectedVoice?.id === voice.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    <Volume2 size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold">{voice.name}</h3>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">{voice.type}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="w-full mt-2 group">
                    <Headphones size={14} className="mr-2 group-hover:animate-pulse" /> Preview
                  </Button>
                </Card>
              ))}
            </div>
            <div className="mt-auto flex justify-end py-6">
              <Button 
                size="lg" 
                disabled={!selectedVoice}
                onClick={() => setStep('topic')}
                className="rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-sm"
              >
                Next: Choose Topic <ChevronRight size={18} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'topic' && (
          <motion.div 
            key="topic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-8">
              <button onClick={() => setStep('voice')} className="flex items-center gap-2 text-xs font-black text-muted-foreground hover:text-primary mb-4 uppercase tracking-widest transition-colors">
                <ChevronLeft size={16} /> Back to Voice
              </button>
              <h1 className="text-3xl font-black tracking-tight mb-2">Conversation Topic</h1>
              <p className="text-muted-foreground font-medium">What would you like to focus on today?</p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockTopics.map((topic) => (
                <Card 
                  key={topic.id}
                  padding="lg"
                  hover
                  className={cn(
                    "cursor-pointer flex items-start gap-6 border-2 transition-all",
                    selectedTopic?.id === topic.id ? "border-primary bg-primary/5 shadow-md" : "border-border/40"
                  )}
                  onClick={() => setSelectedTopic(topic)}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                    selectedTopic?.id === topic.id ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                  )}>
                    {topic.id === 't1' && <MessageSquare size={24} />}
                    {topic.id === 't2' && <ShieldCheck size={24} />}
                    {topic.id === 't3' && <Target size={24} />}
                    {topic.id === 't4' && <Users size={24} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{topic.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
                  </div>
                  {selectedTopic?.id === topic.id && <div className="ml-auto mt-1"><Check className="text-primary" /></div>}
                </Card>
              ))}
            </div>
            <div className="mt-auto flex justify-end py-6">
              <Button 
                size="lg" 
                disabled={!selectedTopic}
                onClick={startChat}
                className="rounded-2xl px-12 h-14 font-black uppercase tracking-widest text-sm bg-gradient-to-r from-primary to-accent hover:shadow-premium transition-all"
              >
                Start Practice <Sparkles size={18} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'chat' && (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 flex flex-col min-h-0 bg-card/40 rounded-[2.5rem] border border-border/40 overflow-hidden shadow-premium relative"
          >
            {/* Chat Header */}
            <div className="p-5 border-b border-border/40 bg-card/60 backdrop-blur-md flex items-center justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {selectedMentor?.id === 'm1' && <Bot size={28} className="text-primary" />}
                  {selectedMentor?.id === 'm2' && <Bot size={28} className="text-primary" />}
                  {selectedMentor?.id === 'm3' && <Bot size={28} className="text-primary" />}
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-wider">{selectedMentor?.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-success">Live Mentoring</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                <div className="hidden sm:block">
                  <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Topic</p>
                  <p className="text-xs font-bold text-primary">{selectedTopic?.name}</p>
                </div>
                <button 
                  onClick={() => setStep('topic')} 
                  className="w-10 h-10 rounded-xl bg-muted hover:bg-primary/10 hover:text-primary transition-all flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex w-full",
                      msg.role === 'user' ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "flex max-w-[75%] gap-4",
                      msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                    )}>
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-auto shadow-sm",
                        msg.role === 'user' ? "bg-accent/10 border border-accent/20" : "bg-primary/10 border border-primary/20"
                      )}>
                        {msg.role === 'user' ? <User size={18} className="text-accent" /> : <Bot size={18} className="text-primary" />}
                      </div>
                      <div className={cn(
                        "p-5 rounded-3xl text-sm font-medium leading-relaxed relative shadow-subtle border border-white/10",
                        msg.role === 'user' 
                          ? "bg-accent text-accent-fg rounded-br-none" 
                          : msg.type === 'question'
                          ? "bg-card text-foreground rounded-bl-none border-b-4 border-primary/30"
                          : "bg-muted text-muted-foreground rounded-bl-none italic"
                      )}>
                        {msg.text}
                        {msg.type === 'question' && (
                          <div className="mt-4 flex items-center gap-3 opacity-40 text-[9px] font-black uppercase tracking-[0.2em] border-t border-border pt-3">
                             <Volume2 size={12} /> Playing via {selectedVoice?.name} Voice
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interaction Bar */}
            <div className="p-8 bg-gradient-to-t from-card to-transparent border-t border-border/10 backdrop-blur-md">
              <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
                <div className="flex items-center gap-8">
                  <button className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                    <History size={20} />
                  </button>
                  <div className="relative">
                    <AnimatePresence>
                      {isRecording && (
                        <motion.div 
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.4, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="absolute -inset-4 rounded-full border-2 border-destructive/20 -z-10 animate-ping"
                        />
                      )}
                    </AnimatePresence>
                    <button
                      onClick={handleRecord}
                      className={cn(
                        'w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-premium cursor-pointer relative z-20 overflow-hidden',
                        isRecording 
                          ? 'bg-destructive scale-110 shadow-[0_0_35px_rgba(239,68,68,0.4)]' 
                          : 'bg-primary hover:bg-primary/95 hover:scale-105 active:scale-95'
                      )}
                    >
                      {isRecording ? <div className="w-7 h-7 bg-white rounded-md" /> : <Mic size={36} className="text-white" />}
                    </button>
                  </div>
                  <button className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors">
                    <Lightbulb size={20} />
                  </button>
                </div>
                
                <div className="text-center">
                  <p className={cn(
                    "text-xs font-black uppercase tracking-[0.3em] mb-2",
                    isRecording ? "text-destructive animate-pulse" : "text-muted-foreground"
                  )}>
                    {isRecording ? "Recording your response..." : "Tap to speak with your mentor"}
                  </p>
                  <p className="text-[10px] text-muted-foreground/60 font-medium italic">
                    {selectedMentor?.name} is listening carefully for your pacing and clarity.
                  </p>
                </div>
              </div>
            </div>

            {/* Success Popup */}
            <AnimatePresence>
              {messages.length > 0 && messages[messages.length-1].type === 'feedback' && (
                <motion.div
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-success text-success-fg px-8 py-4 rounded-[2rem] shadow-premium font-black text-xs uppercase tracking-widest flex items-center gap-4 z-50 whitespace-nowrap border-b-4 border-black/10"
                >
                  <Sparkles size={20} className="animate-spin-slow" />
                  Level Up: Clarity +5 XP!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
