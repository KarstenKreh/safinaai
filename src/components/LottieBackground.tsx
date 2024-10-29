import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

interface LottieBackgroundProps {
  animationData: any;
}

const LottieBackground: React.FC<LottieBackgroundProps> = ({ animationData }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });
    }
  }, [animationData]);

  return <div ref={containerRef} className="absolute inset-0 z-0"></div>;
};

export default LottieBackground; 