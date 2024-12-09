import { BackButton, Button, MainLayout, MobileBottomBar, Modal } from '@/components';
import { DownloadPDFButton } from '@/features/pdf/components/DownloadPDFButton';
import CareerPlanDocument from '@/features/pdf/documents/CareerPlanDocument';
import { useAllExercises } from '@/hooks/useAllExercises';
import { Check, Link as LinkIcon } from '@/icons';
import { ExerciseWithInfo } from '@/lib/content-types';
import { useCareerPlanAnswersStore } from '@/stores/careerPlanAnswersStore';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, To } from 'react-router';

const CareerPlan = () => {
  const { t, i18n } = useTranslation();
  const answers = useCareerPlanAnswersStore((state) => state.answers);
  const getEncodedData = useCareerPlanAnswersStore((state) => state.getEncodedData);
  const [readyModalOpen, setReadyModalOpen] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const description = t('career-plan.question-description');
  const knowYourselfSlug = t('slugs.know-yourself');
  const readyForChangeSlug = t('slugs.ready-for-change');
  const anticipateTheFutureSlug = t('slugs.anticipate-the-future');
  const worldAroundYouSlug = t('slugs.world-around-you');
  const competenceFirstSlug = t('slugs.competence-first');

  const questions: {
    id: number;
    title: string;
    description?: string;
    exercises?: Pick<ExerciseWithInfo, 'id' | 'skillAreaSlug' | 'sectionSlug'>[];
  }[] = [
    {
      id: 1,
      title: t('career-plan.questions.1.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: competenceFirstSlug,
          sectionSlug: t('slugs.competence-and-strengths'),
          id: 3,
        },
        {
          skillAreaSlug: competenceFirstSlug,
          sectionSlug: t('slugs.application-of-competence'),
          id: 2,
        },
      ],
    },
    {
      id: 2,
      title: t('career-plan.questions.2.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.my-life-story'),
          id: 3,
        },
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.values'),
          id: 2,
        },
        {
          skillAreaSlug: worldAroundYouSlug,
          sectionSlug: t('slugs.opportunities-and-constraints'),
          id: 3,
        },
      ],
    },
    {
      id: 3,
      title: t('career-plan.questions.3.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.my-life-story'),
          id: 3,
        },
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.motivational-factors'),
          id: 2,
        },
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.interests'),
          id: 2,
        },
        {
          skillAreaSlug: knowYourselfSlug,
          sectionSlug: t('slugs.attitude-towards-work-and-studying'),
          id: 2,
        },
      ],
    },
    {
      id: 4,
      title: t('career-plan.questions.4.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.dreams-and-visions'),
          id: 2,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.creativity'),
          id: 3,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.decision-making'),
          id: 2,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.goal-setting'),
          id: 2,
        },
      ],
    },
    {
      id: 5,
      title: t('career-plan.questions.5.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: anticipateTheFutureSlug,
          sectionSlug: t('slugs.alternative-paths'),
          id: 3,
        },
        {
          skillAreaSlug: anticipateTheFutureSlug,
          sectionSlug: t('slugs.social-changes'),
          id: 3,
        },
        {
          skillAreaSlug: anticipateTheFutureSlug,
          sectionSlug: t('slugs.global-changes'),
          id: 3,
        },
      ],
    },
    {
      id: 6,
      title: t('career-plan.questions.6.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: competenceFirstSlug,
          sectionSlug: t('slugs.development-areas'),
          id: 3,
        },
        {
          skillAreaSlug: worldAroundYouSlug,
          sectionSlug: t('slugs.labor-market'),
          id: 2,
        },
        {
          skillAreaSlug: worldAroundYouSlug,
          sectionSlug: t('slugs.education-and-learning'),
          id: 2,
        },
      ],
    },
    {
      id: 7,
      title: t('career-plan.questions.7.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: competenceFirstSlug,
          sectionSlug: t('slugs.self-perception-as-a-learner'),
          id: 2,
        },
        {
          skillAreaSlug: worldAroundYouSlug,
          sectionSlug: t('slugs.opportunities-and-constraints'),
          id: 3,
        },
        {
          skillAreaSlug: worldAroundYouSlug,
          sectionSlug: t('slugs.education-and-learning'),
          id: 2,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.goal-setting'),
          id: 2,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.resilience'),
          id: 2,
        },
        {
          skillAreaSlug: readyForChangeSlug,
          sectionSlug: t('slugs.uncertainty-tolerance'),
          id: 2,
        },
      ],
    },
    {
      id: 8,
      title: t('career-plan.questions.8.title'),
      description: description,
      exercises: [
        {
          skillAreaSlug: t('slugs.together-ahead'),
          sectionSlug: t('slugs.asking-and-utilizing-help'),
          id: 2,
        },
        {
          skillAreaSlug: t('slugs.together-ahead'),
          sectionSlug: t('slugs.societal-services'),
          id: 2,
        },
      ],
    },
    {
      id: 9,
      title: t('career-plan.questions.9.title'),
    },
    {
      id: 10,
      title: t('career-plan.questions.10.title'),
    },
  ];

  const onDone = () => {
    setReadyModalOpen(true);
  };

  const copyToClipboard = async () => {
    setLinkCopied(true);
    const encodedData = await getEncodedData();
    await navigator.clipboard.writeText(
      `${window.location.origin}/urataidot/${i18n.language}/${t('slugs.import-career-plan')}#${encodedData}`,
    );
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  return (
    <MainLayout>
      <div className="mx-auto w-full max-w-3xl">
        <Modal title={t('career-plan.done-title')} isOpen={readyModalOpen} close={() => setReadyModalOpen(false)}>
          <p className="max-w-[80ch]">{t('career-plan.feedback')}</p>
          <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row-reverse sm:justify-start">
            <DownloadPDFButton
              filename={t('career-plan.title') + '.pdf'}
              pdfDocument={
                <CareerPlanDocument
                  content={questions.map((q) => ({
                    id: q.id,
                    question: q.title,
                    answer: answers.find((a) => a.id === q.id)?.text ?? '',
                  }))}
                />
              }
            >
              {t('career-plan.download-as-pdf')}
            </DownloadPDFButton>
            <Button variant="simple" to={-1 as To}>
              {t('exercises.back-to-summary')}
            </Button>
          </div>
        </Modal>
        <BackButton />
        <div className="mb-4 mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-heading-2 sm:text-heading-1">{t('career-plan.title')}</h1>
          <Button onClick={() => void copyToClipboard()} icon={linkCopied ? <Check /> : <LinkIcon />}>
            {linkCopied ? t('career-plan.link-copied') : t('career-plan.copy-link')}
          </Button>
        </div>
        <div className="my-8 flex flex-col gap-8">
          {questions.map((q) => (
            <TextArea key={q.id} id={q.id} title={q.title} description={q.description} exercises={q.exercises} />
          ))}
        </div>
      </div>
      <div className="hidden w-full justify-center sm:flex">
        <Button
          onClick={() => {
            onDone();
          }}
        >
          {t('exercises.ready')}
        </Button>
      </div>

      <MobileBottomBar>
        <Button
          onClick={() => {
            onDone();
          }}
        >
          {t('exercises.ready')}
        </Button>
      </MobileBottomBar>
    </MainLayout>
  );
};

