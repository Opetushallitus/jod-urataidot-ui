import { SkillAreaIDValues, SkillAreaID } from '@/lib/content-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface AnswerRecordEntry {
  knowledge: number;
  interest: number;
}

type AnswerRecord = Record<SkillAreaID, AnswerRecordEntry>;

interface SelfEvaluationStore {
  answers: AnswerRecord;
  setScore: (input: { id: SkillAreaID; score: number; type: 'knowledge' | 'interest' }) => void;
  getScore: (input: { id: SkillAreaID; type: 'knowledge' | 'interest' }) => number;
}

const defaultVal = SkillAreaIDValues.reduce((acc, cur) => {
  return { ...acc, [cur]: { knowledge: 2, interest: 2 } };
}, {} as AnswerRecord);

export const useQuickSelfEvaluationStore = create<SelfEvaluationStore>()(
  persist(
    (set, get) => ({
      answers: defaultVal,
      setScore: ({ id, score, type }) =>
        set((state) => ({
          ...state,
          answers: {
            ...state.answers,
            [id]: {
              ...state.answers[id],
              [type]: score,
            },
          },
        })),
      getScore: ({ id, type }) => get().answers[id][type],
    }),
    {
      name: 'self-evaluation',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
