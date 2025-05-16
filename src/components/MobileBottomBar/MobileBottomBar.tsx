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
          className="bg-background-dark fixed bottom-0 z-50 w-full border-t border-[#00000040] pt-3 sm:hidden"
        >
          <div className="mt-3 mb-6 flex h-full w-full items-center justify-center">{children}</div>
          <div id="mobile-progress-bar" className="absolute top-0 left-0 h-2 w-full sm:hidden"></div>
        </div>,
        document.body,
      )}
    </div>
  );
};

export default MobileBottomBar;
