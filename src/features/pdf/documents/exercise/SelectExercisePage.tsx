import { SelectExercise } from '@/lib/content-types';
import { SelectExerciseAnswer } from '@/stores/exerciseAnswersStore';
import { StyleSheet, Text, View } from '@react-pdf/renderer';
import { Fragment } from 'react';
import ExercisePage from './ExercisePage';
import { styles } from './ExerciseStylesheet';
import { parseDescription } from '../../helpers/parseDescription';

const localStyle = StyleSheet.create({
  selectedWordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  selectedWord: {
    padding: 4,
    paddingHorizontal: 8,
    backgroundColor: '#E5F2FB',
    border: '1px solid #006DB3',
    borderRadius: 9999,
    fontSize: 12,
    color: '#006DB3',
  },
});

export const SelectExercisePage = ({
  exercise,
  answers,
}: {
  exercise: SelectExercise;
  answers: SelectExerciseAnswer['answers'];
}) => {
  return (
    <ExercisePage>
      <View>
        <Text style={styles.heading}>{exercise.title}</Text>
        {parseDescription(exercise.description)}
      </View>
      {exercise.wordLists.map((wordList, i) => (
        <Fragment key={exercise.id}>
          <Text style={styles.headingSmall}>{wordList.title}</Text>
          <View style={localStyle.selectedWordsContainer}>
            {answers[i].selections.map((word) => (
              <Text key={answers[i].id} style={localStyle.selectedWord}>
                {word}
              </Text>
            ))}
          </View>
        </Fragment>
      ))}
    </ExercisePage>
  );
};
