import { StyleSheet, Text, View } from '@react-pdf/renderer';

import { TextExercise } from '@/lib/content-types';
import { TextExerciseAnswer } from '@/stores/exerciseAnswersStore';

import { parseDescription } from '../../helpers/parseDescription';
import ExercisePage from './ExercisePage';
import { styles } from './ExerciseStylesheet';

const localStyle = StyleSheet.create({
  textFieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
});

export const TextExercisePage = ({
  exercise,
  answers,
}: {
  exercise: TextExercise;
  answers: TextExerciseAnswer['answers'];
}) => {
  return (
    <ExercisePage>
      <View>
        <Text style={styles.heading}>{exercise.title}</Text>
        {parseDescription(exercise.description)}
      </View>
      {exercise.textFields.map((textField) => (
        <View key={textField.id} style={localStyle.textFieldContainer}>
          <Text style={styles.headingSmall}>{textField.title}</Text>
          <Text style={styles.body}>{answers.find((a) => a.id === textField.id)?.text}</Text>
        </View>
      ))}
    </ExercisePage>
  );
};
