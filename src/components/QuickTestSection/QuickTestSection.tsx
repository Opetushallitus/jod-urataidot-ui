import { useQuickEvaluationHeading } from '@/features/quick-test/hooks/useQuickEvaluationHeading';
import { Slider } from '../Slider/Slider';
import { SkillArea } from '@/lib/content-types';
import { useQuickSelfEvaluationStore } from '@/stores/quickSelfEvaluationStore';
import { useTranslation } from 'react-i18next';

export const QuickTestSection = ({ skillArea }: { skillArea: Pick<SkillArea, 'id' | 'name' | 'info'> }) => {
  const { t } = useTranslation();
  const getScore = useQuickSelfEvaluationStore((state) => state.getScore);
  const setScore = useQuickSelfEvaluationStore((state) => state.setScore);

  const heading = useQuickEvaluationHeading(skillArea.id);

  return (
    <div className="flex w-full flex-col justify-between gap-5 rounded-[1.25rem] bg-white p-6">
      <div className="flex items-center gap-3">
        <h3 className="text-heading-3">{`${heading}`}</h3>
      </div>
      <div className="flex flex-col gap-5">
        <Slider
          defaultValue={getScore({ id: skillArea.id, type: 'knowledge' })}
          onChange={(e) => setScore({ id: skillArea.id, score: Number(e.target.value), type: 'knowledge' })}
        />
        <Slider
          leftText={t('quick-self-evaluation.interest.0')}
          rightText={t('quick-self-evaluation.interest.3')}
          defaultValue={getScore({ id: skillArea.id, type: 'interest' })}
          valueTexts={[
            t('quick-self-evaluation.interest.0'),
            t('quick-self-evaluation.interest.1'),
            t('quick-self-evaluation.interest.2'),
            t('quick-self-evaluation.interest.3'),
          ]}
          onChange={(e) => setScore({ id: skillArea.id, score: Number(e.target.value), type: 'interest' })}
        />
      </div>
    </div>
  );
};

QuickTestSection.displayName = 'QuickTestSection';
