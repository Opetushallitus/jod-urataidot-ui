import { ExerciseWithInfo, SkillAreaID } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';

import { isExerciseLimit } from '@/utils/isExerciseLimit';
import useSkillAreas from '../useSkillAreas';

export const useSkillAreaExercises = ({ skillAreaId }: { skillAreaId: SkillAreaID }): ExerciseWithInfo[] => {
  const getScore = useCareerPlanningAnswersStore((state) => state.getScore);
  const skillAreas = useSkillAreas();

  const skillAreaSlug = skillAreas.find((sa) => sa.id === skillAreaId)?.slug ?? '';
  const skillArea = skillAreas.find((sa) => sa.id === skillAreaId);

  if (!skillArea) return [];

  return skillArea.sections.flatMap((section) => {
    if (!section.exercises) {
      return [];
    }

    const scores = section.questions.flatMap(
      (question) => getScore({ sectionId: section.id, questionId: question.id, skillAreaId: skillAreaId }) ?? [],
    );

    if (scores.length === 0) {
      return [];
    }

    const score = scores.reduce((arr, cur) => cur + arr, 0) / scores.length;

    const exercise = section.exercises.find((e) => isExerciseLimit({ score, min: e.minScore, max: e.maxScore }));

    return exercise
      ? [
          {
            skillAreaSlug: skillAreaSlug,
            sectionSlug: section.slug,
            sectionId: section.id,
            skillAreaId: skillAreaId,
            skillAreaName: skillArea.name,
            ...exercise,
          },
        ]
      : [];
  });
};
