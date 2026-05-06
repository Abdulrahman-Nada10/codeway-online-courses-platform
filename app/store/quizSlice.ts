import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Quiz } from '../userDashboard/quizzes/models/types';
import { markQuizCompleted } from '../userDashboard/quizzes/utils/quizUtils';






interface QuizState {
  quiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Record<string, string>; 
  timeLeft: number;
  isFinished: boolean;
  endTime: number | null;
  quizId: string | null;
  userId: string | null;
  isCompleted: boolean;
}

const initialState: QuizState = {
  quiz: null,
  currentQuestionIndex: 0,
  answers: {},
  timeLeft: 0,
  isFinished: false,
  endTime: null,
  quizId: null,
  userId: null,
  isCompleted: false,
};


export interface HydratePayload {
  quizId: string;
  userId: string;
}


export interface StartQuizPayload {
  quiz: Quiz;
  userId: string;
}


const getQuizStorageKey = (quizId: string, userId: string): string => 
  `quiz_${quizId}_${userId}`;


const getQuizDoneKey = (quizId: string, userId: string): string => 
  `quiz_done_${quizId}_${userId}`;


const isQuizAlreadyCompleted = (quizId: string, userId: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const doneKey = getQuizDoneKey(quizId, userId);
    const isDone = localStorage.getItem(doneKey);
    return isDone === 'true';
  } catch {
    return false;
  }
};


const setQuizCompletedFlag = (quizId: string, userId: string): void => {
  if (typeof window === 'undefined') return;
  try {
    const doneKey = getQuizDoneKey(quizId, userId);
    localStorage.setItem(doneKey, 'true');
  } catch (error) {
    console.error('Failed to set quiz completion:', error);
  }
};


const saveToStorage = (state: QuizState) => {
  if (typeof window === 'undefined') return;
  if (!state.quizId || !state.userId) return;
  
  const key = getQuizStorageKey(state.quizId, state.userId);
  const dataToSave = {
    quiz: state.quiz,
    currentQuestionIndex: state.currentQuestionIndex,
    answers: state.answers,
    timeLeft: state.timeLeft,
    isFinished: state.isFinished,
    endTime: state.endTime,
  };
  localStorage.setItem(key, JSON.stringify(dataToSave));
};


const loadFromStorage = (quizId: string, userId: string): QuizState | null => {
  if (typeof window === 'undefined') return null;
  try {
    const key = getQuizStorageKey(quizId, userId);
    const data = localStorage.getItem(key);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    return {
      ...parsed,
      quizId,
      userId,
      isCompleted: isQuizAlreadyCompleted(quizId, userId),
    };
  } catch {
    if (typeof window !== 'undefined') {
      const key = getQuizStorageKey(quizId, userId);
      localStorage.removeItem(key);
    }
    return null;
  }
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    hydrateQuizState: (state, action: PayloadAction<HydratePayload>) => {
      const { quizId, userId } = action.payload;
      const saved = loadFromStorage(quizId, userId);
      
      if (!saved || !saved.quiz || saved.quiz.id !== quizId) {
        return state;
      }

      const now = Date.now();
      const remainingMs = saved.endTime! - now;
      const timeLeft = Math.max(0, Math.floor(remainingMs / 1000));
      
      state.quiz = saved.quiz;
      state.currentQuestionIndex = saved.currentQuestionIndex;
      state.answers = saved.answers;
      state.endTime = saved.endTime;
      state.timeLeft = timeLeft;
      state.isFinished = saved.isFinished || timeLeft <= 0;
      state.quizId = quizId;
      state.userId = userId;
      state.isCompleted = isQuizAlreadyCompleted(quizId, userId);

      saveToStorage(state);
    },

    
      
   
    startQuiz: (state, action: PayloadAction<StartQuizPayload>) => {
      const { quiz, userId } = action.payload;
      const quizId = quiz.id;

      if (isQuizAlreadyCompleted(quizId, userId)) {
        state.isCompleted = true;
        state.quizId = quizId;
        state.userId = userId;
        return;
      }

      const saved = loadFromStorage(quizId, userId);

      if (saved?.quiz?.id === quizId && saved.endTime) {
        const now = Date.now();
        const timeLeft = Math.max(0, Math.floor((saved.endTime - now) / 1000));
        state.quiz = saved.quiz;
        state.currentQuestionIndex = saved.currentQuestionIndex;
        state.answers = saved.answers;
        state.endTime = saved.endTime;
        state.timeLeft = timeLeft;
        state.isFinished = timeLeft <= 0 || saved.isFinished;
        state.quizId = quizId;
        state.userId = userId;
        state.isCompleted = false;
        return;
      }

      const now = Date.now();
      const endTime = now + quiz.duration * 60 * 1000;
      
      state.quiz = quiz;
      state.currentQuestionIndex = 0;
      state.answers = {};
      state.timeLeft = quiz.duration * 60;
      state.endTime = endTime;
      state.isFinished = false;
      state.quizId = quizId;
      state.userId = userId;
      state.isCompleted = false;

      saveToStorage(state);
    },

 
    answerQuestion: (
      state,
      action: PayloadAction<{ questionId: string; answerId: string }>
    ) => {
      state.answers[action.payload.questionId] = action.payload.answerId;
      saveToStorage(state);
    },


    nextQuestion: (state) => {
      if (!state.quiz) return;

      if (state.currentQuestionIndex < state.quiz.questions.length - 1) {
        state.currentQuestionIndex++;
      }

      saveToStorage(state);
    },


    prevQuestion: (state) => {
      if (state.currentQuestionIndex > 0) {
        state.currentQuestionIndex--;
      }

      saveToStorage(state);
    },


    goToQuestion: (state, action: PayloadAction<number>) => {
      state.currentQuestionIndex = action.payload;
      saveToStorage(state);
    },


    tick: (state) => {
      if (!state.endTime) return;

      const now = Date.now();
      const diff = Math.floor((state.endTime - now) / 1000);

      if (diff <= 0) {
        state.timeLeft = 0;
        state.isFinished = true;
      } else {
        state.timeLeft = diff;
      }

      saveToStorage(state);
    },


    finishQuiz: (state) => {
      state.isFinished = true;
      
      if (state.quizId && state.userId) {
        setQuizCompletedFlag(state.quizId, state.userId);
        markQuizCompleted(state.quizId);
        state.isCompleted = true;
      }
      
      saveToStorage(state);
    },



    resetQuiz: (state, action: PayloadAction<{ quizId: string; userId: string }>) => {
      if (typeof window !== 'undefined') {
        const { quizId, userId } = action.payload;
        const stateKey = getQuizStorageKey(quizId, userId);
        const doneKey = getQuizDoneKey(quizId, userId);
        localStorage.removeItem(stateKey);
        localStorage.removeItem(doneKey);
      }
      return initialState;
    },
  },
});

export const {
  hydrateQuizState,
  startQuiz,
  answerQuestion,
  nextQuestion,
  prevQuestion,
  goToQuestion,
  tick,
  finishQuiz,
  resetQuiz,
} = quizSlice.actions;

export default quizSlice.reducer;


export { isQuizAlreadyCompleted, setQuizCompletedFlag, getQuizStorageKey, getQuizDoneKey };
