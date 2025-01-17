import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CareerPlanAnswer {
  id: number;
  text: string;
}

interface CareerPlanAnswersStore {
  answers: CareerPlanAnswer[];
  setAnswer: (input: CareerPlanAnswer) => void;
  getAnswer: (input: { id: number }) => CareerPlanAnswer | undefined;
  setStateWithEncodedData: (data: string) => Promise<{ error: string | null }>;
  getEncodedData: () => Promise<string>;
}

export const useCareerPlanAnswersStore = create<CareerPlanAnswersStore>()(
  persist(
    (set, get) => ({
      answers: [],
      setAnswer: (input) => {
        const answer = get().answers.find((a) => a.id === input.id);

        // if already answered, update answer
        if (answer) {
          set((state) => {
            return {
              ...state,
              answers: state.answers.map((a) => {
                if (a.id === input.id) {
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
              answers: [...state.answers, input],
            };
          });
        }
      },
      getAnswer: (input) => {
        return get().answers.find((a) => a.id === input.id);
      },
      getEncodedData: () => {
        return compress(JSON.stringify(get().answers));
      },
      setStateWithEncodedData: async (data: unknown) => {
        try {
          if (!data || typeof data !== 'string') {
            return { error: 'Invalid data' };
          }
          const decompressedData = await decompress(data);
          const decodedData = JSON.parse(decompressedData) as CareerPlanAnswer[];
          set({ answers: decodedData });
          return { error: null };
        } catch (_error) {
          return { error: 'Invalid data' };
        }
      },
    }),
    {
      name: 'career-plan-answers',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

const compress = async (str: string): Promise<string> => {
  const byteArray = new TextEncoder().encode(str);
  const cs = new CompressionStream('gzip');
  const writer = cs.writable.getWriter();
  void writer.write(byteArray);
  void writer.close();
  const compressedByteArray = await new Response(cs.readable).arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(compressedByteArray)));
};

const decompress = async (str: string): Promise<string> => {
  const byteArray = new Uint8Array(
    atob(str)
      .split('')
      .map((c) => c.charCodeAt(0)),
  );
  const cs = new DecompressionStream('gzip');
  const writer = cs.writable.getWriter();
  void writer.write(byteArray);
  void writer.close();
  const arrayBuffer = await new Response(cs.readable).arrayBuffer();
  return new TextDecoder().decode(arrayBuffer);
};
