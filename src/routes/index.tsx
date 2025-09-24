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

const pathLang = window.location.pathname.replace(import.meta.env.BASE_URL, '').split('/')[0];
if (i18n.language !== pathLang && supportedLanguageCodes.includes(pathLang as LangCode)) {
  i18n.changeLanguage(pathLang);
}

let skillAreas: SkillAreaContent[];
const versionInSession = window.sessionStorage.getItem('content-version');
const version = versionInSession ? Number(versionInSession) : null;
if (typeof version === 'number') {
  skillAreas = getContents(i18n.t, i18n.language as LangCode)[version - 1]?.skillAreas ?? [];
} else {
  // If no version is specified, use latest
  skillAreas = getContents(i18n.t, i18n.language as LangCode).slice(-1)[0]?.skillAreas ?? [];
}

const skillAreaRoutes = skillAreas.map((skillArea) => ({
  path: skillArea.slug,
  children: [
    {
      index: true,
      element: <SkillArea skillArea={skillArea} />,
    },
    {
      path: i18n.t('slugs.feedback'),
      element: <SkillAreaSummary skillArea={skillArea} />,
    },
    ...skillArea.sections.map((section) => ({
      path: section.slug,
      children: [
        {
          index: true,
          element: <SkillAreaSection section={section} />,
        },
        ...section.questions.map((question) => ({
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
      {
        path: i18n.t('slugs.exercises'),
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
            element: <ExercisesPage skillAreas={skillAreas} />,
          },
          {
            path: ':skillAreaSlug/:sectionSlug/:exerciseId',
            element: <ExercisePage />,
          },
        ],
      },
      {
        path: i18n.t('slugs.career-management'),
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          {
            index: true,
            element: <CareerPlanning skillAreas={skillAreas} />,
          },
          { path: i18n.t('slugs.summary'), element: <CareerPlanningSummary skillAreas={skillAreas} /> },
          ...skillAreaRoutes,
        ],
      },
      {
        path: i18n.t('slugs.quick-self-evaluation'),
        element: (
          <MainLayout>
            <Outlet />
          </MainLayout>
        ),
        children: [
          { index: true, element: <QuickSelfEvaluation skillAreas={skillAreas} /> },
          { path: i18n.t('slugs.summary'), element: <QuickSelfEvaluationSummary /> },
        ],
      },
      // Test route for PDF Viewing in development
      ...(import.meta.env.PROD ? [] : [{ path: 'testpdf', element: <TestPDF /> }]),
      {
        path: i18n.t('slugs.import'),
        element: <ImportEncodedAnswers />,
      },
      {
        path: i18n.t('slugs.import-career-plan'),
        element: <ImportCareerPlan />,
      },
      {
        path: i18n.t('slugs.service-info'),
        element: <ServiceInfo />,
      },
      {
        path: i18n.t('slugs.career-plan'),
        element: <CareerPlan />,
      },
      { path: '*', element: <NoMatch /> },
    ],
  },
];
