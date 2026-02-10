import { Toast } from '@jod/design-system';
import { Toast as ReactHotToast, useToaster } from 'react-hot-toast/headless';
import { createPortal } from 'react-dom';
import './toaster.css';

type SafeToast = Omit<ReactHotToast, 'message'> & { message: string };

export const Toaster = () => {
  const { toasts, handlers } = useToaster({ duration: 4000 });
  const { startPause, endPause } = handlers;
  const safeToasts = toasts.filter((toast): toast is SafeToast => typeof toast.message === 'string');
  // Header 48px + 16px padding = 64px
  // Service bar 40px when open, 4px when closed (scrollY > 0)
  // Margin to edges is 32px according to design
  const topClass = window.scrollY > 0 ? 'top-[100px]' : 'top-[136px]';

  const toasterContent = (
    <div
      role="alert"
      className={`fixed ${topClass} right-7 z-100 flex flex-col gap-4`}
      onMouseEnter={startPause}
      onMouseLeave={endPause}
    >
      {safeToasts
        .filter((toast) => toast.visible)
        .map((toast) => (
          <div key={toast.id} className="toast-in">
            <Toast text={toast.message} variant={toast.type === 'error' ? 'error' : 'success'} />
          </div>
        ))}
    </div>
  );

  // Render inside dialog if it exists (when nav menu is open)
  const dialogElement = document.querySelector('dialog[open]');

  if (dialogElement) {
    return createPortal(toasterContent, dialogElement);
  }

  return toasterContent;
};
