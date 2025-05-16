import { Button } from '@/components';
import AllExercisesDocument from '@/features/pdf/documents/AllExercisesDocument';
import useSkillAreas from '@/hooks/useSkillAreas';
import { Open } from '@/icons';
import { useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import { BlobProvider } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

export const OpenAllExercisesPDFButton = ({ hideWhenNoAnswers = false }: { hideWhenNoAnswers?: boolean }) => {
  const { t } = useTranslation();
  const allAnswers = useExerciseAnswersStore((state) => state.exerciseAnswers);
  const skillAreas = useSkillAreas();

  const allExercises = skillAreas.flatMap((skillArea) =>
    skillArea.sections.flatMap((section) =>
      section.exercises.map((e) => ({ ...e, skillAreaId: skillArea.id, sectionId: section.id })),
    ),
  );

  const exerciseAnswers = allAnswers.flatMap((answers) => {
    const exercise = allExercises.find(
      (e) => e.id === answers.exerciseId && e.skillAreaId === answers.skillAreaId && e.sectionId === answers.sectionId,
    );

    if (!exercise) {
      return [];
    }

    return [
      {
        exercise: exercise,
        answers: answers.answers,
        type: answers.type,
      },
    ];
  });

  if (allAnswers.length === 0) {
    if (hideWhenNoAnswers) {
      return null;
    }
    return (
      <Button iconSide="left" icon={<Open />} disabled={true} variant="filled">
        {t('career-management-summary.summary-link-card.no-exercises-done')}
      </Button>
    );
  }
  return (
    <BlobProvider document={<AllExercisesDocument exerciseAnswers={exerciseAnswers} />}>
      {({ url, loading }) =>
        loading || !url ? (
          <Button iconSide="left" icon={<Open />} disabled={true} variant="filled">
            {t('career-management-summary.summary-link-card.link-loading')}
          </Button>
        ) : (
          <div className="flex">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="group bg-primary font-display hover:bg-primary-hover relative flex min-h-[44px] items-center justify-center gap-3 rounded-full px-5 py-3 font-bold whitespace-nowrap text-white outline-offset-4 hover:underline"
            >
              <div className="size-6">
                <Open />
              </div>
              <span className="text-center leading-none text-wrap">
                {t('career-management-summary.exercise-pdf-card.button')}
              </span>
            </a>
          </div>
        )
      }
    </BlobProvider>
  );
};
