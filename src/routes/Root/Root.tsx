import { NavigationBar } from '@/components';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, ScrollRestoration } from 'react-router';

const Root = () => {
  const { i18n, t } = useTranslation();

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <Helmet>
        <html lang={i18n.language} />
        <title>{t('common.app-name')}</title>
      </Helmet>
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar />
      </header>
      <Outlet />
    </>
  );
};

export default Root;
