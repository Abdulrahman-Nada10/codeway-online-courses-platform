import { Clock } from 'lucide-react';

interface QuizHeaderProps {
  title: string;
  minutes: number;
  seconds: string;
  timeProgress: number;
  isDanger: boolean;
  t: any;
}

export const QuizHeader = ({ title, minutes, seconds, timeProgress, isDanger, t }: QuizHeaderProps) => (
  <div className="mb-4 flex items-center justify-between rounded-3xl px-6 py-3 bg-background">
    <h1 className="font-bold text-main-text">{title}</h1>
    <div className="relative w-28 overflow-hidden rounded-full bg-page-bg px-3 py-1.5">
      <div
        className={`absolute inset-0 transition-all duration-1000 ${isDanger ? 'bg-red-500' : 'bg-[#D9D9D9]'}`}
        style={{ width: `${timeProgress}%` }}
      />
      <div className="relative z-10 flex items-center justify-center gap-3">
        <Clock className="h-4 w-4 text-black" />
        <span className="text-sm font-bold text-red-600">{minutes}:{seconds}</span>
      </div>
    </div>
  </div>
);