import { useCareerPlanAnswersStore } from '@/stores/careerPlanAnswersStore';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, Navigate } from 'react-router';
import { useNavigate } from 'react-router';

const ImportEncodedAnswers = () => {
  const { t, i18n } = useTranslation();
  const setStateWithEncodedData = useCareerPlanAnswersStore((state) => state.setStateWithEncodedData);
  const location = useLocation();
  const slicedHash = location.hash.slice(1, location.hash.length);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const { error } = await setStateWithEncodedData(slicedHash);
      if (!error) {
        navigate(`/${i18n.language}/${t('slugs.career-plan')}`);
      }
    };
    if (slicedHash) {
      /* eslint-disable-next-line no-console */
      getData().catch(console.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if the location key is default we want to replace the entry with root to maintain proper navigation
  if (location.key === 'default') {
    window.history.replaceState(null, '', `/${i18n.language}`);
  }
  return <Navigate to={`/${i18n.language}`} />;
};

export default ImportEncodedAnswers;
