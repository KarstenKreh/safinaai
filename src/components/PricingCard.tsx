import React from 'react';
import { useInView } from '../hooks/useInView';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  plan: {
    name: string;
    price: string | number;
    features: string[];
    popular?: boolean;
  };
  isDarkTheme: boolean;
  isAnnualBilling: boolean;
  getDisplayPrice: (price: string | number) => [string, string];
  delay?: number;
}

export function PricingCard({ plan, isDarkTheme, isAnnualBilling, getDisplayPrice, delay = 0 }: PricingCardProps) {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`fade-in-up ${isInView ? 'visible' : ''} ${
        isDarkTheme ? 'bg-gray-800' : 'bg-white'
      } rounded-2xl shadow-lg p-6 ${plan.popular ? 'ring-2 ring-teal-600' : ''}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {plan.popular && (
        <span className="bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </span>
      )}
      <h3 className={`text-xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'} mt-4`}>
        {plan.name}
      </h3>
      <div className="mt-4 flex items-baseline">
        {plan.price !== 'Request' ? (
          <>
            <span className="text-3xl font-bold">{getDisplayPrice(plan.price)[0]}</span>
            <span className="text-lg">.{getDisplayPrice(plan.price)[1]}</span>
            <span className="ml-1 text-xl">€</span>
            <span className="ml-1 text-gray-500 text-base">/month</span>
          </>
        ) : (
          <button
            onClick={() => window.location.href = 'mailto:support@safinaai.com'}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-400 transition-colors"
          >
            Request
          </button>
        )}
      </div>
      {isAnnualBilling && plan.price !== 'Request' && (
        <p className="text-sm text-green-600 mt-2">
          Save 20% with annual billing
        </p>
      )}
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
            <span 
              className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'} text-sm`}
              dangerouslySetInnerHTML={{ __html: feature }}
            ></span>
          </li>
        ))}
      </ul>
    </div>
  );
}
