import { useCareerPlanningAnswersStore } from '@/stores/careerPlanningAnswersStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Navigate } from 'react-router';
import { useNavigate } from 'react-router';

const ImportEncodedAnswers = () => {
  const { t, i18n } = useTranslation();
  const setStateWithEncodedData = useCareerPlanningAnswersStore((state) => state.setStateWithEncodedData);
  const location = useLocation();
  const slicedHash = location.hash.slice(1, location.hash.length);

  const navigate = useNavigate();

  React.useEffect(() => {
    if (slicedHash) {
      const { error } = setStateWithEncodedData(slicedHash);

      if (!error) {
        navigate(`/${i18n.language}/${t('slugs.career-management')}/${t('slugs.summary')}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if the location key is default we want to replace the entry with root to maintain proper navigation
  if (location.key === 'default') {
    window.history.replaceState(null, '', `/urataidot/${i18n.language}`);
  }

  return <Navigate to={`/urataidot/${i18n.language}`} />;
};

export default ImportEncodedAnswers;
