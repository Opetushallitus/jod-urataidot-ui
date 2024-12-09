import { Close } from '@/icons';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Button } from '..';
import { useTranslation } from 'react-i18next';

export const Drawer = ({
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
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50" transition>
      <DialogBackdrop transition className="fixed inset-0 bg-black/30 duration-150 ease-out data-[closed]:opacity-0" />
      <div className="fixed inset-0 flex w-screen items-center justify-center">
        <DialogPanel
          transition
          className="absolute left-0 h-dvh w-[353px] max-w-full rounded-r-xl border bg-white p-8 shadow-xl duration-150 ease-in data-[closed]:-translate-x-full"
        >
          <DialogTitle className="mb-4 flex w-full items-center justify-between text-heading-3 font-bold">
            <>
              {title}
              <Button aria-label={t('common.close')} onClick={() => close()} icon={<Close />} variant="simple">
                {''}
              </Button>
            </>
          </DialogTitle>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
};
