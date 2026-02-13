import express, { Request, Response } from 'express';
import path from 'path';
import { QuizModel } from './db';
import type { Question } from './types';

const app = express();

app.use(express.json({ limit: '1mb' }));

const frontendDist = path.resolve(__dirname, '../../frontend/dist');
app.use(express.static(frontendDist));

app.get('/api/health', (_req: Request, res: Response) => res.json({ ok: true }));

app.get('/api/quizzes', async (_req: Request, res: Response) => {
  const quizzes = await QuizModel.findAll({ order: [['createdAt', 'DESC']] });
  const list = quizzes.map((quiz) => {
    const questions = JSON.parse(quiz.questionsJson || '[]') as Question[];
    return {
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questionsCount: questions.length,
      createdAt: quiz.createdAt
    };
  });
  res.json(list);
});

app.get('/api/quizzes/:id', async (req: Request, res: Response) => {
  const quiz = await QuizModel.findByPk(req.params.id);
  if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
  return res.json({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questions: JSON.parse(quiz.questionsJson || '[]'),
    createdAt: quiz.createdAt
  });
});

app.post('/api/quizzes', async (req: Request, res: Response) => {
  const { title, description = '', questions = [] } = req.body || {};
  if (!title || typeof title !== 'string') return res.status(400).json({ error: 'title is required' });
  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'At least one question is required' });
  }

  const normalized: Question[] = questions.map((q: any, i: number) => ({
    id: `${Date.now()}-${i}`,
    type: q.type || 'input',
    question: String(q.question || '').trim(),
    options: Array.isArray(q.options) ? q.options : [],
    correctAnswer: q.correctAnswer ?? null
  }));

  if (normalized.some((q) => !q.question)) return res.status(400).json({ error: 'Each question must have text' });

  const now = new Date();
  const quiz = await QuizModel.create({
    id: String(Date.now()),
    title: title.trim(),
    description: String(description).trim(),
    questionsJson: JSON.stringify(normalized),
    createdAt: now,
    updatedAt: now
  });

  return res.status(201).json({
    id: quiz.id,
    title: quiz.title,
    description: quiz.description,
    questions: normalized,
    createdAt: quiz.createdAt
  });
});

app.delete('/api/quizzes/:id', async (req: Request, res: Response) => {
  const deleted = await QuizModel.destroy({ where: { id: req.params.id } });
  if (!deleted) return res.status(404).json({ error: 'Quiz not found' });
  return res.json({ ok: true });
});

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(frontendDist, 'index.html'));
});

export default app;
