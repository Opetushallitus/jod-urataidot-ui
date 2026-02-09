import React from 'react';
import { langLabels, supportedLanguageCodes } from '@/i18n/config';
import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import { ExternalLinkSection, LinkComponent, MenuSection, NavigationMenu } from '@jod/design-system';
import { useTranslation } from 'react-i18next';
import { useMenuRoutes } from './menuRoutes';
import { JodCheckmark, JodLink } from '@jod/design-system/icons';
import toast from 'react-hot-toast/headless';

const PortalLink = ({ children, className }: LinkComponent) => {
  const {
    i18n: { language },
  } = useTranslation();

  return (
    <a href={`/${language}`} className={className}>
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
    toast.success(t('career-management-summary.summary-link-card.link-copied'));
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

  const externalLinkSections: ExternalLinkSection[] = [
    {
      title: t('common:navigation.external.title'),
      linkItems: [
        {
          label: t('common:navigation.external.yksilo.label'),
          url: `/yksilo/${language}`,
          description: t('common:navigation.external.yksilo.description'),
          accentColor: '#006DB3',
        },
        {
          label: t('common:navigation.external.ohjaaja.label'),
          url: `/ohjaaja/${language}`,
          description: t('common:navigation.external.ohjaaja.description'),
          accentColor: '#00818A',
        },
        {
          label: t('common:navigation.external.tietopalvelu.label'),
          url: `/tietopalvelu/${language}`,
          description: t('common:navigation.external.tietopalvelu.description'),
          accentColor: '#AD4298',
        },
      ],
    },
  ];

  return (
    <NavigationMenu
      open={open}
      portalLinkComponent={PortalLink}
      menuSection={menuSection}
      ariaCloseMenu={t('common:close-menu')}
      openSubMenuLabel={t('common:open-submenu')}
      portalLinkLabel={t('common:competency-path-portal')}
      onClose={onClose}
      selectedLanguage={language}
      languageSelectionItems={languageSelectionItems}
      externalLinkSections={externalLinkSections}
      extraSection={
        <button
          onClick={() => void copyToClipboard()}
          className="focus:outline-accent text-accent flex w-full cursor-pointer flex-row items-center justify-between pl-5"
        >
          <div className="hover:bg-bg-gray flex w-full items-center justify-between rounded-md">
            <span className="text-button-sm pl-3 text-left">
              {linkCopied
                ? t('career-management-summary.summary-link-card.link-copied')
                : t('nav.copy-results-to-link')}
            </span>
            <div className="flex min-h-8 min-w-8 items-center justify-center">
              {linkCopied ? <JodCheckmark size={24} /> : <JodLink />}
            </div>
          </div>
        </button>
      }
      languageSelectionTitle={t('common:language-selection')}
      serviceVariant="ohjaaja"
      externalLinkIconAriaLabel={t('common:external-link')}
      ariaLabel={t('common:navigation-menu')}
      navigationAriaLabel={t('common:main-navigation')}
    />
  );
};
