import { ArrowForward } from '@/icons';
import { Link, LinkProps } from 'react-router';
import { cx } from '@jod/design-system';

interface LinkCardProps {
  to: LinkProps['to'];
  title: string;
  description: string;
  className: string;
}

export function LinkCard({ to, title, description, className }: Readonly<LinkCardProps>) {
  const classes = cx(
    'group w-full min-h-min text-balance flex flex-col gap-2 rounded-lg bg-primary-muted p-6',
    className,
  );

  return (
    <Link to={to} className={classes}>
      <div className="flex">
        <h2 className="text-heading-2-mobile sm:text-heading-2 grow group-hover:underline">{title}</h2>
        <div className="m-2">
          <ArrowForward />
        </div>
      </div>
      <p className="text-body-lg-mobile sm:text-body-lg col-span-2">{description}</p>
    </Link>
  );
}
