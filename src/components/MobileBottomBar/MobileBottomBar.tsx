import { createPortal } from 'react-dom';

/**
 * Renders a mobile bottom bar and takes up space to not overlap content.
 * Should be used at the bottom of a page.
 */
export const MobileBottomBar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-20">
      {createPortal(
        <div
          role="navigation"
          aria-label="Mobile bottom navigation"
          className="fixed bottom-0 z-50 w-full border-t bg-background-dark pt-2 sm:hidden"
        >
          <div className="mb-6 mt-2 flex h-full w-full items-center justify-center">{children}</div>
          <div id="mobile-progress-bar" className="absolute left-0 top-0 h-1 w-full sm:hidden"></div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default MobileBottomBar;
