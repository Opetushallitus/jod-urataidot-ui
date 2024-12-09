import { ArrowLeft } from '@/icons';
import { Button } from '../Button/Button';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

export const BackButton = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Button
      onClick={() => (location.key === 'default' ? navigate('/') : navigate(-1))}
      variant="plain"
      icon={<ArrowLeft />}
      iconSide="left"
    >
      {t('components.button.back')}
    </Button>
  );
};
