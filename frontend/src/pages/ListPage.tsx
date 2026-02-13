import React, { useEffect, useState } from 'react';
import { deleteQuiz, getQuizzes } from '../services/api';
import type { QuizListItem } from '../types/quiz';
import { DeleteQuizModal } from '../components/DeleteQuizModal';
import { PageCard } from '../components/PageCard';
import { PageHeader } from '../components/PageHeader';

interface Props {
  onOpen: (id: string) => void;
  onCreate: () => void;
}

export function ListPage({ onOpen, onCreate }: Props) {
  const [list, setList] = useState<QuizListItem[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<QuizListItem | null>(null);

  const load = async () => setList(await getQuizzes());
  useEffect(() => { load(); }, []);

  return (
    <>
      <PageCard>
        <PageHeader title="All quizzes" actionLabel="Create" onAction={onCreate} />

        {list.length === 0 ? <p className="muted">No quizzes</p> : list.map((quiz) => (
          <div key={quiz.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #29304c' }}>
            <div style={{ cursor: 'pointer' }} onClick={() => onOpen(quiz.id)}>
              <strong>{quiz.title}</strong>
              <div className="muted">{quiz.questionsCount} questions</div>
            </div>
            <button className="icon-btn" title="Delete quiz" onClick={() => setDeleteTarget(quiz)}>✕</button>
          </div>
        ))}
      </PageCard>

      <DeleteQuizModal
        target={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await deleteQuiz(deleteTarget.id);
          setDeleteTarget(null);
          await load();
        }}
      />
    </>
  );
}
