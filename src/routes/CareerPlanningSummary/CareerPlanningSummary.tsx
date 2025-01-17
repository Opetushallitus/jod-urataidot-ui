import { useTranslation } from 'react-i18next';
import { SpiderDiagram, BackButton, Button, Card } from '@/components';
import { TotalScoreRecord } from '@/components/SpiderDiagram/SpiderDiagram';
import { SkillAreaIDValues, SkillArea } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { CareerPlanningSummarySection } from '@/components/CareerPlanningSummarySection/CareerPlanningSummarySection';
import { Open, Link, Check, ArrowRight } from '@/icons';
import { BlobProvider } from '@react-pdf/renderer';
import SummaryDocument from '@/features/pdf/documents/SummaryDocument';
import React from 'react';
import { OpenAllExercisesPDFButton } from '@/features/exercises/components/OpenAllExercisesPDFButton';
import { useSearchParams } from 'react-router';

const CareerPlanningSummary = ({ skillAreas }: { skillAreas: SkillArea[] }) => {
  const [linkCopied, setLinkCopied] = React.useState(false);
  const { t, i18n } = useTranslation();

  const [searchParams] = useSearchParams();
  const isFromYksilo = searchParams.has('yksilo');

  const answers = useCareerPlanningAnswersStore((state) => state.answers);

  const totalScores = SkillAreaIDValues.reduce((acc, cur) => {
    const skillAreaAnswers = answers.filter((a) => a.skillAreaId === cur);

    return {
      ...acc,
      [cur]:
        skillAreaAnswers.length === 0
          ? undefined
          : skillAreaAnswers.reduce((acc, cur) => acc + cur.score, 0) / skillAreaAnswers.length,
    };
  }, {} as TotalScoreRecord);

  const getEncodedData = useCareerPlanningAnswersStore((state) => state.getEncodedData);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/urataidot/${i18n.language}/${t('slugs.import')}${isFromYksilo ? '?yksilo=' : ''}#${getEncodedData()}`,
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-text mb-4 mt-4 text-heading-2 sm:mt-8 sm:text-heading-1">
        {t('career-management-summary.title')}
      </h1>

      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="filled"
            icon={linkCopied ? <Check /> : <Link />}
            onClick={() => {
              void copyToClipboard();
            }}
          >
            {linkCopied
              ? t('career-management-summary.summary-link-card.link-copied')
              : t('career-management-summary.summary-link-card.copy-link')}
          </Button>
        </div>

        <SpiderDiagram totalScores={totalScores} skillAreas={skillAreas} />

        {[...skillAreas]
          .sort((a: SkillArea, b: SkillArea) => {
            const sa = totalScores[a.id];
            const sb = totalScores[b.id];
            if (sa === undefined && sb === undefined) return 0;
            if (sa != undefined || sb === undefined) return -1;
            if (sa === undefined || sb != undefined) return 1;
            return sa - sb;
          })
          .map((skillArea: SkillArea, i: number) => (
            <CareerPlanningSummarySection
              index={i}
              key={skillArea.id}
              skillArea={skillArea}
              score={totalScores[skillArea.id]}
            />
          ))}

        <Card>
          <h3 className="mb-2 text-heading-3">{t('career-management-summary.summary-pdf-card.title')}</h3>
          <p className="mb-6">{t('career-management-summary.summary-pdf-card.description')}</p>
          <BlobProvider
            document={<SummaryDocument totalScores={totalScores} skillAreas={skillAreas} answers={answers} />}
          >
            {({ url, loading }) =>
              loading || !url ? (
                <Button iconSide="left" icon={<Open />} disabled={true} variant="filled">
                  {t('career-management-summary.summary-link-card.link-loading')}
                </Button>
              ) : (
                <div className="flex">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-4 py-2 font-display font-bold text-white outline-offset-4 hover:bg-primary-hover hover:underline"
                  >
                    <div className="size-6">
                      <Open />
                    </div>
                    <span className="text-wrap text-center leading-none">
                      {t('career-management-summary.summary-pdf-card.button')}
                    </span>
                  </a>
                </div>
              )
            }
          </BlobProvider>
        </Card>

        <Card>
          <h3 className="mb-2 text-heading-3">{t('career-management-summary.exercise-pdf-card.title')}</h3>
          <p className="mb-6">{t('career-management-summary.exercise-pdf-card.description')}</p>
          <OpenAllExercisesPDFButton />
        </Card>

        <Card>
          <h3 className="mb-2 text-heading-3">{t('career-management-summary.summary-link-card.title')}</h3>
          <p className="mb-6">{t('career-management-summary.summary-link-card.description')}</p>
          <Button
            variant="filled"
            icon={linkCopied ? <Check /> : <Link />}
            iconSide="left"
            onClick={() => {
              void copyToClipboard();
            }}
          >
            {linkCopied
              ? t('career-management-summary.summary-link-card.link-copied')
              : t('career-management-summary.summary-link-card.copy-link')}
          </Button>
        </Card>
        {!isFromYksilo && (
          <Card>
            <h3 className="mb-2 text-heading-3">{t('career-management-summary.summary-career-plan.title')}</h3>
            <p className="mb-6">{t('Career-management-summary.summary-career-plan.description')}</p>
            <Button to={`/${i18n.language}/${t('slugs.career-plan')}`} icon={<ArrowRight />}>
              {t('career-management-summary.summary-career-plan.button')}
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CareerPlanningSummary;
