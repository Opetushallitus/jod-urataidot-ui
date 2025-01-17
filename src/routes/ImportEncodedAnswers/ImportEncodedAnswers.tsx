import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Navigate, useSearchParams } from 'react-router';
import { useNavigate } from 'react-router';

const ImportEncodedAnswers = () => {
  const { t, i18n } = useTranslation();
  const setStateWithEncodedData = useCareerPlanningAnswersStore((state) => state.setStateWithEncodedData);
  const location = useLocation();
  const slicedHash = location.hash.slice(1, location.hash.length);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFromYksilo = searchParams.has('yksilo');

  React.useEffect(() => {
    if (slicedHash) {
      const { error } = setStateWithEncodedData(slicedHash);

      if (!error) {
        navigate({
          pathname: `/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`,
          search: searchParams.toString(),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if the location key is default we want to replace the entry with root to maintain proper navigation
  if (location.key === 'default') {
    window.history.replaceState(null, '', `/urataidot/${i18n.language}${isFromYksilo ? '?yksilo=' : ''}`);
  }

  return <Navigate to={{ pathname: `/urataidot/${i18n.language}`, search: searchParams.toString() }} />;
};

export default ImportEncodedAnswers;
