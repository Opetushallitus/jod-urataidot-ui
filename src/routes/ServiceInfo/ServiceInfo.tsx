import { useTranslation } from 'react-i18next';

import { MainLayout } from '@/components';

const ServiceInfoPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <h1 className="my-4 text-heading-2 sm:mt-8 sm:text-heading-1">{t('service-info.title')}</h1>
      <p className="whitespace-pre-line">{t('service-info.description')}</p>
    </MainLayout>
  );
};

export default ServiceInfoPage;
