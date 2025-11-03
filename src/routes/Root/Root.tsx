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
  NoteStack,
  useNoteStack,
} from '@jod/design-system';
import { JodOpenInNew } from '@jod/design-system/icons';
import { LangCode, langLabels, supportedLanguageCodes } from '@/i18n/config';
import { getLinkTo } from '@/utils/routeUtils';
import { Toaster } from '@/components/Toaster/Toaster';

const agents = {
  test: {
    fi: 'dea3919a-4f96-436e-a6bd-b24e4218da9f',
    sv: 'fdc65221-a280-48b3-9dbc-9dea053a9cb4',
    en: 'e78e5079-e789-4706-b0a2-e665eb87e7dd',
  },
  prod: {
    fi: '2c134474-326f-4456-9139-8e585a569a9a',
    sv: 'd41ea75b-628f-4420-9e4a-7431ffabb047',
    en: '37f50124-4dec-4cab-8bc6-f8d2ea5bfe21',
  },
};

const Root = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { addNote, removeNote } = useNoteStack();

  const hostname = window.location.hostname;
  const { siteId, agent } = React.useMemo(() => {
    if (hostname === 'osaamispolku.fi') {
      return { siteId: 36, agent: agents.prod[language as keyof typeof agents.prod] };
    } else if (hostname === 'jodtestaus.fi') {
      return { siteId: 38, agent: agents.test[language as keyof typeof agents.test] };
    } else {
      return { siteId: 37, agent: agents.test[language as keyof typeof agents.test] };
    }
  }, [hostname, language]);

  const moreInfoLinks = [
    { href: `/${language}/${t('slugs.about-service')}`, label: t('footer.more-info-links.about-service') },
    { href: `/${language}/${t('slugs.privacy-and-cookies')}`, label: t('footer.more-info-links.privacy-and-cookies') },
    { href: `/${language}/${t('slugs.data-sources')}`, label: t('footer.more-info-links.data-sources') },
    { href: `/${language}/${t('slugs.ai-usage')}`, label: t('footer.more-info-links.ai-usage') },
    { href: `/${language}/${t('slugs.accessibility')}`, label: t('footer.more-info-links.accessibility') },
  ];

  const [navMenuOpen, setNavMenuOpen] = React.useState(false);
  const [feedbackVisible, setFeedbackVisible] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const [visibleBetaFeedback, setVisibleBetaFeedback] = React.useState(true);

  React.useEffect(() => {
    if (visibleBetaFeedback) {
      addNote({
        title: t('beta.note.title'),
        description: t('beta.note.description'),
        ariaClose: t('note.close'),
        variant: 'feedback',
        onCloseClick: () => {
          setVisibleBetaFeedback(false);
          removeNote('beta-feedback');
        },
        readMoreComponent: (
          <Button
            size="sm"
            variant="white"
            label={t('beta.note.to-feedback')}
            icon={<JodOpenInNew ariaLabel={t('external-link')} />}
            iconSide="right"
            linkComponent={getLinkTo('https://link.webropolsurveys.com/S/F27EA876E86B2D74', {
              useAnchor: true,
              target: '_blank',
            })}
          />
        ),
        permanent: false,
        id: 'beta-feedback',
      });
    }
  }, [t, addNote, visibleBetaFeedback, removeNote]);

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
        />
        <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
        <NoteStack showAllText={t('show-all')} />
      </header>
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      <Outlet />
      <Chatbot
        agent={agent}
        language={language}
        header={t('chatbot.header')}
        openWindowText={t('chatbot.open-window-text')}
        agentName={t('chatbot.agent-name')}
        errorMessage={t('chatbot.error-message')}
        greeting={t('chatbot.greeting')}
        textInputPlaceholder={t('chatbot.text-input-placeholder')}
        waitingmessage={t('chatbot.waiting-message')}
        disclaimer={t('chatbot.disclaimer')}
      />
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
