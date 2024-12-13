import { useTranslation } from 'react-i18next';
import { Footer, LinkCard, Title } from '@/components';
import { useSearchParams } from 'react-router';

const Home = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const isFromYksilo = searchParams.has('yksilo');

  return (
    <>
      <Title value={t('common.app-name')} />
      <div className="relative flex min-h-[calc(100vh-60px)] w-full flex-col justify-between">
        <div className="absolute top-0 -z-10 h-[300px] w-full bg-[url('/hero.jpg')] bg-cover bg-right bg-no-repeat sm:h-[500px]" />
        <div className="mx-auto w-full max-w-[1140px] grow px-4 pb-32 pt-52 sm:px-6 print:p-0">
          <main role="main">
            <h1 className="max-w-[920px] rounded-xl bg-white p-4 text-heading-2 sm:text-heading-1">
              {t('home.title')}
            </h1>
            <div className="grid justify-items-stretch gap-6 py-4 sm:grid-cols-2">
              <LinkCard
                to={{ pathname: t('slugs.quick-self-evaluation'), search: searchParams.toString() }}
                title={t('common.navigation-cards.learn-something-new.title')}
                description={t('common.navigation-cards.learn-something-new.description')}
                bgColor="bg-visualization-peach"
              />
              <LinkCard
                to={{ pathname: t('slugs.career-management'), search: searchParams.toString() }}
                title={t('common.navigation-cards.career-management.title')}
                description={t('common.navigation-cards.career-management.description')}
                bgColor="bg-visualization-turquoise"
              />
              {!isFromYksilo && (
                <>
                  <LinkCard
                    to={t('slugs.exercises')}
                    title={t('common.navigation-cards.exercises.title')}
                    description={t('common.navigation-cards.exercises.description')}
                    bgColor="bg-visualization-sky"
                  />
                  <LinkCard
                    to={t('slugs.career-plan')}
                    title={t('common.navigation-cards.career-plan.title')}
                    description={t('common.navigation-cards.career-plan.description')}
                    bgColor="bg-neutral-3"
                  />
                </>
              )}
            </div>
          </main>
        </div>
        {!isFromYksilo && <Footer />}
      </div>
    </>
  );
};

export default Home;
