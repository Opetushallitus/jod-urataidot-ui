import { getNextQuestionSlug, getPrevQuestionSlug } from '@/lib/navigation-helpers';
import { Home } from '@/routes/Home';
import { ErrorElement, NoMatch, Root, loader as rootLoader } from '@/routes/Root';
import { SkillAreaQuestion } from '@/routes/SkillAreaQuestion';
import { SkillAreaSection } from '@/routes/SkillAreaSection';
import { SkillAreaSummary } from '@/routes/SkillAreaSummary';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, RouterProvider, createBrowserRouter, redirect } from 'react-router';
import { MainLayout } from './components';
import { ExercisePage } from './features/exercises/components/Exercise';
import useSkillAreas from './hooks/useSkillAreas';
import './index.css';
import { CareerPlan } from './routes/CareerPlan';
import { CareerPlanning } from './routes/CareerPlanning';
import { CareerPlanningSummary } from './routes/CareerPlanningSummary';
import { ExercisesPage } from './routes/Exercises';
import { ImportCareerPlan } from './routes/ImportCareerPlan';
import { ImportEncodedAnswers } from './routes/ImportEncodedAnswers';
import { QuickSelfEvaluation } from './routes/QuickSelfEvaluation';
import { QuickSelfEvaluationSummary } from './routes/QuickSelfEvaluationSummary';
import { ServiceInfo } from './routes/ServiceInfo';
import { SkillArea } from './routes/SkillArea';
import TestPDF from './routes/TestPDF/TestPDF';

const App = () => {
  const { t, i18n } = useTranslation();

  const skillAreas = useSkillAreas();

  const skillAreaRoutes = skillAreas.map((skillArea) => ({
    path: skillArea.slug,
    children: [
      {
        index: true,
        element: <SkillArea skillArea={skillArea} />,
      },
      {
        path: t('slugs.feedback'),
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

  const router = createBrowserRouter(
    [
      {
        path: '/',
        loader: () => redirect(`/${i18n.language}`),
      },
      {
        path: '/:lng',
        element: <Root />,
        loader: rootLoader,
        errorElement: <ErrorElement />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: t('slugs.exercises'),
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
            path: t('slugs.career-management'),
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
              { path: t('slugs.summary'), element: <CareerPlanningSummary skillAreas={skillAreas} /> },
              ...skillAreaRoutes,
            ],
          },
          {
            path: t('slugs.quick-self-evaluation'),
            element: (
              <MainLayout>
                <Outlet />
              </MainLayout>
            ),
            children: [
              { index: true, element: <QuickSelfEvaluation skillAreas={skillAreas} /> },
              { path: t('slugs.summary'), element: <QuickSelfEvaluationSummary /> },
            ],
          },
          // Test route for PDF Viewing in development
          ...(import.meta.env.PROD ? [] : [{ path: 'testpdf', element: <TestPDF /> }]),
          {
            path: t('slugs.import'),
            element: <ImportEncodedAnswers />,
          },
          {
            path: t('slugs.import-career-plan'),
            element: <ImportCareerPlan />,
          },
          {
            path: t('slugs.service-info'),
            element: <ServiceInfo />,
          },
          {
            path: t('slugs.career-plan'),
            element: <CareerPlan />,
          },
          { path: '*', element: <NoMatch /> },
        ],
      },
    ],
    { basename: '/urataidot' },
  );

  return <RouterProvider router={router} />;
};

export default App;
