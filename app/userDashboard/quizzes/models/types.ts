export type LocalizedString ={
  ar:string;
  en:string;
};

export interface Answer {
  id: string;
  text: LocalizedString;
}

export interface Question {
  id: string;
  text: LocalizedString;
  answers: Answer[];
  correctAnswerId: string;
}

export interface Quiz {
  id: string;
  title: LocalizedString;
  duration: number;
  startAt: number;
  endAt: number;
  questions: Question[];
}
