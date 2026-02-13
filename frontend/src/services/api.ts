import type { Quiz, QuizListItem } from '../types/quiz';

export async function getQuizzes(): Promise<QuizListItem[]> {
  const response = await fetch('/api/quizzes');
  return response.json();
}

export async function getQuiz(id: string): Promise<Quiz> {
  const response = await fetch(`/api/quizzes/${id}`);
  return response.json();
}

export async function createQuiz(payload: Omit<Quiz, 'id' | 'createdAt'>): Promise<{ id: string } & Quiz> {
  const response = await fetch('/api/quizzes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export async function deleteQuiz(id: string): Promise<void> {
  await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
}
