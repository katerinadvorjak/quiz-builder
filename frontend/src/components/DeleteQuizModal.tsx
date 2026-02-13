import React from 'react';
import type { QuizListItem } from '../types/quiz';

interface Props {
  target: QuizListItem | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteQuizModal({ target, onCancel, onConfirm }: Props) {
  if (!target) return null;
  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Delete quiz?</h3>
        <p className="muted">This action cannot be undone.</p>
        <p><strong>{target.title}</strong></p>
        <div className="modal-actions">
          <button className="ghost" onClick={onCancel}>Cancel</button>
          <button className="danger" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}
