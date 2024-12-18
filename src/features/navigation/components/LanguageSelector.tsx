import { useMediaQueries } from '@/hooks/useMediaQuery';
import { Language } from '@/i18n/config';
import { EnglishFlag, FinnishFlag, SwedishFlag } from '@/icons';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { cx } from 'cva';
import { PropsWithChildren, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { changeLanguage } from '../lib/changeLanguage';
import { useSearchParams } from 'react-router';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const { sm } = useMediaQueries();

  const [searchParams] = useSearchParams();

  return (
    <Menu>
      <MenuButton aria-label={t('nav.select-language')}>
        <span>
          {i18n.language === 'fi' && <FinnishFlag />}
          {i18n.language === 'en' && <EnglishFlag />}
          {i18n.language === 'sv' && <SwedishFlag />}
        </span>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="z-50 flex w-full flex-col border bg-white p-4 text-body-sm shadow-lg [--anchor-gap:19px] sm:w-80 sm:-translate-x-2 sm:rounded-md sm:pt-0 sm:[--anchor-gap:26px]"
      >
        {sm && (
          <MenuItem>
            <span className="-mx-4 mb-4 flex border-b p-4 font-bold uppercase">{t('nav.language')}</span>
          </MenuItem>
        )}
        <MenuItem>
          <LanguageButton
            language="fi"
            changeLanguage={(language) => changeLanguage(language, searchParams.toString())}
          >
            Suomeksi
          </LanguageButton>
        </MenuItem>
        <MenuItem>
          <LanguageButton
            language="en"
            changeLanguage={(language) => changeLanguage(language, searchParams.toString())}
          >
            In English
          </LanguageButton>
        </MenuItem>
        <MenuItem>
          <LanguageButton
            language="sv"
            changeLanguage={(language) => changeLanguage(language, searchParams.toString())}
          >
            På svenska
          </LanguageButton>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

interface LanguageButtonProps {
  language: Language;
  changeLanguage: (nextLanguage: string) => void;
}

const LanguageButton = forwardRef<HTMLButtonElement, PropsWithChildren<LanguageButtonProps>>(
  ({ changeLanguage, children, language }, ref) => {
    const { i18n } = useTranslation();
    const classes = cx({
      'flex items-center px-4 py-3 rounded-xl hover:bg-primary-muted hover:underline leading-none hover:text-primary text-heading-4 font-display':
        true,
      'bg-primary-light hover:bg-primary-light hover:text-black': language === i18n.language,
    });

    return (
      <button ref={ref} className={classes} onClick={() => changeLanguage(language)}>
        <div className="flex items-center gap-2">
          <span className="flex h-6 items-center">
            {language === 'fi' && <FinnishFlag />}
            {language === 'en' && <EnglishFlag />}
            {language === 'sv' && <SwedishFlag />}
          </span>
          <span className="flex h-6 items-center">{children}</span>
        </div>
      </button>
    );
  },
);

LanguageButton.displayName = 'LanguageButton';

export default LanguageSelector;
