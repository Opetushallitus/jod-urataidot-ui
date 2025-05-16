import { BackButton, Card, LinkCard } from '@/components';
import { Video } from '@/components/Video/Video';
import { ExerciseLinkCard } from '@/features/exercises/components/ExerciseLinkCard';
import { useQuickSuggestionExercises } from '@/hooks/useQuickSuggestionExercises';
import { useQuickSuggestionVideo } from '@/hooks/useQuickSuggestionVideo';
import { useTranslation } from 'react-i18next';

const QuickSelfEvaluationSummary = () => {
  const { t, i18n } = useTranslation();

  const videoInfo = useQuickSuggestionVideo();
  const exercises = useQuickSuggestionExercises();

  return (
    <div>
      <BackButton />
      <h1 className="text-heading-2 sm:text-heading-1 mt-5 mb-5 sm:mt-7">{t('quick-self-evaluation-summary.title')}</h1>
      <p className="max-w-[80ch]">{t('quick-self-evaluation-summary.description')}</p>
      <div className="grid grid-cols-1 gap-5 py-5 sm:py-8">
        <Card className="group">
          <div className="flex flex-col gap-6 sm:p-4">
            <h2 className="text-heading-3">{t('quick-self-evaluation-summary.video-card.title')}</h2>
            <Video skillAreaName={videoInfo.skillAreaName} skillAreaId={videoInfo.skillAreaId} />
          </div>
        </Card>

        <Card className="group">
          <div className="px-2: flex flex-col gap-6 sm:p-4">
            <h2 className="text-heading-3">{t('quick-self-evaluation-summary.suggestion-card.title')}</h2>
            <div className="flex w-full flex-col gap-5">
              {exercises.map((exercise) => (
                <ExerciseLinkCard
                  background={'gray'}
                  key={exercise.skillAreaSlug + exercise.sectionSlug + exercise.id}
                  exercise={exercise}
                  showTag={false}
                />
              ))}
            </div>
          </div>
        </Card>

        <LinkCard
          to={`/${i18n.language}/${t('slugs.career-management')}`}
          title={t('common.navigation-cards.career-management.title')}
          description={t('common.navigation-cards.career-management.description')}
          className="bg-[#006DB3] text-white"
        />
      </div>
    </div>
  );
};

export default QuickSelfEvaluationSummary;
