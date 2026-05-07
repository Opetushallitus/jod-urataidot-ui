import { useTranslation } from 'react-i18next';

import { BackButton, Button, MobileBottomBar, QuickTestSection } from '@/components';
import useSkillAreas from '@/hooks/useSkillAreas';

const QuickSelfEvaluation = () => {
  const { t } = useTranslation();

  const skillAreas = useSkillAreas();
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-start">
      <BackButton />
      <h1 className="mt-4 mb-5 text-heading-2 sm:mt-7 sm:text-heading-1">{t('quick-self-evaluation.title')}</h1>
      <p className="max-w-[80ch]">{t('quick-self-evaluation.description')}</p>
      <div className="grid grid-cols-1 gap-6 py-4 sm:py-10">
        {skillAreas.map((skillArea) => (
          <QuickTestSection key={skillArea.id} skillArea={skillArea} />
        ))}
      </div>

      <div className="mx-auto hidden py-4 sm:block">
        <Button to={t('slugs.summary')}>{t('quick-self-evaluation.summary-button')}</Button>
      </div>

      <MobileBottomBar>
        <Button to={t('slugs.summary')}>{t('quick-self-evaluation.summary-button')}</Button>
      </MobileBottomBar>
    </div>
  );
};

export default QuickSelfEvaluation;
