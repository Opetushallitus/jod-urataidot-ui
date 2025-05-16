import { LoaderFunction, replace } from 'react-router';
import i18n, { supportedLanguageCodes, LangCode, defaultLang } from '@/i18n/config';

export default (async ({ params: { lng } }) => {
  // Redirect if the language is not supported
  if (lng && !supportedLanguageCodes.includes(lng as LangCode)) {
    return replace(`/${defaultLang}`);
  }

  // Change language if it is different from the current language
  if (lng && lng !== i18n.language && supportedLanguageCodes.includes(lng as LangCode)) {
    await i18n.changeLanguage(lng);
  }

  return null;
}) satisfies LoaderFunction;
