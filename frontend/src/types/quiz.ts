export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id?: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: boolean | string | number[] | null;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: string;
}

export interface QuizListItem {
  id: string;
  title: string;
  description: string;
  questionsCount: number;
  createdAt: string;
}
