import { ExerciseWithInfo } from '@/lib/content-types';

import useSkillAreas from '../useSkillAreas';

export const useExercise = ({
  skillAreaSlug,
  sectionSlug,
  exerciseId,
}: {
  skillAreaSlug: string;
  sectionSlug: string;
  exerciseId: number;
}): ExerciseWithInfo | null => {
  const skillAreas = useSkillAreas();

  const skillArea = skillAreas.find((s) => s.slug === skillAreaSlug);
  if (!skillArea) return null;

  const section = skillArea.sections.find((s) => s.slug === sectionSlug);
  if (!section) return null;

  const exercise = section.exercises.find((e) => e.id === exerciseId);
  if (!exercise) return null;

  return {
    skillAreaSlug: skillArea.slug,
    sectionSlug: section.slug,
    sectionId: section.id,
    skillAreaId: skillArea.id,
    skillAreaName: skillArea.name,
    ...exercise,
  };
};
