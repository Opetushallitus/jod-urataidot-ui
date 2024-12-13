import { Button, MobileBottomBar } from '@/components';
import { useState } from 'react';
import { SkillAreaID, TextExercise as TextExerciseType } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';
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
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [readyModalOpen, setReadyModalOpen] = useState(false);

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
    <div className="flex w-full flex-col gap-4">
      <ReadyModal
        exercise={exercise}
        open={readyModalOpen}
        close={() => setReadyModalOpen(false)}
        document={<ExerciseDocument exercise={exercise} answers={fields} type="text" />}
      />
      <h1 className="text-heading-3 sm:text-heading-2">{exercise.title}</h1>
      {exercise.description && <p className="mb-4 whitespace-pre-wrap">{exercise.description}</p>}
      {exercise.textFields.map((textField, i) => (
        <div key={textField.id} className="mb-2 flex flex-col gap-1">
          <label className="font-display text-heading-5 sm:text-heading-4" htmlFor={textField.id.toString()}>
            {textField.title}
          </label>
          {textField.description && (
            <span id={textField.id + '-description'} className="mb-2 whitespace-pre-wrap text-body-sm italic">
              {textField.description}
            </span>
          )}

          {i === 0 && easierExercise !== null && (
            <span className="mb-2 whitespace-pre-wrap text-body-sm">
              {t('exercises.easier-question')}{' '}
              <Link
                className="text-body-sm-bold text-primary hover:underline"
                to={{
                  pathname: `../${easierExercise.skillAreaSlug}/${easierExercise.sectionSlug}/${easierExercise.id}`,
                  search: searchParams.toString(),
                }}
              >
                {t('exercises.easier-link')}
              </Link>
            </span>
          )}

          <textarea
            key={textField.id}
            id={textField.id.toString()}
            aria-describedby={textField.id + '-description'}
            value={fields.find((a) => a.id === textField.id)?.text ?? ''}
            onChange={(e) => textHandler(e.target.value, textField.id)}
            rows={5}
            className="w-full rounded border p-2"
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
