'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  CalendarDays,
  CirclePlay,
  Download,
  FileText,
  MessageCircle,
  Mic,
  MonitorPlay,
  Send,
  Settings,
  Share2,
  Smile,
  Volume2,
} from 'lucide-react';
import { LiveSession, SessionMessage } from '../types';
import { incrementSessionViewers, useLiveSessionMetrics } from './useLiveSessionMetrics';

const roomTabs = [
  { id: 'chat', label: 'دردشة' },
  { id: 'questions', label: 'الأسئلة' },
  { id: 'poll', label: 'استطلاع الرأي' },
] as const;

type RoomTab = (typeof roomTabs)[number]['id'];

function VideoPanel({
  session,
  viewers,
  elapsedTime,
  totalDuration,
}: {
  session: LiveSession;
  viewers: number;
  elapsedTime: string;
  totalDuration: string;
}) {
  return (
    <section className="rounded-[28px] bg-white p-4 shadow-[0_10px_35px_rgba(17,53,85,0.06)]">
      <div className="relative overflow-hidden rounded-3xl bg-[#030712]">
        <div className="relative aspect-[16/8.1]">
          <Image src={session.image} alt={session.title} fill className="object-cover" priority />
        </div>

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="rounded-md bg-[#ff1a1a] px-3 py-1 text-xs font-semibold text-white">LIVE</span>
          <span className="rounded-md bg-black/60 px-2 py-1 text-xs text-white">{viewers}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-4 mb-3 h-1 rounded-full bg-white/20">
            <div className="h-full w-[70%] rounded-full bg-[#ff6400]" />
          </div>
          <div className="flex items-center justify-between px-4 pb-4 text-white">
            <div className="flex items-center gap-3 text-sm">
              <CirclePlay className="h-5 w-5" />
              <Volume2 className="h-5 w-5" />
              <span>{elapsedTime} / {totalDuration}</span>
            </div>
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5" />
              <MonitorPlay className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceIcon({ type }: { type: 'pdf' | 'link' }) {
  if (type === 'pdf') {
    return <FileText className="h-4 w-4 text-[#ff6400]" />;
  }

  return <Download className="h-4 w-4 text-[#ff6400]" />;
}

function SessionDetails({ session }: { session: LiveSession }) {
  return (
    <section className="rounded-[28px] bg-white p-5 shadow-[0_10px_35px_rgba(17,53,85,0.06)]">
      <div className="flex flex-col gap-4 border-b border-[#f0e6df] pb-6 xl:flex-row xl:items-start xl:justify-between" dir='rtl'>
        <div className="flex items-center gap-3 xl:order-2">
          <button
            type="button"
            className="flex h-11 items-center gap-2 rounded-xl border border-[#f0e6df] px-5 text-sm font-medium text-[#6b7280]"
          >
            <Share2 className="h-4 w-4" />
            <span>مشاركة</span>
          </button>
          <button type="button" className="flex h-11 items-center gap-2 rounded-xl bg-[#ff6400] px-5 text-sm font-semibold text-white">
            <span>+</span>
            <span>التقويم</span>
          </button>
        </div>

        <div className="text-right xl:order-1">
          <h1 className="max-w-175 text-3xl font-semibold leading-[1.6] text-[#111827]">{session.title}</h1>
          <div className="mt-3 flex flex-wrap items-end justify-start gap-5 text-sm text-[#8c8c8c]">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{session.dateLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <span>{session.timeLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 pt-6 lg:grid-cols-[minmax(0,1fr)_240px]">


        <div className="space-y-3">
          <h2 className="text-xl font-medium text-[#8c8c8c]" dir='rtl'>المصادر</h2>
          <div className="space-y-3" dir='rtl'>
            {session.resources?.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between rounded-xl border border-[#e5e7eb] px-4 py-3 text-sm text-[#374151]"
              >
                <Download className="h-4 w-4 text-[#9ca3af]" />
                <div className="flex items-center gap-2">
                  <span>{resource.name}</span>
                  <ResourceIcon type={resource.type} />
                </div>
              </div>
            ))}
          </div>
        </div>

             <div className="text-right">
          <h2 className="text-xl font-medium text-[#8c8c8c]">الوصف</h2>
          <p className="mt-4 max-w-130 text-base leading-8 text-[#4b5563]">{session.description}</p>

          <div className="mt-8 flex items-center justify-end gap-3">
            <div className="text-right">
              <p className="text-base font-semibold text-[#111827]">{session.instructor}</p>
              <p className="text-sm text-[#9ca3af]">{session.instructorRole}</p>
            </div>
            <div className="relative h-14 w-14 overflow-hidden rounded-full">
              <Image src={session.instructorAvatar} alt={session.instructor} fill className="object-cover" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function ChatMessage({ message }: { message: SessionMessage }) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative h-10 w-10 overflow-hidden rounded-full">
        <Image src={message.avatar} alt={message.author} fill className="object-cover" />
      </div>
      <div className="flex-1 text-right">
        <p className="text-sm font-semibold text-[#111827]">{message.author}</p>
        <div className="mt-2 rounded-2xl bg-[#f2f4f7] px-4 py-3 text-sm leading-7 text-[#8b8b8b]">{message.text}</div>
      </div>
    </div>
  );
}

function PollCard({ session }: { session: LiveSession }) {
  if (!session.poll) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[#ffd1b2] bg-[#fff3eb] p-4">
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-[#9f6e55]">مباشر</span>
        <span className="font-semibold text-[#ff6400]">استطلاع نشط</span>
      </div>
      <p className="text-right text-lg font-semibold text-[#111827]">{session.poll.question}</p>
      <div className="mt-4 space-y-3">
        {session.poll.options.map((option) => (
          <div key={option.id} className="overflow-hidden rounded-xl border border-[#ffbf99] bg-white/70">
            <div className="relative h-11 bg-[#fff0e6]">
              <div 
              className="absolute inset-y-0 right-0 bg-[#ffb890]"
               style={{ width: `${option.percentage}%` }} 
               />
              <div className="relative flex h-full items-center justify-between px-3 text-sm text-[#6b3d21]">
                <span>{option.label}</span>
                <span>{option.percentage}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatPanel({ session }: { session: LiveSession }) {
  const [activeTab, setActiveTab] = useState<RoomTab>('chat');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<SessionMessage[]>(session.messages ?? []);

  useEffect(() => {
    setMessages(session.messages ?? []);
  }, [session.messages]);

  const visibleMessages = useMemo(() => {
    if (activeTab === 'questions') {
      return messages.filter((message) => message.text.includes('؟') || message.text.includes('?'));
    }

    return messages;
  }, [activeTab, messages]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedValue = inputValue.trim();
    if (!trimmedValue) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `local-${Date.now()}`,
        author: 'محمد محمود',
        avatar: '/profile.jpg',
        text: trimmedValue,
      },
    ]);
    setInputValue('');
    setActiveTab('chat');
  };

  return (
    <section className="flex min-h-250 flex-col rounded-[28px] bg-white shadow-[0_10px_35px_rgba(17,53,85,0.06)]" dir="rtl">
      <div className="border-b border-[#f0e6df] px-5 pt-4">
        <div className="flex items-center justify-between text-right">
          {roomTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-2 pb-3 text-base ${
                tab.id === activeTab ? 'border-[#ff6400] text-[#111827]' : 'border-transparent text-[#111827]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto px-5 py-5">
        {activeTab === 'poll' ? <PollCard session={session} /> : null}

        {activeTab !== 'poll'
          ? visibleMessages.map((message, index) => (
              <div key={message.id}>
                <ChatMessage message={message} />
                {activeTab === 'chat' && index === 2 ? <div className="mt-5"><PollCard session={session} /></div> : null}
              </div>
            ))
          : null}
      </div>

      <div className="border-t border-[#f0e6df] px-5 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 rounded-2xl border border-[#f0e6df] px-4 py-3">
          <button 
          type="submit" 
          aria-label=' send message'
          title='submit'
          className="rounded-lg bg-[#ff6400] p-1.5 text-white"
          >
            <Send className="h-4 w-4" />
          </button>
          <button 
          type="button" 
          aria-label='Smile Emoji'
          title='Emoji'
          className="text-[#c4c4c4]">
            <Smile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="...اطرح سؤالك"
            className="flex-1 bg-transparent text-right text-sm outline-none placeholder:text-[#c4c4c4]"
          />
        </form>
      </div>
    </section>
  );
}

export function LiveSessionRoom({ session }: { session: LiveSession }) {
  const { viewers, elapsedTime, totalDuration, setViewers } = useLiveSessionMetrics(session);

  useEffect(() => {
    if (session.category !== 'live') {
      return;
    }

    const joinedKey = `live-session-joined:${session.id}`;

    if (window.sessionStorage.getItem(joinedKey) === 'true') {
      return;
    }

    setViewers(incrementSessionViewers(session.id, viewers));
    window.sessionStorage.setItem(joinedKey, 'true');
  }, [session.category, session.id, viewers, setViewers]);

  return (
    <div className="min-h-screen bg-[#fff3eb] overflow-x-hidden" dir="rtl">

      <div className="lg:mr-20 xl:mr-64">

        <main className="px-4 pb-8 pt-28 lg:px-8 lg:py-6">
          <div className="mx-auto max-w-375">
            <div className="grid gap-4 2xl:grid-cols-[minmax(0,1fr)_320px]" dir="ltr">
              <div className="space-y-4">
                <VideoPanel session={session} viewers={viewers} elapsedTime={elapsedTime} totalDuration={totalDuration} />
                <SessionDetails session={session} />
              </div>

              <ChatPanel session={session} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
