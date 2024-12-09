import { Check, ChevronRight } from '@/icons';
import { ExerciseWithInfo, SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { cx } from 'cva';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';

const SkillAreaTag = ({ skillAreaID, skillAreaName }: { skillAreaID: SkillAreaID; skillAreaName: string }) => {
  const color = cx({
    'bg-visualization-sky': skillAreaID === 'world-around-you',
    'bg-visualization-blue': skillAreaID === 'together-ahead',
    'bg-visualization-peach': skillAreaID === 'know-yourself',
    'bg-visualization-orange': skillAreaID === 'competence-first',
    'bg-visualization-turquoise': skillAreaID === 'anticipate-the-future',
    'bg-visualization-pink': skillAreaID === 'ready-for-change',
  });

  return <div className={cx(color, 'rounded-full bg-opacity-50 px-3 py-1 text-body-sm')}>{skillAreaName}</div>;
};

export const ExerciseLinkCard = ({
  exercise,
  background = 'white',
  showTag = true,
}: {
  exercise: ExerciseWithInfo;
  background?: 'white' | 'gray' | 'alternating-white-bg' | 'alternating-grey-bg';
  showTag?: boolean;
}) => {
  const { t, i18n } = useTranslation();

  const exerciseAnswered = useExerciseAnsweredStore((state) =>
    state.getExerciseAnswered({
      skillAreaId: exercise.skillAreaId,
      sectionId: exercise.sectionId,
      exerciseId: exercise.id,
    }),
  );

  const styles = cx({
    'flex w-full items-center justify-between rounded-lg p-3 hover:bg-surface-hover': true,
    'bg-white': background === 'white',
    'bg-neutral-5': background === 'gray',
    'odd:bg-surface-hover even:bg-neutral-5': background === 'alternating-grey-bg',
    'odd:bg-neutral-5 even:bg-neutral-4': background === 'alternating-white-bg',
  });

  return (
    <Link
      to={`/${i18n.language}/${t('slugs.exercises')}/${exercise.skillAreaSlug}/${exercise.sectionSlug}/${exercise.id}`}
      className={styles}
    >
      <div className="flex w-4/5 flex-col gap-3">
        <div className="flex items-center gap-2">
          {exerciseAnswered && (
            <div className="flex size-5 items-center justify-center rounded-full bg-success-muted">
              <Check className="size-4" />
            </div>
          )}
          <span className="text-overline-sm uppercase text-neutral-1">{t('exercises.exercise')}</span>
        </div>
        <span className="font-display text-heading-4">{exercise.title}</span>
        {showTag && (
          <div className="flex flex-wrap">
            <SkillAreaTag skillAreaName={exercise.skillAreaName} skillAreaID={exercise.skillAreaId} />
          </div>
        )}
      </div>

      <div className="size-6">
        <ChevronRight />
      </div>
    </Link>
  );
};
