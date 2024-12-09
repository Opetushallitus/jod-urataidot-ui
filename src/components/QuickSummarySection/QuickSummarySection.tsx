import { SkillArea } from '@/lib/content-types';
import { SkillAreaIcon } from '../SkillAreaIcon/SkillAreaIcon';
import { t } from 'i18next';
import { InfoButton } from '..';

export const QuickSummarySection = ({
  skillArea,
  score,
}: {
  skillArea: Pick<SkillArea, 'id' | 'name' | 'info' | 'feedbacks'>;
  score: number;
}) => {
  const feedback = skillArea.feedbacks.find((f) => f.minScore <= score && score <= f.maxScore);
  return (
    <div className="flex w-full flex-col gap-4 rounded-[1.25rem] bg-white p-3">
      <div className="flex items-center gap-4">
        <SkillAreaIcon size="md" section={skillArea.id} />
        <h3 className="text-heading-3">{skillArea.name}</h3>
      </div>
      <p className="text-body">{feedback?.description}</p>

      <InfoButton
        buttonText={t('components.quick-self-evaluation-summary-section.more-info')}
        title={skillArea.name}
        info={skillArea.info}
      />
    </div>
  );
};

QuickSummarySection.displayName = 'QuickSummarySection';
