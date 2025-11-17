import { replace, RouteObject, Outlet } from 'react-router';
import { getNextQuestionSlug, getPrevQuestionSlug } from '@/lib/navigation-helpers';
import { Home } from '@/routes/Home';
import { ErrorElement, NoMatch, Root, loader as rootLoader } from '@/routes/Root';
import { SkillAreaQuestion } from '@/routes/SkillAreaQuestion';
import { SkillAreaSection } from '@/routes/SkillAreaSection';
import { SkillAreaSummary } from '@/routes/SkillAreaSummary';
import { Suspense } from 'react';
import { MainLayout } from '@/components';
import { ExercisePage } from '@/features/exercises/components/Exercise';
import { CareerPlan } from '@/routes/CareerPlan';
import { CareerPlanning } from '@/routes/CareerPlanning';
import { CareerPlanningSummary } from '@/routes/CareerPlanningSummary';
import { ExercisesPage } from '@/routes/Exercises';
import { ImportCareerPlan } from '@/routes/ImportCareerPlan';
import { ImportEncodedAnswers } from '@/routes/ImportEncodedAnswers';
import { QuickSelfEvaluation } from '@/routes/QuickSelfEvaluation';
import { QuickSelfEvaluationSummary } from '@/routes/QuickSelfEvaluationSummary';
import { SkillArea } from '@/routes/SkillArea';
import TestPDF from '@/routes/TestPDF/TestPDF';
import i18n, { LangCode, supportedLanguageCodes } from '@/i18n/config';
import { ServiceInfo } from './ServiceInfo';
import { getContents } from '@/lib/content';
import { SkillArea as SkillAreaContent } from '@/lib/content-types';
import { NoteStackProvider } from '@jod/design-system';

const pathLang = globalThis.location.pathname.replace(import.meta.env.BASE_URL, '').split('/')[0];
if (i18n.language !== pathLang && supportedLanguageCodes.includes(pathLang as LangCode)) {
  i18n.changeLanguage(pathLang);
}

const versionInSession = globalThis.sessionStorage.getItem('content-version');
const version = versionInSession ? Number(versionInSession) : null;

const translatedSkillAreas = supportedLanguageCodes.reduce(
  (acc, lng) => {
    if (typeof version === 'number') {
      acc[lng] = getContents(i18n.t, lng)[version - 1]?.skillAreas ?? [];
    } else {
      // If no version is specified, use latest
      acc[lng] = getContents(i18n.t, lng).at(-1)?.skillAreas ?? [];
    }
    return acc;
  },
  {} as Record<LangCode, SkillAreaContent[]>,
);

const skillAreaRoutes = supportedLanguageCodes.reduce(
  (acc, lng) => {
    const skillAreas = translatedSkillAreas[lng];
    acc[lng] = skillAreas.map((skillArea) => ({
      id: `${skillArea.id}|${lng}`,
      path: skillArea.slug,
      children: [
        {
          index: true,
          element: <SkillArea skillArea={skillArea} />,
        },
        {
          id: `${skillArea.id}|{slugs.feedback}|${lng}`,
          path: i18n.t('slugs.feedback', { lng }),
          element: <SkillAreaSummary skillArea={skillArea} />,
        },
        ...skillArea.sections.map((section) => ({
          id: `${section.slug}|${lng}`,
          path: section.slug,
          children: [
            {
              index: true,
              element: <SkillAreaSection section={section} />,
            },
            ...section.questions.map((question) => ({
              id: `${section.slug}|${question.id}|${lng}`,
              path: question.id.toString(),
              element: (
                <SkillAreaQuestion
                  question={question}
                  skillArea={skillArea}
                  section={section}
                  prevUrl={getPrevQuestionSlug(question.id, skillArea.sections, section, skillArea)}
                  nextUrl={getNextQuestionSlug(question.id, skillArea.sections, section)}
                />
              ),
            })),
          ],
        })),
      ],
    }));
    return acc;
  },
  {} as Record<LangCode, RouteObject[]>,
);

const exercisesRoutes = supportedLanguageCodes.map((lng) => {
  return {
    id: `{slugs.exercises}|${lng}`,
    path: i18n.t('slugs.exercises', { lng }),
    element: (
      <MainLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <ExercisesPage />,
      },
      {
        id: `{slugs.exercises}|${lng}|child`,
        path: ':skillAreaSlug/:sectionSlug/:exerciseId',
        element: <ExercisePage />,
      },
    ],
  };
});

const careerPlanningRoutes = supportedLanguageCodes.map((lng) => {
  return {
    id: `{slugs.career-management}|${lng}`,
    path: i18n.t('slugs.career-management', { lng }),
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <CareerPlanning />,
      },
      {
        id: `{slugs.summary}|${lng}`,
        path: i18n.t('slugs.summary', { lng }),
        element: <CareerPlanningSummary />,
      },
      ...skillAreaRoutes[lng],
    ],
  };
});

const selfEvaluationRoutes = supportedLanguageCodes.map((lng) => {
  return {
    id: `{slugs.quick-self-evaluation}|${lng}`,
    path: i18n.t('slugs.quick-self-evaluation', { lng }),
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      { index: true, element: <QuickSelfEvaluation /> },
      {
        id: `{slugs.quick-self-evaluation}|{slugs.summary}|${lng}`,
        path: i18n.t('slugs.summary', { lng }),
        element: <QuickSelfEvaluationSummary />,
      },
    ],
  };
});

const commonRoutes = supportedLanguageCodes.flatMap((lng) => {
  return [
    {
      id: `{slugs.import}|${lng}`,
      path: i18n.t('slugs.import', { lng }),
      element: <ImportEncodedAnswers />,
    },
    {
      id: `{slugs.import-career-plan}|${lng}`,
      path: i18n.t('slugs.import-career-plan', { lng }),
      element: <ImportCareerPlan />,
    },
    {
      id: `{slugs.service-info}|${lng}`,
      path: i18n.t('slugs.service-info', { lng }),
      element: <ServiceInfo />,
    },
    {
      id: `{slugs.career-plan}|${lng}`,
      path: i18n.t('slugs.career-plan', { lng }),
      element: <CareerPlan />,
    },
  ];
});

export const routes: RouteObject[] = [
  {
    path: '/',
    loader: () => replace(`/${i18n.language}`),
  },
  {
    path: '/:lng',
    element: (
      <NoteStackProvider>
        <Root />
      </NoteStackProvider>
    ),
    loader: rootLoader,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      ...exercisesRoutes,
      ...careerPlanningRoutes,
      ...selfEvaluationRoutes,
      // Test route for PDF Viewing in development
      ...(import.meta.env.PROD ? [] : [{ path: 'testpdf', element: <TestPDF /> }]),
      ...commonRoutes,
      { path: '*', element: <NoMatch /> },
    ],
  },
];
