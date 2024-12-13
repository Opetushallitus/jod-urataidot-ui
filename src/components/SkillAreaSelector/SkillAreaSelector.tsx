import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useTranslation } from 'react-i18next';
import { SkillAreaIcon } from '../SkillAreaIcon/SkillAreaIcon';
import { ChevronDown } from '@/icons';
import { Link, useLocation, useSearchParams } from 'react-router';
import useSkillAreas from '@/hooks/useSkillAreas';

export const SkillAreaSelector = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const skillAreas = useSkillAreas();
  const currentSkillArea = skillAreas.find((o) => pathname.includes(o.slug));

  return (
    <Menu>
      <MenuButton className="group" aria-label={t('career-management.go-to-skill-area')}>
        <span className="flex h-11 items-center gap-2 rounded-lg border bg-white p-1">
          <SkillAreaIcon section={currentSkillArea?.id ?? 'know-yourself'} size="xs" />
          <span className="flex-1 text-left text-heading-5 sm:min-w-40">{currentSkillArea?.name}</span>
          <span className="group-data-[active]:rotate-180">
            <ChevronDown />
          </span>
        </span>
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="z-50 flex flex-col gap-1 bg-white p-4 text-body-sm shadow-lg [--anchor-gap:4px] sm:-translate-x-2 sm:rounded-lg"
      >
        {skillAreas.map((skillArea) => (
          <MenuItem
            as={Link}
            key={skillArea.id}
            aria-label={skillArea.name}
            to={{
              pathname: `/${i18n.language}/${t('slugs.career-management')}/${skillArea.slug}`,
              search: searchParams.toString(),
            }}
            className={`flex items-center gap-2 rounded-xl border-2 border-transparent px-2 py-1 font-display hover:bg-primary-muted-hover hover:underline focus-visible:border-primary data-[focus]:bg-primary-muted-hover data-[focus]:underline ${currentSkillArea?.id === skillArea.id ? 'bg-primary-light' : ''}`}
          >
            <SkillAreaIcon section={skillArea.id} size="xs" />
            <span className="min-w-40 flex-1 text-left text-heading-5">{skillArea.name}</span>
          </MenuItem>
        ))}
        <Link
          to={{
            pathname: `/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`,
            search: searchParams.toString(),
          }}
          className="flex h-11 items-center rounded-xl border-2 border-transparent px-2 py-1 font-display text-heading-5 hover:bg-primary-muted-hover hover:underline focus-visible:border-primary data-[focus]:bg-primary-muted-hover data-[focus]:underline"
        >
          {t('career-management-summary.title')}
        </Link>
      </MenuItems>
    </Menu>
  );
};
