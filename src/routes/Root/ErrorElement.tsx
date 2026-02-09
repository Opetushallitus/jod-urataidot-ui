import { useTranslation } from 'react-i18next';

const ErrorBoundary = () => {
  const { t } = useTranslation();
  return (
    <div className="m-4 flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">{t('common:error-boundary.title')}</h1>
      <p className="text-lg">{t('common:error-boundary.unexpected')}</p>
    </div>
  );
};

export default ErrorBoundary;
