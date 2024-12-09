import { ExerciseWithInfo, SkillAreaID } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { isExerciseLimit } from '@/utils/isExerciseLimit';
import useSkillAreas from '../useSkillAreas';

/**
 * Recommended exercises based on the average answer of the section
 */
export const useRecommendedExercises = (): {
  id: SkillAreaID;
  name: string;
  exercises: ExerciseWithInfo[];
}[] => {
  const answers = useCareerPlanningAnswersStore((state) => state.answers);
  const skillAreas = useSkillAreas();

  return skillAreas.map((skillArea) => ({
    id: skillArea.id,
    name: skillArea.name,
    exercises: skillArea.sections.flatMap((section) => {
      if (!section.exercises) {
        return [];
      }

      const sectionScores = answers
        .filter((a) => a.skillAreaId === skillArea.id && a.sectionId === section.id)
        .map((a) => a.score);

      if (sectionScores.length === 0) {
        return [];
      }
      const sectionAverage = sectionScores.reduce((a, b) => a + b, 0) / sectionScores.length;

      return section.exercises
        .filter((e) => isExerciseLimit({ score: sectionAverage, min: e.minScore, max: e.maxScore }))
        .map((e) => ({
          sectionId: section.id,
          sectionSlug: section.slug,
          skillAreaId: skillArea.id,
          skillAreaSlug: skillArea.slug,
          skillAreaName: skillArea.name,
          ...e,
        }));
    }),
  }));
};
