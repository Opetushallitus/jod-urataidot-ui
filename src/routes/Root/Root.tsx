import React from 'react';
import { LanguageButton, NavMenu, FeedbackModal } from '@/components';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, Outlet, ScrollRestoration } from 'react-router';
import { Footer, MatomoTracker, NavigationBar } from '@jod/design-system';
import { useMenuClickHandler } from '@/hooks/useMenuClickHandler';
import { JodMenu } from '@jod/design-system/icons';

const Root = () => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const hostname = window.location.hostname;
  const siteId = React.useMemo(() => {
    if (hostname === 'localhost' || hostname === 'jodkehitys.fi') {
      return 37;
    } else if (hostname === 'jodtestaus.fi') {
      return 38;
    } else if (hostname === 'osaamispolku.fi') {
      return 36;
    }
  }, [hostname]);

  const infoSlug = t('slugs.basic-information');
  const moreInfoLinks = [
    {
      to: `${t('slugs.user-guide.index')}/${t('slugs.user-guide.what-is-the-service')}`,
      label: t('about-us'),
    },
    {
      to: `${infoSlug}/${t('slugs.privacy-policy')}`,
      label: t('privacy-policy-and-cookies'),
    },
    {
      to: `${infoSlug}/${t('slugs.data-sources')}`,
      label: t('data-sources'),
    },
    {
      to: `${infoSlug}/${t('slugs.about-ai')}`,
      label: t('about-ai'),
    },
    {
      to: `${infoSlug}/${t('slugs.accessibility-statement')}`,
      label: t('accessibility-statement'),
    },
  ];

  const [navMenuOpen, setNavMenuOpen] = React.useState(false);
  const [feedbackVisible, setFeedbackVisible] = React.useState(false);

  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const langMenuButtonRef = React.useRef<HTMLLIElement>(null);
  const langMenuRef = useMenuClickHandler(() => setLangMenuOpen(false), langMenuButtonRef);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (langMenuRef.current && !langMenuRef.current.contains(event.relatedTarget as Node)) {
      setLangMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  return (
    <div className="bg-bg-gray flex min-h-screen flex-col">
      <title>{t('common.app-name')}</title>
      <header role="banner" className="sticky top-0 z-50 print:hidden">
        <NavigationBar
          logo={{ to: `/${language}`, language, srText: t('osaamispolku') }}
          menuComponent={
            <button
              onClick={() => setNavMenuOpen(!navMenuOpen)}
              aria-label={t('open-menu')}
              className="flex cursor-pointer items-center justify-center gap-2 select-none"
            >
              <span className="flex size-7 items-center justify-center">
                <JodMenu size={24} />
              </span>
              <span className="py-3 pr-2">{t('menu')}</span>
            </button>
          }
          languageButtonComponent={
            <LanguageButton
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              langMenuOpen={langMenuOpen}
              menuRef={langMenuRef}
              onMenuBlur={handleBlur}
              onMenuClick={() => setLangMenuOpen(false)}
            />
          }
          refs={{ langMenuButtonRef: langMenuButtonRef }}
          renderLink={({ to, className, children }) => (
            <Link to={to} className={className}>
              {children as React.ReactNode}
            </Link>
          )}
        />
        <div id="progress-bar" className="absolute -bottom-1 left-0 hidden h-1 w-full sm:block"></div>
      </header>
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
      <Outlet />
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
        MoreInfoLinkComponent={NavLink}
        feedbackTitle={t('footer.feedback-title')}
        feedbackContent={t('footer.feedback-content')}
        feedbackButtonLabel={t('footer.feedback-button-label')}
        feedbackOnClick={() => setFeedbackVisible(true)}
        feedbackBgImageClassName="bg-[url(@/../assets/home-1.avif)] bg-cover bg-[length:auto_auto] sm:bg-[length:auto_1000px] bg-[top_-0rem_right_-0rem] sm:bg-[top_-21rem_right_0rem]"
        copyright={t('copyright')}
      />
      <FeedbackModal isOpen={feedbackVisible} onClose={() => setFeedbackVisible(false)} />
      <ScrollRestoration
        getKey={(location) => {
          return location.pathname;
        }}
      />
      {siteId && (
        <MatomoTracker trackerUrl="https://analytiikka.opintopolku.fi" siteId={siteId} pathname={location.pathname} />
      )}
    </div>
  );
};

export default Root;
