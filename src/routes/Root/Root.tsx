import React from 'react';
import { NavigationBar, Title } from '@/components';
import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration } from 'react-router';

const Root = () => {
  const { i18n, t } = useTranslation();

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Title value={t('common.app-name')} />
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar />
      </header>
      <Outlet />
    </>
  );
};

export default Root;
