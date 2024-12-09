import { ExerciseWithInfo } from '@/lib/content-types';

import useSkillAreas from '../useSkillAreas';

export const useAllExercises = (): ExerciseWithInfo[] => {
  const skillAreas = useSkillAreas();

  return skillAreas.flatMap((skillArea) =>
    skillArea.sections.flatMap((section) => {
      if (!section.exercises) {
        return [];
      }
      return section.exercises.flatMap((e) => ({
        skillAreaSlug: skillArea.slug,
        sectionSlug: section.slug,
        sectionId: section.id,
        skillAreaId: skillArea.id,
        skillAreaName: skillArea.name,
        ...e,
      }));
    }),
  );
};
