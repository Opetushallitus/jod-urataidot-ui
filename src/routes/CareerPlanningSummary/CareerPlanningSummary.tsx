import { useTranslation } from 'react-i18next';
import { SpiderDiagram, BackButton, Button, Card } from '@/components';
import { TotalScoreRecord } from '@/components/SpiderDiagram/SpiderDiagram';
import { SkillAreaIDValues, SkillArea } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { CareerPlanningSummarySection } from '@/components/CareerPlanningSummarySection/CareerPlanningSummarySection';
import { Open, Link, Check } from '@/icons';
import { BlobProvider } from '@react-pdf/renderer';
import SummaryDocument from '@/features/pdf/documents/SummaryDocument';
import React from 'react';
import { OpenAllExercisesPDFButton } from '@/features/exercises/components/OpenAllExercisesPDFButton';

const CareerPlanningSummary = ({ skillAreas }: { skillAreas: SkillArea[] }) => {
  const [linkCopied, setLinkCopied] = React.useState(false);
  const { t, i18n } = useTranslation();

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

  // clipboard not working on local dev-environment on iOS Safari, because it is not https://
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/urataidot/${i18n.language}/${t('slugs.import')}#${getEncodedData()}`,
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-text text-heading-2 sm:text-heading-1 mt-5 mb-5 sm:mt-7">
        {t('career-management-summary.title')}
      </h1>

      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-wrap gap-3">
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
          <h3 className="text-heading-3 mb-3">{t('career-management-summary.summary-pdf-card.title')}</h3>
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
                    className="group bg-primary font-display hover:bg-primary-hover relative flex min-h-[44px] items-center justify-center gap-3 rounded-full px-5 py-3 font-bold whitespace-nowrap text-white outline-offset-4 hover:underline"
                  >
                    <div className="size-6">
                      <Open />
                    </div>
                    <span className="text-center leading-none text-wrap">
                      {t('career-management-summary.summary-pdf-card.button')}
                    </span>
                  </a>
                </div>
              )
            }
          </BlobProvider>
        </Card>

        <Card>
          <h3 className="text-heading-3 mb-2">{t('career-management-summary.exercise-pdf-card.title')}</h3>
          <p className="mb-6">{t('career-management-summary.exercise-pdf-card.description')}</p>
          <OpenAllExercisesPDFButton />
        </Card>

        <Card>
          <h3 className="text-heading-3 mb-2">{t('career-management-summary.summary-link-card.title')}</h3>
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
      </div>
    </div>
  );
};

export default CareerPlanningSummary;
