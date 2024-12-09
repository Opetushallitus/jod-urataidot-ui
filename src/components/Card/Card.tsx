import { cx } from 'cva';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return <div className={cx('rounded-[20px] bg-white p-4', className)}>{children}</div>;
}
