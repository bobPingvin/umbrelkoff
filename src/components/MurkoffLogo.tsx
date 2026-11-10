import React from 'react';

interface MurkoffLogoProps {
  className?: string;
  size?: number;
}

export const MurkoffLogo: React.FC<MurkoffLogoProps> = ({ className = '', size = 38 }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden bg-black ring-1 ring-[#82e29e]/60 shadow-sm transition-transform ${className}`}
      aria-label="Официальный логотип Murkoff Corporation 1959 (The Outlast Trials)"
    >
      <img
        src="/assets/aistudio/MurkoffCorporationLogoTrials_fdda3560.webp"
        alt="Murkoff Corporation 1959 Official Logo"
        className="w-full h-full object-cover select-none scale-105"
        loading="eager"
      />
    </div>
  );
};
