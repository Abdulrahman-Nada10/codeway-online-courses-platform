import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { tick } from '../store/quizSlice';

export const useTimer = () => {
  const dispatch = useAppDispatch();
  const timeLeft = useAppSelector((state) => state.quiz.timeLeft);
  const isFinished = useAppSelector((state) => state.quiz.isFinished);

  useEffect(() => {
    if (isFinished) return;

    const interval = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(interval);
  }, [dispatch, isFinished]);

  return { timeLeft };
};