import React from 'react';
import { NavMenu, FeedbackModal } from '@/components';
import { useTranslation } from 'react-i18next';
import { Link, Outlet, ScrollRestoration } from 'react-router';
import {
  Button,
  Chatbot,
  Footer,
  LanguageButton,
  MatomoTracker,
  MenuButton,
  NavigationBar,
  useNoteStack,
} from '@jod/design-system';
import { JodOpenInNew } from '@jod/design-system/icons';
import { LangCode, langLabels, supportedLanguageCodes } from '@/i18n/config';
import { getLinkTo } from '@/utils/routeUtils';
import { Toaster } from '@/components/Toaster/Toaster';

const useAddBetaFeedbackNote = () => {
  const { t } = useTranslation();
  const { addTemporaryNote } = useNoteStack();

  React.useEffect(() => {
    addTemporaryNote(() => ({
      id: 'beta-feedback-note',
      title: t('beta.note.title'),
      description: t('beta.note.description'),
      variant: 'feedback',
      readMoreComponent: (
        <Button
          size="sm"
          variant="white"
          label={t('beta.note.to-feedback')}
          icon={<JodOpenInNew ariaLabel={t('external-link')} />}
          iconSide="right"
          linkComponent={getLinkTo('https://link.webropolsurveys.com/S/8AF8E63BF83D39FE', {
            useAnchor: true,
            target: '_blank',
          })}
          className="whitespace-nowrap"
        />
      ),
      isCollapsed: false,
    }));
  }, [addTemporaryNote, t]);
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
    { href: `/${language}/${t('slugs.about-service')}`, label: t('footer.more-info-links.about-service') },
    { href: `/${language}/${t('slugs.privacy-and-cookies')}`, label: t('footer.more-info-links.privacy-and-cookies') },
    { href: `/${language}/${t('slugs.data-sources')}`, label: t('footer.more-info-links.data-sources') },
    { href: `/${language}/${t('slugs.ai-usage')}`, label: t('footer.more-info-links.ai-usage') },
    { href: `/${language}/${t('slugs.accessibility')}`, label: t('footer.more-info-links.accessibility') },
  ];

  const [navMenuOpen, setNavMenuOpen] = React.useState(false);
  const [feedbackVisible, setFeedbackVisible] = React.useState(false);

  useAddBetaFeedbackNote();

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <div className="bg-bg-gray flex min-h-screen flex-col">
      <title>{t('common.app-name')}</title>
      <link rel="manifest" href={`/manifest-${language}.json`} crossOrigin="use-credentials" />
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar
          logo={{ to: `/${language}`, language, srText: t('osaamispolku') }}
          menuComponent={<MenuButton onClick={() => setNavMenuOpen(!navMenuOpen)} label={t('menu')} />}
          languageButtonComponent={
            <LanguageButton
              serviceVariant="yksilo"
              testId="language-button"
              language={language as LangCode}
              supportedLanguageCodes={supportedLanguageCodes}
              generateLocalizedPath={(lng: string) => `/${lng}`}
              linkComponent={Link}
              translations={{
                fi: { change: 'Vaihda kieli.', label: langLabels.fi },
                sv: { change: 'Andra språk.', label: langLabels.sv },
                en: { change: 'Change language.', label: langLabels.en },
              }}
            />
          }
          renderLink={({ to, className, children }) => (
            <Link to={to} className={className}>
              {children as React.ReactNode}
            </Link>
          )}
          serviceBarVariant="yksilo"
          serviceBarTitle={t('my-competence-path')}
          translations={{
            versionLabel: t('version'),
            showAllNotesLabel: t('show-all'),
            ariaLabelCloseNote: t('note.close'),
          }}
        />
        <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
      </header>
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      <Outlet />
      <Chatbot />
      <Footer
        language={language}
        okmLabel={t('footer.logos.okm-label')}
        temLabel={t('footer.logos.tem-label')}
        ophLabel={t('footer.logos.oph-label')}
        kehaLabel={t('footer.logos.keha-label')}
        cooperationTitle={t('footer.cooperation-title')}
        fundingTitle={t('footer.funding-title')}
        moreInfoTitle={t('footer.more-info-title')}
        moreInfoDescription={t('footer.more-info-description')}
        moreInfoLinks={moreInfoLinks}
        feedbackTitle={t('footer.feedback-title')}
        feedbackContent={t('footer.feedback-content')}
        feedbackButtonLabel={t('footer.feedback-button-label')}
        feedbackOnClick={() => setFeedbackVisible(true)}
        feedbackBgImageClassName="bg-[url(@/../assets/feedback.jpg)] bg-cover bg-[50%_50%]"
        copyright={t('footer.copyright')}
        externalLinkIconAriaLabel={t('external-link')}
        testId="footer"
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

export default Root;
