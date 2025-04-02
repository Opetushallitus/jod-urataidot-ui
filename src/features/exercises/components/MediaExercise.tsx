import { Button, MobileBottomBar } from '@/components';
import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { useEasierExercise } from '@/hooks/useEasierExercise';
import { MediaExercise as MediaExerciseType, SkillAreaID } from '@/lib/content-types';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';
import { MediaExerciseAnswer, useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { ReadyModal } from './ReadyModal';

const MediaExercise = ({
  exercise,
  skillAreaId,
  sectionId,
}: {
  exercise: MediaExerciseType;
  skillAreaId: SkillAreaID;
  sectionId: number;
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { search } = useLocation();

  const [readyModalOpen, setReadyModalOpen] = React.useState(false);

  const answer = useExerciseAnswersStore((state) =>
    state.getAnswer({
      skillAreaId,
      sectionId,
      exerciseId: exercise.id,
    }),
  ) as MediaExerciseAnswer | undefined;
  const setAnswer = useExerciseAnswersStore((state) => state.setAnswer);
  const easierExercise = useEasierExercise({ skillAreaId, sectionId, exerciseId: exercise.id });
  const setExerciseAnswered = useExerciseAnsweredStore((state) => state.setExerciseAnswered);

  const fields = answer?.answers ?? [];

  const textHandler = (text: string, id: number) => {
    const currentField = fields.find((a) => a.id === id);

    const newAnswer: MediaExerciseAnswer = {
      skillAreaId,
      sectionId,
      exerciseId: exercise.id,
      type: 'media',
      answers: !currentField
        ? [...fields, { id, text }]
        : fields.map((a) => (a.id === currentField.id ? { id, text } : a)),
    };

    setAnswer(newAnswer);
  };

  const onDone = () => {
    setExerciseAnswered({ sectionId, skillAreaId, exerciseId: exercise.id });
    setReadyModalOpen(true);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <ReadyModal
        exercise={exercise}
        open={readyModalOpen}
        close={() => setReadyModalOpen(false)}
        document={<ExerciseDocument type="media" exercise={exercise} answers={fields} />}
      />
      <h1 className="text-heading-2">{exercise.title}</h1>
      <p className="mb-4">{exercise.description}</p>
      {exercise.mediaType === 'image' && <img src={exercise.src} alt={exercise.mediaDescription} />}
      <p className="mb-4 italic">{exercise.mediaDescription}</p>

      {easierExercise && (
        <span className="mb-2 whitespace-pre-wrap text-body-sm">
          {t('exercises.easier-question')}{' '}
          <a
            href={`/urataidot/${language}/${t('slugs.exercises')}/${easierExercise.skillAreaSlug}/${easierExercise.sectionSlug}/${easierExercise.id}${search}`}
            className="text-body-sm-bold text-primary hover:underline"
          >
            {t('exercises.easier-link')}
          </a>
        </span>
      )}
      <label htmlFor={exercise.textFieldTitle} className="text-heading-3">
        {exercise.textFieldTitle}
      </label>
      <textarea
        rows={5}
        id={exercise.textFieldTitle}
        className="w-full rounded border p-4"
        value={fields.find((a) => a.id === 1)?.text}
        onChange={(e) => textHandler(e.target.value, 1)}
      />

      <div className="hidden w-full justify-center sm:flex">
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </div>
      <MobileBottomBar>
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </MobileBottomBar>
    </div>
  );
};

export default MediaExercise;
