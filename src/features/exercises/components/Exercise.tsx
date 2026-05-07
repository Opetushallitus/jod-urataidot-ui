import { Suspense, lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router';

import { BackButton } from '@/components';
import { useExercise } from '@/hooks/useExercise';

export const ExercisePage = () => {
  const { t, i18n } = useTranslation();
  const params = useParams();

  const exercise = useExercise({
    skillAreaSlug: params.skillAreaSlug ?? '',
    sectionSlug: params.sectionSlug ?? '',
    exerciseId: Number(params.exerciseId),
  });

  if (!params.skillAreaSlug || !params.sectionSlug || !params.exerciseId) {
    return <Navigate to={`/${i18n.language}/${t('slugs.exercises')}`} replace />;
  }

  if (!exercise) return <Navigate to={`/${i18n.language}/${t('slugs.exercises')}`} replace />;

  if (exercise.type === 'emoji') {
    const EmojiExercise = lazy(() => import('./EmojiExercise'));
    return (
      <ExerciseContainer>
        <EmojiExercise exercise={exercise} skillAreaId={exercise.skillAreaId} sectionId={exercise.sectionId} />
      </ExerciseContainer>
    );
  }

  if (exercise.type === 'text') {
    const TextExercise = lazy(() => import('./TextExercise'));
    return (
      <ExerciseContainer>
        <TextExercise exercise={exercise} skillAreaId={exercise.skillAreaId} sectionId={exercise.sectionId} />
      </ExerciseContainer>
    );
  }

  if (exercise.type === 'select') {
    const SelectExercise = lazy(() => import('./SelectExercise'));
    return (
      <ExerciseContainer>
        <SelectExercise exercise={exercise} skillAreaId={exercise.skillAreaId} sectionId={exercise.sectionId} />
      </ExerciseContainer>
    );
  }

  if (exercise.type === 'media') {
    const MediaExercise = lazy(() => import('./MediaExercise'));
    return (
      <ExerciseContainer>
        <MediaExercise exercise={exercise} skillAreaId={exercise.skillAreaId} sectionId={exercise.sectionId} />
      </ExerciseContainer>
    );
  }

  return null;
};

const ExerciseContainer = ({ children }: { children: React.ReactNode }) => {
  const { t } = useTranslation();
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-start">
      <BackButton />
      <p className="mt-7 mb-5 text-button-sm uppercase">{t('exercises.exercise')}</p>
      <Suspense>{children}</Suspense>
    </div>
  );
};
