import { BackButton } from '@/components';
import { ExerciseLinkCard } from '@/features/exercises/components/ExerciseLinkCard';
import { useFilteredExercises } from '@/hooks/useFilteredExercises';
import { ChevronDown } from '@/icons';
import { SkillArea, SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
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
    <label className="flex flex-col gap-2">
      <span className="font-display text-body-sm-bold">{title}</span>
      <Listbox
        onChange={(newValue) => {
          setExerciseFilter({ filter, value: newValue });
        }}
      >
        <ListboxButton className="h-11 w-56 cursor-pointer rounded-lg border-1 border-neutral-3 bg-white px-3">
          <div className="flex flex-row justify-between">
            <span>{value === undefined ? t('common.select') : options.find((o) => o.value === value)?.text}</span>
            <ChevronDown className="size-6" aria-hidden="true" />
          </div>
        </ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="mt-1 flex w-56 cursor-pointer flex-col gap-1 rounded-lg bg-white p-2 shadow-lg"
        >
          {[{ value: undefined, text: noChoiceText }, ...options]
            .filter((option) => option.value !== value)
            .map((option) => (
              <ListboxOption
                className="rounded-lg px-2 py-2 hover:bg-primary-muted-hover hover:underline"
                key={option.text}
                value={option.value}
              >
                {option.text}
              </ListboxOption>
            ))}
        </ListboxOptions>
      </Listbox>
    </label>
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
      <div className="mb-4 mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-heading-2 sm:text-heading-1">{t('exercises.title')}</h1>
        <OpenAllExercisesPDFButton hideWhenNoAnswers />
      </div>
      <p className="mb-6 mt-6 text-body-sm">{t('exercises.description')}</p>
      <div className="mb-6 mt-6 flex flex-col gap-4 sm:flex-row">
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
      <div className="flex w-full flex-col gap-2">
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
