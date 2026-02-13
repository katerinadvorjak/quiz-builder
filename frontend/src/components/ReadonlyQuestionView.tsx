import React from 'react';
import type { Question } from '../types/quiz';
import { PageCard } from './PageCard';

interface Props {
  question: Question;
  index: number;
}

function resolveMark(question: Question): '✓' | '✕' {
  if (question.type === 'boolean') return question.correctAnswer === true ? '✓' : '✕';
  if (question.type === 'input') return question.correctAnswer ? '✓' : '✕';
  if (question.type === 'checkbox') {
    return Array.isArray(question.correctAnswer) && question.correctAnswer.length ? '✓' : '✕';
  }
  return '✕';
}

export function ReadonlyQuestionView({ question, index }: Props) {
  const mark = resolveMark(question);
  const markClass = question.type === 'boolean' && question.correctAnswer !== true ? 'no' : 'ok';

  return (
    <PageCard className="qcard">
      <strong>
        {index + 1}. {question.question}
      </strong>

      <div className={`mark ${markClass}`}>{mark}</div>

      {question.type === 'input' ? (
        <input readOnly value={(question.correctAnswer as string) || ''} placeholder="No expected answer" />
      ) : null}

      {question.type === 'checkbox' ? (
        <div>
          {question.options.map((option, optionIndex) => (
            <label className="choice" key={optionIndex}>
              <input
                type="checkbox"
                disabled
                checked={
                  Array.isArray(question.correctAnswer) && question.correctAnswer.includes(optionIndex)
                }
              />
              {option}
            </label>
          ))}
        </div>
      ) : null}
    </PageCard>
  );
}
