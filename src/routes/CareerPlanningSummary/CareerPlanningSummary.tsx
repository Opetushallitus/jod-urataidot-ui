import { BlobProvider } from '@react-pdf/renderer';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button as DSButton } from '@jod/design-system';

import { SpiderDiagram, BackButton, Button, Card } from '@/components';
import { CareerPlanningSummarySection } from '@/components/CareerPlanningSummarySection/CareerPlanningSummarySection';
import { TotalScoreRecord } from '@/components/SpiderDiagram/SpiderDiagram';
import { OpenAllExercisesPDFButton } from '@/features/exercises/components/OpenAllExercisesPDFButton';
import SummaryDocument from '@/features/pdf/documents/SummaryDocument';
import useSkillAreas from '@/hooks/useSkillAreas';
import { Open, Link, Check } from '@/icons';
import { SkillAreaIDValues, SkillArea } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';

const CareerPlanningSummary = () => {
  const [linkCopied, setLinkCopied] = React.useState(false);
  const { t, i18n } = useTranslation();
  const skillAreas = useSkillAreas();

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
      `${globalThis.location.origin}/urataidot/${i18n.language}/${t('slugs.import')}#${getEncodedData()}`,
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <div>
      <BackButton />
      <h1 className="text-text mt-5 mb-5 text-heading-2 sm:mt-7 sm:text-heading-1">
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
          <h3 className="mb-3 text-heading-3">{t('career-management-summary.summary-pdf-card.title')}</h3>
          <p className="mb-6">{t('career-management-summary.summary-pdf-card.description')}</p>
          <BlobProvider
            document={<SummaryDocument totalScores={totalScores} skillAreas={skillAreas} answers={answers} />}
          >
            {({ url, loading }) =>
              loading || !url ? (
                <DSButton
                  iconSide="left"
                  icon={<Open />}
                  disabled={true}
                  variant="gray"
                  label={t('career-management-summary.summary-link-card.link-loading')}
                />
              ) : (
                <div className="flex">
                  <DSButton
                    icon={<Open />}
                    iconSide="left"
                    variant="gray"
                    label={t('career-management-summary.summary-pdf-card.button')}
                    linkComponent={({ children, className }) => (
                      <a href={url} target="_blank" rel="noreferrer" className={className}>
                        {children}
                      </a>
                    )}
                  />
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
          <DSButton
            variant="gray"
            icon={linkCopied ? <Check /> : <Link />}
            iconSide="left"
            onClick={() => {
              void copyToClipboard();
            }}
            label={
              linkCopied
                ? t('career-management-summary.summary-link-card.link-copied')
                : t('career-management-summary.summary-link-card.copy-link')
            }
          />
        </Card>
      </div>
    </div>
  );
};

export default CareerPlanningSummary;
