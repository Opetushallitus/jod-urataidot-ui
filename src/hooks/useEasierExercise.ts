import { ExerciseWithInfo, SkillAreaID } from '@/lib/content-types';
import useSkillAreas from './useSkillAreas';

export const useEasierExercise = ({
  skillAreaId,
  sectionId,
  exerciseId,
}: {
  skillAreaId: SkillAreaID;
  sectionId: number;
  exerciseId: number;
}): ExerciseWithInfo | null => {
  const skillAreas = useSkillAreas();

  const skillArea = skillAreas.find((s) => s.id === skillAreaId);
  if (!skillArea) return null;

  const section = skillArea.sections.find((s) => s.id === sectionId);
  if (!section) return null;

  const exercise = section.exercises.find((e) => e.id === exerciseId - 1);
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
