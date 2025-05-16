import { Button, MobileBottomBar } from '@/components';
import React from 'react';
import { SkillAreaID, TextExercise as TextExerciseType } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import { TextExerciseAnswer, useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import { useEasierExercise } from '@/hooks/useEasierExercise';
import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';
import { ReadyModal } from './ReadyModal';

const TextExercise = ({
  exercise,
  skillAreaId,
  sectionId,
}: {
  exercise: TextExerciseType;
  skillAreaId: SkillAreaID;
  sectionId: number;
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { search } = useLocation();

  const [readyModalOpen, setReadyModalOpen] = React.useState(false);

  const easierExercise = useEasierExercise({ skillAreaId, sectionId, exerciseId: exercise.id });
  const setAnswer = useExerciseAnswersStore((state) => state.setAnswer);
  const answer = useExerciseAnswersStore((state) =>
    state.getAnswer({ skillAreaId, sectionId, exerciseId: exercise.id }),
  ) as TextExerciseAnswer | undefined;
  const setExerciseAnswered = useExerciseAnsweredStore((state) => state.setExerciseAnswered);

  const fields = answer?.answers ?? [];

  const textHandler = (text: string, id: number) => {
    const currentField = fields.find((a) => a.id === id);

    const newAnswer: TextExerciseAnswer = {
      skillAreaId,
      sectionId,
      exerciseId: exercise.id,
      type: 'text',
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
    <div className="flex w-full flex-col gap-5">
      <ReadyModal
        exercise={exercise}
        open={readyModalOpen}
        close={() => setReadyModalOpen(false)}
        document={<ExerciseDocument exercise={exercise} answers={fields} type="text" />}
      />
      <h1 className="text-heading-3 sm:text-heading-2">{exercise.title}</h1>
      {exercise.description && <p className="mb-5 whitespace-pre-wrap">{exercise.description}</p>}
      {exercise.textFields.map((textField, i) => (
        <div key={textField.id} className="mb-3 flex flex-col gap-2">
          <label className="font-display text-heading-5 sm:text-heading-4" htmlFor={textField.id.toString()}>
            {textField.title}
          </label>
          {textField.description && (
            <span id={textField.id + '-description'} className="text-body-sm mb-3 whitespace-pre-wrap italic">
              {textField.description}
            </span>
          )}

          {i === 0 && easierExercise !== null && (
            <span className="text-body-sm mb-3 whitespace-pre-wrap">
              {t('exercises.easier-question')}{' '}
              <a
                href={`/urataidot/${language}/${t('slugs.exercises')}/${easierExercise.skillAreaSlug}/${easierExercise.sectionSlug}/${easierExercise.id}${search}`}
                className="text-body-sm-bold text-primary hover:underline"
              >
                {t('exercises.easier-link')}
              </a>
            </span>
          )}

          <textarea
            key={textField.id}
            id={textField.id.toString()}
            aria-describedby={textField.id + '-description'}
            value={fields.find((a) => a.id === textField.id)?.text ?? ''}
            onChange={(e) => textHandler(e.target.value, textField.id)}
            rows={5}
            className="w-full rounded-sm border border-[#00000040] bg-white p-4"
          />
        </div>
      ))}
      <p>{exercise.afterText}</p>
      <div className="hidden w-full justify-center sm:flex">
        <Button
          onClick={() => {
            onDone();
          }}
        >
          {t('exercises.ready')}
        </Button>
      </div>
      <MobileBottomBar>
        <Button
          onClick={() => {
            onDone();
          }}
        >
          {t('exercises.ready')}
        </Button>
      </MobileBottomBar>
    </div>
  );
};

export default TextExercise;
