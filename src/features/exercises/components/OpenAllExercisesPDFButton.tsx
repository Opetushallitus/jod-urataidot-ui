import { BlobProvider } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';

import { Button as DSButton } from '@jod/design-system';

import AllExercisesDocument from '@/features/pdf/documents/AllExercisesDocument';
import useSkillAreas from '@/hooks/useSkillAreas';
import { Open } from '@/icons';
import { useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';

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
      <DSButton
        iconSide="left"
        icon={<Open />}
        disabled={true}
        variant="gray"
        label={t('career-management-summary.summary-link-card.no-exercises-done')}
      />
    );
  }
  return (
    <BlobProvider document={<AllExercisesDocument exerciseAnswers={exerciseAnswers} />}>
      {({ url, loading }) =>
        loading || !url ? (
          <DSButton
            iconSide="left"
            icon={<Open />}
            disabled={true}
            variant="gray"
            label={t('career-management-summary.summary-link-card.link-loading')}
          />
        ) : (
          <div className="flex">
            <DSButton
              icon={<Open />}
              iconSide="left"
              variant="gray"
              label={t('career-management-summary.exercise-pdf-card.button')}
              linkComponent={({ children, className }) => (
                <a href={url} target="_blank" rel="noreferrer" className={className}>
                  {children}
                </a>
              )}
            />
          </div>
        )
      }
    </BlobProvider>
  );
};
