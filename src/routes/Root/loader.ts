import { LoaderFunction, replace } from 'react-router';
import i18n, { resources, fallbackLng } from '@/i18n/config';
import { changeLanguage } from '@/features/navigation/lib/changeLanguage';
export default (async ({ params: { lng } }) => {
  // Redirect if the language is not supported
  if (lng && !Object.keys(resources).includes(lng)) {
    return replace(`/${fallbackLng}`);
  }

  // If the language is not set in localStorage, set it
  if (!window.localStorage.getItem('i18nextLng')) {
    window.localStorage.setItem('i18nextLng', lng ?? fallbackLng);
  }

  // Change language if it is different from the current language
  if (lng && lng !== i18n.language && Object.keys(resources).includes(lng)) {
    // Set language in localStorage when it is changed via URL
    if (window.localStorage.getItem('i18nextLng') !== lng) {
      changeLanguage(lng);
    }
    await i18n.changeLanguage(lng);
  }

  return null;
}) satisfies LoaderFunction;
