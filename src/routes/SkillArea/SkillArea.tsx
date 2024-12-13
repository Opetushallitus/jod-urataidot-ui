import { Button, MobileBottomBar, MobileSkillAreaSelector, SkillAreaIcon, SkillAreaSelector } from '@/components';
import { QuestionProgressBar } from '@/features/career-management/components/QuestionProgressBar';
import { ShowVideoButton } from '@/features/career-management/components/ShowVideoButton';
import { useMediaQueries } from '@/hooks/useMediaQuery';
import useSkillAreas from '@/hooks/useSkillAreas';
import { ArrowLeft, ArrowRight } from '@/icons';
import { SkillArea } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

const SkillAreaPage = ({ skillArea }: { skillArea: SkillArea }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueries();
  const [searchParams] = useSearchParams();

  const skillAreas = useSkillAreas();

  const skillAreaIndex = skillAreas.findIndex((o) => o.id === skillArea.id);
  const prevSlug = skillAreaIndex > 0 ? `../${skillAreas[skillAreaIndex - 1].slug}/${t('slugs.feedback')}` : `../`;
  const nextSlug = skillArea.sections[0].slug;

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        {sm ? <SkillAreaSelector /> : <MobileSkillAreaSelector />}
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <SkillAreaIcon section={skillArea.id} size="lg" />
        <p className="flex w-full justify-center pt-4 text-body-sm-bold uppercase">
          {t('career-management.skill-area')} {`${skillAreaIndex + 1}/${skillAreas.length}`}
        </p>
        <h1 className="text-heading-3 sm:text-heading-2">{skillArea.name}</h1>
        <div className="rounded-full bg-neutral-4 px-3 py-1.5 text-body-sm">{skillArea.longName}</div>
        <p className="max-w-[80ch] py-2 text-center">{skillArea.info}</p>
        <ShowVideoButton title={skillArea.name} skillAreaId={skillArea.id} skillAreaName={skillArea.name} />
        <div className="hidden items-center gap-4 py-6 sm:flex">
          <Button
            variant="simple"
            icon={<ArrowLeft />}
            iconSide="left"
            to={{ pathname: prevSlug, search: searchParams.toString() }}
          >
            {t('common.previous')}
          </Button>
          <Button to={{ pathname: nextSlug, search: searchParams.toString() }} icon={<ArrowRight />}>
            {t('common.next')}
          </Button>
        </div>
        <MobileBottomBar>
          <div className="mx-4 flex w-full justify-between">
            <Button variant="simple" to={{ pathname: prevSlug, search: searchParams.toString() }}>
              {t('common.previous')}
            </Button>
            <Button to={{ pathname: nextSlug, search: searchParams.toString() }}>{t('common.next')}</Button>
          </div>
        </MobileBottomBar>
      </div>
      <QuestionProgressBar currentSkillArea={skillArea.id} />
    </div>
  );
};

export default SkillAreaPage;
