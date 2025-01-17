import { SkillArea } from '@/lib/content-types';
import { SkillAreaIcon } from '../SkillAreaIcon/SkillAreaIcon';
import { t } from 'i18next';
import Accordion from '../Accordion/Accordion';
import { ExerciseLinkCard } from '@/features/exercises/components/ExerciseLinkCard';
import { useSkillAreaExercises } from '@/hooks/useSkillAreaExercises';
import { Button } from '..';
import { ChevronRight } from '@/icons';
import { useSummaryAccordionStore } from '@/stores/summaryAccordionStore';
import { useSearchParams } from 'react-router';

export const CareerPlanningSummarySection = ({
  skillArea,
  score,
  index,
}: {
  skillArea: Pick<SkillArea, 'id' | 'name' | 'longName' | 'slug' | 'info' | 'feedbacks'>;
  score: number | undefined;
  index: number;
}) => {
  const [searchParams] = useSearchParams();
  const feedback = score ? skillArea.feedbacks.find((f) => f.minScore <= score && score <= f.maxScore) : undefined;
  const exercises = useSkillAreaExercises({ skillAreaId: skillArea.id });

  const accordionOpen = useSummaryAccordionStore((state) => state.summaryAccordions[skillArea.id]);
  const setSummaryAccordion = useSummaryAccordionStore((state) => state.setSummaryAccordion);

  return (
    <div className="flex w-full flex-col gap-4 rounded-[1.25rem] bg-white p-4">
      <div className="flex min-h-[72px] items-center gap-4">
        <div className="size-16">
          <SkillAreaIcon size="md" section={skillArea.id} />
        </div>
        <div className="flex h-full flex-col items-start gap-2">
          <h3 className="mt-0 text-heading-3">{skillArea.name}</h3>
          <div className="flex text-wrap rounded-3xl bg-neutral-4 px-4 py-2 text-body-sm">{skillArea.longName}</div>
        </div>
      </div>
      {feedback ? (
        <>
          <div>
            <p className="mb-1 text-body-bold">{t('components.career-management-summary-section.feedback-title')}</p>
            <p className="text-body">{feedback.description}</p>
          </div>
          <Accordion
            title={t('components.career-management-summary-section.exercises-close')}
            titleOpen={t('components.career-management-summary-section.exercises-open')}
            defaultOpen={(accordionOpen ?? index === 0) ? true : false} // if accordion state not set and index 0 open by default
            onClick={(open) => setSummaryAccordion({ id: skillArea.id, open })}
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {exercises.map((exercise) => (
                <ExerciseLinkCard key={exercise.title} exercise={exercise} background="gray" showTag={false} />
              ))}
            </div>
          </Accordion>
        </>
      ) : (
        <div>
          <p className="mb-4 text-body">{t('components.career-management-summary-section.no-feedback')}</p>
          <Button
            variant="soft"
            icon={<ChevronRight />}
            to={{ pathname: `../${skillArea.slug}`, search: searchParams.toString() }}
          >
            {t('components.career-management-summary-section.to-section', { skillAreaName: skillArea.name })}
          </Button>
        </div>
      )}
    </div>
  );
};

CareerPlanningSummarySection.displayName = 'CareerPlanningSummarySection';
