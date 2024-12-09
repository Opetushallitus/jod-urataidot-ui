import { EmojiExercise, Exercise, MediaExercise, SelectExercise, TextExercise } from '@/lib/content-types';
import {
  EmojiExerciseAnswer,
  ExerciseAnswer,
  MediaExerciseAnswer,
  SelectExerciseAnswer,
  TextExerciseAnswer,
} from '@/stores/exerciseAnswersStore';
import { Document } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { EmojiExercisePage } from './exercise/EmojiExercisePage';
import { MediaExercisePage } from './exercise/MediaExercisePage';
import { SelectExercisePage } from './exercise/SelectExercisePage';
import { TextExercisePage } from './exercise/TextExercisePage';

interface Props {
  exercise: Exercise;
  answers: ExerciseAnswer['answers'];
  type: ExerciseAnswer['type'];
}

export const ExercisePage = ({ type, exercise, answers }: Props) => {
  switch (type) {
    case 'emoji':
      return (
        <EmojiExercisePage exercise={exercise as EmojiExercise} answers={answers as EmojiExerciseAnswer['answers']} />
      );
    case 'media':
      return (
        <MediaExercisePage exercise={exercise as MediaExercise} answers={answers as MediaExerciseAnswer['answers']} />
      );
    case 'text':
      return (
        <TextExercisePage exercise={exercise as TextExercise} answers={answers as TextExerciseAnswer['answers']} />
      );
    case 'select':
      return (
        <SelectExercisePage
          exercise={exercise as SelectExercise}
          answers={answers as SelectExerciseAnswer['answers']}
        />
      );
  }
};

const ExerciseDocument = (props: Props) => {
  const { t } = useTranslation();
  return (
    <Document title={t('pdf.exercise-document')}>
      <ExercisePage {...props} />
    </Document>
  );
};

export default ExerciseDocument;
