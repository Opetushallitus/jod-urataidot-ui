import { Button, Modal } from '@/components';
import { DownloadPDFButton } from '@/features/pdf/components/DownloadPDFButton';
import { Exercise } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

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
  const [searchParams] = useSearchParams();

  return (
    <Modal title={t('exercises.ready-title')} isOpen={open} close={close}>
      <p className="max-w-[80ch]">{exercise.feedback}</p>
      <div className="mt-4 flex flex-col justify-center gap-2 sm:flex-row-reverse sm:justify-start">
        <DownloadPDFButton filename={exercise.title + '.pdf'} pdfDocument={document}>
          {t('exercises.download-as-pdf')}
        </DownloadPDFButton>
        <Button
          variant="simple"
          onClick={() =>
            key === 'default' ? navigate({ pathname: '/', search: searchParams.toString() }) : navigate(-1)
          }
        >
          {t('exercises.back-to-summary')}
        </Button>
      </div>
    </Modal>
  );
};
