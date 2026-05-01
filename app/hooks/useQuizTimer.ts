import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tick, hydrateQuizState } from '../store/quizSlice';
import { selectQuiz } from '../store/selectors';


export const useQuizTimer = (quizId: string, userId?: string) => {
  const dispatch = useAppDispatch();
  const quiz = useAppSelector(selectQuiz);
  const timeLeft = useAppSelector((state) => state.quiz.timeLeft);
  const isFinished = useAppSelector((state) => state.quiz.isFinished);
  const endTime = useAppSelector((state) => state.quiz.endTime);

  const syncTime = useCallback(() => {
    dispatch(tick());
  }, [dispatch]);

  useEffect(() => {
    if (!quizId || !userId || userId === 'anonymous') return;
    dispatch(hydrateQuizState({ quizId, userId }));
  }, [dispatch, quizId, userId]);

  useEffect(() => {
    syncTime();
    
    const interval = setInterval(syncTime, 1000);
    return () => clearInterval(interval);
  }, [syncTime]);

  useEffect(() => {
    if (isFinished || !endTime) return;
    
    const checkFinish = () => {
      if (Date.now() >= endTime) {
        dispatch(tick());
      }
    };
    
    const timeout = setTimeout(checkFinish, (endTime - Date.now()) % 1000);
    return () => clearTimeout(timeout);
  }, [isFinished, endTime, dispatch]);

  return { timeLeft, isFinished };
};
