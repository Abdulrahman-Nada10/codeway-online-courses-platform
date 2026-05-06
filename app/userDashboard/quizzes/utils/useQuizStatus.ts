'use client'

import { useMemo } from 'react'

import { Quiz } from '../models/types'
import { QuizStatus, getQuizStatus } from './quizUtils'
import { useCompletedQuizzes } from './useCompletedQuizzes'

export const useQuizStatus = (quiz: Quiz): QuizStatus => {
  const completedIds = useCompletedQuizzes()

  return useMemo(() => getQuizStatus(quiz, completedIds), [quiz, completedIds])
}


