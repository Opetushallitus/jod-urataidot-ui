import React from 'react';
import { NavMenu, FeedbackModal } from '@/components';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import {
  Chatbot,
  CookieConsentProvider,
  Footer,
  LanguageButton,
  MatomoTracker,
  MenuButton,
  NavigationBar,
  useCookieConsent,
} from '@jod/design-system';
import { LangCode, langLabels, supportedLanguageCodes } from '@/i18n/config';
import { Toaster } from '@/components/Toaster/Toaster';

const LanguageButtonWrapper = ({ responsive }: { responsive?: boolean }) => {
  const {
    i18n: { language },
  } = useTranslation();
  return (
    <LanguageButton
      serviceVariant="yksilo"
      testId="language-button"
      language={language as LangCode}
      supportedLanguageCodes={supportedLanguageCodes}
      generateLocalizedPath={(lng: string) => `/${lng}`}
      linkComponent={Link}
      responsive={responsive}
      translations={{
        fi: { change: 'Vaihda kieli.', label: langLabels.fi },
        sv: { change: 'Andra språk.', label: langLabels.sv },
        en: { change: 'Change language.', label: langLabels.en },
      }}
    />
  );
};

const Root = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const hostname = window.location.hostname;
  const { siteId } = React.useMemo(() => {
    if (hostname === 'osaamispolku.fi') {
      return { siteId: 36 };
    } else if (hostname === 'jodtestaus.fi') {
      return { siteId: 38 };
    } else {
      return { siteId: 37 };
    }
  }, [hostname]);

  const moreInfoLinks = [
    {
      href: `/${language}/${t('common:slugs.about-service')}`,
      label: t('common:footer.more-info-links.about-service'),
    },
    {
      href: `/${language}/${t('common:slugs.privacy-and-cookies')}`,
      label: t('common:footer.more-info-links.privacy-and-cookies'),
    },
    { href: `/${language}/${t('common:slugs.data-sources')}`, label: t('common:footer.more-info-links.data-sources') },
    { href: `/${language}/${t('common:slugs.ai-usage')}`, label: t('common:footer.more-info-links.ai-usage') },
    {
      href: `/${language}/${t('common:slugs.accessibility')}`,
      label: t('common:footer.more-info-links.accessibility'),
    },
  ];

  const socialMedia: React.ComponentProps<typeof Footer>['socialMedia'] = {
    facebook: {
      href: 'https://www.facebook.com/osaamispolku',
      label: t('common:footer.social-media.facebook'),
    },
    instagram: {
      href: 'https://www.instagram.com/osaamispolku/',
      label: t('common:footer.social-media.instagram'),
    },
    linkedin: {
      href: 'https://www.linkedin.com/company/osaamispolku',
      label: t('common:footer.social-media.linkedin'),
    },
  };

  const [navMenuOpen, setNavMenuOpen] = React.useState(false);
  const [feedbackVisible, setFeedbackVisible] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const { open: openCookieConsent } = useCookieConsent();

  return (
    <div className="bg-bg-gray text-primary-gray flex min-h-screen flex-col">
      <title>{t('common.app-name')}</title>
      <link rel="manifest" href={`/manifest-${language}.json`} crossOrigin="use-credentials" />
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar
          logo={{ to: `/${language}`, language, srText: t('common:osaamispolku') }}
          menuComponent={<MenuButton onClick={() => setNavMenuOpen(!navMenuOpen)} label={t('common:menu')} />}
          languageButtonComponent={<LanguageButtonWrapper />}
          renderLink={({ to, className, children }) => (
            <Link to={to} className={className}>
              {children as React.ReactNode}
            </Link>
          )}
          serviceBarVariant="yksilo"
          serviceBarTitle={t('my-competence-path')}
          translations={{
            showAllNotesLabel: t('common:show-all'),
            ariaLabelCloseNote: t('common:note.close'),
          }}
        />
        <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
      </header>
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      <Outlet />
      <Chatbot />
      <Footer
        language={language}
        okmLabel={t('common:footer.logos.okm-label')}
        temLabel={t('common:footer.logos.tem-label')}
        ophLabel={t('common:footer.logos.oph-label')}
        kehaLabel={t('common:footer.logos.keha-label')}
        cooperationTitle={t('common:footer.cooperation-title')}
        fundingTitle={t('common:footer.funding-title')}
        moreInfoTitle={t('common:footer.more-info-title')}
        moreInfoDescription={t('common:footer.more-info-description')}
        moreInfoLinks={moreInfoLinks}
        feedbackTitle={t('common:footer.feedback-title')}
        feedbackContent={t('common:footer.feedback-content')}
        feedbackButtonLabel={t('common:footer.feedback-button-label')}
        feedbackOnClick={() => setFeedbackVisible(true)}
        feedbackBgImageClassName="bg-[url(@/../assets/feedback.jpg)] bg-cover bg-[50%_50%]"
        copyright={t('common:footer.copyright')}
        externalLinkIconAriaLabel={t('common:external-link')}
        socialMedia={socialMedia}
        testId="footer"
        cookieSettingsLabel={t('common:footer.cookie-settings-label')}
        onCookieSettingsClick={() => openCookieConsent()}
      />
      <FeedbackModal
        isOpen={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
        section="Osaamispolkuni"
        area="Alatunniste"
        language={language as LangCode}
      />
      <Toaster />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      <MatomoTracker trackerUrl="https://analytiikka.opintopolku.fi" siteId={siteId} pathname={location.pathname} />
    </div>
  );
};

const RootWithCookieConsentProvider = () => {
  const { t } = useTranslation();

  return (
    <CookieConsentProvider
      languageButtonComponent={<LanguageButtonWrapper responsive={false} />}
      translations={{
        guard: {
          buttonLabel: t('common:cookie-consent.guard.buttonLabel'),
          description: t('common:cookie-consent.guard.description'),
          title: t('common:cookie-consent.guard.title'),
        },
        modal: {
          acceptAllLabel: t('common:cookie-consent.modal.acceptAllLabel'),
          cookiesCategoriesNecessary: t('common:cookie-consent.modal.cookiesCategoriesNecessary'),
          cookiesCategoriesThirdParty: t('common:cookie-consent.modal.cookiesCategoriesThirdParty'),
          cookieCategoriesLabel: t('common:cookie-consent.modal.cookieCategoriesLabel'),
          currentSelectionLabel: t('common:cookie-consent.modal.currentSelectionLabel'),
          declineOptionalLabel: t('common:cookie-consent.modal.declineOptionalLabel'),
          description: t('common:cookie-consent.modal.description'),
          name: t('common:cookie-consent.modal.name'),
          readMoreHref: t('common:cookie-consent.modal.readMoreHref'),
          readMoreLabel: t('common:cookie-consent.modal.readMoreLabel'),
          externalLinkIconAriaLabel: t('common:external-link'),
          statisticsDescription: t('common:cookie-consent.modal.statisticsDescription'),
          title: t('common:cookie-consent.modal.title'),
        },
      }}
    >
      <Root />
    </CookieConsentProvider>
  );
};

export default RootWithCookieConsentProvider;
