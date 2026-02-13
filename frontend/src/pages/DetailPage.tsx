import React, { useEffect, useState } from 'react';
import { getQuiz } from '../services/api';
import type { Quiz } from '../types/quiz';
import { PageCard } from '../components/PageCard';
import { ReadonlyQuestionView } from '../components/ReadonlyQuestionView';

interface Props {
  id: string;
  onBack: () => void;
}

export function DetailPage({ id, onBack }: Props) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  useEffect(() => { getQuiz(id).then(setQuiz); }, [id]);
  if (!quiz) return <p className="muted">Loading...</p>;

  return (
    <PageCard>
      <button className="ghost" onClick={onBack}>← back</button>
      <h2>{quiz.title}</h2>
      <p className="muted">{quiz.description || '-'}</p>

      {quiz.questions.map((question, index) => (
        <ReadonlyQuestionView key={question.id ?? index} question={question} index={index} />
      ))}
    </PageCard>
  );
}
