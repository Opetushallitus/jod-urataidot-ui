import { SkillAreaID } from '@/lib/content-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type SummaryAccordionRecord = Partial<Record<SkillAreaID, boolean>>;

interface SummaryAccordionStore {
  summaryAccordions: SummaryAccordionRecord;
  setSummaryAccordion: (input: { id: SkillAreaID; open: boolean }) => void;
}

export const useSummaryAccordionStore = create<SummaryAccordionStore>()(
  persist(
    (set) => ({
      summaryAccordions: {},
      setSummaryAccordion: ({ id, open }) =>
        set((state) => ({
          ...state,
          summaryAccordions: {
            ...state.summaryAccordions,
            [id]: open,
          },
        })),
    }),
    {
      name: 'summary-accordion',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
