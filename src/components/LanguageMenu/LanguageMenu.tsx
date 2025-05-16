import { langLabels, supportedLanguageCodes } from '@/i18n/config';
import { PopupList, cx } from '@jod/design-system';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

export interface LanguageMenuProps {
  inline?: boolean;
  onClick: () => void;
}

const ListItems = ({ onClick }: { onClick: LanguageMenuProps['onClick'] }) => {
  const {
    i18n: { language },
  } = useTranslation();

  return supportedLanguageCodes.map((lng) => (
    <a
      key={lng}
      href={`${import.meta.env.BASE_URL}${lng}`}
      onClick={onClick}
      type="button"
      className={cx('text-button-md w-full px-5 py-3 hover:underline', {
        'bg-secondary-1-50 rounded': lng === language,
      })}
    >
      {langLabels[lng] ?? lng}
    </a>
  ));
};

export const LanguageMenu = forwardRef<HTMLDivElement, LanguageMenuProps>(function LanguageMenuWithRef(props, ref) {
  return props.inline ? (
    <ListItems onClick={props.onClick} />
  ) : (
    <div ref={ref}>
      <PopupList classNames="gap-2">
        <ListItems onClick={props.onClick} />
      </PopupList>
    </div>
  );
});
