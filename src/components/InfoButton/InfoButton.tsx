import { Info } from '@/icons';
import { Modal } from '../Modal/Modal';
import React from 'react';

export const InfoButton = ({ buttonText, title, info }: { buttonText: string; title: string; info: string }) => {
  const [infoModalOpen, setInfoModalOpen] = React.useState(false);
  return (
    <button className="text-primary flex flex-row items-center gap-1" onClick={() => setInfoModalOpen(true)}>
      <Info />
      <p className="text-body-bold leading-none">{buttonText}</p>
      <Modal isOpen={infoModalOpen} close={() => setInfoModalOpen(false)} title={title}>
        <span>{info}</span>
      </Modal>
    </button>
  );
};
