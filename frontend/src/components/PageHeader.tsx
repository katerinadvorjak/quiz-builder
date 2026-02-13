import React from 'react';

interface Props {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function PageHeader({ title, actionLabel, onAction }: Props) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h2>{title}</h2>
      {actionLabel && onAction ? <button onClick={onAction}>{actionLabel}</button> : null}
    </div>
  );
}
