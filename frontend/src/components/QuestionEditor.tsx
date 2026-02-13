import React from 'react';
import type { Question } from '../types/quiz';

interface Props {
  question: Question;
  index: number;
  onTypeChange: (index: number, type: Question['type']) => void;
  onRemove: (index: number) => void;
  onQuestionText: (index: number, value: string) => void;
  onBooleanAnswer: (index: number, value: boolean) => void;
  onInputAnswer: (index: number, value: string) => void;
  onToggleCheckbox: (qIndex: number, optionIndex: number, checked: boolean) => void;
  onOptionText: (qIndex: number, optionIndex: number, value: string) => void;
  onAddOption: (index: number) => void;
}

export function QuestionEditor(props: Props) {
  const { question, index } = props;

  return (
    <div className="card">
      <div className="row">
        <select value={question.type} onChange={(e) => props.onTypeChange(index, e.target.value as Question['type'])}>
          <option value="boolean">Boolean</option>
          <option value="input">Input</option>
          <option value="checkbox">Checkbox</option>
        </select>
        <button type="button" className="danger" onClick={() => props.onRemove(index)}>Remove</button>
      </div>

      <div style={{ height: 8 }} />
      <input
        placeholder="Question text"
        value={question.question}
        onChange={(e) => props.onQuestionText(index, e.target.value)}
      />

      {question.type === 'boolean' && (
        <div style={{ marginTop: 8, display: 'flex', gap: 16 }}>
          <label className="choice">
            <input type="radio" name={`bool-${index}`} checked={question.correctAnswer === true} onChange={() => props.onBooleanAnswer(index, true)} /> True
          </label>
          <label className="choice">
            <input type="radio" name={`bool-${index}`} checked={question.correctAnswer === false} onChange={() => props.onBooleanAnswer(index, false)} /> False
          </label>
        </div>
      )}

      {question.type === 'input' && (
        <input
          style={{ marginTop: 8 }}
          placeholder="Expected answer"
          value={(question.correctAnswer as string) || ''}
          onChange={(e) => props.onInputAnswer(index, e.target.value)}
        />
      )}

      {question.type === 'checkbox' && (
        <div>
          {question.options.map((option, optionIndex) => (
            <div className="choice" key={optionIndex}>
              <input
                type="checkbox"
                checked={Array.isArray(question.correctAnswer) && question.correctAnswer.includes(optionIndex)}
                onChange={(e) => props.onToggleCheckbox(index, optionIndex, e.target.checked)}
              />
              <input
                className="option-input"
                value={option}
                placeholder={`Option ${optionIndex + 1}`}
                onChange={(e) => props.onOptionText(index, optionIndex, e.target.value)}
              />
            </div>
          ))}
          <button type="button" style={{ marginTop: 8 }} onClick={() => props.onAddOption(index)}>+ option</button>
        </div>
      )}
    </div>
  );
}
