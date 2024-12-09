import { ReactNode } from 'react';

export interface Question {
  id: number;
  title: string;
}

export interface ExerciseBase {
  id: number;
  title: string;
  description?: ReactNode;
  minScore: number | undefined;
  maxScore: number | undefined;
  feedback: string;
}

export type EmojiExercise = ExerciseBase & {
  type: 'emoji';
  description: ReactNode;
  emojiTitle: string;
};

export type TextExercise = ExerciseBase & {
  type: 'text';
  textFields: { id: number; title: string; description?: string | ReactNode }[];
  afterText?: string | ReactNode;
};

export type SelectExercise = ExerciseBase & {
  type: 'select';
  afterTitle?: string;
  afterText?: string | ReactNode;
  wordLists: { id: number; title: string; words: string[] }[];
};

export type MediaExercise = ExerciseBase & {
  type: 'media';
  src: string;
  mediaType: 'video' | 'image';
  mediaDescription: string;
  textFieldTitle: string;
};

export type Exercise = EmojiExercise | TextExercise | SelectExercise | MediaExercise;

export type ExerciseWithInfo = {
  sectionId: number;
  sectionSlug: string;
  skillAreaId: SkillAreaID;
  skillAreaName: string;
  skillAreaSlug: string;
} & Exercise;

export interface Section {
  id: number;
  name: string;
  slug: string;
  info: string;
  questions: Question[];
  exercises: Exercise[];
}

export interface Feedback {
  id: number;
  minScore: number;
  maxScore: number;
  description: string;
}

export const SkillAreaIDValues = [
  'know-yourself',
  'competence-first',
  'ready-for-change',
  'world-around-you',
  'together-ahead',
  'anticipate-the-future',
] as const;

// internal application id used for generating components etc, no need to translate
export type SkillAreaID = (typeof SkillAreaIDValues)[number];

export interface SkillArea {
  id: SkillAreaID;
  name: string;
  longName: string;
  slug: string;
  info: string;
  feedbacks: Feedback[];
  sections: Section[];
}

export interface Content {
  version: number;
  skillAreas: SkillArea[];
}
