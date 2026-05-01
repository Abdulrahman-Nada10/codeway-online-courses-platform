'use client';

import { Check, X } from 'lucide-react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from "react-i18next";
const {t}= useTranslation()
interface QuestionDisplayProps {
  question: {
    id: string;
    text: { ar: string; en: string };
    answers: { id: string; text: { ar: string; en: string } }[];
    correctAnswerId: string;
  };
  answers: Record<string, string>;
  currentIndex: number;
  totalQuestions: number;
  isFinished: boolean;
  currentLang: 'ar' | 'en';
  optionLabels: string[];
  isRTL: boolean;
  t: (key: string) => string;
  onAnswer: (questionId: string, answerId: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const QuestionDisplay = ({
  question,
  answers,
  currentIndex,
  totalQuestions,
  isFinished,
  currentLang,
  optionLabels,
  isRTL,
  t,
  onAnswer,
  onNext,
  onPrev,
}: QuestionDisplayProps) => {
  const userAnswer = answers[question.id];

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex-1">
      <div className="mb-2 flex justify-between items-end text-sm">
        <div className="flex gap-1.5 font-medium">
          <span className="text-sub-text">{String(t('quiz.question'))}</span>
          <span className="text-primary font-bold">{currentIndex + 1}</span>
          <span className="text-sub-text">{String(t('common.from'))}</span>
          <span className="text-main-text font-bold">{totalQuestions}</span>
        </div>
        <span className="bg-gray-100 dark:bg-slate-800 rounded-lg px-3 py-1 text-xs font-bold text-sub-text">
          {Math.round(progress)}%
        </span>
      </div>

      <div className="mb-6 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-2 rounded-full bg-primary transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-3xl bg-background p-6 md:p-8 shadow-md border border-gray-50">
        <div className="mb-8">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-lg mb-4">
            {String(t('quiz.question'))} {currentIndex + 1}
          </span>
          <h2 className="text-xl md:text-2xl font-bold leading-relaxed text-main-text">
            {String(question.text[currentLang] || question.text)}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {question.answers.map((ans, i) => {
            const selected = answers[question.id] === ans.id;
            const isCorrectAnswer = ans.id === question.correctAnswerId;
            const isUserWrong = selected && !isCorrectAnswer && isFinished;

            let borderClass = 'border-gray-100';
            let bgClass = '';

            if (isFinished) {
              if (isCorrectAnswer) {
                borderClass = 'border-green-500 bg-green-50';
              } else if (selected) {
                borderClass = 'border-red-500 bg-red-50';
              }
            } else {
              if (selected) {
                borderClass = 'border-primary bg-primary/5 shadow-sm';
                bgClass = 'hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-slate-800';
              } else {
                bgClass = 'hover:border-primary/30 hover:bg-gray-50 dark:hover:bg-slate-800';
              }
            }

            return (
              <button
                key={ans.id}
                disabled={isFinished}
                onClick={() => onAnswer(question.id, ans.id)}
                className={`group w-full flex items-center justify-between rounded-2xl border-2 px-5 py-4 transition-all duration-200 ${
                  selected && !isFinished
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : borderClass
                } ${!isFinished ? bgClass : ''}`}
              >
                <span
                  className={`text-base transition-colors ${
                    isFinished
                      ? isCorrectAnswer
                        ? 'font-bold text-green-700'
                        : selected
                        ? 'font-bold text-red-700'
                        : 'text-main-text'
                      : selected
                      ? 'font-bold text-primary'
                      : 'text-main-text'
                  }`}
                >
                  {String(ans.text[currentLang] || ans.text)}
                </span>
                {isFinished ? (
                  isCorrectAnswer ? (
                    <div className="bg-green-100 p-2 rounded-full">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                  ) : selected ? (
                    <div className="bg-red-100 p-2 rounded-full">
                      <X className="h-5 w-5 text-red-600" />
                    </div>
                  ) : null
                ) : (
                  <span
                    className={`flex items-center justify-center w-8 h-8 text-sm font-bold rounded-xl transition-all ${
                      selected
                        ? 'bg-primary text-white scale-110 shadow-md'
                        : 'bg-gray-100 text-sub-text group-hover:bg-primary/10'
                    }`}
                  >
                    {optionLabels[i]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {!userAnswer && isFinished && (
          <p className="mt-4 text-red-600 font-bold">{t('quiz.notAnswered')}</p>
        )}

        <div className="mt-10 flex justify-between items-center border-t border-gray-100 pt-6">
          <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className={`flex items-center gap-2 border rounded-xl px-5 py-3 text-sm font-bold transition-all ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed'
                : 'hover:bg-gray-100 active:scale-95'
            }`}
          >
            {isRTL ? (
              <MdKeyboardArrowRight className="w-6 h-6" />
            ) : (
              <MdKeyboardArrowLeft className="w-6 h-6" />
            )}
            {String(t('quiz.prev'))}
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3 text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary-hover active:scale-95 transition-all"
          >
            <span>
              {currentIndex === totalQuestions - 1
                ? String(t('quiz.submit'))
                : String(t('quiz.next'))}
            </span>
            {isRTL ? (
              <MdKeyboardArrowLeft className="w-6 h-6" />
            ) : (
              <MdKeyboardArrowRight className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
