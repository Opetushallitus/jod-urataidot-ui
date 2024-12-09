import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type ExerciseFilterField = 'area' | 'level';

interface ExerciseFilterStore {
  exerciseFilter: {
    skillAreaID?: string;
    skillLevel?: string;
  };
  setExerciseFilter: (input: { filter: ExerciseFilterField; value: string | undefined }) => void;
}

export const useExerciseFilterStore = create<ExerciseFilterStore>()(
  persist(
    (set) => ({
      exerciseFilter: {},
      setExerciseFilter: (input) => {
        if (input.filter === 'area') {
          set((state) => ({
            ...state,
            exerciseFilter: {
              ...state.exerciseFilter,
              skillAreaID: input.value,
            },
          }));
        }

        if (input.filter === 'level') {
          set((state) => ({
            ...state,
            exerciseFilter: {
              ...state.exerciseFilter,
              skillLevel: input.value,
            },
          }));
        }
      },
    }),
    {
      name: 'exerciseFilter',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
