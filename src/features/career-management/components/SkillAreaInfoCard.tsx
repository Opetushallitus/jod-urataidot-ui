import { SkillAreaIcon } from '@/components';
import { Modal } from '@/components';
import { Video } from '@/components/Video/Video';
import { useMediaQueries } from '@/hooks/useMediaQuery';
import { SkillArea } from '@/lib/content-types';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const SkillAreaInfoCard = ({ skillArea }: { skillArea: SkillArea }) => {
  const { xs } = useMediaQueries();
  const { t } = useTranslation();
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);

  return (
    <button
      className="flex flex-col items-center gap-4 rounded bg-white px-3 py-4 hover:bg-surface-hover sm:py-4"
      onClick={() => setInfoModalOpen(true)}
      aria-label={t('career-management.skill-area-info', { name: skillArea.name })}
    >
      <Modal isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} title={t(skillArea.name)}>
        <div className="flex flex-col gap-4">
          <span>{t(skillArea.info)}</span>
          <Video skillAreaId={skillArea.id} skillAreaName={skillArea.name} />
        </div>
      </Modal>
      <SkillAreaIcon section={skillArea.id} size={xs ? 'lg' : 'md'} />
      <h2 className="text-body-sm font-bold">{skillArea.name}</h2>
    </button>
  );
};

export default SkillAreaInfoCard;
