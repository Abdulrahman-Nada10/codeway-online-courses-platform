'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MoreHorizontal, Users, Bell, Smile, Link2, Send, Atom, Pin, 
  MessageSquare, Image as ImageIcon, FileText, Camera, Mic, BarChart2,
  X, Reply, Plus, Play, Pause, File as FileIcon, ArrowRight, SendHorizontal
} from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import Link from 'next/link';

interface Message {
  id: string;
  text: string;
  author: string;
  authorInitial: string;
  time: string;
  isMine: boolean;
  role?: string;
  reactions: Record<string, number>;
  myReactions?: Record<string, boolean>;
  replyTo?: Message | null;
  type?: 'text' | 'image' | 'poll' | 'audio' | 'document';
  attachmentUrl?: string;
  fileName?: string;
  pollData?: {
    question: string;
    options: { id: string; text: string; votes: number }[];
    totalVotes: number;
    votedByMe?: string;
  };
  audioDuration?: number;
}

const mockMembers = [
  "م. خالد", "محمد محمود", "أحمد ك.", "سارة م.", "الكل"
];

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'صباح الخير 🌿، اليوم سنغطي درس Hooks المتقدمة. أرجو مراجعة الفيديو السابق قبل الجلسة.',
    author: 'م. خالد',
    authorInitial: 'خ',
    time: '10:02 ص',
    isMine: false,
    role: 'مدرس',
    reactions: { '🔥': 7, '👍': 9 }
  },
  {
    id: '2',
    text: 'أنا واجهت نفس المشكلة قبل أسبوع، الحل كان نقل الـ reducer خارج الكومبوننت. أقدر أشارك السنيبت لو حابين 🙌',
    author: 'محمد محمود',
    authorInitial: 'م',
    time: '10:02 ص',
    isMine: false,
    reactions: { '👍': 4 }
  }
];

