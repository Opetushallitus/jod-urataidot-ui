import { useProgress } from '@/hooks/useProgress';
import { SkillAreaID } from '@/lib/content-types';
import { ProgressBar } from './ProgressBar';
import { createPortal } from 'react-dom';

export const QuestionProgressBar = ({
  currentQuestion,
  currentSection,
  currentSkillArea,
  isSummary = false,
}: {
  currentSkillArea: SkillAreaID;
  currentQuestion?: number;
  currentSection?: number;
  isSummary?: boolean;
}) => {
  const progress = useProgress({
    currentQuestion,
    currentSection,
    currentSkillArea,
    isSummary,
  });

  const mobileProgressBarPortal = document.querySelector('#mobile-progress-bar');
  const progressBarPortal = document.querySelector('#progress-bar');

  return (
    <>
      {progressBarPortal && createPortal(<ProgressBar percentage={progress.percentage} />, progressBarPortal)}
      {mobileProgressBarPortal &&
        createPortal(<ProgressBar percentage={progress.percentage} />, mobileProgressBarPortal)}
    </>
  );
};
