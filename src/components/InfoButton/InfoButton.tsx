import { Info } from '@/icons';
import { Modal } from '../Modal/Modal';
import { useState } from 'react';

export const InfoButton = ({ buttonText, title, info }: { buttonText: string; title: string; info: string }) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  return (
    <button className="flex flex-row items-center gap-1 text-primary" onClick={() => setInfoModalOpen(true)}>
      <Info />
      <p className="text-body-bold leading-none">{buttonText}</p>
      <Modal isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} title={title}>
        <span>{info}</span>
      </Modal>
    </button>
  );
};
