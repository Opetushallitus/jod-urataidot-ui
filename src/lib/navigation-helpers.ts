import i18n from '@/i18n/config';
import { Section, SkillArea } from './content-types';

export const getNextQuestionSlug = (questionId: number, sections: Section[], currentSection: Section) => {
  const nextQuestion = currentSection?.questions.find((question) => question.id === questionId + 1);
  if (nextQuestion) {
    return `../${nextQuestion.id.toString()}`;
  }
  const currentSectionIndex = sections.findIndex((section) => section.id === currentSection.id);
  const nextSection = sections[currentSectionIndex + 1];
  if (nextSection) {
    return `../../${nextSection.slug}/1`;
  }
  return `../../${i18n.t('slugs.feedback')}`;
};

export const getPrevQuestionSlug = (
  questionId: number,
  sections: Section[],
  currentSection: Section,
  skillArea: SkillArea,
) => {
  const prevQuestion = currentSection?.questions.find((question) => question.id === questionId - 1);
  if (prevQuestion) {
    return `../${prevQuestion.id.toString()}`;
  }
  const currentSectionIndex = sections.findIndex((section) => section.id === currentSection.id);
  const prevSection = sections[currentSectionIndex - 1];
  if (prevSection) {
    return `../../${prevSection.slug}/${prevSection.questions[prevSection.questions.length - 1].id}`;
  }
  return `../../../${skillArea.slug}`;
};

export const getLastQuestionUrl = (skillArea: SkillArea) => {
  const lastSection = skillArea.sections[skillArea.sections.length - 1];
  const lastQuestion = lastSection.questions[lastSection.questions.length - 1];
  return `${lastSection.slug}/${lastQuestion.id.toString()}`;
};
