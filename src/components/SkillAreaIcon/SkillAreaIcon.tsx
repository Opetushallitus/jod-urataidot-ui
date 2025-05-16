import { cx } from 'cva';
import { SkillAreaID } from '@/lib/content-types';

import {
  IconKnowYourself,
  IconInteraction,
  IconYourFuture,
  IconCompetenceIdentity,
  IconOperationalEnvironment,
  IconOperationalEnvironmentFuture,
} from '@/icons';

const Icon = ({ id, width, x }: { id: SkillAreaID; width: string; x: string }) => {
  switch (id) {
    case 'know-yourself':
      return <IconKnowYourself width={width} x={x} />;
    case 'ready-for-change':
      return <IconYourFuture width={width} x={x} />;
    case 'competence-first':
      return <IconCompetenceIdentity width={width} x={x} />;
    case 'world-around-you':
      return <IconOperationalEnvironment width={width} x={x} />;
    case 'together-ahead':
      return <IconInteraction width={width} x={x} />;
    case 'anticipate-the-future':
      return <IconOperationalEnvironmentFuture width={width} x={x} />;
  }
};

export interface SkillAreaIconProps {
  section: SkillAreaID;
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
  className?: string;
}

export const SkillAreaIcon = ({ size, section, className }: SkillAreaIconProps) => {
  const iconSize = cx({
    'size-7': size === 'xs',
    'size-10': size === 'sm',
    'size-11': size === 'md',
    'size-[100px]': size === 'lg',
    'size-[120px]': size === 'xl',
  });

  const fillColor = cx({
    'fill-visualization-sky': section === 'world-around-you',
    'fill-visualization-blue': section === 'together-ahead',
    'fill-visualization-peach': section === 'know-yourself',
    'fill-visualization-orange': section === 'competence-first',
    'fill-visualization-turquoise': section === 'anticipate-the-future',
    'fill-visualization-pink': section === 'ready-for-change',
  });

  return (
    <svg className={cx(iconSize, 'aspect-square fill-transparent', className)} viewBox={`0 0 100 100`}>
      <circle className={cx(fillColor, '')} cx="50" cy="50" r="50" />
      <Icon id={section} width="56%" x="22%" />
    </svg>
  );
};

SkillAreaIcon.displayName = 'SkillAreaIcon';
