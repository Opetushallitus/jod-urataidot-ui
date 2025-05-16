import { Section } from '@/lib/content-types';
import { Navigate } from 'react-router';

const SkillAreaSectionPage = ({ section }: { section: Section }) => {
  return <Navigate to={section.questions[0].id.toString()} replace />;
};

export default SkillAreaSectionPage;
