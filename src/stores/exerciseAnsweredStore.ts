import { SkillAreaID } from '@/lib/content-types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface ExerciseAnswered {
  skillAreaId: SkillAreaID;
  sectionId: number;
  exerciseId: number;
}

interface ExercisesAnsweredStore {
  exercisesAnswered: ExerciseAnswered[];
  setExerciseAnswered: (input: ExerciseAnswered) => void;
  getExerciseAnswered: (input: ExerciseAnswered) => boolean;
}

export const useExerciseAnsweredStore = create<ExercisesAnsweredStore>()(
  persist(
    (set, get) => ({
      exercisesAnswered: [],
      setExerciseAnswered: (input) => {
        set((state) => ({
          ...state,
          exercisesAnswered: state.exercisesAnswered.some(
            (e) =>
              e.sectionId === input.sectionId &&
              e.exerciseId === input.exerciseId &&
              e.skillAreaId === input.skillAreaId,
          )
            ? state.exercisesAnswered
            : [...state.exercisesAnswered, input],
        }));
      },
      getExerciseAnswered: (input) => {
        return get().exercisesAnswered.some(
          (e) =>
            e.sectionId === input.sectionId && e.exerciseId === input.exerciseId && e.skillAreaId === input.skillAreaId,
        );
      },
    }),
    {
      name: 'answered-exercises',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
