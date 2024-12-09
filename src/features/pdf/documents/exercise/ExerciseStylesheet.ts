import { Font, StyleSheet } from '@react-pdf/renderer';

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
  fonts: [
    {
      src: '/urataidot/fonts/Arimo-Regular.ttf',
      fontStyle: 'normal',
    },
    {
      src: '/urataidot/fonts/Arimo-Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 36,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: 28,
    marginVertical: 64,
    display: 'flex',
    flexDirection: 'column',
    gap: 40,
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 20,
    marginBottom: 8,
  },
  headingSmall: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 12,
  },
  bodySmallItalic: {
    fontFamily: 'Arimo',
    fontSize: 10,
    fontStyle: 'italic',
  },
  body: {
    fontFamily: 'Arimo',
    fontSize: 12,
  },
  bodyLarge: {
    fontFamily: 'Arimo',
    fontSize: 14,
  },
});
