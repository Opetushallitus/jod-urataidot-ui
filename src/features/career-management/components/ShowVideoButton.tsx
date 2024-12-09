import { Info } from '@/icons';
import { useState } from 'react';
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
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <button className="flex flex-row items-center gap-1 text-primary" onClick={() => setInfoModalOpen(true)}>
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