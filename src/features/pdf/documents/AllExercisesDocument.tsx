import { Exercise } from '@/lib/content-types';
import { ExerciseAnswer } from '@/stores/exerciseAnswersStore';
import { Document } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { ExercisePage } from './ExerciseDocument';

export type AllExercises = {
  exercise: Exercise;
  answers: ExerciseAnswer['answers'];
  type: ExerciseAnswer['type'];
}[];

const AllExercisesDocument = ({ exerciseAnswers }: { exerciseAnswers: AllExercises }) => {
  const { t } = useTranslation();

  return (
    <Document title={t('pdf.all-exercises-document')}>
      {exerciseAnswers.map((answer) => (
        <ExercisePage key={answer.exercise.id} exercise={answer.exercise} answers={answer.answers} type={answer.type} />
      ))}
    </Document>
  );
};

export default AllExercisesDocument;
