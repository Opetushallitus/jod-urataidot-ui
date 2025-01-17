import { SkillArea, SkillAreaID, SkillAreaIDValues } from '@/lib/content-types';
import { Card, SkillAreaIcon } from '..';
import { useTranslation } from 'react-i18next';
import { calcHexPath, calcStatPath, calculateCirclePoint } from './helpers';
import { Popover, PopoverPanel } from '@headlessui/react';
import React from 'react';
import { cx } from 'cva';

export type TotalScoreRecord = Record<SkillAreaID, number | undefined>;
type TimeoutRecord = Partial<Record<SkillAreaID, NodeJS.Timeout>>;

const tooltipPositions = {
  'know-yourself': cx('absolute top-[20%] left-[50%]'),
  'competence-first': cx('absolute top-[40%] left-[84.5%]'),
  'ready-for-change': cx('absolute top-[80%] left-[84.5%]'),
  'world-around-you': cx('absolute top-[100%] left-[50%]'),
  'together-ahead': cx('absolute top-[80%] left-[15.5%]'),
  'anticipate-the-future': cx('absolute top-[40%] left-[15.5%]'),
};

export const SpiderDiagram = ({
  skillAreas,
  totalScores,
}: {
  skillAreas: Pick<SkillArea, 'id' | 'name'>[];
  totalScores: TotalScoreRecord;
}) => {
  const { t } = useTranslation();
  const [shownPopovers, setShownPopovers] = React.useState<SkillAreaID[]>([]);
  const [popoverTimeouts, setPopoverTimeouts] = React.useState<TimeoutRecord>({});

  // everything is scaled based on the view box so i can use the
  // configured text sizes and adjust the viewbox so they look right
  const viewBox = 450;
  const dotSize = viewBox / 100;

  // On mobile if section icons are clicked show a tooltip
  const removePopover = (skillAreaId: SkillAreaID) => {
    return (currentPopovers: SkillAreaID[]) => currentPopovers.filter((s) => s !== skillAreaId);
  };

  const showToolTip = (skillAreaId: SkillAreaID) => {
    if (shownPopovers.includes(skillAreaId)) {
      setShownPopovers(removePopover(skillAreaId)(shownPopovers));

      // cancel the previous timeout if icon is pressed again
      clearTimeout(popoverTimeouts[skillAreaId]);
      setPopoverTimeouts({ ...popoverTimeouts, [skillAreaId]: undefined });
    } else {
      setShownPopovers([...shownPopovers.filter((s) => s !== skillAreaId), skillAreaId]);

      const timeoutRef = setTimeout(() => setShownPopovers(removePopover(skillAreaId)), 3000);

      // save timeout ref if we want to reclick, idk if redundant
      setPopoverTimeouts({ ...popoverTimeouts, [skillAreaId]: timeoutRef });
    }
  };

  const offsetX = 0;
  return (
    <Card>
      <h2 className="text-heading-3">{t('components.spider.title')}</h2>

      <div className="relative max-h-[600px] w-full">
        <div className="pointer-events-none absolute left-1/2 z-10 h-full w-full max-w-[600px] -translate-x-1/2">
          {skillAreas.map((skillArea) => {
            return (
              <Popover className={cx(tooltipPositions[skillArea.id], 'absolute')} key={`${skillArea.id}-popover`}>
                <PopoverPanel static>
                  {shownPopovers.includes(skillArea.id) && (
                    <div
                      className={cx(
                        'absolute -translate-x-1/2 rounded-lg bg-black p-2 text-center font-display text-body-sm text-white',
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
                      {skillArea.name}
                    </div>
                  )}
                </PopoverPanel>
              </Popover>
            );
          })}
        </div>

        <svg
          className="pointer-events-auto relative z-0 aspect-square max-h-[600px] w-full fill-transparent @container"
          viewBox={`0 -${viewBox * 0.14} ${viewBox} ${viewBox * 1.25}`}
        >
          <g className="stroke-neutral-3 stroke-1">
            <path d={calcHexPath(viewBox, (viewBox / 26) * 10)} />
            <path d={calcHexPath(viewBox, (viewBox / 26) * 8)} />
            <path d={calcHexPath(viewBox, (viewBox / 26) * 6)} />
            <path d={calcHexPath(viewBox, (viewBox / 26) * 4)} />
            <path d={calcHexPath(viewBox, (viewBox / 26) * 2)} />
          </g>

          <path
            className="stroke-primary stroke-2 sm:w-1/2"
            d={calcStatPath(
              viewBox,
              SkillAreaIDValues.map((section) => {
                const sectionScore = totalScores[section];
                return (((sectionScore !== undefined ? sectionScore + 0.5 : 0) * viewBox) / 3.5 / 26) * 10;
              }),
            )}
          />

          <g className="fill-primary">
            {SkillAreaIDValues.map((section, i) => {
              const sectionScore = totalScores[section];

              const { x, y } = calculateCirclePoint(
                viewBox,
                (((sectionScore !== undefined ? sectionScore + 0.5 : 0) * viewBox) / 3.5 / 26) * 10,
                i,
              );

              return <circle r={dotSize} cx={x} cy={y} key={section}></circle>;
            })}
          </g>

          <g className={`flex aspect-square @5xl:hidden`}>
            {SkillAreaIDValues.map((section, i) => {
              const { x, y } = calculateCirclePoint(viewBox, viewBox / 2 - 2, i);
              const iconSize = viewBox / 7;

              return (
                <svg key={section} width={iconSize} height={iconSize} x={x - iconSize / 2} y={y - iconSize / 2}>
                  <SkillAreaIcon section={section} />
                  <rect x="0" y="0" width={iconSize} height={iconSize} onClick={() => showToolTip(section)} />
                </svg>
              );
            })}
          </g>

          <g className="hidden @5xl:flex">
            {SkillAreaIDValues.map((section, i) => {
              const { x, y } = calculateCirclePoint(viewBox, viewBox / 2 - 2, i);
              const iconSize = viewBox / 10;

              const getTextOffset = () => {
                switch (i) {
                  case 1:
                  case 2:
                    return 100;
                  case 4:
                  case 5:
                    return -100;
                  default:
                    return 0;
                }
              };

              return (
                <g key={section}>
                  <svg
                    width={iconSize}
                    height={iconSize}
                    x={x - iconSize / 2 + getTextOffset()}
                    y={y - iconSize / 2 - 10}
                    className={`aspect-square`}
                  >
                    <SkillAreaIcon section={section} />
                  </svg>
                  <text
                    textAnchor="middle"
                    x={x + getTextOffset()}
                    y={y + iconSize - 10}
                    style={{ fill: 'black' }}
                    className="justify-center py-4 font-display text-body-sm-bold"
                  >
                    {skillAreas.find((a) => a.id === section)?.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </Card>
  );
};

SpiderDiagram.displayName = 'SpiderDiagram';
