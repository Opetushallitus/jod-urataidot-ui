import { Check, ChevronDown } from '@/icons';
import { cx } from 'cva';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SelectOptions = ({
  options,
  selected,
  onClick,
  label,
}: {
  options: string[];
  selected: string[];
  onClick: (value: string) => void;
  label: string;
}) => {
  const [showMore, setShowMore] = React.useState(false);
  const { t } = useTranslation();

  const filteredOptions = options.slice(0, showMore ? options.length : 24);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-heading-5 sm:text-heading-4">{label}</span>
      <div className="flex flex-wrap gap-2">
        {filteredOptions.map((option) => (
          <Chip key={option} onClick={() => onClick(option)} isSelected={selected.includes(option)}>
            {option}
          </Chip>
        ))}
        {options.length > 24 && (
          <button
            className="text-body-sm-bold text-primary-contrast ml-2 flex h-full items-center py-1 leading-none"
            onClick={() => setShowMore((p) => !p)}
          >
            <span>{showMore ? t('exercises.show-less') : t('exercises.show-more')}</span>
            <span className={`flex scale-90 ${showMore ? 'rotate-180' : ''}`}>
              <ChevronDown />
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

const Chip = ({
  children,
  onClick,
  isSelected,
}: {
  children: React.ReactNode;
  onClick: () => void;
  isSelected: boolean;
}) => {
  const classes = cx({
    'flex items-center gap-1 rounded-full border border-[#00000040] px-2 py-1': true,
    'bg-white border-white': !isSelected,
    'border-primary bg-primary-muted text-primary-contrast': isSelected,
  });
  return (
    <button className={classes} onClick={onClick}>
      {isSelected && <Check />}
      {children}
    </button>
  );
};
