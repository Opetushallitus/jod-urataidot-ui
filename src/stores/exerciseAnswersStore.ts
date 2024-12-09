import { SkillAreaID } from '@/lib/content-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ExerciseAnswerBase {
  skillAreaId: SkillAreaID;
  sectionId: number;
  exerciseId: number;
}

export interface EmojiExerciseAnswer extends ExerciseAnswerBase {
  type: 'emoji';
  answers: {
    id: number;
    emoji?: string;
    text: string;
  }[];
}

export interface MediaExerciseAnswer extends ExerciseAnswerBase {
  type: 'media';
  answers: {
    id: number;
    text: string;
  }[];
}

export interface TextExerciseAnswer extends ExerciseAnswerBase {
  type: 'text';
  answers: {
    id: number;
    text: string;
  }[];
}

export interface SelectExerciseAnswer extends ExerciseAnswerBase {
  type: 'select';
  answers: {
    id: number;
    selections: string[];
  }[];
}

export type ExerciseAnswer = EmojiExerciseAnswer | MediaExerciseAnswer | TextExerciseAnswer | SelectExerciseAnswer;

interface ExerciseAnswersStore {
  exerciseAnswers: ExerciseAnswer[];
  setAnswer: (input: ExerciseAnswer) => void;
  getAnswer: (input: { skillAreaId: SkillAreaID; sectionId: number; exerciseId: number }) => ExerciseAnswer | undefined;
}

export const useExerciseAnswersStore = create<ExerciseAnswersStore>()(
  persist(
    (set, get) => ({
      exerciseAnswers: [],
      setAnswer: (input) => {
        const answer = get().exerciseAnswers.find(
          (a) =>
            a.skillAreaId === input.skillAreaId && a.sectionId === input.sectionId && a.exerciseId === input.exerciseId,
        );

        // if already answered, update answer
        if (answer) {
          set((state) => {
            return {
              ...state,
              exerciseAnswers: state.exerciseAnswers.map((a) => {
                if (
                  a.skillAreaId === input.skillAreaId &&
                  a.sectionId === input.sectionId &&
                  a.exerciseId === input.exerciseId
                ) {
                  return input;
                }
                return a;
              }),
            };
          });
          // if not answered, add answer
        } else {
          set((state) => {
            return {
              ...state,
              exerciseAnswers: [...state.exerciseAnswers, input],
            };
          });
        }
      },
      getAnswer: (input) => {
        return get().exerciseAnswers.find(
          (a) =>
            a.skillAreaId === input.skillAreaId && a.sectionId === input.sectionId && a.exerciseId === input.exerciseId,
        );
      },
    }),
    {
      name: 'exercise-answers',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
