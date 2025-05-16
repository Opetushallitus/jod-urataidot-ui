import { ChevronDown } from '@/icons';
import { Disclosure, DisclosureButton, DisclosurePanel, Transition } from '@headlessui/react';
import React from 'react';

const Accordion = ({
  children,
  title,
  titleOpen,
  defaultOpen = false,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  titleOpen?: string;
  defaultOpen?: boolean;
  onClick?: (open: boolean) => void;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div>
          <DisclosureButton
            onClick={() => {
              if (onClick) onClick(!open);
            }}
            className="group peer text-primary flex w-full cursor-pointer items-center gap-1"
          >
            <span className="group-data-open:rotate-180">
              <ChevronDown />
            </span>
            <span className="text-body-bold leading-none">{open ? title : titleOpen}</span>
          </DisclosureButton>

          <div className="overflow-clip *:transition-all peer-data-open:*:mt-4">
            <Transition
              ref={ref}
              show={open}
              beforeEnter={() => {
                if (ref.current) {
                  ref.current.style.setProperty(`max-height`, `${ref.current.scrollHeight}px`);
                }
              }}
              beforeLeave={() => {
                if (ref.current) {
                  ref.current.style.setProperty(`max-height`, `0px`);
                }
              }}
              enterFrom="transform opacity-0 max-h-[0px]"
              enterTo="transform opacity-100 ease-in"
              leaveFrom="transform opacity-100"
              leaveTo="transform opacity-0 ease-out"
            >
              <DisclosurePanel static>{children}</DisclosurePanel>
            </Transition>
          </div>
        </div>
      )}
    </Disclosure>
  );
};

export default Accordion;
