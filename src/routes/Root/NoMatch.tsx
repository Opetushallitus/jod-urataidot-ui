import { useTranslation } from 'react-i18next';

const NoMatch = () => {
  const { t } = useTranslation();
  const title = t('no-match.title');
  return (
    <main role="main" className="mx-auto w-full max-w-[1140px] grow px-4 pt-8 pb-6 sm:px-6 print:p-0">
      <title>{title}</title>
      <h1 className="text-heading-xl mb-5">{title}</h1>
      <p className="mb-8">{t('no-match.description')}</p>
    </main>
  );
};

export default NoMatch;
