import { SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';

export const useQuickEvaluationHeading = (id: SkillAreaID) => {
  const { t } = useTranslation();

  switch (id) {
    case 'know-yourself':
      return t('quick-self-evaluation.titles.know-yourself');
    case 'anticipate-the-future':
      return t('quick-self-evaluation.titles.anticipate-the-future');
    case 'competence-first':
      return t('quick-self-evaluation.titles.competence-first');
    case 'ready-for-change':
      return t('quick-self-evaluation.titles.ready-for-change');
    case 'together-ahead':
      return t('quick-self-evaluation.titles.together-ahead');
    case 'world-around-you':
      return t('quick-self-evaluation.titles.world-around-you');
  }
};
