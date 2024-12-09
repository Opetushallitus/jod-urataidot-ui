import ExerciseDocument from '@/features/pdf/documents/ExerciseDocument';
import { TextExercise } from '@/lib/content-types';
import { PDFViewer } from '@react-pdf/renderer';

const TestPDF = () => {
  return (
    <div className="h-[calc(100vh-60px)] w-full bg-black">
      <PDFViewer width="100%" height="100%">
        <ExerciseDocument
          type="text"
          exercise={
            {
              feedback: 'Hyvin tehty',
              title: 'Tää on tää kysymys',
              description: 'Tässä on description siitä kysymyksestä',
              afterText: 'ja viel jotai tekstiä',
              id: 0,
              maxScore: 1.5,
              textFields: [
                {
                  id: 0,
                  title: 'Test question',
                  description:
                    'Longer description Longer description Longer description Longer description Longer description Longer description Longer description Longer description Longer description Longer description ',
                },
              ],
            } as TextExercise
          }
          answers={[
            {
              id: 0,
              text: 'test answer',
            },
            {
              id: 1,
              text: 'test answer 2',
            },
          ]}
        />
      </PDFViewer>
    </div>
  );
};

export default TestPDF;
