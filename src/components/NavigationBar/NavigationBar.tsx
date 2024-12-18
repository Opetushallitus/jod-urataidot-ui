import { Drawer } from '@/components';
import LanguageSelector from '@/features/navigation/components/LanguageSelector';
import { Check, Document, Home, Link as LinkIcon } from '@/icons';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, To, useSearchParams } from 'react-router';

export function NavigationBar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const getEncodedData = useCareerPlanningAnswersStore((state) => state.getEncodedData);

  const [linkCopied, setLinkCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/urataidot/${i18n.language}/${t('slugs.import')}${isFromYksilo ? '?yksilo=' : ''}#${getEncodedData()}`,
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  const [searchParams] = useSearchParams();
  const isFromYksilo = searchParams.has('yksilo');

  return (
    <nav className="grid h-[60px] w-full grid-cols-3 items-stretch border-b bg-white px-2 shadow-md">
      <button onClick={() => setMenuOpen(true)} className="justify-self-start p-2 text-heading-2">
        ☰
      </button>
      <Drawer title={t('common.app-name')} isOpen={menuOpen} close={() => setMenuOpen(false)}>
        <div className="mt-4 flex flex-col gap-4">
          <MenuLink
            to={{ pathname: `/${i18n.language}`, search: searchParams.toString() }}
            closeMenu={() => setMenuOpen(false)}
          >
            <div className="size-6">
              <Home />
            </div>
            <span>{t('nav.home')}</span>
          </MenuLink>
          {!isFromYksilo && (
            <MenuLink to={t('slugs.exercises')} closeMenu={() => setMenuOpen(false)}>
              <div className="size-6">
                <Document className="min-size-6" />
              </div>
              <span>{t('nav.all-exercises')}</span>
            </MenuLink>
          )}
          <div className="h-[1px] w-full bg-neutral-1" />
          <button
            className="flex items-center gap-2 rounded-xl px-4 py-3 text-left text-heading-4 leading-none hover:bg-primary-muted hover:text-primary hover:underline"
            onClick={() => {
              void copyToClipboard();
            }}
          >
            <div className="size-6">{linkCopied ? <Check /> : <LinkIcon />}</div>
            <span>
              {linkCopied
                ? t('career-management-summary.summary-link-card.link-copied')
                : t('nav.copy-results-to-link')}
            </span>
          </button>
        </div>
      </Drawer>
      <Link
        to={{ pathname: `/${i18n.language}`, search: searchParams.toString() }}
        className="flex items-center justify-center font-bold"
      >
        {t('common.app-name')}
      </Link>
      <div className="grid place-items-center justify-self-end p-2">
        <LanguageSelector />
      </div>
      <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
    </nav>
  );
}

const MenuLink = ({ to, children, closeMenu }: { to: To; children: React.ReactNode; closeMenu: () => void }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 rounded-xl px-4 py-3 text-heading-4 leading-none hover:bg-primary-muted hover:text-primary hover:underline"
      onClick={closeMenu}
    >
      {children}
    </Link>
  );
};
