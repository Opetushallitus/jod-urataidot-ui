import { BottomDrawer, SkillAreaIcon } from '@/components';
import useSkillAreas from '@/hooks/useSkillAreas';
import { ChevronDown } from '@/icons';
import { cx } from 'cva';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

export const MobileSkillAreaSelector = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const skillAreas = useSkillAreas();
  const currentSkillArea = skillAreas.find((o) => pathname.includes(o.slug));

  return (
    <>
      <button aria-label={t('career-management.go-to-skill-area')} onClick={() => setIsOpen(true)}>
        <span className="flex h-11 items-center gap-2 rounded-lg border bg-white p-1">
          <SkillAreaIcon section={currentSkillArea?.id ?? 'know-yourself'} size="xs" />
          <span className="flex-1 text-left text-heading-5 sm:min-w-40">{currentSkillArea?.name}</span>
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
        <div className="flex flex-col gap-2 font-display">
          {skillAreas.map((skillArea) => (
            <button
              className={cx(
                'flex w-full items-center gap-2 rounded-lg border p-2',
                currentSkillArea?.id === skillArea.id ? 'border-2 border-primary bg-primary-muted' : 'bg-white',
              )}
              key={skillArea.id}
              onClick={() => {
                setIsOpen(false);
                navigate(`/${i18n.language}/${t('slugs.career-management')}/${skillArea.slug}`);
              }}
            >
              <SkillAreaIcon section={skillArea.id} size="xs" />
              <span className="min-w-40 flex-1 text-left text-heading-5">{skillArea.name}</span>
            </button>
          ))}
          <button
            className={cx(
              'flex w-full items-center gap-2 rounded-lg border p-2',
              pathname.includes(t('slugs.summary')) ? 'border-2 border-primary bg-primary-muted' : 'bg-white',
            )}
            onClick={() => {
              setIsOpen(false);
              navigate(`/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`);
            }}
          >
            <span className="flex h-8 min-w-40 flex-1 items-center px-4 text-left text-heading-5">
              {t('career-management-summary.title')}
            </span>
          </button>
        </div>
      </BottomDrawer>
    </>
  );
};
