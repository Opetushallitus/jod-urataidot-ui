import React, { forwardRef } from 'react';
import { t } from 'i18next';
import { Popover, PopoverPanel } from '@headlessui/react';
import { cx } from 'cva';

type SliderProps = {
  /** Override for visible slider texts */
  leftText?: string;
  rightText?: string;
  /** Override for text values, default is 0-3 from not at all to fully */
  valueTexts?: string[];
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  ({ leftText, rightText, valueTexts, ...rest }: SliderProps, ref) => {
    const innerRef = React.useRef<HTMLInputElement>(null);
    const [focused, setFocused] = React.useState(false);
    React.useImperativeHandle(ref, () => innerRef.current!, []);

    const timeoutRef = React.useRef<NodeJS.Timeout>(null);

    const getInitialValue = () => {
      if (typeof innerRef.current?.valueAsNumber === 'number') {
        return innerRef.current.valueAsNumber;
      }
      if (typeof rest.defaultValue !== 'undefined') {
        return Number(rest.defaultValue);
      }
      return 2;
    };

    // eslint-disable-next-line react-hooks/refs
    const [value, setValue] = React.useState(getInitialValue);

    const defaultTextValues = [
      t('components.slider.not-at-all'),
      t('components.slider.somewhat'),
      t('components.slider.very-much'),
      t('components.slider.fully'),
    ];

    const handleChange = () => {
      if (innerRef.current) {
        setValue(innerRef.current.valueAsNumber);
      }
    };

    const setFocus = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setFocused(true);
      timeoutRef.current = setTimeout(() => {
        setFocused(false);
      }, 3000);
    };

    const progressClassName = () => {
      switch (value) {
        case 0:
          return 'w-0';
        case 1:
          return 'w-1/3';
        case 2:
          return 'w-2/3';
        case 3:
          return 'w-full';
        default:
          return '';
      }
    };

    return (
      <div className="text-body w-full">
        <div aria-hidden className="font-display text-body-md mb-4 flex flex-row justify-between gap-5">
          <div>{leftText ?? t('components.slider.not-at-all')}</div>
          <div className="text-right">{rightText ?? t('components.slider.fully')}</div>
        </div>
        <div className="outline-primary relative flex h-8 w-full min-w-[160px] items-center rounded-full bg-white [&:has(:focus-visible)]:outline">
          {/* Blue progress bar */}
          <div
            aria-hidden
            className="bg-neutral-5 pointer-events-none absolute right-4 left-4 z-10 flex items-center justify-between rounded-full"
          >
            <div className={`bg-primary h-[6px] rounded-full ${progressClassName()}`} />
          </div>
          {/* Ticks */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between rounded-full px-5"
          >
            <TickWithTooltip show={focused && value === 0} className="bg-primary-muted size-2 rounded-full">
              {valueTexts?.[0] ?? defaultTextValues[0]}
            </TickWithTooltip>
            <TickWithTooltip
              show={focused && value === 1}
              className={`size-2 rounded-full ${value > 1 ? 'bg-primary-muted' : 'bg-primary-light'}`}
            >
              {valueTexts?.[1] ?? defaultTextValues[1]}
            </TickWithTooltip>
            <TickWithTooltip
              show={focused && value === 2}
              className={`size-2 rounded-full ${value > 2 ? 'bg-primary-muted' : 'bg-primary-light'}`}
            >
              {valueTexts?.[2] ?? defaultTextValues[2]}
            </TickWithTooltip>
            <TickWithTooltip show={focused && value === 3} className="bg-primary-light size-2 rounded-full">
              {valueTexts?.[3] ?? defaultTextValues[3]}
            </TickWithTooltip>
          </div>
          <input
            type="range"
            ref={innerRef}
            aria-valuetext={valueTexts?.[value] ?? defaultTextValues[value]}
            {...rest}
            onChange={(e) => {
              setFocus();
              rest.onChange?.(e);
              handleChange();
            }}
            onFocus={() => setFocus()}
            onDrag={() => setFocus()}
            onTouchStart={() => setFocus()}
            onTouchMove={() => setFocus()}
            className="slider-thumb:h-5 slider-thumb:w-5 slider-thumb:appearance-none slider-thumb:rounded-full slider-thumb:bg-primary absolute z-20 flex h-8 w-full cursor-pointer appearance-none rounded-full bg-transparent px-3 outline-hidden"
            min={0}
            max={3}
            step={1}
          />
        </div>
      </div>
    );
  },
);

const TickWithTooltip = ({
  children,
  show,
  className,
}: {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = React.useState(0);
  const [boundingRect, setBoundingRect] = React.useState<DOMRect>();

  React.useLayoutEffect(() => {
    if (ref.current && !boundingRect) {
      setBoundingRect(ref.current.getBoundingClientRect());
    }
    if (ref.current && boundingRect) {
      if (boundingRect.x < 0) {
        setOffsetX(-1 * boundingRect.x);
      } else if (boundingRect.x + boundingRect.width > window.innerWidth) {
        setOffsetX(window.innerWidth - boundingRect.x - boundingRect.width);
      } else {
        setOffsetX(0);
      }
    }
  }, [show, boundingRect]);

  return (
    <Popover>
      <div className={className} aria-hidden />
      <PopoverPanel static>
        {show && (
          <div
            ref={ref}
            className={cx(
              'font-display text-body-sm absolute top-7 -translate-x-1/2 rounded-md bg-black p-3 text-white',
              offsetX > 0 && 'left-0 translate-x-0',
              offsetX < 0 && 'right-0 translate-x-0',
            )}
          >
            <div
              className={cx(
                'absolute -top-1 -translate-x-1/2',
                offsetX > 0 && 'left-4',
                offsetX < 0 && 'right-2',
                offsetX === 0 && 'left-1/2',
              )}
            >
              <svg width="10" height="5" viewBox="0 0 10 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.20001 5.00005C1.05001 5.00005 0.929179 4.95005 0.837512 4.85005C0.745846 4.75005 0.700012 4.63338 0.700012 4.50005C0.700012 4.46672 0.750012 4.35005 0.850012 4.15005L4.47501 0.525049C4.55835 0.441716 4.64168 0.383382 4.72501 0.350049C4.80835 0.316715 4.90001 0.300049 5.00001 0.300049C5.10001 0.300049 5.19168 0.316715 5.27501 0.350049C5.35835 0.383382 5.44168 0.441716 5.52501 0.525049L9.15001 4.15005C9.20001 4.20005 9.23751 4.25422 9.26251 4.31255C9.28751 4.37088 9.30001 4.43338 9.30001 4.50005C9.30001 4.63338 9.25418 4.75005 9.16251 4.85005C9.07085 4.95005 8.95001 5.00005 8.80001 5.00005H1.20001Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="text-center">{children}</div>
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};

Slider.displayName = 'Slider';
