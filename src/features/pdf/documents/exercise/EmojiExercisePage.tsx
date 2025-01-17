import { EmojiExercise } from '@/lib/content-types';
import { EmojiExerciseAnswer } from '@/stores/exerciseAnswersStore';
import { Font, StyleSheet, Text, View } from '@react-pdf/renderer';
import ExercisePage from './ExercisePage';
import { styles } from './ExerciseStylesheet';
import { parseDescription } from '../../helpers/parseDescription';

const localStyle = StyleSheet.create({
  answerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  emoji: {
    fontSize: 24,
  },
});

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/',
});

export const EmojiExercisePage = ({
  exercise,
  answers,
}: {
  exercise: EmojiExercise;
  answers: EmojiExerciseAnswer['answers'];
}) => {
  return (
    <ExercisePage>
      <View>
        <Text style={styles.heading}>{exercise.title}</Text>
        {parseDescription(exercise.description)}
      </View>
      <Text style={styles.headingSmall}>{exercise.emojiTitle}</Text>
      {answers.map((answer) => (
        <View key={answer.id} style={localStyle.answerContainer}>
          <Text style={localStyle.emoji}>{answer.emoji}</Text>
          <Text style={styles.body}>{answer.text}</Text>
        </View>
      ))}
    </ExercisePage>
  );
};
