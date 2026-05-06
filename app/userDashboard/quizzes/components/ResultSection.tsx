'use client';

import { Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ResultSectionProps {
  quiz: {
    id: string;
    title: { ar: string; en: string };
    questions: {
      id: string;
      text: { ar: string; en: string };
      answers: { id: string; text: { ar: string; en: string } }[];
      correctAnswerId: string;
    }[];
  };
  answers: Record<string, string>;
  studentName: string;
  currentLang: 'ar' | 'en';
}

export const ResultSection = ({
  quiz,
  answers,
  studentName,
  currentLang,

}: ResultSectionProps) => {
  const { t } = useTranslation();
  let correctCount = 0;
  const totalQuestions = quiz.questions.length;

  quiz.questions.forEach((question) => {
    const userAnswerId = answers[question.id];
    if (userAnswerId === question.correctAnswerId) {
      correctCount++;
    }
  });

  const percentage = Math.round((correctCount / totalQuestions) * 100);

  const getScoreColor = () => {
    if (percentage < 50) return 'text-red-600';
    if (percentage <= 80) return 'text-green-500';
    return 'text-green-800';
  };

  const getScoreBgColor = () => {
    if (percentage < 50) return 'bg-red-50 border-red-200';
    if (percentage <= 80) return 'bg-green-50 border-green-200';
    return 'bg-green-100 border-green-300';
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-background p-6 md:p-8 shadow-md border border-gray-50">
        <h2 className="text-2xl font-bold text-main-text mb-6">{t("quiz.result")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
<div className="rounded-2xl bg-page-bg p-4 border border-gray-100">
            <p className="text-sm text-sub-text mb-1">{studentName}</p>
            <p className="font-bold text-main-text">{String(quiz.title[currentLang] || quiz.title)}</p>
          </div>

          <div className={`rounded-2xl p-4 border ${getScoreBgColor()}`}>
            <p className="text-sm text-sub-text mb-1">{t('quiz.score')}</p>
            <p className={`text-3xl font-bold ${getScoreColor()}`}>
              {correctCount}/{totalQuestions}
            </p>
            <p className={`text-lg font-bold ${getScoreColor()}`}>{percentage}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 pt-6">
          <div className="flex items-center gap-2">
            <span className="text-sub-text">{t('quiz.answered')}:</span>
            <span className="font-bold text-primary">{correctCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sub-text">{t('quiz.remaining')}:</span>
            <span className="font-bold text-red-600">{totalQuestions - Object.keys(answers).filter((qId) => answers[qId]).length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold text-main-text">{t('quiz.reviewAnswers')}</h3>

        {quiz.questions.map((question, index) => {
          const userAnswerId = answers[question.id];
          const isCorrect = userAnswerId === question.correctAnswerId;
          const isNotAnswered = !userAnswerId;
          // const correctAnswer = question.answers.find(
          //   (a) => a.id === question.correctAnswerId
          // );

          return (
            <div
              key={question.id}
              className="rounded-3xl bg-background p-6 shadow-md border border-gray-50"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex items-center justify-center w-8 h-8 text-sm font-bold rounded-xl bg-primary text-white shrink-0">
                  {index + 1}
                </span>
<h4 className="text-lg font-bold text-main-text">
                  {String(question.text[currentLang] || question.text)}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3 ml-11">
                {question.answers.map((answer) => {
                  const isUserChoice = answer.id === userAnswerId;
                  const isCorrectAnswer = answer.id === question.correctAnswerId;

                  let borderClass = 'border-gray-100';
                  const bgClass = '';
                  let icon = null;

                  if (isCorrectAnswer) {
                    borderClass = 'border-green-500 bg-green-50';
                    icon = <Check className="h-5 w-5 text-green-600" />;
                  } else if (isUserChoice && !isCorrect) {
                    borderClass = 'border-red-500 bg-red-50';
                    icon = <X className="h-5 w-5 text-red-600" />;
                  }

                  return (
                    <div
                      key={answer.id}
                      className={`flex items-center justify-between rounded-2xl border-2 px-5 py-4 ${borderClass} ${bgClass}`}
                    >
<span className={`text-base ${isCorrectAnswer ? 'font-bold text-green-700' : isUserChoice ? 'text-red-700' : 'text-main-text'}`}>
                        {String(answer.text[currentLang] || answer.text)}
                      </span>
                      {icon}
                    </div>
                  );
                })}
              </div>

              {isNotAnswered && (
                <p className="mt-4 ml-11 text-red-600 font-bold">{t('quiz.notAnswered')}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
