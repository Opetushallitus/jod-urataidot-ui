import { cx } from 'cva';
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: Readonly<CardProps>) {
  return <div className={cx('rounded-[20px] bg-white p-5', className)}>{children}</div>;
}
