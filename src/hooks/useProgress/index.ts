import { SkillAreaID } from '@/lib/content-types';
import useSkillAreas from '../useSkillAreas';

export const useProgress = ({
  currentSkillArea,
  currentSection,
  currentQuestion,
  isSummary = false,
}: {
  currentSkillArea: SkillAreaID;
  currentSection?: number;
  currentQuestion?: number;
  isSummary?: boolean;
}) => {
  const skillAreas = useSkillAreas();

  const allQuestions: { skillAreaId: SkillAreaID; sectionId: number; questionId: number }[] = skillAreas.flatMap(
    (skillArea) =>
      skillArea.sections.flatMap((section) =>
        section.questions.map((e) => ({
          skillAreaId: skillArea.id,
          sectionId: section.id,
          questionId: e.id,
        })),
      ),
  );

  const totalQuestionCount = allQuestions.length;

  let currentQuestionIndex = 0;

  if (currentQuestion !== undefined && currentSection !== undefined) {
    currentQuestionIndex = allQuestions.findIndex(
      (q) => q.skillAreaId === currentSkillArea && q.sectionId === currentSection && q.questionId === currentQuestion,
    );
  } else if (isSummary) {
    const currentSkillAreaQuestionCount = allQuestions.filter((q) => q.skillAreaId === currentSkillArea).length;
    currentQuestionIndex =
      allQuestions.findIndex((q) => q.skillAreaId === currentSkillArea) + currentSkillAreaQuestionCount;
  } else {
    currentQuestionIndex = allQuestions.findIndex((q) => q.skillAreaId === currentSkillArea);
  }

  return {
    percentage: (currentQuestionIndex / totalQuestionCount) * 100,
  };
};
