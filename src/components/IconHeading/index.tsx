export interface IconHeadingProps {
  icon: React.ReactNode;
  title: string;
  testId?: string;
  bgClassName?: string;
  textClassName?: string;
}

export const IconHeading = ({
  icon,
  title,
  testId,
  bgClassName = 'bg-secondary-1-dark',
  textClassName = 'text-secondary-1-dark',
}: IconHeadingProps) => {
  return (
    <div className="mb-6 flex items-center gap-x-4 sm:mb-8">
      {icon && (
        <span
          className={`flex aspect-square size-9 items-center justify-center rounded-full text-white ${bgClassName}`}
        >
          {icon}
        </span>
      )}
      <h1
        data-testid={testId}
        className={`text-hero-mobile sm:text-hero text-pretty break-words hyphens-auto ${textClassName}`}
      >
        {title}
      </h1>
    </div>
  );
};
