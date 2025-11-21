import { SkillAreaIcon } from '@/components';
import { Modal } from '@/components';
import { Video } from '@/components/Video/Video';
import { useMediaQueries } from '@jod/design-system';
import { SkillArea } from '@/lib/content-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SkillAreaInfoCard = ({ skillArea }: { skillArea: SkillArea }) => {
  const { sm } = useMediaQueries();
  const { t } = useTranslation();
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);

  return (
    <button
      className="hover:bg-surface-hover flex cursor-pointer flex-col items-center gap-5 rounded-sm bg-white px-4 py-5"
      onClick={() => setInfoModalOpen(true)}
      aria-label={t('career-management.skill-area-info', { name: skillArea.name })}
    >
      <Modal isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} title={skillArea.name}>
        <div className="flex flex-col gap-5">
          <span>{skillArea.info}</span>
          <Video skillAreaId={skillArea.id} skillAreaName={skillArea.name} />
        </div>
      </Modal>
      <SkillAreaIcon section={skillArea.id} size={sm ? 'lg' : 'md'} />
      <h2 className="text-body-sm font-bold">{skillArea.name}</h2>
    </button>
  );
};

export default SkillAreaInfoCard;
