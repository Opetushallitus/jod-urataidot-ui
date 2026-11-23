import { useTranslation } from 'react-i18next';

import { LinkCard } from '@/components';

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <title>{t('common.app-name')}</title>
      <main className="mx-auto mt-11 mb-[80px] flex w-full max-w-[793px] grow flex-col px-4 sm:px-6 print:p-0">
        <h1 className="mb-6 text-center text-heading-1-mobile text-[#333] sm:text-heading-1">{t('home.title')}</h1>
        <p className="sm:text-body-lg- mb-5 text-body-lg-mobile">{t('home.description')}</p>
        <p className="text-help-mobile mb-6 font-arial text-secondary-gray sm:text-help">{t('home.info')}</p>
        <div className="flex flex-col gap-5 sm:gap-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            <LinkCard
              to={t('slugs.career-management')}
              title={t('common.navigation-cards.career-management.title')}
              description={t('common.navigation-cards.career-management.description')}
              className="bg-primary-1-dark-2 text-white"
            />
            <LinkCard
              to={t('slugs.quick-self-evaluation')}
              title={t('common.navigation-cards.learn-something-new.title')}
              description={t('common.navigation-cards.learn-something-new.description')}
              className="bg-primary-1-light-2 text-[#333]"
            />
          </div>
          <LinkCard
            to={t('slugs.career-plan')}
            title={t('common.navigation-cards.career-plan.title')}
            description={t('common.navigation-cards.career-plan.description')}
            className="bg-primary-1-dark-2 text-white"
          />
          <LinkCard
            to={t('slugs.exercises')}
            title={t('common.navigation-cards.exercises.title')}
            description={t('common.navigation-cards.exercises.description')}
            className="bg-primary-1-light-1 text-[#333]"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
