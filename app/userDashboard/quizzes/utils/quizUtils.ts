import { Quiz } from '../models/types'

export type QuizStatus = 'available' | 'locked' | 'completed'

export const getQuizStatus = (
  quiz: Quiz,
  completedQuizIds: string[]
): QuizStatus => {
  const now = Date.now()
  const startTime = new Date(quiz.startAt).getTime()
  const endTime = new Date(quiz.endAt).getTime()

  if (completedQuizIds.includes(quiz.id)) return 'completed'
  if (now < startTime || now > endTime) return 'locked'
  return 'available'
}


export const safeParseStringArray = (value: string | null): string[] => {
  if (!value) return []
  try {
    const parsed: unknown = JSON.parse(value)
    if (!Array.isArray(parsed)) return []
    const ids: string[] = []
    for (const item of parsed) {
      if (typeof item === 'string') ids.push(item)
    }
    return ids
  } catch {
    return []
  }
}

export const loadCompletedQuizIds = (): string[] => {
  if (typeof window === 'undefined') return []
  return safeParseStringArray(localStorage.getItem('completedQuizzes'))
}

export const saveCompletedQuizIds = (quizIds: string[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem('completedQuizzes', JSON.stringify(quizIds))
}

export const markQuizCompleted = (quizId: string): void => {
  const existing = loadCompletedQuizIds()
  if (existing.includes(quizId)) return
  saveCompletedQuizIds([...existing, quizId])
}


