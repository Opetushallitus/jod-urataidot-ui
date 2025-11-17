import { BackButton, Button, MobileBottomBar } from '@/components';
import SkillAreaInfoCard from '@/features/career-management/components/SkillAreaInfoCard';
import useSkillAreas from '@/hooks/useSkillAreas';
import { ArrowRight } from '@/icons';
import { useTranslation } from 'react-i18next';

const CareerPlanning = () => {
  const { t, i18n } = useTranslation();
  const skillAreas = useSkillAreas();
  const currentBaseUrl = `/${i18n.language}/${t('slugs.career-management')}`;

  return (
    <div>
      <BackButton />
      <h1 className="text-heading-2 sm:text-heading-1 mt-5 mb-5 sm:mt-7">{t('career-management.title')}</h1>
      <p className="max-w-[80ch]">{t('career-management.description')}</p>
      <div className="grid grid-cols-2 gap-5 py-5 sm:grid-cols-3 sm:py-8 md:grid-cols-6">
        {skillAreas.map((skillArea) => (
          <SkillAreaInfoCard key={skillArea.id} skillArea={skillArea} />
        ))}
      </div>
      <h2 className="text-heading-3 sm:text-heading-2 mb-3">{t('career-management.self-evaluation.title')}</h2>
      <p className="max-w-[80ch]">{t('career-management.self-evaluation.description')}</p>
      <div className="text-body hidden justify-center py-[56px] sm:flex">
        <Button to={`${currentBaseUrl}/${skillAreas[0].slug}`} icon={<ArrowRight />}>
          {t('career-management.start')}
        </Button>
      </div>
      <MobileBottomBar>
        <Button to={`${currentBaseUrl}/${skillAreas[0].slug}`} icon={<ArrowRight />}>
          {t('career-management.start')}
        </Button>
      </MobileBottomBar>
    </div>
  );
};

export default CareerPlanning;
