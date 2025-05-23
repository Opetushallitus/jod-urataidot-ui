import { Button, MobileBottomBar } from '@/components';
import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { useEasierExercise } from '@/hooks/useEasierExercise';
import { EmojiExercise as EmojiExerciseType, SkillAreaID } from '@/lib/content-types';
import { useExerciseAnsweredStore } from '@/stores/exerciseAnsweredStore';
import { EmojiExerciseAnswer, useExerciseAnswersStore } from '@/stores/exerciseAnswersStore';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import EmojiPicker, { EmojiStyle } from 'emoji-picker-react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
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
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { search } = useLocation();

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
    <div className="flex w-full flex-col gap-5">
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
        <span className="text-body mb-2 whitespace-pre-wrap">
          {t('exercises.easier-question')}{' '}
          <a
            href={`/urataidot/${language}/${t('slugs.exercises')}/${easierExercise.skillAreaSlug}/${easierExercise.sectionSlug}/${easierExercise.id}${search}`}
            className="text-body-sm-bold text-primary hover:underline"
          >
            {t('exercises.easier-link')}
          </a>
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

const CDN_URL_APPLE = `${import.meta.env.BASE_URL}emoji-datasource-apple/img/apple/64/`;
const CDN_URL_FACEBOOK = `${import.meta.env.BASE_URL}emoji-datasource-facebook/img/facebook/64/`;
const CDN_URL_TWITTER = `${import.meta.env.BASE_URL}emoji-datasource-twitter/img/twitter/64/`;
const CDN_URL_GOOGLE = `${import.meta.env.BASE_URL}emoji-datasource-google/img/google/64/`;

function cdnUrl(emojiStyle: EmojiStyle): string {
  switch (emojiStyle) {
    case EmojiStyle.TWITTER:
      return CDN_URL_TWITTER;
    case EmojiStyle.GOOGLE:
      return CDN_URL_GOOGLE;
    case EmojiStyle.FACEBOOK:
      return CDN_URL_FACEBOOK;
    case EmojiStyle.APPLE:
    default:
      return CDN_URL_APPLE;
  }
}

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
      <div className={`absolute top-0 left-4 z-30 -translate-y-1/2 ${emoji && 'text-[2rem]'}`}>
        <Popover>
          <PopoverButton as={Button} variant="soft">
            {emoji ?? t('exercises.choose-emoji')}
          </PopoverButton>
          <PopoverPanel className="text-body z-50" anchor="top start">
            {({ close }) => (
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setEmoji(emoji.emoji);
                  close();
                }}
                getEmojiUrl={(unified, emojiStyle) => `${cdnUrl(emojiStyle)}${unified}.png`}
              />
            )}
          </PopoverPanel>
        </Popover>
      </div>
      <textarea
        className="z-20 w-full rounded-sm bg-white p-5 pt-7"
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label={t('exercises.emoji-textarea-label')}
      />
    </div>
  );
};

export default EmojiExercise;
