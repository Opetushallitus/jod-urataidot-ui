import { LangCode } from '@/i18n/config';
import { getContents } from '@/lib/content';
import { Content, SkillArea } from '@/lib/content-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook that returns a list of skill areas from content with current version and language
 */
const useSkillAreas = (): SkillArea[] => {
  const { t, i18n } = useTranslation();
  const language = i18n.language as LangCode;
  const contentRef = React.useRef<Content>(getContents(t, language).slice(-1)[0]);
  const versionInSession = window.sessionStorage.getItem('content-version');
  const version = React.useMemo(() => (versionInSession ? Number(versionInSession) : null), [versionInSession]);

  React.useEffect(() => {
    if (typeof version === 'number') {
      contentRef.current = getContents(t, language)[version - 1];
    } else {
      // If no version is specified, use latest
      contentRef.current = getContents(t, language).slice(-1)[0];
    }
  }, [version, t, language]);

  return contentRef.current?.skillAreas ? contentRef.current.skillAreas : [];
};

export default useSkillAreas;
