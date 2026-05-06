'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocaleDirection } from "../../hooks/useLocaleDirection";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectAuthUser } from '@/app/store/authSlice';
import { hydrateQuizState, startQuiz } from '@/app/store/quizSlice';
import { mockQuizzes } from './data/mockQuizzes';
import { getQuizStatus } from './utils/quizUtils';
import { useCompletedQuizzes } from './utils/useCompletedQuizzes';

export default function QuizzesPage() {
  const { t, i18n } = useTranslation();
  const { dir } = useLocaleDirection();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentLang = i18n.language as 'ar' | 'en';

  const authUser = useAppSelector(selectAuthUser);
  const userId = authUser?.id || 'anonymous';
  
  const completedIds = useCompletedQuizzes();

  const quizzesWithStatus = mockQuizzes.map((q) => ({
    quiz: q,
    status: getQuizStatus(q, completedIds),
  }));

  const availableQuizzes = quizzesWithStatus.filter((x) => x.status !== 'locked');

  useEffect(() => {
    dispatch(hydrateQuizState({ quizId: 'web-basics', userId }));
  }, [dispatch, userId]);

  if (availableQuizzes.length === 0) {
    return (
      <div className="mt-26 min-h-screen bg-page-bg" dir={dir}>
        <div className="rtl:lg:mr-75 ltr:lg:ml-75">
          <main className="flex flex-col items-center justify-center p-4 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white">
              <BookOpen className="h-8 w-8" />
            </div>
            <div className="w-full max-w-xl rounded-xl bg-input-bg py-6 text-center font-semibold text-main-text">
              لا توجد اختبارات حالية
            </div>
          </main>
        </div>
      </div>
    )
  }



  const handleStart = (qid: string) => {
    const q = mockQuizzes.find((x) => x.id === qid);
    if (!q) return;
    dispatch(startQuiz({ quiz: q, userId }));
    router.push(`/userDashboard/quizzes/${q.id}`);
  };

  const handleReview = (qid: string) => {
    router.push(`/userDashboard/quizzes/${qid}`);
  };


  return (
    <div className="mt-26 min-h-screen bg-page-bg" dir={dir}>
      <div className="rtl:lg:mr-75 ltr:lg:ml-75">
        <main className="flex flex-col items-center justify-center p-4 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white">
            <BookOpen className="h-8 w-8" />
          </div>

          {quizzesWithStatus.length === 0 || availableQuizzes.length === 0 ? (
            <div className="w-full max-w-xl rounded-xl bg-input-bg py-6 text-center font-semibold text-main-text">
              لا توجد اختبارات حالية
            </div>
          ) : (
            <div className="w-full max-w-3xl">
              <h1 className="mb-2 font-cairo text-xl font-bold text-main-text sm:text-2xl">
                {t('quiz.description')}
              </h1>

              <div className="space-y-4">
                {quizzesWithStatus.map(({ quiz, status }) => {
                  const isLocked = status === 'locked';
                  const isCompleted = status === 'completed';

                  const statusLabel =
                    status === 'available'
                      ? 'Available'
                      : status === 'completed'
                        ? 'Completed'
                        : quiz.startAt && quiz.endAt
                          ? 'Locked'
                          : 'Locked';

                  return (
                    <div
                      key={quiz.id}
                      className="rounded-xl bg-white px-6 py-4 shadow-[0px_0px_4px_0px_#00000040] text-center"
                    >
                      <div className="mb-2 flex items-center justify-between gap-4">
                        <h2 className="font-cairo text-base font-bold text-main-text text-right">
                          {String(quiz.title[currentLang] || quiz.title)}
                        </h2>
                        <span className="text-xs font-semibold text-sub-text">{statusLabel}</span>
                      </div>

                      <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm font-semibold">
                            {quiz.duration} {t('quiz.minutes')}
                          </span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-primary">
                          <BookOpen className="h-4 w-4" />
                          <span className="text-sm font-semibold">
                            {quiz.questions.length} {t('quiz.questions')}
                          </span>
                        </div>
                      </div>

                      {status === 'locked' ? (
                        <div className="w-full rounded-xl bg-input-bg py-3 text-center font-semibold text-sub-text">
                          {new Date().getTime() < new Date(quiz.startAt).getTime()
                            ? 'لم يبدأ بعد'
                            : 'انتهى الوقت'}
                        </div>
                      ) : isCompleted ? (
                        <button
                          onClick={() => handleReview(quiz.id)}
                          className="w-full rounded-xl bg-primary py-3 text-white hover:bg-primary-hover shadow-lg transition-all active:scale-95"
                        >
                          عرض النتيجة
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStart(quiz.id)}
                          disabled={isLocked}
                          className="w-full rounded-xl bg-primary py-3 text-white hover:bg-primary-hover shadow-lg transition-all active:scale-95 disabled:opacity-50"
                        >
                          ابدأ
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-sub-text">{t('quiz.note')}</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
