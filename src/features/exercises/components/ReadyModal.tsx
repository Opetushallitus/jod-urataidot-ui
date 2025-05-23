import { JSX } from 'react/jsx-runtime';
import { Button, Modal } from '@/components';
import { DownloadPDFButton } from '@/features/pdf/components/DownloadPDFButton';
import { Exercise } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

export const ReadyModal = ({
  open,
  close,
  document,
  exercise,
}: {
  open: boolean;
  close: () => void;
  document: JSX.Element;
  exercise: Exercise;
}) => {
  const { t } = useTranslation();
  const { key } = useLocation();
  const navigate = useNavigate();

  return (
    <Modal title={t('exercises.ready-title')} isOpen={open} close={close}>
      <p className="max-w-[80ch]">{exercise.feedback}</p>
      <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row-reverse sm:justify-start">
        <DownloadPDFButton filename={exercise.title + '.pdf'} pdfDocument={document}>
          {t('exercises.download-as-pdf')}
        </DownloadPDFButton>
        <Button variant="simple" onClick={() => (key === 'default' ? navigate('/') : navigate(-1))} className="w-fit">
          {t('exercises.back-to-summary')}
        </Button>
      </div>
    </Modal>
  );
};
