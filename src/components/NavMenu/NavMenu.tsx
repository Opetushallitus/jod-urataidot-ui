import React from 'react';
import { langLabels, supportedLanguageCodes } from '@/i18n/config';
import { Link as LinkIcon } from '@/icons';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { LinkComponent, MenuSection, NavigationMenu } from '@jod/design-system';
import { useTranslation } from 'react-i18next';
import { MdCheck } from 'react-icons/md';
import { useMenuRoutes } from './menuRoutes';

const PortalLink = ({ children, className }: LinkComponent) => {
  return (
    <a href="/" className={className}>
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

export const NavMenu = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const getEncodedData = useCareerPlanningAnswersStore((state) => state.getEncodedData);
  const [linkCopied, setLinkCopied] = React.useState(false);

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

  const menuSection: MenuSection = {
    title: t('navigation.menu-section-title'),
    linkItems: useMenuRoutes(onClose),
  };

  return (
    <NavigationMenu
      open={open}
      PortalLinkComponent={PortalLink}
      menuSection={menuSection}
      ariaCloseMenu={t('close-menu')}
      openSubMenuLabel={t('open-submenu')}
      portalLinkLabel={t('competency-path-portal')}
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
      languageSelectionTitle={t('language-selection')}
      serviceVariant="yksilo"
    />
  );
};
