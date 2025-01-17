import { Button, MobileBottomBar } from '@/components';
import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { useEasierExercise } from '@/hooks/useEasierExercise';
import { EmojiExercise as EmojiExerciseType, SkillAreaID } from '@/lib/content-types';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';
import { EmojiExerciseAnswer, useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EmojiPicker from 'emoji-picker-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';
import { ReadyModal } from './ReadyModal';

const EmojiExercise = ({
  exercise,
  skillAreaId,
  sectionId,
}: {
  exercise: EmojiExerciseType;
  skillAreaId: SkillAreaID;
  sectionId: number;
}) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [readyModalOpen, setReadyModalOpen] = React.useState(false);

  const easierExercise = useEasierExercise({ skillAreaId, sectionId, exerciseId: exercise.id });
  const answer = useExerciseAnswersStore((state) =>
    state.getAnswer({ skillAreaId, sectionId, exerciseId: exercise.id }),
  ) as EmojiExerciseAnswer | undefined;
  const setAnswer = useExerciseAnswersStore((state) => state.setAnswer);
  const setExerciseAnswered = useExerciseAnsweredStore((state) => state.setExerciseAnswered);

  const fields = answer?.answers ?? [];

  const answerBase: Omit<EmojiExerciseAnswer, 'answers'> = {
    skillAreaId,
    sectionId,
    exerciseId: exercise.id,
    type: 'emoji',
  };

  const textHandler = (text: string, id: number) => {
    const currentField = fields.find((a) => a.id === id);

    const newField = !currentField ? { id, text, emoji: undefined } : { ...currentField, text };
    const newAnswer = {
      ...answerBase,
      answers: !currentField ? [...fields, newField] : fields.map((a) => (a.id === currentField.id ? newField : a)),
    };

    setAnswer(newAnswer);
  };

  const emojiHandler = (emoji: string, id: number) => {
    const currentField = fields.find((a) => a.id === id);

    const newField = !currentField ? { id, emoji, text: '' } : { ...currentField, emoji };
    const newAnswer = {
      ...answerBase,
      answers: !currentField ? [...fields, newField] : fields.map((a) => (a.id === currentField.id ? newField : a)),
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
        document={
          <ExerciseDocument
            type="emoji"
            exercise={exercise}
            answers={fields.filter((a) => Boolean(a.emoji) || Boolean(a.text))}
          />
        }
      />

      <h1 className="text-heading-3 sm:text-heading-2">{exercise.title}</h1>
      <p className="mb-4 whitespace-pre-wrap">{exercise.description}</p>

      {easierExercise !== null && (
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

      <h2 className="text-heading-4">{exercise.emojiTitle}</h2>
      <div className="flex flex-col gap-6">
        {[...Array(5).keys()].map((i) => (
          <EmojiTextArea
            key={i}
            id={i.toString()}
            emoji={fields.find((a) => a.id === i)?.emoji}
            setEmoji={(emoji) => {
              emojiHandler(emoji, i);
            }}
            text={fields.find((a) => a.id === i)?.text}
            setText={(text) => {
              textHandler(text, i);
            }}
          />
        ))}
      </div>
      <div className="hidden w-full justify-center sm:flex">
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </div>
      <MobileBottomBar>
        <Button onClick={onDone}>{t('exercises.ready')}</Button>
      </MobileBottomBar>
    </div>
  );
};

const EmojiTextArea = ({
  emoji,
  setEmoji,
  text,
  setText,
}: {
  id: string;
  emoji: string | undefined;
  setEmoji: (emoji: string) => void;
  text: string | undefined;
  setText: (text: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="relative mt-4 w-full">
      <div className={`absolute left-4 top-0 z-30 -translate-y-1/2 ${emoji && 'text-[2rem]'}`}>
        <Popover>
          <PopoverButton as={Button} variant="soft">
            {emoji ?? t('exercises.choose-emoji')}
          </PopoverButton>
          <PopoverPanel className="z-50 text-body" anchor="top start">
            {({ close }) => (
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setEmoji(emoji.emoji);
                  close();
                }}
              />
            )}
          </PopoverPanel>
        </Popover>
      </div>
      <textarea
        className="z-20 w-full rounded p-4 pt-8"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label={t('exercises.emoji-textarea-label')}
      />
    </div>
  );
};

export default EmojiExercise;
