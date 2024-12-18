import { useTranslation } from 'react-i18next';
import { Document, View, StyleSheet, Font, Page, Text, Image } from '@react-pdf/renderer';

// Disable word hyphenation, because it doesn't work in Finnish
// https://react-pdf.org/fonts#registerhyphenationcallback
Font.registerHyphenationCallback((word) => {
  return [word];
});

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
    paddingVertical: 24,
    paddingHorizontal: 36,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  content: {
    marginHorizontal: 28,
    marginVertical: 28,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
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
    marginBottom: 4,
  },
  body: {
    fontFamily: 'Arimo',
    fontSize: 12,
  },
});

interface Props {
  content: { id: number; answer: string; question: string }[];
}

const CareerPlanDocument = ({ content }: Props) => {
  const { t } = useTranslation();
  return (
    <Document title={t('career-plan.title')}>
      <Page size="A4" style={styles.page}>
        <Header />
        <View style={styles.content}>
          <Text style={styles.heading}>{t('career-plan.title')}</Text>
          {content.map((qa, i) => (
            <View key={i} wrap={false}>
              <Text style={styles.headingSmall}>{qa.question}</Text>
              <Text style={styles.body}>{qa.answer}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const Header = () => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.header} fixed>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Image src="/urataidot/eu_rahoittama_logo.png" style={{ height: 26 }} />
        <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Text style={{ fontSize: 8, textTransform: 'uppercase' }}>{t('pdf.career-plan')}</Text>
          <Text style={{ fontSize: 10 }}>
            {t('pdf.created-at', {
              time: new Intl.DateTimeFormat([i18n.language], {
                dateStyle: 'medium',
                timeStyle: 'short',
              }).format(new Date()),
            })}
          </Text>
        </View>
      </View>
      <View style={{ display: 'flex', height: '100%', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text
          style={{ fontSize: 10 }}
          render={({ pageNumber, totalPages }) => t('pdf.page', { pageNumber, totalPages })}
          fixed
        />
      </View>
    </View>
  );
};

export default CareerPlanDocument;
