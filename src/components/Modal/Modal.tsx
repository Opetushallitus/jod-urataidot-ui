import { Close } from '@/icons';
import { CloseButton, Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

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
        <DialogPanel className="bg-background relative w-full max-w-3xl space-y-5 rounded-2xl border border-[#00000040] p-5 shadow-xl sm:w-auto sm:p-6">
          <DialogTitle className="text-heading-3 flex w-full items-center justify-between">
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
