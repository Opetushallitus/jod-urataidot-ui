import React from 'react';
import { langLabels, supportedLanguageCodes } from '@/i18n/config';
import { Link as LinkIcon } from '@/icons';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { LinkComponent, MenuItem, NavigationMenu } from '@jod/design-system';
import { useTranslation } from 'react-i18next';
import { MdArrowBackIos, MdCheck } from 'react-icons/md';
import { Link, useLocation } from 'react-router';

const FrontPageLink = ({ children, className }: LinkComponent) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <a href={`/yksilo/${language}`} className={className}>
      {children}
    </a>
  );
};

const LanguageSelectionLinkComponent = (lng: string) => {
  const LanguageSelectionLink = (props: LinkComponent) => {
    return (
      <a key={lng} href={`${import.meta.env.BASE_URL}${lng}`} type="button" {...props}>
        {props.children}
      </a>
    );
  };
  return LanguageSelectionLink;
};

const MenuLinkComponent = (to: string, onClose: () => void) => {
  const MenuLink = (props: LinkComponent) => <Link to={to} type="button" {...props} onClick={onClose} />;
  return MenuLink;
};

export const NavMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { pathname } = useLocation();
  const getEncodedData = useCareerPlanningAnswersStore((state) => state.getEncodedData);
  const [linkCopied, setLinkCopied] = React.useState(false);

  const menuItems: MenuItem[] = [
    {
      label: t('nav.home'),
      LinkComponent: MenuLinkComponent('/', onClose),
      selected: pathname === `/${language}`,
    },
    {
      label: t('common.navigation-cards.learn-something-new.title'),
      LinkComponent: MenuLinkComponent(t('slugs.quick-self-evaluation'), onClose),
      selected: pathname.startsWith(`/${language}/${t('slugs.quick-self-evaluation')}`),
    },
    {
      label: t('common.navigation-cards.career-management.title'),
      LinkComponent: MenuLinkComponent(t('slugs.career-management'), onClose),
      selected: pathname.startsWith(`/${language}/${t('slugs.career-management')}`),
    },
    {
      label: t('common.navigation-cards.exercises.title'),
      LinkComponent: MenuLinkComponent(t('slugs.exercises'), onClose),
      selected: pathname.startsWith(`/${language}/${t('slugs.exercises')}`),
    },
    {
      label: t('common.navigation-cards.career-plan.title'),
      LinkComponent: MenuLinkComponent(t('slugs.career-plan'), onClose),
      selected: pathname === `/${language}/${t('slugs.career-plan')}`,
    },
    {
      label: t('nav.service-info'),
      LinkComponent: MenuLinkComponent(t('slugs.service-info'), onClose),
      selected: pathname === `/${language}/${t('slugs.service-info')}`,
    },
  ];

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}${import.meta.env.BASE_URL}${language}/${t('slugs.import')}#${getEncodedData()}`,
    );
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 3000);
  };

  const languageSelectionItems = supportedLanguageCodes.map((code) => ({
    label: langLabels[code] ?? code,
    value: code,
    linkComponent: LanguageSelectionLinkComponent(code),
  }));

  return (
    <NavigationMenu
      open={open}
      accentColor="#85C4EC"
      FrontPageLinkComponent={FrontPageLink}
      backLabel={t('back')}
      menuItems={menuItems}
      ariaCloseMenu={t('close-menu')}
      openSubMenuLabel={t('open-submenu')}
      frontPageIcon={<MdArrowBackIos size={24} />}
      frontPageLinkLabel={t('nav.competency-path-home')}
      onClose={onClose}
      selectedLanguage={language}
      languageSelectionItems={languageSelectionItems}
      extraSection={
        <button
          onClick={() => void copyToClipboard()}
          className="focus:outline-accent flex cursor-pointer flex-row items-center"
        >
          <div className="flex min-h-[40px] min-w-[40px] items-center justify-center">
            {linkCopied ? <MdCheck size={24} /> : <LinkIcon />}
          </div>
          <span className="text-button-md text-left">
            {linkCopied ? t('career-management-summary.summary-link-card.link-copied') : t('nav.copy-results-to-link')}
          </span>
        </button>
      }
    />
  );
};
