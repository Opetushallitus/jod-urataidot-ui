import { Button, InfoButton, MobileBottomBar, MobileSkillAreaSelector, SkillAreaSelector, Slider } from '@/components';
import { QuestionProgressBar } from '@/features/career-management/components/QuestionProgressBar';
import { useMediaQueries } from '@jod/design-system';
import { ArrowLeft, ArrowRight, Close } from '@/icons';
import { Question, Section, SkillArea } from '@/lib/content-types';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const SkillAreaQuestion = ({
  question,
  skillArea,
  section,
  nextUrl,
  prevUrl,
}: {
  question: Question;
  skillArea: SkillArea;
  section: Section;
  nextUrl: string;
  prevUrl: string;
}) => {
  const { t } = useTranslation();
  const { sm } = useMediaQueries();
  const setScore = useCareerPlanningAnswersStore((state) => state.setScore);
  const getScore = useCareerPlanningAnswersStore((state) => state.getScore);
  const navigate = useNavigate();

  const defaultValue =
    getScore({ questionId: question.id, sectionId: section.id, skillAreaId: skillArea.id }) ??
    setScore({ score: 2, questionId: question.id, sectionId: section.id, skillAreaId: skillArea.id }) ??
    2;

  const resetQuestionAndGoToNext = () => {
    setScore({ score: undefined, questionId: question.id, sectionId: section.id, skillAreaId: skillArea.id });
    navigate(nextUrl);
  };

  // All questions list needed to display the question number (out of X)
  const allQuestions = skillArea.sections.flat().flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id })));

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-center gap-4">
        {sm ? <SkillAreaSelector /> : <MobileSkillAreaSelector />}
      </div>
      <div className="flex flex-col items-center gap-2 pt-4">
        <p className="text-body-sm-bold mt-4 flex w-full justify-center uppercase">
          {`${t('career-management.question')} ${allQuestions.findIndex((q) => q.id === question.id && q.sectionId === section.id) + 1}/${allQuestions.length}`}
        </p>
        <div className="flex min-h-[180px] flex-col items-center gap-4 sm:min-h-[160px]">
          <h1 className="text-heading-3 sm:text-heading-2 text-center">{question.title}</h1>
          <InfoButton buttonText={t('career-management.question-info')} title={section.name} info={section.info} />
        </div>
        <Slider
          aria-label={question.title}
          key={question.title}
          defaultValue={defaultValue}
          onChange={(e) =>
            setScore({
              score: Number(e.target.value),
              questionId: question.id,
              sectionId: section.id,
              skillAreaId: skillArea.id,
            })
          }
        />
        <div className="hidden w-full items-center justify-between gap-4 pt-8 sm:flex">
          <Button variant="simple" icon={<ArrowLeft />} iconSide="left" to={prevUrl}>
            {t('common.previous')}
          </Button>
          <Button variant="simple" icon={<Close />} iconSide="left" onClick={resetQuestionAndGoToNext}>
            {t('career-management.skip-question')}
          </Button>
          <Button to={nextUrl} icon={<ArrowRight />}>
            {t('common.next')}
          </Button>
        </div>

        <div className="flex items-center pt-8 sm:hidden">
          <Button variant="plain" className="" onClick={resetQuestionAndGoToNext}>
            {t('career-management.skip-question')}
          </Button>
        </div>

        <MobileBottomBar>
          <div className="mx-5 flex w-full justify-between">
            <Button variant="simple" to={prevUrl}>
              {t('common.previous')}
            </Button>

            <Button to={nextUrl}>{t('common.next')}</Button>
          </div>
        </MobileBottomBar>
      </div>
      <QuestionProgressBar currentQuestion={question.id} currentSection={section.id} currentSkillArea={skillArea.id} />
    </div>
  );
};

export default SkillAreaQuestion;
