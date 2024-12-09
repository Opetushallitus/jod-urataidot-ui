import { SkillAreaID } from '@/lib/content-types';

export const getFillColor = (section: SkillAreaID) => {
  switch (section) {
    case 'world-around-you':
      return '#ADD8F2'; // 'visualization-sky': '#ADD8F2',
    case 'together-ahead':
      return '#85C4EC'; // 'visualization-blue': '#85C4EC',
    case 'know-yourself':
      return '#F8CBB5'; // 'visualization-peach': '#F8CBB5',
    case 'competence-first':
      return '#F5B08F'; // 'visualization-orange': '#F5B08F',
    case 'anticipate-the-future':
      return '#66CBD1'; // 'visualization-turquoise': '#66CBD1',
    case 'ready-for-change':
      return '#E195D1'; // 'visualization-pink': '#E195D1',
  }
};
