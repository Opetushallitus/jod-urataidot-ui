import React from 'react';
import { LanguageButton, NavMenu } from '@/components';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import { Footer, NavigationBar, useMediaQueries } from '@jod/design-system';
import { useMenuClickHandler } from '@/hooks/useMenuClickHandler';
import { MdMenu } from 'react-icons/md';

const Root = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { sm } = useMediaQueries();

  const [navMenuOpen, setNavMenuOpen] = React.useState(false);

  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const langMenuButtonRef = React.useRef<HTMLLIElement>(null);
  const langMenuRef = useMenuClickHandler(() => setLangMenuOpen(false), langMenuButtonRef);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (langMenuRef.current && !langMenuRef.current.contains(event.relatedTarget as Node)) {
      setLangMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <div className="bg-bg-gray flex min-h-screen flex-col">
      <title>{t('common.app-name')}</title>
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar
          logo={{ to: `/${language}`, language, srText: t('osaamispolku') }}
          menuComponent={
            <button
              onClick={() => setNavMenuOpen(!navMenuOpen)}
              aria-label={t('open-menu')}
              className="flex cursor-pointer items-center justify-center gap-2 select-none"
            >
              <span className="flex size-7 items-center justify-center">
                <MdMenu size={24} />
              </span>
              <span className="py-3 pr-2">{t('menu')}</span>
            </button>
          }
          languageButtonComponent={
            <LanguageButton
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              langMenuOpen={langMenuOpen}
              menuRef={langMenuRef}
              onMenuBlur={handleBlur}
              onMenuClick={() => setLangMenuOpen(false)}
            />
          }
          refs={{ langMenuButtonRef: langMenuButtonRef }}
          renderLink={({ to, className, children }) => (
            <Link to={to} className={className}>
              {children as React.ReactNode}
            </Link>
          )}
        />
        <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
      </header>
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      <Outlet />
      <Footer
        items={[]}
        language={language}
        copyright={t('copyright')}
        variant="light"
        className={!sm ? 'py-7' : undefined}
      />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
    </div>
  );
};

export default Root;
