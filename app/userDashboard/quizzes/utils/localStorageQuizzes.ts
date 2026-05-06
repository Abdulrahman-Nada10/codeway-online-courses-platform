export const COMPLETED_QUIZZES_KEY = 'completedQuizzes'

export const readCompletedQuizIds = (): string[] => {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(COMPLETED_QUIZZES_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
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

export const writeCompletedQuizIds = (quizIds: string[]): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(COMPLETED_QUIZZES_KEY, JSON.stringify(quizIds))
}

export const addCompletedQuizId = (quizId: string): void => {
  const existing = readCompletedQuizIds()
  if (existing.includes(quizId)) return
  writeCompletedQuizIds([...existing, quizId])
}


