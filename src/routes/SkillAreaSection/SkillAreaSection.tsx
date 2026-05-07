import { Navigate } from 'react-router';

import { Section } from '@/lib/content-types';

const SkillAreaSectionPage = ({ section }: { section: Section }) => {
  return <Navigate to={section.questions[0].id.toString()} replace />;
};

export default SkillAreaSectionPage;
