import { ExerciseWithInfo, SkillAreaID } from '@/lib/content-types';
import { isExerciseLimit } from '@/utils/isExerciseLimit';
import useSkillAreas from '../useSkillAreas';

export const useFilteredExercises = ({
  skillAreaIDFilter,
  skillLevelFilter,
}: {
  skillAreaIDFilter?: SkillAreaID;
  skillLevelFilter?: number;
}): ExerciseWithInfo[] => {
  const skillAreas = useSkillAreas();

  return skillAreas
    .filter((skillArea) => (skillAreaIDFilter === undefined ? true : skillAreaIDFilter === skillArea.id))
    .flatMap((skillArea) =>
      skillArea.sections.flatMap(
        (section) =>
          section.exercises?.flatMap((exercise) => ({
            skillAreaSlug: skillArea.slug,
            sectionSlug: section.slug,
            sectionId: section.id,
            skillAreaId: skillArea.id,
            skillAreaName: skillArea.name,
            ...exercise,
          })) ?? [],
      ),
    )
    .filter((e) =>
      skillLevelFilter === undefined
        ? true
        : isExerciseLimit({ score: skillLevelFilter, min: e.minScore, max: e.maxScore }),
    );
};
