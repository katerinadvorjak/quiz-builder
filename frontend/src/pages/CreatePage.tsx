import React, { useState } from 'react';
import { createQuiz } from '../services/api';
import type { Question } from '../types/quiz';
import { QuestionEditor } from '../components/QuestionEditor';
import { PageCard } from '../components/PageCard';

interface Props {
  onSaved: (id: string) => void;
}

export function CreatePage({ onSaved }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    { type: 'boolean', question: '', options: ['True', 'False'], correctAnswer: true }
  ]);

  const updateQuestion = (index: number, patch: Partial<Question>) => {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  };

  const setType = (index: number, type: Question['type']) => {
    if (type === 'boolean') {
      updateQuestion(index, { type, options: ['True', 'False'], correctAnswer: true });
    }
    if (type === 'input') {
      updateQuestion(index, { type, options: [], correctAnswer: '' });
    }
    if (type === 'checkbox') {
      const options = questions[index].options.length ? questions[index].options : ['Option 1', 'Option 2'];
      updateQuestion(index, { type, options, correctAnswer: [] });
    }
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitError('');
    try {
      const quiz = await createQuiz({ title, description, questions } as any);
      onSaved(quiz.id);
    } catch (error) {
      setSubmitError((error as Error).message);
    }
  };

  return (
    <PageCard>
      <h2>Create quiz</h2>
      <form onSubmit={onSubmit}>
        <div className="col">
          <input
            placeholder="Quiz title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            rows={4}
            style={{ resize: 'vertical', minHeight: 96 }}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {submitError ? (
          <p className="muted" style={{ color: '#ff9fb0' }}>
            {submitError}
          </p>
        ) : null}

        <div style={{ height: 10 }} />

        {questions.map((question, index) => (
          <QuestionEditor
            key={index}
            question={question}
            index={index}
            onTypeChange={setType}
            onRemove={(i) => setQuestions((prev) => prev.filter((_, idx) => idx !== i))}
            onQuestionText={(i, value) => updateQuestion(i, { question: value })}
            onBooleanAnswer={(i, value) => updateQuestion(i, { correctAnswer: value })}
            onInputAnswer={(i, value) => updateQuestion(i, { correctAnswer: value })}
            onToggleCheckbox={(qIndex, optionIndex, checked) => {
              const current = Array.isArray(questions[qIndex].correctAnswer)
                ? (questions[qIndex].correctAnswer as number[])
                : [];
              const next = checked
                ? [...new Set([...current, optionIndex])]
                : current.filter((v) => v !== optionIndex);
              updateQuestion(qIndex, { correctAnswer: next });
            }}
            onOptionText={(qIndex, optionIndex, value) => {
              const next = [...questions[qIndex].options];
              next[optionIndex] = value;
              updateQuestion(qIndex, { options: next });
            }}
            onAddOption={(i) => updateQuestion(i, { options: [...questions[i].options, ''] })}
          />
        ))}

        <button
          type="button"
          onClick={() =>
            setQuestions((prev) => [
              ...prev,
              { type: 'input', question: '', options: [], correctAnswer: '' }
            ])
          }
        >
          + question
        </button>
        <button type="submit" style={{ marginLeft: 8 }}>
          Save quiz
        </button>
      </form>
    </PageCard>
  );
}
