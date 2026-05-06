'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

import { Bell, Clock } from 'lucide-react';
import { BsListCheck } from 'react-icons/bs';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  answerQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  startQuiz,
  hydrateQuizState,
  finishQuiz,
} from '@/app/store/quizSlice';
import {
  selectCurrentQuestion,
  selectQuiz,
  selectAnsweredCount,
  selectRemainingCount,
} from '../../../store/selectors';
import { getQuizById } from '../data/getQuiz';

import { useQuizTimer } from '../../../hooks/useQuizTimer';
import { useLocaleDirection } from '@/app/hooks/useLocaleDirection';
import { useAuth } from '@/app/hooks/useAuth';

import { ResultSection } from '../components/ResultSection';
import { QuestionDisplay } from '../components/QuestionDisplay';

export default function QuizPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useParams();
  const { dir, isRTL } = useLocaleDirection();
  const { user } = useAuth();
  const { t, i18n } = useTranslation();

  const [showNotifications, setShowNotifications] = useState(false);
  const currentLang = i18n.language as 'ar' | 'en';

  const quizId = params.quizId as string;
  const userId = user?.id || 'anonymous';

  const quiz = useAppSelector(selectQuiz);
  const currentQuestion = useAppSelector(selectCurrentQuestion);
  const answers = useAppSelector((s) => s.quiz.answers);
  const currentIndex = useAppSelector((s) => s.quiz.currentQuestionIndex);
  const timeLeft = useAppSelector((s) => s.quiz.timeLeft);
  const answeredCount = useAppSelector(selectAnsweredCount);
  const remainingCount = useAppSelector(selectRemainingCount);
  const isFinished = useAppSelector((s) => s.quiz.isFinished);

  const displayName = user?.name ?? t('nav.student');
  const avatarSrc = user?.avatar ?? '/profile.jpg';

  useQuizTimer(quizId);

  useEffect(() => {
    dispatch(hydrateQuizState({ quizId, userId }));
  }, [quizId, userId, dispatch]);

  useEffect(() => {
    if (!quiz) {
      const data = getQuizById(quizId);
      if (data) {
        dispatch(startQuiz({ quiz: data, userId }));
      } else {
        router.push('/userDashboard/quizzes');
      }
    }
  }, [quiz, quizId, userId, dispatch, router]);

  useEffect(() => {
    if (timeLeft <= 0 && quiz) {
      dispatch(finishQuiz());
    }
  }, [timeLeft, dispatch, quiz]);

  if (!quiz) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const totalTime = quiz.duration * 60;
  const timeProgress = (timeLeft / totalTime) * 100;
  const sidebarProgress = (answeredCount / quiz.questions.length) * 100;
  const isDanger = timeLeft <= 60;
  const optionLabels = currentLang === 'ar' ? ['أ', 'ب', 'ج', 'د'] : ['A', 'B', 'C', 'D'];

  const handleAnswer = (questionId: string, answerId: string) => {
    dispatch(answerQuestion({ questionId, answerId }));
  };

  const handleNext = () => {
    if (currentIndex === quiz.questions.length - 1) {
      dispatch(finishQuiz());
    } else {
      dispatch(nextQuestion());
    }
  };

  const handlePrev = () => {
    dispatch(prevQuestion());
  };

  const handleGoTo = (index: number) => {
    dispatch(goToQuestion(index));
  };

  return (
    <div className="min-h-screen bg-page-bg text-main-text p-4" dir={dir}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">
            <Link href="/">
              <Image
                src="/logo.png"
                alt={String(t('nav.brand'))}
                width={89}
                height={49}
                className="object-contain"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              aria-label={String(t('nav.notifications'))}
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative rounded-xl p-2 transition hover:bg-orange-50 dark:hover:bg-slate-800"
            >
              <Bell className="h-5 w-5 text-[#113555] dark:text-slate-200" />
              <span className="absolute top-1 h-2 w-2 rounded-full bg-[#FF6400] rtl:left-1 ltr:right-1" />
            </button>

            <div className="flex items-center gap-2">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-gray-100">
                <Link href="/">
                  <Image
                    src={avatarSrc}
                    alt={String(t('nav.userProfile'))}
                    fill
                    className="object-cover"
                  />
                </Link>
              </div>
              <span className="text-sm font-semibold hidden md:block">
                {String(displayName)}
              </span>
            </div>
          </div>
        </div>

        {isFinished ? (
          <ResultSection
            quiz={quiz}
            answers={answers}
            studentName={String(displayName)}
            currentLang={currentLang}
          />
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between rounded-3xl px-6 py-3 bg-background shadow-sm">
              <h1 className="font-bold text-main-text text-lg">
                {String(quiz.title[currentLang] || quiz.title)}
              </h1>
              <div className="relative w-32 overflow-hidden rounded-full bg-page-bg px-3 py-1.5 border border-gray-100">
                <div
                  className={`absolute inset-0 transition-all duration-1000 ${
                    isDanger ? 'bg-red-500/20' : 'bg-primary/10'
                  }`}
                  style={{ width: `${timeProgress}%` }}
                />
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <Clock className={`h-4 w-4 ${isDanger ? 'text-red-600' : 'text-primary'}`} />
                  <span className={`text-sm font-bold ${isDanger ? 'text-red-600' : 'text-primary'}`}>
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="hidden w-[320px] lg:block">
                <div className="rounded-2xl bg-background p-4 shadow-sm border border-gray-50">
                  <h3 className="flex items-center gap-3 mb-4 font-bold text-main-text">
                    <BsListCheck className="w-6 h-6 text-primary" />
                    {String(t('quiz.progress'))}
                  </h3>

                  <div className="mb-4 grid grid-cols-2 gap-3 text-center">
                    <div className="rounded-xl bg-page-bg p-3 border border-gray-50">
                      <p className="text-primary font-bold text-xl">{remainingCount}</p>
                      <p className="text-[10px] uppercase tracking-wider text-sub-text">
                        {String(t('quiz.remaining'))}
                      </p>
                    </div>
                    <div className="rounded-xl bg-page-bg p-3 border border-gray-50">
                      <p className="text-primary font-bold text-xl">{answeredCount}</p>
                      <p className="text-[10px] uppercase tracking-wider text-sub-text">
                        {String(t('quiz.answered'))}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6 h-1.5 w-full rounded-full bg-gray-100">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${sidebarProgress}%` }}
                    />
                  </div>

                  <div className="space-y-2 max-h-112.5 overflow-y-auto custom-scrollbar pr-1">
                    {quiz.questions.map((q, index) => {
                      const isAnswered = !!answers[q.id];
                      const isCurrent = index === currentIndex;

                      return (
                        <button
                          key={q.id}
                          onClick={() => handleGoTo(index)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all ${
                            isCurrent
                              ? 'bg-primary/5 border border-primary/20 shadow-sm'
                              : 'hover:bg-gray-50 dark:hover:bg-slate-800 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex items-center justify-center w-8 h-8 text-xs font-bold rounded-lg shadow-sm transition-colors ${
                                isCurrent
                                  ? 'bg-primary text-white'
                                  : 'bg-page-bg text-primary border border-gray-100'
                              }`}
                            >
                              {index + 1}
                            </span>
                            <span
                              className={`text-xs text-start line-clamp-1 ${
                                isCurrent ? 'font-bold' : 'text-sub-text'
                              }`}
                            >
                              {String(q.text[currentLang] || q.text)}
                            </span>
                          </div>
                          {isAnswered ? (
                            <div className="bg-primary/10 p-1 rounded-full">
                              <svg
                                className="h-3 w-3 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          ) : isCurrent ? (
                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                          ) : (
                            <div className="h-2 w-2 rounded-full bg-gray-200" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {currentQuestion && (
                <QuestionDisplay
                  question={currentQuestion}
                  answers={answers}
                  currentIndex={currentIndex}
                  totalQuestions={quiz.questions.length}
                  isFinished={isFinished}
                  currentLang={currentLang}
                  optionLabels={optionLabels}
                  isRTL={isRTL}
                  onAnswer={handleAnswer}
                  onNext={handleNext}
                  onPrev={handlePrev}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
