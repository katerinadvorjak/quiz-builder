export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: boolean | string | number[] | null;
}
