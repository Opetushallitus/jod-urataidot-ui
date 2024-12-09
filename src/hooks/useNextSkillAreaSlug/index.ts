import { SkillAreaID } from '@/lib/content-types';
import useSkillAreas from '../useSkillAreas';

export const useNextSkillAreaSlug = ({ id }: { id: SkillAreaID }) => {
  const skillAreas = useSkillAreas();

  const index = skillAreas.findIndex((o) => o.id === id);

  if (index >= 0 && index < skillAreas.length - 1) {
    return skillAreas[index + 1].slug;
  } else if (index === skillAreas.length - 1) {
    return undefined; // Last element has no next element
  } else {
    return skillAreas[0].slug;
  }
};
