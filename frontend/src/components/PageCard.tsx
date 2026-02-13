import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function PageCard({ children, className = '' }: Props) {
  return <div className={`card ${className}`.trim()}>{children}</div>;
}
