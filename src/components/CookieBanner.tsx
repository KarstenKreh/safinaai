import { useState, useEffect } from 'react';
import posthog from '../utils/posthog';

interface CookieBannerProps {
  isDarkTheme: boolean;
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

export const CookieBanner = ({ isDarkTheme, isVisible, setIsVisible }: CookieBannerProps) => {
  useEffect(() => {
    // Check if user has already made a cookie choice
    const cookieChoice = localStorage.getItem('cookieChoice');
    if (!cookieChoice) {
      setIsVisible(true);
    }
    
    // If they previously accepted all cookies, enable PostHog
    if (cookieChoice === 'all') {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }, [setIsVisible]);

  const handleAllowAll = () => {
    localStorage.setItem('cookieChoice', 'all');
    posthog.opt_in_capturing();
    setIsVisible(false);
  };

  const handleAllowNecessary = () => {
    localStorage.setItem('cookieChoice', 'necessary');
    posthog.opt_out_capturing();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 ${
        isDarkTheme ? 'bg-gray-800' : 'bg-white'
      } border-t ${
        isDarkTheme ? 'border-gray-700' : 'border-gray-200'
      } shadow-lg`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm flex-1">
          <p className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
            We use cookies to enhance your browsing experience and analyze our traffic. 
            By clicking "Allow all", you consent to our use of cookies. 
            To learn more, please visit our{' '}
            <a 
              href="/privacy-policy" 
              className="text-teal-600 hover:text-teal-500 underline"
            >
              Privacy Policy
            </a>. You can always adjust your cookie preferences using the Cookie Settings link in the footer.
          </p>
        </div>
        <div className="flex gap-4 flex-shrink-0">
          <button
            onClick={handleAllowNecessary}
            className={`px-4 py-2 rounded text-sm font-medium whitespace-nowrap ${
              isDarkTheme 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Allow necessary
          </button>
          <button
            onClick={handleAllowAll}
            className="px-4 py-2 rounded text-sm font-medium whitespace-nowrap bg-teal-600 hover:bg-teal-700 text-white"
          >
            Allow all
          </button>
        </div>
      </div>
    </div>
  );
}; 