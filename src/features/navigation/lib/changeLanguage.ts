import i18n from '@/i18n/config';
import { t } from 'i18next';

export const changeLanguage = (nextLanguage: string) => {
  const slugs = i18n.getResource(i18n.language, 'translation', 'slugs') as Record<string, string>;
  const currentPathname = window.location.pathname.split('/').filter(Boolean).slice(2);

  i18n
    .changeLanguage(nextLanguage)
    .then(() => {
      // If coming from a link, the nextLanguage will be same as the current language
      if (nextLanguage === i18n.language) {
        // Still might have the wrong language in localStorage
        if (window.localStorage.getItem('i18nextLng') !== nextLanguage) {
          window.localStorage.setItem('i18nextLng', nextLanguage);
        }
        // Reload to get the correct content for new language
        window.location.reload();
        return;
      }

      const newPathname = `/urataidot/${nextLanguage}/${currentPathname
        .map((slug) =>
          Number(slug)
            ? Number(slug)
            : t(`slugs.${Object.keys(slugs).find((s) => slugs[s] === slug)}`, { lng: nextLanguage }),
        )
        .join('/')}`;
      localStorage.setItem('i18nextLng', nextLanguage);
      window.location.href = newPathname;
    })
    .catch((error) => {
      console.error(error);
    });
};
