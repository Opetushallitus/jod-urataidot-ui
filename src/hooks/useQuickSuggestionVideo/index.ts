import { SkillAreaID, SkillAreaIDValues } from '@/lib/content-types';
import { useQuickSelfEvaluationStore } from '@/stores/quickSelfEvaluationStore';
import useSkillAreas from '../useSkillAreas';

/**
 * Return the video source for video the user is most interested in
 */
export const useQuickSuggestionVideo = () => {
  const answers = useQuickSelfEvaluationStore((state) => state.answers);

  const [firstSkillAreaId, ...restSkillAreaIds] = SkillAreaIDValues;
  const lowest = restSkillAreaIds.reduce(
    (acc, cur) => {
      return answers[cur].interest > acc.score ? { id: cur, score: answers[cur].interest } : acc;
    },
    {
      id: firstSkillAreaId,
      score: answers[firstSkillAreaId].interest,
    } as { id: SkillAreaID; score: number },
  );

  const skillArea = useSkillAreas().find((sa) => lowest.id === sa.id);

  return { skillAreaId: lowest.id, skillAreaName: skillArea?.name ?? '' };
};
