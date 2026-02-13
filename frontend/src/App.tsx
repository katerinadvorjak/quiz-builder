import React, { useEffect, useMemo, useState } from 'react';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { ListPage } from './pages/ListPage';

function navigate(to: string) {
  history.pushState({}, '', to);
  window.dispatchEvent(new Event('popstate'));
}

export function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const quizId = useMemo(() => {
    const match = path.match(/^\/quizzes\/([^/]+)$/);
    return match ? match[1] : null;
  }, [path]);

  return (
    <div className="wrap">
      <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/quizzes')}>Quiz Builder</h1>
      {path === '/create' ? (
        <CreatePage onSaved={(id) => navigate(`/quizzes/${id}`)} />
      ) : quizId ? (
        <DetailPage id={quizId} onBack={() => navigate('/quizzes')} />
      ) : (
        <ListPage onOpen={(id) => navigate(`/quizzes/${id}`)} onCreate={() => navigate('/create')} />
      )}
    </div>
  );
}
