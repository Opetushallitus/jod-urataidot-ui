import { Button, Card, MobileBottomBar, MobileSkillAreaSelector, SkillAreaIcon, SkillAreaSelector } from '@/components';
import { QuestionProgressBar } from '@/features/career-management/components/QuestionProgressBar';
import { ExerciseLinkCard } from '@/features/exercises/components/ExerciseLinkCard';
import { useMediaQueries } from '@/hooks/useMediaQuery';
import { useNextSkillAreaSlug } from '@/hooks/useNextSkillAreaSlug';
import { useSkillAreaExercises } from '@/hooks/useSkillAreaExercises';
import { ArrowLeft, ArrowRight, ChevronRight } from '@/icons';
import { SkillArea } from '@/lib/content-types';
import { getLastQuestionUrl } from '@/lib/navigation-helpers';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { useTranslation } from 'react-i18next';

const SkillAreaSummary = ({ skillArea }: { skillArea: SkillArea }) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueries();

  const nextSkillArea = useNextSkillAreaSlug({ id: skillArea.id });
  const prevUrl = `../${getLastQuestionUrl(skillArea)}`;
  const nextUrl = nextSkillArea ? `../../${nextSkillArea}` : `../../${t('slugs.summary')}`;

  const answers = useCareerPlanningAnswersStore((state) => state.answers);
  const skillAreaAnswers = answers.filter((a) => a.skillAreaId === skillArea.id);

  const score =
    skillAreaAnswers.length === 0
      ? undefined
      : skillAreaAnswers.reduce((acc, cur) => acc + cur.score, 0) / skillAreaAnswers.length;

  const feedback = score ? skillArea.feedbacks.find((f) => f.minScore <= score && score <= f.maxScore) : undefined;
  const exercises = useSkillAreaExercises({ skillAreaId: skillArea.id });

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-center">{sm ? <SkillAreaSelector /> : <MobileSkillAreaSelector />}</div>
      <div className="flex flex-col items-center gap-6 pt-4">
        <div className="flex flex-col items-center gap-6">
          <SkillAreaIcon section={skillArea.id} size="xl" />

          <h1 className="text-center text-heading-3 sm:text-heading-2">
            {t('career-management.skill-area-summary.title', { skillAreaName: skillArea.name })}
          </h1>
          <p className="text-center">{t('career-management.skill-area-summary.description')}</p>

          <div className="hidden items-center gap-4 sm:flex">
            <Button variant="simple" icon={<ArrowLeft />} iconSide="left" to={prevUrl}>
              {t('common.previous')}
            </Button>

            <Button to={nextUrl} icon={<ArrowRight />}>
              {t('common.next')}
            </Button>
          </div>
        </div>

        <div className="flex max-w-3xl flex-col gap-4 sm:gap-6">
          <Card>
            <h3 className="my-2 text-heading-3">{t('career-management.skill-area-summary.feedback-title')}</h3>
            {feedback ? (
              <p className="mb-6">{feedback.description}</p>
            ) : (
              <>
                {' '}
                <p className="mb-4 text-body">{t('components.career-management-summary-section.no-feedback')}</p>
                <Button variant="soft" icon={<ChevronRight />} to={`../`}>
                  {t('components.career-management-summary-section.to-section', { skillAreaName: skillArea.name })}
                </Button>
              </>
            )}
          </Card>

          <Card>
            <h3 className="my-2 text-heading-3">
              {t('career-management.skill-area-summary.exercises-title', { exerciseNumber: exercises.length })}
            </h3>
            <p className="mb-6">{t('career-management.skill-area-summary.exercises-description')}</p>
            <div className="flex w-full flex-col gap-2">
              {exercises.map((exercise) => (
                <ExerciseLinkCard
                  background={'gray'}
                  key={exercise.skillAreaSlug + exercise.sectionSlug + exercise.id}
                  exercise={exercise}
                  showTag={false}
                />
              ))}
            </div>
          </Card>
        </div>

        <MobileBottomBar>
          <div className="mx-4 flex w-full justify-between">
            <Button variant="simple" to={prevUrl}>
              {t('common.previous')}
            </Button>
            <Button to={nextUrl}>{t('common.next')}</Button>
          </div>
        </MobileBottomBar>
      </div>
      <QuestionProgressBar currentSkillArea={skillArea.id} isSummary />
    </div>
  );
};

export default SkillAreaSummary;
