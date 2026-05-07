import { CloseButton, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

import { Close } from '@/icons';

export const Modal = ({
  isOpen,
  close,
  title,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50" aria-label={title}>
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-5">
        <DialogPanel className="bg-background max-w-3xl rounded-2xl shadow-xl relative w-full space-y-5 border border-[#00000040] p-5 sm:w-auto sm:p-6">
          <DialogTitle className="flex w-full items-center justify-between text-heading-3">
            {title}
            <CloseButton as={'button'} className="cursor-pointer">
              <Close />
            </CloseButton>
          </DialogTitle>
          <Description as="div">{children}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
