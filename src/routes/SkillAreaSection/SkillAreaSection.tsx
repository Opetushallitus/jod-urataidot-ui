import { Section } from '@/lib/content-types';
import { Navigate, useSearchParams } from 'react-router';

const SkillAreaSectionPage = ({ section }: { section: Section }) => {
  const [searchParams] = useSearchParams();
  return <Navigate to={{ pathname: section.questions[0].id.toString(), search: searchParams.toString() }} replace />;
};

export default SkillAreaSectionPage;
