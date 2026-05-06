'use client';

import { BsListCheck } from "react-icons/bs";
import { Check, AlertCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";

type Question = {
  id: string;
  text: Record<string, string> | string;
};

type QuizSidebarProps = {
  questions: Question[];
  answers: Record<string, string>;
  currentIndex: number;
  onGoTo: (index: number) => void;
  remaining: number;
  answered: number;
  progress: number;
  currentLang: string;
};

export const QuizSidebar = ({
  questions,
  answers,
  currentIndex,
  onGoTo,
  remaining,
  answered,
  progress,
  currentLang,
}: QuizSidebarProps) => {
  const { t } = useTranslation();

  return (
    <div className="hidden w-[320px] lg:block">
      <div className="rounded-2xl bg-background p-4 shadow-sm">
        <h3 className="flex gap-3 mb-4 font-bold">
          <BsListCheck className='w-7 h-7 text-primary'/>
          {String(t("quiz.progress"))}
        </h3>

        <div className="mb-4 grid grid-cols-2 gap-3 text-center">
          <div className="rounded-xl bg-input-bg p-3">
            <p className="text-primary font-bold text-lg">{remaining}</p>
            <p className="text-xs text-sub-text">{String(t("quiz.remaining"))}</p>
          </div>

          <div className="rounded-xl bg-input-bg p-3">
            <p className="text-primary font-bold text-lg">{answered}</p>
            <p className="text-xs text-sub-text">{String(t("quiz.answered"))}</p>
          </div>
        </div>

        <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="space-y-2 max-h-105 overflow-y-auto">
          {questions.map((q, index) => (
            <button
              key={q.id}
              onClick={() => onGoTo(index)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 ${
                index === currentIndex
                  ? 'bg-input-bg'
                  : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs px-3 rounded-md py-2 ${
                    index === currentIndex
                      ? 'bg-primary text-white'
                      : 'bg-page-bg text-primary'
                  }`}
                >
                  {index + 1}
                </span>

                <span className="text-xs line-clamp-1">
                  {typeof q.text === "object"
                    ? q.text[currentLang]
                    : q.text}
                </span>
              </div>

              {answers[q.id] ? (
                <Check className="h-4 w-4 text-primary border rounded-full" />
              ) : index === currentIndex ? (
                <AlertCircle className="h-4 w-4 text-primary" />
              ) : (
                <div className="h-3 w-3 rounded-full border" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};