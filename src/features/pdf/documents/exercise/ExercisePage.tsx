import i18n from '@/i18n/config';
import { Font, Image, Page, Text, View } from '@react-pdf/renderer';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { styles } from './ExerciseStylesheet';

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

const ExercisePage = ({ children, gap = 20 }: { children?: ReactNode; gap?: number }) => {
  return (
    <Page size="A4" style={styles.page}>
      <Header />
      <View style={{ ...styles.content, gap }}>{children}</View>
    </Page>
  );
};

const Header = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.header}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Image src="/urataidot/hyria_logo.png" style={{ width: 70, height: 32 }} />
        <Image src="/urataidot/eu_rahoittama_logo.png" style={{ height: 26 }} />
        <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Text style={{ fontSize: 8 }}>{t('pdf.exercise-answer')}</Text>
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

export default ExercisePage;
