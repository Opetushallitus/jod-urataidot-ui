import { Info } from '@/icons';
import React from 'react';
import { SkillAreaID } from '@/lib/content-types';
import { Modal } from '@/components';
import { useTranslation } from 'react-i18next';
import { Video } from '@/components/Video/Video';

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
    <button className="text-primary flex flex-row items-center gap-1" onClick={() => setInfoModalOpen(true)}>
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
