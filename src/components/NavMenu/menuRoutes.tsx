import { LinkComponent, MenuItem } from '@jod/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import { JodHome } from '@jod/design-system/icons';

export const useMenuRoutes = (onClose: () => void) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { pathname } = useLocation();

  const createMenuItem = React.useCallback(
    (
      label: string,
      to: string,
      options: {
        icon?: React.ReactNode;
        useStartsWith?: boolean;
      } = {},
    ): MenuItem => {
      const { icon, useStartsWith = false } = options;
      const fullPath = to.startsWith('/') ? to : `/${language}/${to}`;

      return {
        ...(icon && { icon }),
        label,
        LinkComponent: ({ children, className }: LinkComponent) => (
          <NavLink to={fullPath} className={className} lang={language} onClick={onClose}>
            {children}
          </NavLink>
        ),
        selected: useStartsWith ? pathname.startsWith(fullPath) : pathname === fullPath,
      };
    },
    [language, onClose, pathname],
  );

  const mainLevelMenuItems: MenuItem[] = React.useMemo(() => {
    return [
      createMenuItem(t('front-page'), `/${language}`, { icon: <JodHome /> }),
      createMenuItem(t('common.navigation-cards.learn-something-new.title'), t('slugs.quick-self-evaluation'), {
        useStartsWith: true,
      }),
      createMenuItem(t('common.navigation-cards.career-management.title'), t('slugs.career-management'), {
        useStartsWith: true,
      }),
      createMenuItem(t('common.navigation-cards.exercises.title'), t('slugs.exercises'), { useStartsWith: true }),
      createMenuItem(t('common.navigation-cards.career-plan.title'), t('slugs.career-plan')),
      createMenuItem(t('nav.service-info'), t('slugs.service-info')),
    ];
  }, [createMenuItem, language, t]);

  return mainLevelMenuItems;
};
