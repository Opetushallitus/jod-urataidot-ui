import i18n from '@/i18n/config';
import { SkillAreaID } from '@/lib/content-types';
import { getContents } from '@/lib/content';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Answer {
  skillAreaId: SkillAreaID;
  sectionId: number;
  questionId: number;
  score: number;
}

interface EncodedData {
  data: [number, number, number, number][];
  version: number;
}

interface CareerPlanningAnswersStore {
  answers: Answer[];
  setScore: (input: {
    score: number | undefined;
    questionId: number;
    sectionId: number;
    skillAreaId: SkillAreaID;
  }) => void;
  getScore: (input: { questionId: number; sectionId: number; skillAreaId: SkillAreaID }) => number | undefined;
  getEncodedData: () => string;
  setStateWithEncodedData: (data: string) => { error: string | null };
}

export const useCareerPlanningAnswersStore = create<CareerPlanningAnswersStore>()(
  persist(
    (set, get) => ({
      answers: [],
      setScore: ({ score, questionId, sectionId, skillAreaId }) =>
        set((state) => {
          // No score set -> aim is to skip question, so remove answer
          if (typeof score === 'undefined') {
            return {
              ...state,
              answers: state.answers.filter(
                (a) => !(a.questionId === questionId && a.sectionId === sectionId && a.skillAreaId === skillAreaId),
              ),
            };
          }

          const answer = state.answers.find(
            (answer) =>
              answer.questionId === questionId && answer.sectionId === sectionId && answer.skillAreaId === skillAreaId,
          );
          // Already answered -> update score
          if (answer) {
            return {
              ...state,
              answers: state.answers.map((answer) => {
                if (
                  answer.questionId === questionId &&
                  answer.sectionId === sectionId &&
                  answer.skillAreaId === skillAreaId
                ) {
                  return {
                    ...answer,
                    score,
                  };
                }
                return answer;
              }),
            };
          } else {
            // Not answered yet -> add answer
            return {
              ...state,
              answers: [...state.answers, { sectionId, questionId, score, skillAreaId }],
            };
          }
        }),
      getScore: ({ questionId, sectionId, skillAreaId }) =>
        get().answers.find(
          (answer) =>
            answer.questionId === questionId && answer.sectionId === sectionId && answer.skillAreaId === skillAreaId,
        )?.score,
      getEncodedData: () => {
        const { answers } = get();
        const shortenedAnswers: [number, number, number, number][] = answers.map((answer) => [
          skillAreaIdToNumber[answer.skillAreaId],
          answer.sectionId,
          answer.questionId,
          answer.score,
        ]);

        const sessionVersion = window.sessionStorage.getItem('content-version');
        const version = sessionVersion ? Number(sessionVersion) : 1;

        const encodedData: EncodedData = {
          data: shortenedAnswers,
          version: version,
        };

        return btoa(JSON.stringify(encodedData));
      },
      setStateWithEncodedData: (data) => {
        try {
          // Parse values from link hash
          const encodedData = JSON.parse(atob(data)) as EncodedData;

          const shortenedAnswers: [number, number, number, number][] = encodedData.data;
          const version: number = encodedData.version;

          window.sessionStorage.setItem('content-version', version.toString());

          // Check that all answers are valid
          const content = getContents(i18n.t, i18n.language as 'fi' | 'en')[version - 1];

          const skillAreas = content.skillAreas;
          shortenedAnswers.forEach(([skillAreaId, sectionId, questionId, score]) => {
            const skillArea = skillAreas.find((a) => a.id === numberToSkillAreaId[skillAreaId]);
            if (!skillArea) {
              throw new Error('Invalid skill area');
            }
            if (!skillArea.sections.some((s) => s.id === sectionId)) {
              throw new Error('Invalid section');
            }
            const questions = skillArea.sections.find((s) => s.id === sectionId)?.questions;
            if (!questions || !questions.some((q) => q.id === questionId)) {
              throw new Error('Invalid question');
            }
            if (score < 0 || score > 3) {
              throw new Error('Invalid score');
            }
          });

          // All answers are valid -> set state
          const answers: CareerPlanningAnswersStore['answers'] = shortenedAnswers.map(
            ([skillAreaId, sectionId, questionId, score]) => ({
              skillAreaId: numberToSkillAreaId[skillAreaId],
              sectionId,
              questionId,
              score,
            }),
          );
          set({ answers });
          return { error: null };
        } catch (_e) {
          return { error: 'Could not import data' };
        }
      },
    }),
    {
      name: 'career-management-answers',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const skillAreaIdToNumber: Record<SkillAreaID, number> = {
  'know-yourself': 0,
  'competence-first': 1,
  'ready-for-change': 2,
  'world-around-you': 3,
  'together-ahead': 4,
  'anticipate-the-future': 5,
};

const numberToSkillAreaId: Record<number, SkillAreaID> = {
  0: 'know-yourself',
  1: 'competence-first',
  2: 'ready-for-change',
  3: 'world-around-you',
  4: 'together-ahead',
  5: 'anticipate-the-future',
};
