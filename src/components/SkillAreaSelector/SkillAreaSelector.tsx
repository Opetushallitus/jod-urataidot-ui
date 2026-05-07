import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

import useSkillAreas from '@/hooks/useSkillAreas';
import { ChevronDown } from '@/icons';

import { SkillAreaIcon } from '../SkillAreaIcon/SkillAreaIcon';

export const SkillAreaSelector = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();

  const skillAreas = useSkillAreas();
  const currentSkillArea = skillAreas.find((o) => pathname.includes(o.slug));

  return (
    <Menu>
      <MenuButton className="group" aria-label={t('career-management.go-to-skill-area')}>
        <span className="flex h-[44px] items-center gap-2 rounded-md border border-[#00000040] bg-white p-2">
          <SkillAreaIcon section={currentSkillArea?.id ?? 'know-yourself'} size="xs" />
          <span className="flex-1 text-left text-button-sm sm:min-w-[160px]">{currentSkillArea?.name}</span>
          <span className="group-data-active:rotate-180">
            <ChevronDown />
          </span>
        </span>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="shadow-lg z-50 flex flex-col gap-2 bg-white p-5 text-body-sm [--anchor-gap:4px] sm:-translate-x-2 sm:rounded-md"
      >
        {skillAreas.map((skillArea) => (
          <MenuItem
            as={Link}
            key={skillArea.id}
            aria-label={skillArea.name}
            to={`/${i18n.language}/${t('slugs.career-management')}/${skillArea.slug}`}
            className={`font-display hover:bg-primary-muted-hover focus-visible:border-primary data-focus:bg-primary-muted-hover flex items-center gap-4 rounded-[12px] border-2 border-transparent px-3 py-2 hover:underline data-focus:underline ${currentSkillArea?.id === skillArea.id ? 'bg-primary-light' : ''}`}
          >
            <SkillAreaIcon section={skillArea.id} size="xs" />
            <span className="min-w-[160px] flex-1 text-left text-button-sm">{skillArea.name}</span>
          </MenuItem>
        ))}
        <Link
          to={`/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`}
          className="font-display hover:bg-primary-muted-hover focus-visible:border-primary data-focus:bg-primary-muted-hover flex h-[44px] items-center rounded-[12px] border-2 border-transparent px-3 py-2 text-button-sm hover:underline data-focus:underline"
        >
          {t('career-management-summary.title')}
        </Link>
      </MenuItems>
    </Menu>
  );
};
