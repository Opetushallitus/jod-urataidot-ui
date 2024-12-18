import { PDFSpiderDiagram } from '../components/PDFSpiderDiagram';
import { PDFBarDiagram } from '../components/PDFBarDiagram';
import { TotalScoreRecord } from '@/components/SpiderDiagram/SpiderDiagram';
import i18n from '@/i18n/config';
import { SkillArea } from '@/lib/content-types';
import { Document, Page, StyleSheet, View, Text, Font, Image } from '@react-pdf/renderer';
import { useTranslation } from 'react-i18next';
import { Answer } from '@/stores/careerPlanningAnswersStore';
import { ReactNode } from 'react';

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
  },
  content: {
    marginHorizontal: 28,
    marginVertical: 64,
    display: 'flex',
    flexDirection: 'column',
    gap: 56,
  },
  barContent: {
    marginHorizontal: 28,
    marginVertical: 64,
    display: 'flex',
    flexDirection: 'column',
  },
  heading: {
    fontFamily: 'Poppins',
    fontWeight: 600,
    fontSize: 20,
  },
  bodyLarge: {
    fontFamily: 'Arimo',
    fontSize: 12,
  },
});

const SummaryDocument = ({
  skillAreas,
  totalScores,
  answers,
}: {
  skillAreas: Pick<SkillArea, 'id' | 'name' | 'longName' | 'sections' | 'feedbacks'>[];
  totalScores: TotalScoreRecord;
  answers: Answer[];
}) => {
  const { t } = useTranslation();

  const skillAreaBarDiagrams = skillAreas.map((skillArea, i) => {
    const score = totalScores[skillArea.id];
    const feedback = score ? skillArea.feedbacks.find((f) => f.minScore <= score && score <= f.maxScore) : undefined;

    const skillAreaAnswers = answers.filter((a) => {
      return a.skillAreaId === skillArea.id;
    });

    return (
      <PDFBarDiagram
        key={skillArea.id}
        index={i + 1}
        skillArea={skillArea}
        answers={skillAreaAnswers}
        feedback={feedback?.description}
      />
    );
  });

  return (
    <Document title={t('pdf.result-summary')}>
      <SummaryPage gap={56}>
        <View style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Text style={styles.heading}>{t('pdf.result-summary')}</Text>
          <Text style={styles.bodyLarge}>{t('pdf.result-summary-description')}</Text>
        </View>
        <PDFSpiderDiagram totalScores={totalScores} skillAreas={skillAreas.map((a) => ({ id: a.id, name: a.name }))} />
      </SummaryPage>
      <SummaryPage>
        {skillAreaBarDiagrams[0]}
        {skillAreaBarDiagrams[1]}
      </SummaryPage>
      <SummaryPage>
        {skillAreaBarDiagrams[2]}
        {skillAreaBarDiagrams[3]}
      </SummaryPage>
      <SummaryPage>
        {skillAreaBarDiagrams[4]}
        {skillAreaBarDiagrams[5]}
      </SummaryPage>
    </Document>
  );
};

const SummaryPage = ({ children, gap = 40 }: { children?: ReactNode; gap?: number }) => {
  return (
    <Page size={'A4'} style={styles.page}>
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
        <Image src="/urataidot/eu_rahoittama_logo.png" style={{ height: 26 }} />
        <View style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Text style={{ fontSize: 8 }}>{t('pdf.career-management-skills-report')}</Text>
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

export default SummaryDocument;
