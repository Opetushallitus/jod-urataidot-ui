import { Button, MobileBottomBar, MobileSkillAreaSelector, SkillAreaIcon, SkillAreaSelector } from '@/components';
import { QuestionProgressBar } from '@/features/career-management/components/QuestionProgressBar';
import { ShowVideoButton } from '@/features/career-management/components/ShowVideoButton';
import { useMediaQueries } from '@jod/design-system';
import useSkillAreas from '@/hooks/useSkillAreas';
import { ArrowLeft, ArrowRight } from '@/icons';
import { SkillArea } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';

const SkillAreaPage = ({ skillArea }: { skillArea: SkillArea }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueries();

  const skillAreas = useSkillAreas();

  const skillAreaIndex = skillAreas.findIndex((o) => o.id === skillArea.id);
  const prevSlug = skillAreaIndex > 0 ? `../${skillAreas[skillAreaIndex - 1].slug}/${t('slugs.feedback')}` : `../`;
  const nextSlug = skillArea.sections[0].slug;

  return (
    <div>
      <div className="flex items-center justify-center gap-5">
        {sm ? <SkillAreaSelector /> : <MobileSkillAreaSelector />}
      </div>
      <div className="flex flex-col items-center gap-3 pt-5">
        <SkillAreaIcon section={skillArea.id} size="lg" />
        <p className="text-body-sm-bold flex w-full justify-center pt-5 uppercase">
          {t('career-management.skill-area')} {`${skillAreaIndex + 1}/${skillAreas.length}`}
        </p>
        <h1 className="text-heading-3 sm:text-heading-2">{skillArea.name}</h1>
        <div className="bg-neutral-4 text-body-sm rounded-full px-4 py-2">{skillArea.longName}</div>
        <p className="max-w-[80ch] py-3 text-center">{skillArea.info}</p>
        <ShowVideoButton title={skillArea.name} skillAreaId={skillArea.id} skillAreaName={skillArea.name} />
        <div className="hidden items-center gap-5 py-6 sm:flex">
          <Button variant="simple" icon={<ArrowLeft />} iconSide="left" to={prevSlug}>
            {t('common.previous')}
          </Button>
          <Button to={nextSlug} icon={<ArrowRight />}>
            {t('common.next')}
          </Button>
        </div>
        <MobileBottomBar>
          <div className="mx-5 flex w-full justify-between">
            <Button variant="simple" to={prevSlug}>
              {t('common.previous')}
            </Button>
            <Button to={nextSlug}>{t('common.next')}</Button>
          </div>
        </MobileBottomBar>
      </div>
      <QuestionProgressBar currentSkillArea={skillArea.id} />
    </div>
  );
};

export default SkillAreaPage;
