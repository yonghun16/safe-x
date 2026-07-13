import React from 'react';
import { Shield } from '../components/ui/Icons';

const SplashScreen: React.FC = () => {
  return (
    <div className="splash-screen">
      <div className="splash-logo-container">
        <Shield />
      </div>
      <h1 className="splash-title">위험제보</h1>
      <p className="splash-subtitle">더 안전한 내일을 위한 제보 플랫폼</p>
      
      <div className="splash-loading">
        <span className="loading-dot" />
        <span className="loading-dot" />
        <span className="loading-dot" />
      </div>
    </div>
  );
};

export default SplashScreen;
