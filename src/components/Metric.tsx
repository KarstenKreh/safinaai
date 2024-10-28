import { useEffect, useRef } from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface MetricProps {
  prefix?: string;
  number: number;
  suffix: string;
}

export const Metric = ({ prefix = '... ', number, suffix }: MetricProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { count, setIsAnimating } = useCountUp(number);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsAnimating(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [setIsAnimating]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-lg">{prefix}</p>
      <p className="text-6xl font-bold text-teal-600 my-4">{count}</p>
      <p className="text-lg">{suffix}</p>
    </div>
  );
};
