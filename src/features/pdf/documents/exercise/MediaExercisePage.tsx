import { MediaExercise } from '@/lib/content-types';
import { MediaExerciseAnswer } from '@/stores/exerciseAnswersStore';
import { Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

Font.register({
  family: 'Poppins',
  fonts: [
    {
      src: '/urataidot/fonts/Poppins-Regular.ttf',
      fontWeight: 400,
    },
    {
      src: '/urataidot/fonts/Poppins-SemiBold.ttf',
      fontWeight: 600,
    },
  ],
});

Font.register({
  family: 'Arimo',
  src: '/urataidot/fonts/Arimo-Regular.ttf',
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Arimo',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins',
  },
  section: {
    marginVertical: 5,
  },
  text: {
    fontFamily: 'Arimo',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
});

export const MediaExercisePage = ({
  exercise,
  answers,
}: {
  exercise: MediaExercise;
  answers: MediaExerciseAnswer['answers'];
}) => (
  <Page size="A4" style={styles.page}>
    <View style={styles.section}>
      <Text style={styles.title}>{exercise.title}</Text>
    </View>
    <View style={styles.section}>
      <Text>{exercise.description}</Text>
      <Text>{answers[0].text}</Text>
    </View>
    <View style={styles.optionsList}>{exercise.mediaDescription}</View>
  </Page>
);
