// import { useState } from 'react';

interface EarlyAccessBannerProps {
  isDarkTheme: boolean;
}

export const EarlyAccessBanner = ({ isDarkTheme }: EarlyAccessBannerProps) => {
  return (
    <div className={isDarkTheme ? 'dark-theme' : 'light-theme'}>
      {/* Your component JSX */}
    </div>
  );
}; 