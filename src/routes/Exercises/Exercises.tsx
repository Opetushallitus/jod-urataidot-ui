import { BackButton } from '@/components';
import { ExerciseLinkCard } from '@/features/exercises/components/ExerciseLinkCard';
import { useFilteredExercises } from '@/hooks/useFilteredExercises';
import { ChevronDown } from '@/icons';
import { SkillArea, SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { Field, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ExerciseFilterField, useExerciseFilterStore } from '@/stores/exerciseFilterStore';
import { OpenAllExercisesPDFButton } from '@/features/exercises/components/OpenAllExercisesPDFButton';

interface SelectOption {
  value: string;
  text: string;
}

const Select = ({
  title,
  value,
  filter,
  options,
}: {
  title: string;
  value: string | undefined;
  filter: ExerciseFilterField;
  options: SelectOption[];
}) => {
  const { t } = useTranslation();

  const noChoiceText = t('components.exercise-filter.no-choice');
  const setExerciseFilter = useExerciseFilterStore((state) => state.setExerciseFilter);

  return (
    <Field className="flex flex-col gap-2">
      <Label className="font-display text-body-sm-bold">{title}</Label>
      <Listbox
        onChange={(newValue) => {
          setExerciseFilter({ filter, value: newValue });
        }}
      >
        <ListboxButton className="border-neutral-3 h-[44px] w-[224px] cursor-pointer rounded-md border-1 bg-white px-4">
          <div className="flex flex-row justify-between">
            <span>{value === undefined ? t('common.select') : options.find((o) => o.value === value)?.text}</span>
            <ChevronDown className="size-6" aria-hidden="true" />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="mt-2 flex w-[224px] cursor-pointer flex-col gap-2 rounded-md bg-white p-3 shadow-lg"
        >
          {[{ value: undefined, text: noChoiceText }, ...options]
            .filter((option) => option.value !== value)
            .map((option) => (
              <ListboxOption
                className="hover:bg-primary-muted-hover rounded-md px-3 py-3 hover:underline"
                key={option.text}
                value={option.value}
              >
                {option.text}
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
};

const ExercisesPage = ({ skillAreas }: { skillAreas: SkillArea[] }) => {
  const { t } = useTranslation();

  const exerciseFilter = useExerciseFilterStore((state) => state.exerciseFilter);

  const exercises = useFilteredExercises({
    skillLevelFilter: exerciseFilter.skillLevel === undefined ? undefined : Number(exerciseFilter.skillLevel),
    skillAreaIDFilter: exerciseFilter.skillAreaID as SkillAreaID | undefined,
  });

  const skillAreaIdOptions = skillAreas.map((sa) => ({ value: sa.id, text: sa.name }));
  const skillLevelOptions = [
    { value: '0', text: t('common.skill-levels.0') },
    { value: '1', text: t('common.skill-levels.1') },
    { value: '2', text: t('common.skill-levels.2') },
    { value: '3', text: t('common.skill-levels.3') },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <BackButton />
      <div className="mt-6 mb-5 flex flex-col gap-5 sm:mt-7 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-heading-2 sm:text-heading-1">{t('exercises.title')}</h1>
        <OpenAllExercisesPDFButton hideWhenNoAnswers />
      </div>
      <p className="text-body-sm mt-6 mb-6">{t('exercises.description')}</p>
      <div className="mt-6 mb-6 flex flex-col gap-4 sm:flex-row">
        <Select
          title={t('exercises.skill-area')}
          value={exerciseFilter.skillAreaID}
          options={skillAreaIdOptions}
          filter="area"
        />
        <Select
          title={t('exercises.skill-level')}
          value={exerciseFilter.skillLevel}
          options={skillLevelOptions}
          filter="level"
        />
      </div>
      <div className="flex w-full flex-col gap-3">
        {exercises.map((exercise) => (
          <ExerciseLinkCard
            background="white"
            key={exercise.skillAreaSlug + exercise.sectionSlug + exercise.id}
            exercise={exercise}
          />
        ))}
      </div>
    </div>
  );
};

export default ExercisesPage;
