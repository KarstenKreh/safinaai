import React from 'react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isDarkTheme: boolean;
}

export function Feature({ icon, title, description, isDarkTheme }: FeatureProps) {
  return (
    <div className={`flex flex-col items-start text-left p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${isDarkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-teal-100">
        <div className="text-teal-500">{icon}</div>
      </div>
      <h3 className={`mb-2 text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={isDarkTheme ? 'text-gray-300' : 'text-gray-600'}>{description}</p>
    </div>
  );
}
