import { SkillAreaID } from '@/lib/content-types';
import { useTranslation } from 'react-i18next';

export const Video = ({ skillAreaId, skillAreaName }: { skillAreaId: SkillAreaID; skillAreaName: string }) => {
  const { t, i18n } = useTranslation();

  const videoLanguage = ['fi', 'en', 'sv'].includes(i18n.language) ? i18n.language : 'en';
  const posterSrc = `/urataidot/videos/placeholders/${videoLanguage}_${skillAreaId}.png`;
  const videoSrc = `/urataidot/videos/${videoLanguage}_${skillAreaId}.mp4`;

  return (
    // Videos already have open captions in them
    // eslint-disable-next-line jsx-a11y/media-has-caption
    <video
      className="w-full rounded-md"
      controls
      preload="metadata"
      poster={posterSrc}
      aria-label={t('career-management.skillarea-video-label', { name: skillAreaName })}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};