export default function CommunityChatPage({ params }: { params: { id: string } }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  
  const [replyToMessage, setReplyToMessage] = useState<Message | null>(null);
  const [pinnedMessage, setPinnedMessage] = useState<string>('اقرأ قواعد المجتمع قبل المشاركة، وكن لطيفاً مع زملائك');
  
  const [contextMenuFor, setContextMenuFor] = useState<string | null>(null);
  const [reactionsMenuFor, setReactionsMenuFor] = useState<string | null>(null);
  
  // Attachments State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadType, setUploadType] = useState<'image' | 'doc' | null>(null);
  
  // Poll State
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  
  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  const renderMessageText = (text: string, isMine: boolean) => {
    if (!text) return null;
    
    const escapeRegExp = (str: string) => {
      return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    };
    
    const sortedMembers = [...mockMembers].sort((a, b) => b.length - a.length);
    const memberPatterns = sortedMembers.map(escapeRegExp).join('|');
    const regex = new RegExp(`(@(?:${memberPatterns}|[^\\s@]+))`, 'g');
    
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span 
            key={index} 
            className={`font-bold rounded-md px-1.5 py-0.5 mx-0.5 text-xs inline-block transition-all duration-200 ${
              isMine 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm cursor-pointer' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer'
            }`}
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  useEffect(() => {
    if (isRecording) {
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    }
    return () => {
      if (recordingIntervalRef.current) clearInterval(recordingIntervalRef.current);
    };
  }, [isRecording]);

  const createBaseMessage = (): Message => ({
    id: Date.now().toString(),
    text: '',
    author: 'أنت',
    authorInitial: 'أ',
    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    isMine: true,
    reactions: {},
  });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMessage: Message = {
      ...createBaseMessage(),
      text: inputText,
      replyTo: replyToMessage,
      type: 'text'
    };

    setMessages([...messages, newMessage]);
    setInputText('');
    setReplyToMessage(null);
    setShowEmojiPicker(false);
    setShowMentions(false);
    setShowAttachments(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newMessage: Message = {
      ...createBaseMessage(),
      type: uploadType === 'image' ? 'image' : 'document',
      attachmentUrl: url,
      fileName: file.name
    };

    setMessages([...messages, newMessage]);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setShowAttachments(false);
  };

  const handleCreatePoll = () => {
    if (!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2) return;
    
    const newMessage: Message = {
      ...createBaseMessage(),
      type: 'poll',
      pollData: {
        question: pollQuestion,
        options: pollOptions.filter(o => o.trim()).map(o => ({ id: Math.random().toString(), text: o, votes: 0 })),
        totalVotes: 0
      }
    };

    setMessages([...messages, newMessage]);
    setShowPollModal(false);
    setPollQuestion('');
    setPollOptions(['', '']);
  };

  const handleVotePoll = (messageId: string, optionId: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.pollData && !msg.pollData.votedByMe) {
        const newOptions = msg.pollData.options.map(opt => 
          opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
        );
        return {
          ...msg,
          pollData: { ...msg.pollData, options: newOptions, totalVotes: msg.pollData.totalVotes + 1, votedByMe: optionId }
        };
      }
      return msg;
    }));
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (recordingTime > 0) {
      const newMessage: Message = {
        ...createBaseMessage(),
        type: 'audio',
        audioDuration: recordingTime
      };
      setMessages([...messages, newMessage]);
    }
    setRecordingTime(0);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    } else if (e.key === '@') {
      setShowMentions(true);
    }
  };

  const handleInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputText(val);
    
    const words = val.split(' ');
    const lastWord = words[words.length - 1];
    if (lastWord.startsWith('@')) {
      setShowMentions(true);
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (name: string) => {
    const words = inputText.split(' ');
    words.pop(); 
    const newText = words.join(' ') + (words.length > 0 ? ' ' : '') + '@' + name + ' ';
    setInputText(newText);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const onEmojiClick = (emojiData: any) => {
    setInputText(prev => prev + emojiData.emoji);
  };

  const toggleReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const currentReactions = { ...msg.reactions };
        const myReactions = { ...msg.myReactions };
        
        // Find if I have any existing active reaction on this message
        const existingReaction = Object.keys(myReactions).find(key => myReactions[key]);
        
        if (existingReaction) {
          // If the existing reaction is the SAME one, toggle it off
          if (existingReaction === emoji) {
            myReactions[emoji] = false;
            currentReactions[emoji] = Math.max(0, (currentReactions[emoji] || 1) - 1);
            if (currentReactions[emoji] === 0) {
              delete currentReactions[emoji];
            }
          } else {
            // If it's a DIFFERENT reaction, remove the old one first, and then add the new one
            // 1. Remove old one
            myReactions[existingReaction] = false;
            currentReactions[existingReaction] = Math.max(0, (currentReactions[existingReaction] || 1) - 1);
            if (currentReactions[existingReaction] === 0) {
              delete currentReactions[existingReaction];
            }
            
            // 2. Add new one
            myReactions[emoji] = true;
            currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
          }
        } else {
          // If no existing reaction, simply add the new one
          myReactions[emoji] = true;
          currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
        }
        
        return { ...msg, reactions: currentReactions, myReactions };
      }
      return msg;
    }));
    setReactionsMenuFor(null);
    setContextMenuFor(null);
  };

  const handleAction = (id: string) => {
    if (id === 'image' || id === 'camera') {
      setUploadType('image');
      setTimeout(() => fileInputRef.current?.click(), 10);
    } else if (id === 'doc') {
      setUploadType('doc');
      setTimeout(() => fileInputRef.current?.click(), 10);
    } else if (id === 'poll') {
      setShowPollModal(true);
      setShowAttachments(false);
    } else if (id === 'audio') {
      setIsRecording(true);
      setShowAttachments(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-[calc(100vh-160px)] lg:h-[calc(100vh-180px)] mt-22 lg:mt-26 lg:mr-75 font-cairo overflow-hidden">
      <div className="w-full h-full font-cairo flex flex-col max-w-full">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept={uploadType === 'image' ? "image/*" : ".pdf,.doc,.docx,.txt"}
        onChange={handleFileUpload} 
      />

      {/* Main Chat Container */}
      <div className="flex-1 bg-white md:rounded-3xl shadow-sm md:border border-gray-100 flex flex-col overflow-hidden relative w-full">
        
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b border-gray-100 z-10 bg-white">
          <div className="flex gap-2 md:gap-4 text-gray-600">
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors"><Users className="w-5 h-5" /></button>
            <button className="hover:bg-gray-100 p-2 rounded-full transition-colors"><Bell className="w-5 h-5" /></button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/userDashboard/community" className="hover:bg-gray-100 p-2 rounded-full transition-colors text-gray-600 mr-1" title="العودة إلى المجتمعات">
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="bg-[#FFF5EF] p-3 rounded-full text-[#FF6400]">
               <Atom className="w-6 h-6" />
            </div>
            <div className="text-right">
               <h2 className="text-lg md:text-xl font-bold text-[#000000]">مجتمع React الأساسي</h2>
               <p className="text-sm text-gray-500">50 نشط • 248 عضو</p>
            </div>
          </div>
        </div>

        {/* Pinned Message */}
        <div className="bg-white px-6 py-3 border-b border-gray-100 flex items-center justify-end gap-2 text-sm z-10 shadow-sm">
          <span className="text-gray-700 max-w-[80%] truncate" dir="rtl">{pinnedMessage}</span>
          <span className="font-bold text-[#000000]">مثبت:</span>
          <Pin className="w-4 h-4 text-gray-800" />
        </div>

        {/* Chat Area */}
        <div 
          className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#f9fafb]/50 space-y-6 flex flex-col"
          onClick={() => {
            setContextMenuFor(null);
            setReactionsMenuFor(null);
            setShowEmojiPicker(false);
            setShowAttachments(false);
            setShowMentions(false);
          }}
        >
           {/* Date Separator */}
           <div className="flex items-center justify-center relative my-4">
             <div className="absolute w-full h-px bg-gray-200"></div>
             <span className="relative bg-white px-4 py-1 border border-gray-100 rounded-full text-xs font-bold text-gray-700 shadow-sm">اليوم</span>
           </div>

           {/* Messages Loop */}
           {messages.map((msg) => (
             <div 
               key={msg.id} 
               className={`flex flex-col gap-1 w-full max-w-[85%] md:max-w-3xl relative group ${msg.isMine ? 'self-end items-end' : 'self-start items-start'}`}
               onContextMenu={(e) => {
                 e.preventDefault();
                 setContextMenuFor(msg.id);
               }}
             >
                <div className={`flex items-center gap-3 mb-1 ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${msg.isMine ? 'bg-[#FFD4B5] text-[#FF6400]' : 'bg-[#D6F0E0] text-[#0B6E23]'}`}>
                     {msg.authorInitial}
                   </div>
                   <span className="font-bold text-sm text-[#000000]">{msg.author}</span>
                   <span className="text-xs text-gray-500">{msg.time}</span>
                   {msg.role && (
                     <span className="bg-[#7F56D9] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{msg.role}</span>
                   )}
                </div>

                <div className={`relative p-4 rounded-2xl max-w-full text-sm leading-relaxed ${msg.isMine ? 'bg-[#FF6400] text-white shadow-sm rounded-tl-sm text-right' : 'bg-white border border-gray-100 text-gray-800 shadow-sm rounded-tr-sm text-right'}`} dir="rtl">
                  {msg.replyTo && (
                     <div className="bg-black/10 p-2 rounded-lg mb-2 text-xs border-r-4 border-white/50">
                       <span className="font-bold block mb-1">رد على {msg.replyTo.author}</span>
                       <span className="truncate block opacity-90">{msg.replyTo.text}</span>
                     </div>
                  )}
                  
                  {/* Text */}
                  {msg.text && <p>{renderMessageText(msg.text, msg.isMine)}</p>}

                  {/* Image Attachment */}
                  {msg.type === 'image' && msg.attachmentUrl && (
                    <img src={msg.attachmentUrl} alt="attachment" className="max-w-full md:max-w-xs rounded-xl mt-2 cursor-pointer hover:opacity-90" />
                  )}

                  {/* Document Attachment */}
                  {msg.type === 'document' && msg.fileName && (
                    <div className="flex items-center gap-3 bg-black/5 p-3 rounded-xl mt-2">
                      <div className="p-2 bg-white rounded-lg text-purple-500"><FileIcon className="w-6 h-6" /></div>
                      <div className="flex flex-col">
                         <span className="font-bold truncate max-w-[150px]">{msg.fileName}</span>
                         <span className="text-xs opacity-80">مستند</span>
                      </div>
                    </div>
                  )}

                  {/* Audio Attachment */}
                  {msg.type === 'audio' && msg.audioDuration && (
                    <div className="flex items-center gap-3 bg-black/5 p-3 rounded-xl mt-2 min-w-[200px]">
                      <button className="p-2 bg-white rounded-full text-[#FF6400] hover:bg-gray-50"><Play className="w-4 h-4 fill-current" /></button>
                      <div className="flex-1">
                        <div className="h-1 bg-black/20 rounded-full w-full"><div className="h-full w-0 bg-white rounded-full"></div></div>
                      </div>
                      <span className="text-xs font-bold">{formatTime(msg.audioDuration)}</span>
                    </div>
                  )}

                  {/* Poll Attachment */}
                  {msg.type === 'poll' && msg.pollData && (
                    <div className={`mt-2 p-3 rounded-xl ${msg.isMine ? 'bg-white/10' : 'bg-gray-50'} flex flex-col gap-2 min-w-[250px]`}>
                      <div className="flex items-start gap-2 mb-2">
                        <BarChart2 className="w-5 h-5 flex-shrink-0" />
                        <span className="font-bold">{msg.pollData.question}</span>
                      </div>
                      {msg.pollData.options.map(opt => {
                         const percent = msg.pollData?.totalVotes ? Math.round((opt.votes / msg.pollData.totalVotes) * 100) : 0;
                         const isVoted = msg.pollData?.votedByMe === opt.id;
                         return (
                           <button 
                             key={opt.id} 
                             onClick={() => handleVotePoll(msg.id, opt.id)}
                             className={`relative overflow-hidden w-full text-right p-2 rounded-lg border ${isVoted ? 'border-white md:border-[#FF6400]' : 'border-black/10'} hover:border-[#FF6400] hover:bg-[#FF6400]/10 hover:text-black transition-colors`}
                           >
                             <div className={`absolute top-0 right-0 h-full ${msg.isMine ? 'bg-white/20' : 'bg-[#FF6400]/10'} -z-10 transition-all duration-500`} style={{ width: `${percent}%` }}></div>
                             <div className="flex justify-between items-center z-10">
                               <span>{opt.text}</span>
                               <span className="text-xs font-bold">{percent}%</span>
                             </div>
                           </button>
                         )
                      })}
                      <span className="text-xs opacity-70 mt-1">{msg.pollData.totalVotes} أصوات</span>
                    </div>
                  )}
                  
                  {/* Hover Menu trigger (Desktop) */}
                  <div className={`absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-md rounded-lg flex items-center p-1 border border-gray-100 ${msg.isMine ? '-right-14' : '-left-14'}`} onClick={(e) => e.stopPropagation()}>
                    <button onClick={(e) => { e.stopPropagation(); setReactionsMenuFor(msg.id); setContextMenuFor(null); }} className="p-1 hover:bg-gray-100 rounded text-gray-500"><Smile className="w-4 h-4" /></button>
                    <button onClick={(e) => { e.stopPropagation(); setContextMenuFor(msg.id); setReactionsMenuFor(null); }} className="p-1 hover:bg-gray-100 rounded text-gray-500"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Reactions */}
                 {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                   <div className={`flex gap-1 mt-1 flex-wrap ${msg.isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                      {Object.entries(msg.reactions).map(([emoji, count]) => {
                        const isMyReaction = msg.myReactions?.[emoji];
                        return (
                          <button 
                            key={emoji} 
                            onClick={(e) => { e.stopPropagation(); toggleReaction(msg.id, emoji); }}
                            className={`border rounded-full px-2 py-0.5 text-xs flex items-center gap-1 shadow-sm transition-all duration-200 ${
                              isMyReaction 
                                ? 'bg-orange-50 border-[#FF6400] text-[#FF6400] scale-105 ring-2 ring-[#FF6400]/20 font-bold' 
                                : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            <span>{emoji}</span>
                            <span className={isMyReaction ? 'text-[#FF6400]' : 'text-gray-700'}>{count}</span>
                          </button>
                        );
                      })}
                   </div>
                 )}
 
                 {/* Context Menu (Right Click / 3 Dots with Reactions) */}
                 {contextMenuFor === msg.id && (
                   <div 
                     onClick={(e) => e.stopPropagation()}
                     className={`absolute z-50 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 w-64 font-medium text-sm text-right flex flex-col gap-2 ${msg.isMine ? 'right-0 top-6' : 'left-0 top-6'}`}
                   >
                     {/* Reactions Bar inside Context Menu */}
                     <div className="flex justify-between items-center px-2 py-1 border-b border-gray-100 pb-2 flex-row-reverse" onClick={(e) => e.stopPropagation()}>
                       {['😢', '😲', '😂', '❤️', '👍'].map(emoji => {
                         const isMyReaction = msg.myReactions?.[emoji];
                         return (
                           <button 
                             key={emoji} 
                             className={`hover:scale-125 transition-transform text-lg rounded-full p-1 transition-all duration-200 ${
                               isMyReaction ? 'bg-orange-100 ring-2 ring-[#FF6400] scale-110' : ''
                             }`} 
                             onClick={(event) => { event.stopPropagation(); toggleReaction(msg.id, emoji); }}
                           >
                             {emoji}
                           </button>
                         );
                       })}
                     </div>
 
                     {/* Action Options */}
                     <div className="space-y-1">
                       <button 
                         className="w-full text-right px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 flex items-center gap-2 flex-row-reverse justify-start transition-colors"
                         onClick={() => { setReplyToMessage(msg); setContextMenuFor(null); inputRef.current?.focus(); }}
                       >
                         <Reply className="w-4 h-4" /> رد
                       </button>
                       {msg.isMine && (
                         <button 
                           className="w-full text-right px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-700 flex items-center gap-2 flex-row-reverse justify-start transition-colors"
                           onClick={() => { setPinnedMessage(msg.text); setContextMenuFor(null); }}
                         >
                           <Pin className="w-4 h-4" /> تثبيت (لـ 12 ساعة)
                         </button>
                       )}
                     </div>
                   </div>
                 )}
 
                 {/* Reactions Menu (WhatsApp Style - Hover Triggered) */}
                 {reactionsMenuFor === msg.id && (
                   <div 
                     onClick={(e) => e.stopPropagation()}
                     className={`absolute -top-10 z-50 bg-white border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.1)] rounded-full px-4 py-2 flex items-center gap-3 text-2xl ${msg.isMine ? 'right-0' : 'left-0'}`}
                   >
                     {['😢','😲','😂','❤️','👍'].map(emoji => {
                       const isMyReaction = msg.myReactions?.[emoji];
                       return (
                         <button 
                           key={emoji} 
                           className={`hover:scale-125 transition-transform origin-bottom rounded-full p-1 transition-all duration-200 ${
                             isMyReaction ? 'bg-orange-100 ring-2 ring-[#FF6400] scale-110' : ''
                           }`} 
                           onClick={(event) => { event.stopPropagation(); toggleReaction(msg.id, emoji); }}
                         >
                           {emoji}
                         </button>
                       );
                     })}
                   </div>
                 )}
             </div>
           ))}
           
           <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-100 z-20 flex flex-col relative">
           {/* Reply Banner */}
           {replyToMessage && (
             <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-between text-sm" dir="rtl">
               <div className="flex items-center gap-2 text-gray-600">
                 <Reply className="w-4 h-4 text-[#FF6400]" />
                 <span>الرد على <span className="font-bold">{replyToMessage.author}</span>: {replyToMessage.text.substring(0, 50)}...</span>
               </div>
               <button onClick={() => setReplyToMessage(null)} className="text-gray-400 hover:text-gray-700"><X className="w-4 h-4" /></button>
             </div>
           )}

           <div className="p-3 md:p-4 flex items-center justify-between gap-2 md:gap-4 relative">
             
             {/* Send Button (Right Side in RTL) */}
             <button 
               onClick={handleSendMessage}
               disabled={!inputText.trim()}
               className={`p-3 md:p-4 rounded-full transition-colors flex-shrink-0 flex items-center justify-center ${inputText.trim() ? 'bg-[#FF6400] text-white hover:bg-[#E55A00] shadow-md hover:shadow-lg' : 'bg-[#FFF5EF] text-[#FF6400]'}`}
             >
               <SendHorizontal className="w-5 h-5 rtl:rotate-180" />
             </button>
             
             {/* Input Bar (Left Side in RTL) */}
             <div className="flex-1 bg-[#f9fafb] border border-gray-200 rounded-full flex items-center px-2 md:px-4 py-1.5 md:py-2 relative focus-within:bg-white focus-within:border-[#FF6400] focus-within:ring-2 focus-within:ring-[#FF6400]/20 transition-all">
               
               {/* Input */}
               <input 
                 ref={inputRef}
                 type="text" 
                 value={inputText}
                 onChange={handleInputChanged}
                 onKeyDown={handleInputKeyDown}
                 placeholder="اكتب رسالتك هنا..." 
                 className="flex-1 bg-transparent border-none focus:outline-none text-right px-2 md:px-4 text-sm font-medium w-full"
                 dir="rtl"
               />
               
               {/* Icons Container */}
               <div className="flex items-center gap-1 md:gap-2 text-gray-400">
                 
                 {/* Emoji Toggle */}
                 <div className="relative">
                   <button onClick={() => {setShowEmojiPicker(!showEmojiPicker); setShowAttachments(false); setShowMentions(false);}} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors hover:text-[#FF6400]">
                     <Smile className="w-5 h-5" />
                   </button>
                   {showEmojiPicker && (
                     <div className="absolute bottom-14 left-0 md:-left-8 shadow-2xl rounded-2xl overflow-hidden z-50">
                        <EmojiPicker onEmojiClick={onEmojiClick} searchPlaceholder="البحث عن إيموجي..." />
                     </div>
                   )}
                 </div>

                 {/* Attachments Toggle */}
                 <div className="relative">
                   <button onClick={() => {setShowAttachments(!showAttachments); setShowEmojiPicker(false); setShowMentions(false);}} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors hover:text-[#FF6400]">
                     <Link2 className="w-5 h-5" />
                   </button>
                   {showAttachments && (
                     <div className="absolute bottom-12 left-0 md:-left-4 bg-white border border-gray-100 shadow-2xl rounded-2xl w-48 py-2 z-50 text-right">
                       {[
                         {icon: <ImageIcon className="w-4 h-4 text-blue-500"/>, label: 'صورة', id: 'image'},
                         {icon: <FileText className="w-4 h-4 text-purple-500"/>, label: 'مستند', id: 'doc'},
                         {icon: <Camera className="w-4 h-4 text-pink-500"/>, label: 'كاميرا', id: 'camera'},
                         {icon: <Mic className="w-4 h-4 text-orange-500"/>, label: 'مقطع صوتي', id: 'audio'},
                         {icon: <BarChart2 className="w-4 h-4 text-green-500"/>, label: 'استطلاع رأي', id: 'poll'}
                       ].map(item => (
                         <button 
                           key={item.id} 
                           onClick={() => handleAction(item.id)}
                           className="w-full text-right px-4 py-2.5 hover:bg-gray-50 text-gray-700 flex items-center gap-3 justify-start text-sm font-medium transition-colors"
                         >
                           {item.icon} {item.label}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>

                 {/* Mentions Toggle */}
                 <div className="relative">
                   <button onClick={() => {setShowMentions(!showMentions); setShowEmojiPicker(false); setShowAttachments(false);}} className="hover:bg-gray-100 p-1.5 rounded-full transition-colors font-bold text-lg text-gray-500 hover:text-[#FF6400]">@</button>
                   
                   {/* Mentions Dropdown */}
                   {showMentions && (
                     <div className="absolute bottom-14 left-0 bg-white border border-gray-100 shadow-xl rounded-2xl w-48 py-2 z-50 text-right">
                       {mockMembers.map(member => (
                         <button 
                           key={member} 
                           onClick={() => insertMention(member)}
                           className="w-full text-right px-4 py-2 hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors"
                         >
                           {member}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               </div>

             </div>
             {/* Audio Recording UI */}
             {isRecording && (
               <div className="absolute inset-0 bg-white z-30 flex items-center justify-between px-4" dir="rtl">
                 <div className="flex items-center gap-2 text-red-500 animate-pulse">
                   <Mic className="w-5 h-5" />
                   <span className="font-bold">{formatTime(recordingTime)}</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <button onClick={() => { setIsRecording(false); setRecordingTime(0); }} className="text-gray-400 hover:text-gray-700 text-sm font-bold">إلغاء</button>
                   <button onClick={handleStopRecording} className="bg-[#FF6400] text-white p-2 rounded-full hover:bg-[#E55A00] shadow-sm"><SendHorizontal className="w-4 h-4 rtl:rotate-180" /></button>
                 </div>
               </div>
             )}

           </div>
         </div>

      </div>

      {/* Poll Creation Modal */}
      {showPollModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 font-cairo shadow-2xl border border-gray-100" dir="rtl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">إنشاء استطلاع رأي</h3>
              <button onClick={() => setShowPollModal(false)} className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-full transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">السؤال</label>
                <input 
                  type="text" 
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  placeholder="اطرح سؤالك..."
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6400] focus:ring-2 focus:ring-[#FF6400]/20 transition-all text-sm font-medium"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الخيارات</label>
                {pollOptions.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-3">
                    <input 
                      type="text" 
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...pollOptions];
                        newOpts[idx] = e.target.value;
                        setPollOptions(newOpts);
                      }}
                      placeholder={`الخيار ${idx + 1}`}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF6400] focus:ring-2 focus:ring-[#FF6400]/20 transition-all text-sm font-medium"
                    />
                    {pollOptions.length > 2 && (
                      <button onClick={() => setPollOptions(pollOptions.filter((_, i) => i !== idx))} className="text-red-400 p-3 hover:bg-red-50 rounded-xl transition-colors"><X className="w-5 h-5" /></button>
                    )}
                  </div>
                ))}
                <button 
                  onClick={() => setPollOptions([...pollOptions, ''])}
                  className="text-sm font-bold text-[#FF6400] mt-1 flex items-center gap-1.5 hover:bg-[#FFF5EF] px-3 py-2 rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" /> إضافة خيار
                </button>
              </div>
              
              <button 
                onClick={handleCreatePoll}
                disabled={!pollQuestion.trim() || pollOptions.filter(o => o.trim()).length < 2}
                className="w-full py-3.5 bg-[#FF6400] text-white rounded-xl font-bold mt-6 hover:bg-[#E55A00] disabled:opacity-50 transition-colors shadow-md hover:shadow-lg"
              >
                إنشاء وإرسال
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </div>
  );
}
