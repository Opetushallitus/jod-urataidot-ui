import { BackButton, Button, MobileBottomBar } from '@/components';
import SkillAreaInfoCard from '@/features/career-management/components/SkillAreaInfoCard';
import { ArrowRight } from '@/icons';
import { SkillArea } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

const CareerPlanning = ({ skillAreas }: { skillAreas: SkillArea[] }) => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  const currentBaseUrl = `/${i18n.language}/${t('slugs.career-management')}`;

  return (
    <div>
      <BackButton />
      <h1 className="mb-4 mt-4 text-heading-2 sm:mt-8 sm:text-heading-1">{t('career-management.title')}</h1>
      <p className="max-w-[80ch]">{t('career-management.description')}</p>
      <div className="grid grid-cols-2 gap-4 py-4 sm:grid-cols-3 sm:py-10 md:grid-cols-6">
        {skillAreas.map((skillArea) => (
          <SkillAreaInfoCard key={skillArea.id} skillArea={skillArea} />
        ))}
      </div>
      <h2 className="mb-2 text-heading-3 sm:text-heading-2">{t('career-management.self-evaluation.title')}</h2>
      <p className="max-w-[80ch]">{t('career-management.self-evaluation.description')}</p>
      <div className="hidden justify-center py-14 text-body sm:flex">
        <Button
          to={{ pathname: `${currentBaseUrl}/${skillAreas[0].slug}`, search: searchParams.toString() }}
          icon={<ArrowRight />}
        >
          {t('career-management.start')}
        </Button>
      </div>
      <MobileBottomBar>
        <Button
          to={{ pathname: `${currentBaseUrl}/${skillAreas[0].slug}`, search: searchParams.toString() }}
          icon={<ArrowRight />}
        >
          {t('career-management.start')}
        </Button>
      </MobileBottomBar>
    </div>
  );
};

export default CareerPlanning;
