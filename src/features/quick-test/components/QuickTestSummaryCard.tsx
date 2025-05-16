import { Card } from '@/components';
import { SkillAreaID, SkillAreaIDValues } from '@/lib/content-types';
import { useQuickSelfEvaluationStore } from '@/stores/quickSelfEvaluationStore';
import { useQuickEvaluationHeading } from '../hooks/useQuickEvaluationHeading';
import { useTranslation } from 'react-i18next';

export const QuickTestSummaryCard = ({ title, type }: { title: string; type: 'knowledge' | 'interest' }) => {
  const answers = useQuickSelfEvaluationStore((state) => state.answers);
  const scores = SkillAreaIDValues.map((id) => answers[id][type]);

  return (
    <Card className="flex flex-col gap-4">
      <h2 className="text-heading-3">{title}</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-y-16">
        {scores.map((s, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <ScoreDisplay key={i} skillAreaId={SkillAreaIDValues[i]} score={s} />
        ))}
      </div>
    </Card>
  );
};

const ScoreDisplay = ({ score, skillAreaId }: { score: number; skillAreaId: SkillAreaID }) => {
  const heading = useQuickEvaluationHeading(skillAreaId);
  return (
    <div className="flex flex-col justify-between gap-4">
      <h3>{heading}</h3>
      <DisplaySlider score={score} />
    </div>
  );
};

const DisplaySlider = ({ score }: { score: number }) => {
  const { t } = useTranslation();

  const getProgressClassName = () => {
    switch (score) {
      case 0:
        return 'w-3';
      case 1:
        return 'w-[calc(100%/3+10px)]';
      case 2:
        return 'w-[calc(200%/3+6px)]';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="font-display text-body-sm flex justify-between">
        <div>{t('components.slider.not-at-all')}</div>
        <div>{t('components.slider.fully')}</div>
      </div>
      <div className="bg-neutral-5 relative h-1.5 w-full rounded-full">
        {/* Blue progress bar */}
        <div
          aria-hidden
          className="bg-neutral-5 pointer-events-none absolute inset-0 z-10 flex items-center justify-between rounded-full"
        >
          <div className={`bg-primary h-1.5 rounded-full ${getProgressClassName()}`} />
        </div>
        {/* Ticks */}
        <div className="absolute inset-0 z-20 mx-1 flex h-1.5 items-center justify-between">
          <div className={`bg-primary-muted size-1 rounded-full`} />
          <div className={`size-1 rounded-full ${score > 1 ? 'bg-primary-muted' : 'bg-primary-light'}`} />
          <div className={`size-1 rounded-full ${score > 2 ? 'bg-primary-muted' : 'bg-primary-light'}`} />
          <div className={`bg-primary-light size-1 rounded-full`} />
        </div>
      </div>
    </div>
  );
};
