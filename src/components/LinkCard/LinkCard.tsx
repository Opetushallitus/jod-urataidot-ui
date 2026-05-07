import { Link, LinkProps } from 'react-router';

import { cx } from '@jod/design-system';

import { ArrowForward } from '@/icons';

interface LinkCardProps {
  to: LinkProps['to'];
  title: string;
  description: string;
  className: string;
}

export function LinkCard({ to, title, description, className }: Readonly<LinkCardProps>) {
  const classes = cx(
    'group bg-primary-muted flex min-h-min w-full flex-col gap-2 rounded-lg p-6 text-balance',
    className,
  );

  return (
    <Link to={to} className={classes}>
      <div className="flex">
        <h2 className="grow text-heading-2-mobile group-hover:underline sm:text-heading-2">{title}</h2>
        <div className="m-2">
          <ArrowForward />
        </div>
      </div>
      <p className="col-span-2 text-body-lg-mobile sm:text-body-lg">{description}</p>
    </Link>
  );
}
