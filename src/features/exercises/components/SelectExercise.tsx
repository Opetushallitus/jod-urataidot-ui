import { Button, MobileBottomBar } from '@/components';
import { SelectExercise as SelectExerciseType, SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { SelectOptions } from './SelectOptions';
import { useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { SelectExerciseAnswer, useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import { useEasierExercise } from '@/hooks/useEasierExercise';
import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';
import { ReadyModal } from './ReadyModal';

const SelectExercise = ({
  exercise,
  skillAreaId,
  sectionId,
}: {
  exercise: SelectExerciseType;
  skillAreaId: SkillAreaID;
  sectionId: number;
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [readyModalOpen, setReadyModalOpen] = useState(false);

  const easierExercise = useEasierExercise({ skillAreaId, exerciseId: exercise.id, sectionId });
  const answer = useExerciseAnswersStore((state) =>
    state.getAnswer({ skillAreaId, sectionId, exerciseId: exercise.id }),
  ) as SelectExerciseAnswer | undefined;
  const setAnswer = useExerciseAnswersStore((state) => state.setAnswer);
  const setExerciseAnswered = useExerciseAnsweredStore((state) => state.setExerciseAnswered);

  const fields = answer?.answers ?? [];

  const optionHandler = (value: string, id: number) => {
    const currentField = fields.find((a) => a.id === id);

    const newAnswer: SelectExerciseAnswer = {
      skillAreaId,
      sectionId,
      exerciseId: exercise.id,
      type: 'select',
      answers: !currentField
        ? [...fields, { id, selections: [value] }]
        : fields.map((a) =>
            a.id === currentField.id
              ? {
                  id,
                  selections: currentField.selections.includes(value)
                    ? currentField.selections.filter((s) => s !== value)
                    : [...currentField.selections, value],
                }
              : a,
          ),
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
        document={<ExerciseDocument type="select" exercise={exercise} answers={fields} />}
      />

      <h1 className="text-heading-2">{exercise.title}</h1>
      {exercise.description && <p className="mb-4">{exercise.description}</p>}

      {easierExercise && (
        <span className="mb-2 whitespace-pre-wrap text-body">
          {t('exercises.easier-question')}{' '}
          <Link
            className="text-body-bold text-primary hover:underline"
            to={{
              pathname: `../${easierExercise.skillAreaSlug}/${easierExercise.sectionSlug}/${easierExercise.id}`,
              search: searchParams.toString(),
            }}
          >
            {t('exercises.easier-link')}
          </Link>
        </span>
      )}

      <div className="flex flex-col gap-8">
        {exercise.wordLists &&
          exercise.wordLists.length > 0 &&
          exercise.wordLists.map((wordList) => (
            <SelectOptions
              key={wordList.id}
              label={wordList.title}
              options={wordList.words}
              selected={fields.find((w) => w.id === wordList.id)?.selections ?? []}
              onClick={(value) => optionHandler(value, wordList.id)}
            />
          ))}
      </div>
      {exercise.afterTitle && <h2 className="mt-4 text-heading-3">{exercise.afterTitle}</h2>}
      {exercise.afterText && <p className="mt-4">{exercise.afterText}</p>}
      <div className="hidden w-full justify-center sm:flex">
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </div>
      <MobileBottomBar>
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </MobileBottomBar>
    </div>
  );
};

export default SelectExercise;
