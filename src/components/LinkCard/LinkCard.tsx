import { ArrowForward } from '@/icons';
import { Link, LinkProps } from 'react-router';
import { twMerge } from 'tailwind-merge';

type Colors =
  | 'visualization-peach'
  | 'visualization-orange'
  | 'visualization-turquoise'
  | 'visualization-sky'
  | 'visualization-blue'
  | 'visualization-pink'
  | 'transparent'
  | 'neutral-3';

interface LinkCardProps {
  to: LinkProps['to'];
  title: string;
  description: string;
  bgColor: `bg-${Colors}`;
}

export function LinkCard({ to, title, description, bgColor }: Readonly<LinkCardProps>) {
  const classes = twMerge(
    'group w-full min-h-min text-balance flex flex-col gap-2 rounded-[20px] bg-primary-muted p-6 sm:gap-4 sm:p-8',
    bgColor,
  );

  return (
    <Link to={to} className={classes}>
      <h2 className="text-heading-3 group-hover:underline">{title}</h2>
      <p className="col-span-2">{description}</p>
      <span className="mt-auto place-self-end">
        <ArrowForward />
      </span>
    </Link>
  );
}
