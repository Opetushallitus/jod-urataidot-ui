import { BottomDrawer, SkillAreaIcon } from '@/components';
import useSkillAreas from '@/hooks/useSkillAreas';
import { ChevronDown } from '@/icons';
import { cx } from 'cva';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

export const MobileSkillAreaSelector = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const skillAreas = useSkillAreas();
  const currentSkillArea = skillAreas.find((o) => pathname.includes(o.slug));

  return (
    <>
      <button aria-label={t('career-management.go-to-skill-area')} onClick={() => setIsOpen(true)}>
        <span className="flex h-[44px] items-center gap-3 rounded-md border border-[#00000040] bg-white p-2">
          <SkillAreaIcon section={currentSkillArea?.id ?? 'know-yourself'} size="xs" />
          <span className="text-button-sm flex-1 text-left sm:min-w-[160px]">{currentSkillArea?.name}</span>
          <span>
            <ChevronDown />
          </span>
        </span>
      </button>
      <BottomDrawer
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        showCloseButton={false}
        title={t('career-management.survey-sections')}
      >
        <div className="font-display flex flex-col gap-3">
          {skillAreas.map((skillArea) => (
            <button
              className={cx(
                'flex w-full items-center gap-3 rounded-md border border-[#00000040] p-3',
                currentSkillArea?.id === skillArea.id ? 'border-primary bg-primary-muted border-2' : 'bg-white',
              )}
              key={skillArea.id}
              onClick={() => {
                setIsOpen(false);
                navigate({
                  pathname: `/${i18n.language}/${t('slugs.career-management')}/${skillArea.slug}`,
                });
              }}
            >
              <SkillAreaIcon section={skillArea.id} size="xs" />
              <span className="text-button-sm min-w-[160px] flex-1 text-left">{skillArea.name}</span>
            </button>
          ))}
          <button
            className={cx(
              'flex w-full items-center gap-2 rounded-md border border-[#00000040] p-3',
              pathname.includes(t('slugs.summary')) ? 'border-primary bg-primary-muted border-2' : 'bg-white',
            )}
            onClick={() => {
              setIsOpen(false);
              navigate(`/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`);
            }}
          >
            <span className="text-button-sm flex h-7 min-w-[160px] flex-1 items-center px-5 text-left">
              {t('career-management-summary.title')}
            </span>
          </button>
        </div>
      </BottomDrawer>
    </>
  );
};
