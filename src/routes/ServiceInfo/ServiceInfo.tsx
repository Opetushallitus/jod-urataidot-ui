import { MainLayout } from '@/components';
import { Trans, useTranslation } from 'react-i18next';

const ServiceInfoPage = () => {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <h1 className="my-4 text-heading-2 sm:mt-8 sm:text-heading-1">{t('service-info.title')}</h1>
      <p>
        <Trans i18nKey="service-info.description">
          <a
            href="https://www.hyria.fi/urasuunnittelutaidot"
            rel="noreferrer"
            target="_blank"
            className="text-primary underline"
          >
            www.hyria.fi/urasuunnittelutaidot
          </a>
        </Trans>
      </p>
    </MainLayout>
  );
};

export default ServiceInfoPage;
