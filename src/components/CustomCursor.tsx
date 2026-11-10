import React, { useEffect, useState, useRef } from 'react';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';

interface CustomCursorProps {
  enabled?: boolean;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ enabled = true }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [side, setSide] = useState<'umbrella' | 'murkoff'>('umbrella');
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use ref to avoid unnecessary re-renders during high-frequency mouse moves
  const isMouseDownRef = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    // Only apply on devices with fine pointer (mouse/trackpad), not touch
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      // Direct 1:1 hardware coordinate update
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check which half of the screen
      const screenMid = window.innerWidth / 2;
      const currentSide = e.clientX < screenMid ? 'umbrella' : 'murkoff';
      setSide(currentSide);

      // Check if hovering clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = Boolean(
          target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('textarea') ||
          target.closest('label')
        );
        setIsHoveringClickable(isClickable);
      }
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
      setIsMouseDown(true);
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      setIsMouseDown(false);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      {/* 
        Position cursor instantly at exact mouse coordinates with NO transition delay.
        This prevents coordinate lag and visual stutter that causes double-click sensations.
      */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: isMouseDown ? 'scale(0.96)' : 'scale(1)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        {side === 'umbrella' ? (
          /* =================== UMBRELLA CURSOR =================== */
          /* Elegant silver arrow pointer with smooth rotating umbrella logo at base */
          <div className="relative pointer-events-none">
            {/* Precision silver/white arrowhead */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] pointer-events-none"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="umbrellaSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#f1f5f9" />
                  <stop offset="100%" stopColor="#cbd5e1" />
                </linearGradient>
              </defs>
              <path
                d="M3 2L10 20L13.5 13.5L20 10L3 2Z"
                fill="url(#umbrellaSilverGrad)"
                stroke="#1e293b"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>

            {/* Rotating Umbrella logo at base of arrow */}
            <div
              className={`absolute left-3 top-3 pointer-events-none ${
                isHoveringClickable ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_4s_linear_infinite]'
              } drop-shadow-[0_1px_3px_rgba(225,29,72,0.35)]`}
              style={{ pointerEvents: 'none' }}
            >
              <UmbrellaLogo size={16} />
            </div>
          </div>
        ) : (
          /* =================== MURKOFF INNOCENT CHARITY CURSOR =================== */
          /* Clean, friendly silver arrow with subtle emerald tint and gentle rotating Murkoff seal at base */
          <div className="relative pointer-events-none">
            {/* Friendly precision silver/mint arrowhead matching Umbrella's elegance */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] pointer-events-none"
              style={{ pointerEvents: 'none' }}
            >
              <defs>
                <linearGradient id="murkoffSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="60%" stopColor="#ecfdf5" />
                  <stop offset="100%" stopColor="#bbf7d0" />
                </linearGradient>
              </defs>
              <path
                d="M3 2L10 20L13.5 13.5L20 10L3 2Z"
                fill="url(#murkoffSilverGrad)"
                stroke="#14341e"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>

            {/* Rotating Murkoff 1959 emblem at base of arrow - harmless, neat and authentic */}
            <div
              className={`absolute left-3 top-3 pointer-events-none ${
                isHoveringClickable ? 'animate-[spin_2s_linear_infinite]' : 'animate-[spin_4s_linear_infinite]'
              } drop-shadow-[0_1px_3px_rgba(130,226,158,0.4)]`}
              style={{ pointerEvents: 'none' }}
            >
              <MurkoffLogo size={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
