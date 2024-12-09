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
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center sm:p-4">
        <DialogPanel className="relative w-full max-w-3xl space-y-4 rounded-2xl border bg-background p-4 shadow-xl sm:w-auto sm:p-6">
          <DialogTitle className="flex w-full items-center justify-between text-heading-3">
            {title}
            <CloseButton as={'button'}>
              <Close />
            </CloseButton>
          </DialogTitle>
          <Description as="div">{children}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
