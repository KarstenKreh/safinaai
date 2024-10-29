import { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import LottieAnimation from './LottieAnimation';

interface HeroProps {
  theme?: boolean;
  scrollToSection: (sectionId: string) => void;
}

const HeroComponent: React.FC<HeroProps> = ({ theme, scrollToSection }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LottieAnimation theme={theme} scrollToSection={scrollToSection} />
    </Suspense>
  );
};

export default HeroComponent; 