import { TFunction } from 'i18next';
import { importantInLife, statementsOfStrength, thingsAndResources, workLife } from './selectWordLists';
import { Content } from './content-types';
import { Trans } from 'react-i18next';
import { LangCode } from '@/i18n/config';

export const getContents = (t: TFunction<'translation', undefined>, lng: LangCode): Content[] => [
  {
    version: 1,
    skillAreas: [
      {
        id: 'know-yourself',
        name: t('content.1.skillArea.know-yourself.name'),
        longName: t('content.1.skillArea.know-yourself.long-name'),
        info: t('content.1.skillArea.know-yourself.info'),
        slug: t('slugs.know-yourself'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.know-yourself.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.know-yourself.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.know-yourself.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3,
            description: t('content.1.skillArea.know-yourself.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.know-yourself.sections.my-life-story.name'),
            slug: t('slugs.my-life-story'),
            info: t('content.1.skillArea.know-yourself.sections.my-life-story.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.my-life-story.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.1.1.title'),
                feedback: t('content.1.skillArea.know-yourself.exercises.1.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 0,
                    title: t('content.1.skillArea.know-yourself.exercises.1.1.text-fields.0.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.1.1.text-fields.0.description'),
                  },
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.1.1.text-fields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.1.1.text-fields.1.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.1.2.title'),
                emojiTitle: t('content.1.skillArea.know-yourself.exercises.1.2.subtitle'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.1.2.description" />,
                minScore: 1.5,
                maxScore: 2.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.1.2.feedback'),
                type: 'emoji',
              },
              {
                id: 3,
                title: t('content.1.skillArea.know-yourself.exercises.1.3.title'),
                emojiTitle: t('content.1.skillArea.know-yourself.exercises.1.3.subtitle'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.1.3.description" />,
                minScore: 2.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.1.3.feedback'),
                type: 'emoji',
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.know-yourself.sections.resources-and-ability-to-work.name'),
            slug: t('slugs.resources-and-ability-to-work'),
            info: t('content.1.skillArea.know-yourself.sections.resources-and-ability-to-work.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.resources-and-ability-to-work.questions.1.title'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.sections.resources-and-ability-to-work.questions.2.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.2.1.title'),
                type: 'select',
                minScore: undefined,
                maxScore: 1.5,
                wordLists: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.2.1.word-lists.1.title'),
                    words: thingsAndResources[lng],
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.2.1.word-lists.2.title'),
                    words: thingsAndResources[lng],
                  },
                ],
                feedback: t('content.1.skillArea.know-yourself.exercises.2.1.feedback'),
                afterTitle: t('content.1.skillArea.know-yourself.exercises.2.1.after-title'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.2.2.title'),
                type: 'text',
                feedback: t('content.1.skillArea.know-yourself.exercises.2.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.4.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.2.2.text-fields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.know-yourself.sections.feelings-and-ways-of-acting.name'),
            slug: t('slugs.feelings-and-ways-of-acting'),
            info: t('content.1.skillArea.know-yourself.sections.feelings-and-ways-of-acting.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.feelings-and-ways-of-acting.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.3.1.title'),
                type: 'text',
                minScore: undefined,
                maxScore: 1.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.3.1.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.4.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.1.textFields.4.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.3.2.title'),
                type: 'text',
                minScore: 1.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.3.2.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.4.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.3.2.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: t('content.1.skillArea.know-yourself.sections.values.name'),
            slug: t('slugs.values'),
            info: t('content.1.skillArea.know-yourself.sections.values.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.values.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.4.1.title'),
                type: 'select',
                minScore: undefined,
                maxScore: 1.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.4.1.feedback'),
                wordLists: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.4.1.wordLists.1.title'),
                    words: importantInLife[lng],
                  },
                ],
                afterText: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.4.1.afterText" />,
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.4.2.title'),
                type: 'text',
                minScore: 1.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.4.2.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.4.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.4.2.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: t('content.1.skillArea.know-yourself.sections.motivational-factors.name'),
            slug: t('slugs.motivational-factors'),
            info: t('content.1.skillArea.know-yourself.sections.motivational-factors.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.motivational-factors.questions.1.title'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.sections.motivational-factors.questions.2.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.5.1.title'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.5.1.description" />,
                minScore: undefined,
                maxScore: 1.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.5.1.feedback'),
                type: 'emoji',
                emojiTitle: t('content.1.skillArea.know-yourself.exercises.5.1.emojiTitle'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.5.2.title'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.5.2.description" />,
                minScore: 1.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.5.2.feedback'),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.5.2.textFields.3.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            name: t('content.1.skillArea.know-yourself.sections.interests.name'),
            slug: t('slugs.interests'),
            info: t('content.1.skillArea.know-yourself.sections.interests.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.sections.interests.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.6.1.title'),
                minScore: undefined,
                maxScore: 1.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.6.1.feedback'),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.6.1.textFields.3.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.6.2.title'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.6.2.description" />,
                minScore: 1.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.6.2.feedback'),
                type: 'emoji',
                emojiTitle: '',
              },
            ],
          },
          {
            id: 7,
            name: t('content.1.skillArea.know-yourself.sections.attitude-towards-work-and-studying.name'),
            slug: t('slugs.attitude-towards-work-and-studying'),
            info: t('content.1.skillArea.know-yourself.sections.attitude-towards-work-and-studying.info'),
            questions: [
              {
                id: 1,
                title: t(
                  'content.1.skillArea.know-yourself.sections.attitude-towards-work-and-studying.questions.1.title',
                ),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.know-yourself.exercises.7.1.title'),
                description: <Trans i18nKey="content.1.skillArea.know-yourself.exercises.7.1.description" />,
                minScore: undefined,
                maxScore: 1.5,
                feedback: t('content.1.skillArea.know-yourself.exercises.7.1.feedback'),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.1.textFields.3.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.know-yourself.exercises.7.2.title'),
                minScore: 1.5,
                maxScore: undefined,
                feedback: t('content.1.skillArea.know-yourself.exercises.7.2.feedback'),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.1.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.2.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.3.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.4.title'),
                    description: t('content.1.skillArea.know-yourself.exercises.7.2.textFields.4.description'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'competence-first',
        name: t('content.1.skillArea.competence-first.name'),
        longName: t('content.1.skillArea.competence-first.long-name'),
        info: t('content.1.skillArea.competence-first.info'),
        slug: t('slugs.competence-first'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.competence-first.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.competence-first.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.competence-first.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3.5,
            description: t('content.1.skillArea.competence-first.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.competence-first.sections.competence-and-strengths.name'),
            slug: t('slugs.competence-and-strengths'),
            info: t('content.1.skillArea.competence-first.sections.competence-and-strengths.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.sections.competence-and-strengths.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.sections.competence-and-strengths.exercises.1.title'),
                description: (
                  <Trans i18nKey="content.1.skillArea.competence-first.exercises.1.1.description">
                    <a
                      href={t('content.1.skillArea.competence-first.exercises.1.1.link')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary break-all underline"
                    >
                      {t('content.1.skillArea.competence-first.exercises.1.1.link')}
                    </a>
                  </Trans>
                ),
                minScore: undefined,
                maxScore: 1.5,
                feedback: t(
                  'content.1.skillArea.competence-first.sections.competence-and-strengths.exercises.1.feedback',
                ),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.1.1.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.1.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.1.1.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.1.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.competence-first.exercises.1.2.title'),
                minScore: 1.5,
                maxScore: 2.5,
                feedback: t('content.1.skillArea.competence-first.exercises.1.2.feedback'),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.1.2.textFields.1.title'),
                    description: (
                      <Trans i18nKey="content.1.skillArea.competence-first.exercises.1.2.textFields.1.description">
                        <a
                          href="https://www.viacharacter.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          www.viacharacter.org
                        </a>
                      </Trans>
                    ),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.1.2.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.1.2.textFields.2.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.competence-first.sections.competence-and-strengths.exercises.3.title'),
                description: t('content.1.skillArea.competence-first.exercises.1.3.description'),
                minScore: 2.5,
                maxScore: undefined,
                feedback: t(
                  'content.1.skillArea.competence-first.sections.competence-and-strengths.exercises.3.feedback',
                ),
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t(
                      'content.1.skillArea.competence-first.sections.competence-and-strengths.exercises.3.textFields.1.title',
                    ),
                    description: (
                      <Trans i18nKey="content.1.skillArea.competence-first.exercises.1.3.textFields.1.description">
                        <a
                          href="https://www.viacharacter.org"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          https://www.viacharacter.org
                        </a>
                      </Trans>
                    ),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.1.3.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.1.3.textFields.2.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.competence-first.sections.application-of-competence.name'),
            slug: t('slugs.application-of-competence'),
            info: t('content.1.skillArea.competence-first.sections.application-of-competence.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.sections.application-of-competence.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.exercises.2.1.title'),
                description: <Trans i18nKey="content.1.skillArea.competence-first.exercises.2.1.description" />,
                feedback: t('content.1.skillArea.competence-first.exercises.2.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.2.1.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.2.1.textFields.1.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.competence-first.exercises.2.2.title'),
                description: t('content.1.skillArea.competence-first.exercises.2.2.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.2.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.2.2.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.2.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.2.2.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.2.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.competence-first.exercises.2.2.textFields.3.title'),
                    description: t('content.1.skillArea.competence-first.exercises.2.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.competence-first.exercises.2.2.textFields.4.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.competence-first.sections.development-areas.name'),
            slug: t('slugs.development-areas'),
            info: t('content.1.skillArea.competence-first.sections.development-areas.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.sections.development-areas.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.exercises.3.1.title'),
                feedback: t('content.1.skillArea.competence-first.exercises.3.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.3.1.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.3.1.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.competence-first.exercises.3.2.title'),
                feedback: t('content.1.skillArea.competence-first.exercises.3.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.3.2.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.3.2.textFields.2.title'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.competence-first.exercises.3.3.title'),
                description: t('content.1.skillArea.competence-first.exercises.3.3.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.3.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.3.3.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.3.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.3.3.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.3.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.competence-first.exercises.3.3.textFields.3.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.3.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.competence-first.exercises.3.3.textFields.4.title'),
                    description: t('content.1.skillArea.competence-first.exercises.3.3.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: t('content.1.skillArea.competence-first.sections.self-perception-as-a-learner.name'),
            slug: t('slugs.self-perception-as-a-learner'),
            info: t('content.1.skillArea.competence-first.sections.self-perception-as-a-learner.info'),
            questions: [
              {
                id: 1,
                title: t(
                  'content.1.skillArea.competence-first.sections.self-perception-as-a-learner.questions.1.title',
                ),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.exercises.4.1.title'),
                description: t('content.1.skillArea.competence-first.exercises.4.1.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.4.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.4.1.textFields.1.title'),
                    description: t('content.1.skillArea.competence-first.exercises.4.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.4.1.textFields.2.title'),
                    description: t('content.1.skillArea.competence-first.exercises.4.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.competence-first.exercises.4.2.title'),
                description: t('content.1.skillArea.competence-first.exercises.4.2.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.4.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.4.2.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.4.2.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.competence-first.exercises.4.2.textFields.3.title'),
                    description: t('content.1.skillArea.competence-first.exercises.4.2.textFields.3.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: t('content.1.skillArea.competence-first.sections.learning-new-skills.name'),
            slug: t('slugs.learning-new-skills'),
            info: t('content.1.skillArea.competence-first.sections.learning-new-skills.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.sections.learning-new-skills.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.competence-first.exercises.5.1.title'),
                description: t('content.1.skillArea.competence-first.exercises.5.1.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.5.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.5.1.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.5.1.textFields.2.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.competence-first.exercises.5.2.title'),
                description: t('content.1.skillArea.competence-first.exercises.5.2.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.5.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.5.2.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.competence-first.exercises.5.2.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.competence-first.exercises.5.2.textFields.3.title'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.competence-first.exercises.5.3.title'),
                description: t('content.1.skillArea.competence-first.exercises.5.3.description'),
                feedback: t('content.1.skillArea.competence-first.exercises.5.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.competence-first.exercises.5.3.textFields.1.title'),
                    description: (
                      <Trans i18nKey="content.1.skillArea.competence-first.exercises.5.3.textFields.1.description" />
                    ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'ready-for-change',
        name: t('content.1.skillArea.ready-for-change.name'),
        longName: t('content.1.skillArea.ready-for-change.long-name'),
        info: t('content.1.skillArea.ready-for-change.info'),
        slug: t('slugs.ready-for-change'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.ready-for-change.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.ready-for-change.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.ready-for-change.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3,
            description: t('content.1.skillArea.ready-for-change.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.ready-for-change.sections.dreams-and-visions.name'),
            slug: t('slugs.dreams-and-visions'),
            info: t('content.1.skillArea.ready-for-change.sections.dreams-and-visions.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.dreams-and-visions.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.1.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.1.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.1.1.textFields.1.title'),
                    description: (
                      <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.1.1.textFields.1.description" />
                    ),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.1.1.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.1.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.1.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.1.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.1.2.textFields.3.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.ready-for-change.sections.problem-solving.name'),
            slug: t('slugs.problem-solving'),
            info: t('content.1.skillArea.ready-for-change.sections.problem-solving.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.problem-solving.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.2.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.2.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.textFields.2.title'),
                  },
                ],
                afterText: <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.2.afterText" />,
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.2.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.2.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.4.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.2.textFields.4.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.ready-for-change.exercises.2.3.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.2.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.3.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.3.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.3.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.2.3.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.2.3.textFields.4.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.ready-for-change.sections.creativity.name'),
            slug: t('slugs.creativity'),
            info: t('content.1.skillArea.ready-for-change.sections.creativity.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.creativity.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.3.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.3.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.1.textFields.4.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.3.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.3.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.2.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.2.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.3.2.textFields.3.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.ready-for-change.exercises.3.3.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.3.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.3.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.3.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.3.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.3.3.textFields.4.title'),
                  },
                ],
                afterText: <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.3.3.afterText" />,
              },
            ],
          },
          {
            id: 4,
            name: t('content.1.skillArea.ready-for-change.sections.decision-making.name'),
            slug: t('slugs.decision-making'),
            info: t('content.1.skillArea.ready-for-change.sections.decision-making.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.decision-making.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.4.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.4.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.1.textFields.3.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.4.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.4.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.4.2.textFields.3.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: t('content.1.skillArea.ready-for-change.sections.goal-setting.name'),
            slug: t('slugs.goal-setting'),
            info: t('content.1.skillArea.ready-for-change.sections.goal-setting.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.goal-setting.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.5.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.5.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.4.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.1.textFields.4.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.5.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.5.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.4.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.4.description'),
                  },
                  {
                    id: 5,
                    title: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.5.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.5.2.textFields.5.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            name: t('content.1.skillArea.ready-for-change.sections.preparedness.name'),
            slug: t('slugs.preparedness'),
            info: t('content.1.skillArea.ready-for-change.sections.preparedness.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.preparedness.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.6.1.title'),
                description: <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.6.1.description" />,
                feedback: t('content.1.skillArea.ready-for-change.exercises.6.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'emoji',
                emojiTitle: t('content.1.skillArea.ready-for-change.exercises.6.1.emojiTitle'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.6.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.6.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.6.2.textFields.1.title'),
                    description: (
                      <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.6.2.textFields.1.description" />
                    ),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.6.2.textFields.2.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 7,
            name: t('content.1.skillArea.ready-for-change.sections.resilience.name'),
            slug: t('slugs.resilience'),
            info: t('content.1.skillArea.ready-for-change.sections.resilience.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.resilience.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.7.1.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.7.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.4.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.7.1.textFields.4.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.7.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.7.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.7.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.7.2.textFields.2.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.7.2.textFields.2.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 8,
            name: t('content.1.skillArea.ready-for-change.sections.uncertainty-tolerance.name'),
            slug: t('slugs.uncertainty-tolerance'),
            info: t('content.1.skillArea.ready-for-change.sections.uncertainty-tolerance.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.sections.uncertainty-tolerance.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.ready-for-change.exercises.8.1.title'),
                description: <Trans i18nKey="content.1.skillArea.ready-for-change.exercises.8.1.description" />,
                feedback: t('content.1.skillArea.ready-for-change.exercises.8.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'emoji',
                emojiTitle: t('content.1.skillArea.ready-for-change.exercises.8.1.emojiTitle'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.ready-for-change.exercises.8.2.title'),
                feedback: t('content.1.skillArea.ready-for-change.exercises.8.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.1.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.3.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.4.title'),
                    description: t('content.1.skillArea.ready-for-change.exercises.8.2.textFields.4.description'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'world-around-you',
        name: t('content.1.skillArea.world-around-you.name'),
        longName: t('content.1.skillArea.world-around-you.long-name'),
        info: t('content.1.skillArea.world-around-you.info'),
        slug: t('slugs.world-around-you'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.world-around-you.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.world-around-you.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.world-around-you.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3,
            description: t('content.1.skillArea.world-around-you.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.world-around-you.sections.opportunities-and-constraints.name'),
            slug: t('slugs.opportunities-and-constraints'),
            info: t('content.1.skillArea.world-around-you.sections.opportunities-and-constraints.info'),
            questions: [
              {
                id: 1,
                title: t(
                  'content.1.skillArea.world-around-you.sections.opportunities-and-constraints.questions.1.title',
                ),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.exercises.1.1.title'),
                feedback: t('content.1.skillArea.world-around-you.exercises.1.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.1.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.2.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.3.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.1.textFields.3.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.world-around-you.exercises.1.2.title'),

                feedback: t('content.1.skillArea.world-around-you.exercises.1.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.1.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.2.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.world-around-you.exercises.1.2.textFields.4.title'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.world-around-you.exercises.1.3.title'),
                feedback: t('content.1.skillArea.world-around-you.exercises.1.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.world-around-you.exercises.1.3.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.world-around-you.exercises.1.3.textFields.2.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.1.3.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.world-around-you.exercises.1.3.textFields.3.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.world-around-you.sections.labor-market.name'),
            slug: t('slugs.labor-market'),
            info: t('content.1.skillArea.world-around-you.sections.labor-market.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.sections.labor-market.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.exercises.2.1.title'),
                description: t('content.1.skillArea.world-around-you.exercises.2.1.description'),
                feedback: t('content.1.skillArea.world-around-you.exercises.2.1.feedback'),
                type: 'select',
                minScore: undefined,
                maxScore: 1.5,
                wordLists: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.world-around-you.exercises.2.1.wordLists.1.title'),
                    words: workLife[lng],
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.world-around-you.exercises.2.1.wordLists.2.title'),
                    words: workLife[lng],
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.world-around-you.exercises.2.2.title'),
                feedback: t('content.1.skillArea.world-around-you.exercises.2.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.world-around-you.exercises.2.2.textFields.1.title'),
                    description: (
                      <Trans i18nKey="content.1.skillArea.world-around-you.exercises.2.2.textFields.1.description">
                        <a
                          href={t('content.1.skillArea.world-around-you.exercises.2.2.textFields.1.link')}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          sitra.fi
                        </a>
                        <a
                          href={t('content.1.skillArea.world-around-you.exercises.2.2.textFields.1.link-2')}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary underline"
                        >
                          osaamistarvekompassi.fi
                        </a>
                      </Trans>
                    ),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.world-around-you.exercises.2.2.textFields.2.title'),
                    description: t('content.1.skillArea.world-around-you.exercises.2.2.textFields.2.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.world-around-you.sections.education-and-learning.name'),
            slug: t('slugs.education-and-learning'),
            info: t('content.1.skillArea.world-around-you.sections.education-and-learning.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.sections.education-and-learning.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.world-around-you.exercises.3.1.title'),
                description: t('content.1.world-around-you.exercises.3.1.description'),
                feedback: t('content.1.world-around-you.exercises.3.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.3.1.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.3.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.world-around-you.exercises.3.1.textFields.2.title'),
                    description: t('content.1.world-around-you.exercises.3.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.world-around-you.exercises.3.2.title'),
                feedback: t('content.1.world-around-you.exercises.3.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.3.2.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.3.2.textFields.1.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: t('content.1.skillArea.world-around-you.sections.social-structures.name'),
            slug: t('slugs.social-structures'),
            info: t('content.1.skillArea.world-around-you.sections.social-structures.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.sections.social-structures.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.world-around-you.exercises.4.1.title'),
                description: <Trans i18nKey="content.1.world-around-you.exercises.4.1.description" />,
                feedback: t('content.1.world-around-you.exercises.4.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.4.1.textFields.1.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.world-around-you.exercises.4.2.title'),
                feedback: t('content.1.world-around-you.exercises.4.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.4.2.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.4.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.world-around-you.exercises.4.2.textFields.2.title'),
                    description: t('content.1.world-around-you.exercises.4.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.world-around-you.exercises.4.2.textFields.3.title'),
                    description: t('content.1.world-around-you.exercises.4.2.textFields.3.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.world-around-you.exercises.4.3.title'),
                feedback: t('content.1.world-around-you.exercises.4.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.4.3.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.4.3.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.world-around-you.exercises.4.3.textFields.2.title'),
                    description: t('content.1.world-around-you.exercises.4.3.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.world-around-you.exercises.4.3.textFields.3.title'),
                    description: t('content.1.world-around-you.exercises.4.3.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.world-around-you.exercises.4.3.textFields.4.title'),
                    description: t('content.1.world-around-you.exercises.4.3.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: t('content.1.skillArea.world-around-you.sections.ecosocial-factors.name'),
            slug: t('slugs.ecosocial-factors'),
            info: t('content.1.skillArea.world-around-you.sections.ecosocial-factors.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.world-around-you.sections.ecosocial-factors.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.world-around-you.exercises.5.1.title'),
                description: t('content.1.world-around-you.exercises.5.1.description'),
                feedback: t('content.1.world-around-you.exercises.5.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.5.1.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.5.1.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.world-around-you.exercises.5.1.textFields.2.title'),
                    description: t('content.1.world-around-you.exercises.5.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.world-around-you.exercises.5.2.title'),
                description: t('content.1.world-around-you.exercises.5.2.description'),
                feedback: t('content.1.world-around-you.exercises.5.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.world-around-you.exercises.5.2.textFields.1.title'),
                    description: t('content.1.world-around-you.exercises.5.2.textFields.1.description'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'together-ahead',
        name: t('content.1.skillArea.together-ahead.name'),
        longName: t('content.1.skillArea.together-ahead.long-name'),
        info: t('content.1.skillArea.together-ahead.info'),
        slug: t('slugs.together-ahead'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.together-ahead.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.together-ahead.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.together-ahead.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3,
            description: t('content.1.skillArea.together-ahead.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.together-ahead.sections.articulating-competence.name'),
            slug: t('slugs.articulating-competence'),
            info: t('content.1.skillArea.together-ahead.sections.articulating-competence.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.sections.articulating-competence.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.1.1.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.1.1.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.1.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'emoji',
                emojiTitle: t('content.1.skillArea.together-ahead.exercises.1.1.emojiTitle'),
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.1.2.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.1.2.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.1.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'emoji',
                emojiTitle: t('content.1.skillArea.together-ahead.exercises.1.2.emojiTitle'),
              },
              {
                id: 3,
                title: t('content.1.skillArea.together-ahead.exercises.1.3.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.1.3.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.1.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t(
                      'content.1.skillArea.together-ahead.sections.articulating-competence.exercises.3.textFields.1.title',
                    ),
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.together-ahead.sections.communication.name'),
            slug: t('slugs.communication'),
            info: t('content.1.skillArea.together-ahead.sections.communication.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.sections.communication.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.2.1.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.2.1.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.2.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.2.1.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.1.textFields.1.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.2.2.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.2.2.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.2.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.2.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.3.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.4.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.4.description'),
                  },
                  {
                    id: 5,
                    title: t('content.1.skillArea.together-ahead.exercises.2.2.textFields.5.title'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.together-ahead.exercises.2.3.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.2.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.2.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.3.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.4.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.2.3.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.together-ahead.sections.interaction-in-work-study-and-networks.name'),
            slug: t('slugs.interaction-in-work-study-and-networks'),
            info: t('content.1.skillArea.together-ahead.sections.interaction-in-work-study-and-networks.info'),
            questions: [
              {
                id: 1,
                title: t(
                  'content.1.skillArea.together-ahead.sections.interaction-in-work-study-and-networks.questions.1.title',
                ),
              },
              {
                id: 2,
                title: t(
                  'content.1.skillArea.together-ahead.sections.interaction-in-work-study-and-networks.questions.2.title',
                ),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.3.1.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.3.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'select',
                wordLists: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.3.1.wordLists.1.title'),
                    words: statementsOfStrength[lng],
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.3.2.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.3.2.feedback'),
                type: 'text',
                minScore: 1.5,
                maxScore: undefined,
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.2.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.3.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.4.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.3.2.textFields.4.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 4,
            name: t('content.1.skillArea.together-ahead.sections.asking-and-utilizing-help.name'),
            slug: t('slugs.asking-and-utilizing-help'),
            info: t('content.1.skillArea.together-ahead.sections.asking-and-utilizing-help.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.sections.asking-and-utilizing-help.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.4.1.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.4.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.4.1.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.4.1.textFields.1.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.4.2.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.4.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.4.2.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.4.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.4.2.textFields.2.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 5,
            name: t('content.1.skillArea.together-ahead.sections.societal-services.name'),
            slug: t('slugs.societal-services'),
            info: t('content.1.skillArea.together-ahead.sections.societal-services.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.sections.societal-services.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.5.1.title'),
                description: (
                  <Trans i18nKey="content.1.skillArea.together-ahead.exercises.5.1.description">
                    <a
                      href={t('content.1.skillArea.together-ahead.exercises.5.1.link')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline"
                    >
                      {t('content.1.skillArea.together-ahead.exercises.5.1.link')}
                    </a>
                  </Trans>
                ),
                feedback: t('content.1.skillArea.together-ahead.exercises.5.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.5.1.textFields.1.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.5.2.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.5.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.5.2.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.5.2.textFields.2.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.5.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.5.2.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.5.2.textFields.4.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 6,
            name: t('content.1.skillArea.together-ahead.sections.job-search-skills.name'),
            slug: t('slugs.job-search-skills'),
            info: t('content.1.skillArea.together-ahead.sections.job-search-skills.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.sections.job-search-skills.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.together-ahead.exercises.6.1.title'),
                description: <Trans i18nKey="content.1.skillArea.together-ahead.exercises.6.1.description" />,
                feedback: t('content.1.skillArea.together-ahead.exercises.6.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.6.1.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.6.1.textFields.2.title'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.6.1.textFields.3.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.6.1.textFields.3.description'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.6.1.textFields.4.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.together-ahead.exercises.6.2.title'),
                feedback: t('content.1.skillArea.together-ahead.exercises.6.2.feedback'),
                minScore: 1.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.1.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.2.title'),
                    description: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.3.title'),
                  },
                  {
                    id: 4,
                    title: t('content.1.skillArea.together-ahead.exercises.6.2.textFields.4.title'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'anticipate-the-future',
        name: t('content.1.skillArea.anticipate-the-future.name'),
        longName: t('content.1.skillArea.anticipate-the-future.long-name'),
        info: t('content.1.skillArea.anticipate-the-future.info'),
        slug: t('slugs.anticipate-the-future'),
        feedbacks: [
          {
            id: 1,
            minScore: 0,
            maxScore: 1,
            description: t('content.1.skillArea.anticipate-the-future.feedbacks.1.description'),
          },
          {
            id: 2,
            minScore: 1,
            maxScore: 2.2,
            description: t('content.1.skillArea.anticipate-the-future.feedbacks.2.description'),
          },
          {
            id: 3,
            minScore: 2.2,
            maxScore: 2.7,
            description: t('content.1.skillArea.anticipate-the-future.feedbacks.3.description'),
          },
          {
            id: 4,
            minScore: 2.7,
            maxScore: 3,
            description: t('content.1.skillArea.anticipate-the-future.feedbacks.4.description'),
          },
        ],
        sections: [
          {
            id: 1,
            name: t('content.1.skillArea.anticipate-the-future.sections.alternative-paths.name'),
            slug: t('slugs.alternative-paths'),
            info: t('content.1.skillArea.anticipate-the-future.sections.alternative-paths.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.sections.alternative-paths.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.exercises.1.1.name'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.1.1.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.1.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.1.textFields.1.title'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.1.textFields.2.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.1.textFields.2.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.anticipate-the-future.exercises.1.2.name'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.1.2.description'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.1.2.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.2.textFields.1.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.2.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.2.textFields.2.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.2.textFields.2.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.anticipate-the-future.exercises.1.3.name'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.1.3.description'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.1.3.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.1.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.1.description'),
                  },
                  {
                    id: 2,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.2.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.2.description'),
                  },
                  {
                    id: 3,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.3.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.1.3.textFields.3.description'),
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            name: t('content.1.skillArea.anticipate-the-future.sections.social-changes.name'),
            slug: t('slugs.social-changes'),
            info: t('content.1.skillArea.anticipate-the-future.sections.social-changes.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.sections.social-changes.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.exercises.2.1.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.2.1.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.2.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.2.1.textFields.1.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.2.1.textFields.1.description'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.anticipate-the-future.exercises.2.2.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.2.2.description'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.2.2.feedback'),
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.2.2.textFields.1.title'),
                    description: t('content.1.skillArea.anticipate-the-future.exercises.2.2.textFields.1.description'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.anticipate-the-future.exercises.2.3.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.2.3.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.2.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.2.3.textFields.1.title'),
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            name: t('content.1.skillArea.anticipate-the-future.sections.global-changes.name'),
            slug: t('slugs.global-changes'),
            info: t('content.1.skillArea.anticipate-the-future.sections.global-changes.info'),
            questions: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.sections.global-changes.questions.1.title'),
              },
            ],
            exercises: [
              {
                id: 1,
                title: t('content.1.skillArea.anticipate-the-future.exercises.3.1.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.3.1.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.3.1.feedback'),
                minScore: undefined,
                maxScore: 1.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.3.1.textFields.1.title'),
                  },
                ],
              },
              {
                id: 2,
                title: t('content.1.skillArea.anticipate-the-future.exercises.3.2.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.3.2.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.3.2.feedback'),
                minScore: 1.5,
                maxScore: 2.5,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.3.2.textFields.1.title'),
                  },
                ],
              },
              {
                id: 3,
                title: t('content.1.skillArea.anticipate-the-future.exercises.3.3.title'),
                description: t('content.1.skillArea.anticipate-the-future.exercises.3.3.description'),
                feedback: t('content.1.skillArea.anticipate-the-future.exercises.3.3.feedback'),
                minScore: 2.5,
                maxScore: undefined,
                type: 'text',
                textFields: [
                  {
                    id: 1,
                    title: t('content.1.skillArea.anticipate-the-future.exercises.3.3.textFields.1.title'),
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
