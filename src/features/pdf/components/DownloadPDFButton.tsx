import { Button } from '@/components';
import type ReactPDF from '@react-pdf/renderer';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const DownloadPDFButton = ({
  pdfDocument,
  filename,
  children,
}: {
  pdfDocument: React.ReactElement<ReactPDF.DocumentProps, string>;
  filename: string;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildAndDownloadPDF = async () => {
    setLoading(true);

    try {
      const { pdf } = await import('@react-pdf/renderer');
      const createdBlob = await pdf(pdfDocument).toBlob();
      const url = URL.createObjectURL(createdBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
    } catch (e) {
      setError((e as Error).message);
    }

    setLoading(false);
  };

  return (
    <Button
      loading={loading}
      className="w-fit"
      onClick={() => {
        void (async () => {
          await buildAndDownloadPDF();
        })();
      }}
      disabled={!!error}
    >
      {error ? t('pdf.something-went-wrong') : children}
    </Button>
  );
};
