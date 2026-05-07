import React from 'react';
import { useTranslation } from 'react-i18next';

import { Modal } from '@/components';
import { Video } from '@/components/Video/Video';
import { Info } from '@/icons';
import { SkillAreaID } from '@/lib/content-types';

export const ShowVideoButton = ({
  title,
  skillAreaId,
  skillAreaName,
}: {
  title: string;
  skillAreaId: SkillAreaID;
  skillAreaName: string;
}) => {
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);
  const { t } = useTranslation();
  return (
    <button
      className="text-primary flex cursor-pointer flex-row items-center gap-1 hover:underline"
      onClick={() => setInfoModalOpen(true)}
    >
      <Info />
      <p className="text-body-bold leading-none">{t('career-management.show-video-button-text')}</p>
      <Modal isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} title={title}>
        <div className="flex flex-col gap-4">
          <Video skillAreaId={skillAreaId} skillAreaName={skillAreaName} />
        </div>
      </Modal>
    </button>
  );
};
