'use client'

import {useState } from 'react'

import { loadCompletedQuizIds } from './quizUtils'

export const useCompletedQuizzes = (): string[] => {
  const [completedIds] = useState<string[]>(()=>loadCompletedQuizIds())

  return completedIds
}

