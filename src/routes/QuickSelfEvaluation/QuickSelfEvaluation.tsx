import { BackButton, Button, MobileBottomBar, QuickTestSection } from '@/components';
import { SkillArea } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router';

const QuickSelfEvaluation = ({ skillAreas }: { skillAreas: SkillArea[] }) => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-start">
      <BackButton />
      <h1 className="mb-4 mt-4 text-heading-2 sm:mt-8 sm:text-heading-1">{t('quick-self-evaluation.title')}</h1>
      <p className="max-w-[80ch]">{t('quick-self-evaluation.description')}</p>
      <div className="grid grid-cols-1 gap-6 py-4 sm:py-10">
        {skillAreas.map((skillArea) => (
          <QuickTestSection key={skillArea.id} skillArea={skillArea} />
        ))}
      </div>

      <div className="mx-auto hidden py-4 sm:block">
        <Button to={{ pathname: t('slugs.summary'), search: searchParams.toString() }}>
          {t('quick-self-evaluation.summary-button')}
        </Button>
      </div>

      <MobileBottomBar>
        <Button to={{ pathname: t('slugs.summary'), search: searchParams.toString() }}>
          {t('quick-self-evaluation.summary-button')}
        </Button>
      </MobileBottomBar>
    </div>
  );
};

export default QuickSelfEvaluation;
