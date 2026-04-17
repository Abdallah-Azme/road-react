
import React, { useEffect, useState } from 'react';
import { SpinnerIcon } from './Icons';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Start fade out slightly before 3s to ensure smooth transition ending around 3s
    const timer = setTimeout(() => {
      setIsFading(true);
      // Wait for animation to finish before unmounting
      setTimeout(onFinish, 500); 
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-bg to-pale ${isFading ? 'animate-fade-out' : ''}`}>
      <div className="flex flex-col items-center gap-8">
        <img 
          src="https://raiyansoft.com/wp-content/uploads/2026/02/sg54.png" 
          alt="80road Logo" 
          className="w-40 h-auto animate-fade-in"
        />
        <SpinnerIcon className="w-8 h-8 text-navy animate-spin" />
      </div>
    </div>
  );
};

export default SplashScreen;
