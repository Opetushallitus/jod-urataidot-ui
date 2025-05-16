import { Close } from '@/icons';
import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

export const BottomDrawer = ({
  isOpen,
  close,
  title,
  children,
  showCloseButton = true,
}: {
  isOpen: boolean;
  close: () => void;
  title: string;
  children: React.ReactNode;
  showCloseButton?: boolean;
}) => {
  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel className="bg-background absolute bottom-5 w-screen space-y-5 rounded-2xl border border-[#00000040] p-5 shadow-xl">
          <DialogTitle className="flex w-full items-center justify-between pt-5 font-bold">
            {title}
            {showCloseButton && (
              <CloseButton as={'button'}>
                <Close />
              </CloseButton>
            )}
          </DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
