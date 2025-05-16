import { MainLayout } from '@/components';
import { useTranslation } from 'react-i18next';

const ServiceInfoPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <h1 className="text-heading-2 sm:text-heading-1 my-4 sm:mt-8">{t('service-info.title')}</h1>
      <p className="whitespace-pre-line">{t('service-info.description')}</p>
    </MainLayout>
  );
};

export default ServiceInfoPage;
