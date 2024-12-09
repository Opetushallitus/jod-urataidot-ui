import { SkillAreaID } from '@/lib/content-types';
import useSkillAreas from '../useSkillAreas';

export const usePreviousSkillAreaSlug = ({ id }: { id: SkillAreaID }) => {
  const skillAreas = useSkillAreas();
  const index = skillAreas.findIndex((o) => o.id === id);

  if (index > 0) {
    return skillAreas[index - 1].slug;
  } else {
    return undefined;
  }
};