const TextArea = ({
  title,
  description,
  id,
  exercises,
}: {
  title: string;
  description?: string;
  id: number;
  exercises?: Pick<ExerciseWithInfo, 'id' | 'skillAreaSlug' | 'sectionSlug'>[];
}) => {
  const { t, i18n } = useTranslation();
  const allExercises = useAllExercises();

  const [answer, setAnswer] = useState('');

  const getAnswer = useCareerPlanAnswersStore((state) => state.getAnswer);
  const storeAnswer = useCareerPlanAnswersStore((state) => state.setAnswer);

  useEffect(() => {
    const answer = getAnswer({ id });
    if (answer) {
      setAnswer(answer.text);
    }
  }, [getAnswer, id]);

  const exercisesWithInfo = (exercises ?? []).map((e) => {
    const exercise = allExercises.find(
      (ex) => ex.id === e.id && ex.skillAreaSlug === e.skillAreaSlug && ex.sectionSlug === e.sectionSlug,
    );
    if (!exercise) {
      return null;
    }
    return exercise;
  });

  const handleAnswerChange = (value: string) => {
    setAnswer(value);
    storeAnswer({ id, text: value });
  };

  return (
    <div className="mb-2 flex flex-col gap-1">
      <label className="font-display text-heading-5 sm:text-heading-4" htmlFor={id.toString()}>
        {`${id}. ${title}`}
      </label>
      {description && (
        <div className="flex flex-col">
          <span id={id + '-description'} className="whitespace-pre-wrap text-body-sm italic">
            {description}
          </span>
          {exercisesWithInfo.map((e) => {
            if (!e) return null;
            return (
              <span key={e.id + e.title}>
                <Link
                  className="text-body-sm text-primary underline"
                  to={`/${i18n.language}/${t('slugs.exercises')}/${e.skillAreaSlug}/${e.sectionSlug}/${e.id}`}
                >
                  {e.title}
                </Link>
              </span>
            );
          })}
        </div>
      )}
      <textarea
        key={id}
        id={id.toString()}
        aria-describedby={id + '-description'}
        value={answer}
        onChange={(e) => handleAnswerChange(e.target.value)}
        rows={5}
        className="w-full rounded border p-2"
        maxLength={2000}
      />
    </div>
  );
};

export default CareerPlan;
