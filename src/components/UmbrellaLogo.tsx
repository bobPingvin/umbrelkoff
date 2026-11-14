import React from 'react';

interface UmbrellaLogoProps {
  className?: string;
  size?: number;
}

export const UmbrellaLogo: React.FC<UmbrellaLogoProps> = ({ className = '', size = 32 }) => {
  // Center coordinates and geometric radius
  const cx = 50;
  const cy = 50;
  const rTip = 47;
  const rCtrl = 34; // Control radius to create the inward concave curve of umbrella canopy

  // 8 scalloped umbrella segments (4 red, 4 white)
  // Rotated with an additional dynamic offset so it has a natural, non-orthogonal angle
  const segments = [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
    const angleMidDeg = 90 - 45 - i * 45;
    const angleStartDeg = angleMidDeg + 22.5;
    const angleEndDeg = angleMidDeg - 22.5;

    const toRad = (deg: number) => (deg * Math.PI) / 180;

    const x1 = cx + rTip * Math.cos(toRad(angleStartDeg));
    const y1 = cy - rTip * Math.sin(toRad(angleStartDeg));

    const x2 = cx + rTip * Math.cos(toRad(angleEndDeg));
    const y2 = cy - rTip * Math.sin(toRad(angleEndDeg));

    const cpX = cx + rCtrl * Math.cos(toRad(angleMidDeg));
    const cpY = cy - rCtrl * Math.sin(toRad(angleMidDeg));

    const isRed = i % 2 === 0;

    // Path: from center -> to Tip1 -> concave curve via control point to Tip2 -> back to center -> close
    const d = `M ${cx} ${cy} L ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2} Z`;

    return {
      d,
      fill: isRed ? '#990000' : '#ffffff',
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block shrink-0 drop-shadow-sm select-none transition-transform ${className}`}
      aria-label="Официальный зубчатый зонтичный логотип Umbrella Corporation"
    >
      {segments.map((seg, idx) => (
        <path
          key={idx}
          d={seg.d}
          fill={seg.fill}
          stroke="#111111"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
      {/* Central rib pin */}
      <circle cx={cx} cy={cy} r="1.5" fill="#111111" />
    </svg>
  );
};
