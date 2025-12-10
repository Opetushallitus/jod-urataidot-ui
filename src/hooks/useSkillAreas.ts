import { LangCode } from '@/i18n/config';
import { getContents } from '@/lib/content';
import { Content, SkillArea } from '@/lib/content-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that returns a list of skill areas from content with current version and language
 */
const useSkillAreas = (): SkillArea[] => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const versionInSession = globalThis.sessionStorage.getItem('content-version');
  const version = React.useMemo(() => (versionInSession ? Number(versionInSession) : null), [versionInSession]);

  const [content, setContent] = React.useState<Content | undefined>(() => {
    if (typeof version === 'number') {
      return getContents(t, language as LangCode)[version - 1];
    }
    return getContents(t, language as LangCode).at(-1);
  });

  React.useEffect(() => {
    if (typeof version === 'number') {
      setContent(getContents(t, language as LangCode)[version - 1]);
    } else {
      // If no version is specified, use latest
      setContent(getContents(t, language as LangCode).at(-1));
    }
  }, [version, t, language]);

  return content?.skillAreas ?? [];
};

export default useSkillAreas;
