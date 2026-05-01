'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from "../../hooks/useLocaleDirection";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuthUser } from '@/app/store/authSlice';
import { hydrateQuizState, startQuiz } from '@/app/store/quizSlice';
import { getQuizById } from './data/getQuiz';
import { selectQuizIsFinished, selectQuizCompleted } from '../../store/selectors';

export default function QuizzesPage() {
  const { t, i18n } = useTranslation();
  const { dir } = useLocaleDirection();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLang = i18n.language as 'ar' | 'en';

  const authUser = useAppSelector(selectAuthUser);
  const userId = authUser?.id || 'anonymous';
  
  const quizId = 'web-basics';
  const quiz = getQuizById(quizId);
  
  const isFinished = useAppSelector(selectQuizIsFinished);
  const isCompleted = useAppSelector(selectQuizCompleted);
  const quizState = useAppSelector((state) => state.quiz);
  
  const score = quizState.quiz?.questions?.filter(
    (q: any) => quizState.answers[q.id] === q.correctAnswerId
  ).length || 0;

  useEffect(() => {
    dispatch(hydrateQuizState({ quizId, userId }));
  }, [dispatch, quizId, userId]);

  if (!quiz) return null;

  const handleStart = () => {
    if (isCompleted) {
      alert(t('quiz.alreadyCompleted'));
      return;
    }
    
    dispatch(startQuiz({ quiz, userId }));
    router.push(`/userDashboard/quizzes/${quiz.id}`);
  };

  return (
    <div className="mt-26 min-h-screen bg-page-bg" dir={dir}>
      <div className="rtl:lg:mr-75 ltr:lg:ml-75">
        <main className="flex flex-col items-center justify-center p-4 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white">
            <BookOpen className="h-8 w-8" />
          </div>

          <h1 className="mb-2 font-cairo text-xl font-bold text-main-text sm:text-2xl">
            {quiz.title[currentLang]}
          </h1>

          <p className="mb-6 max-w-xl font-cairo text-sm text-sub-text">
            {t('quiz.description')}
          </p>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-xl bg-white px-6 py-4 shadow-[0px_0px_4px_0px_#00000040]">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  {t('quiz.instantResult')}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white px-6 py-4 shadow-[0px_0px_4px_0px_#00000040]">
              <div className="flex items-center justify-center gap-2 text-primary">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  {quiz.duration} {t('quiz.minutes')}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-white px-6 py-4 shadow-[0px_0px_4px_0px_#00000040]">
              <div className="flex items-center justify-center gap-2 text-primary">
                <BookOpen className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  {quiz.questions.length} {t('quiz.questions')}
                </span>
              </div>
            </div>
          </div>

          {isFinished || isCompleted ? (
            <div className="w-full max-w-xl rounded-xl bg-green-100 py-3 text-center font-semibold text-green-700">
              {t('quiz.completed')} ({score}/{quiz.questions.length})
            </div>
          ) : (
            <button
              onClick={handleStart}
              className="w-full max-w-xl rounded-xl bg-primary py-3 text-white hover:bg-primary-hover shadow-lg transition-all active:scale-95"
            >
              {t('quiz.start')}
            </button>
          )}

          <p className="mt-4 text-xs text-sub-text">
            {t('quiz.note')}
          </p>
        </main>
      </div>
    </div>
  );
}