import { cx } from 'cva';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'filled' | 'soft' | 'simple' | 'plain';
  disabled?: boolean;
  icon?: React.ReactNode;
  iconSide?: 'left' | 'right';
  to?: LinkProps['to'];
  className?: string;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A button component with various variants and options.
 *
 * @param {React.ReactNode} children - The content of the button.
 * @param {'filled' | 'soft' | 'simple' | 'ghost'} [variant='filled'] - The variant of the button.
 * @param {boolean} [disabled=false] - Whether the button is disabled.
 * @param {React.ReactNode} [icon] - An optional icon to display on the button.
 * @param {'left' | 'right'} [iconSide='right'] - The side of the button to display the icon.
 * @param {LinkProps['to']} [to] - If provided, renders a link instead of a button.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} [rest] - Additional props to pass to the button element (Will not be passed to the link).
 * @return {React.ReactElement} The rendered button component.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant = 'filled', disabled, icon, iconSide = 'right', to, className, loading, ...rest }: ButtonProps,
    ref,
  ) => {
    const { t } = useTranslation();
    const classes = cx({
      'group font-bold disabled:[&:not([data-loading])]:text-text-disabled font-display hover:not(disabled):underline relative flex min-h-[44px] items-center rounded-full px-5 py-3 text-wrap whitespace-nowrap outline-offset-4': true,
      'bg-primary hover:bg-primary-hover disabled:[&:not([data-loading])]:bg-neutral-4 text-white':
        variant === 'filled',
      'text-primary-contrast bg-primary-muted hover:bg-primary-muted-hover disabled:[&:not([data-loading])]:bg-neutral-5':
        variant === 'soft',
      'hover:text-primary bg-white text-primary-gray disabled:[&:not([data-loading])]:bg-white': variant === 'simple',
      'text-primary-contrast disabled:[&:not([data-loading])]:bg-transparent': variant === 'plain',
      'cursor-pointer': !disabled,
      'cursor-not-allowed': disabled,
      'justify-center gap-3': icon,
      className,
    });

    const textClasses = cx({
      'text-center leading-none group-data-loading:opacity-0': true,
    });

    const loadingClasses = cx({
      'absolute inset-0 hidden items-center justify-center leading-none group-data-loading:flex': true,
    });

    const iconClasses = cx({ 'flex size-6 items-center justify-center': true });

    if (to) {
      return (
        <Link className={cx(classes, 'max-w-fit')} to={to}>
          {iconSide === 'left' && !loading && icon ? <div className={iconClasses}>{icon}</div> : null}
          <span className={textClasses} aria-hidden={loading}>
            {children}
          </span>
          <span className={loadingClasses}>Loading...</span>
          {iconSide === 'right' && !loading && icon ? <div className={iconClasses}>{icon}</div> : null}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled ?? loading}
        className={classes}
        data-loading={loading ? '1' : undefined}
        {...rest}
      >
        {iconSide === 'left' && !loading && icon ? <div className={iconClasses}>{icon}</div> : null}
        <span className={textClasses} aria-hidden={loading}>
          {children}
        </span>
        <span className={loadingClasses}>{t('common.loading')}</span>
        {iconSide === 'right' && !loading && icon ? <div className={iconClasses}>{icon}</div> : null}
      </button>
    );
  },
);

Button.displayName = 'Button';
