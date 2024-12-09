import { ExerciseWithInfo, SkillAreaID, SkillAreaIDValues } from '@/lib/content-types';
import { AnswerRecordEntry, useQuickSelfEvaluationStore } from '@/stores/quickSelfEvaluationStore';
import useSkillAreas from '../useSkillAreas';

const calcQuickScore = (answer: AnswerRecordEntry) => {
  return (answer.interest + answer.knowledge) / 2;
};

const checkExerciseScore = (score: number, minScore?: number, maxScore?: number) => {
  return (!minScore ? true : minScore <= score) && (!maxScore ? true : score < maxScore);
};

/**
 * Return couple exercise suggestions for the section with lowest score, if multiple
 * with the same use the first section.
 */
export const useQuickSuggestionExercises = (): ExerciseWithInfo[] => {
  const answers = useQuickSelfEvaluationStore((state) => state.answers);

  const [firstSkillAreaId, ...restSkillAreaIds] = SkillAreaIDValues;

  const lowest = restSkillAreaIds.reduce(
    (acc, cur) => {
      const curScore = calcQuickScore(answers[cur]);

      if (curScore < acc.score) return { id: cur, score: curScore };

      return acc;
    },
    {
      id: firstSkillAreaId,
      score: calcQuickScore(answers[firstSkillAreaId]),
    } as { id: SkillAreaID; score: number },
  );

  const skillArea = useSkillAreas().find((sa) => sa.id === lowest.id);

  if (skillArea === undefined) return [];

  return skillArea.sections
    .flatMap(
      (section) =>
        section.exercises
          ?.filter((exercise) => checkExerciseScore(lowest.score, exercise.minScore, exercise.maxScore))
          .flatMap((exercise) => ({
            skillAreaSlug: skillArea.slug,
            sectionSlug: section.slug,
            sectionId: section.id,
            skillAreaId: skillArea.id,
            skillAreaName: skillArea.name,
            ...exercise,
          })) ?? [],
    )
    .slice(0, 3);
};
