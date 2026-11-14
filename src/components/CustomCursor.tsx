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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    document.body.classList.add('has-custom-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      const screenMid = window.innerWidth / 2;
      setSide(e.clientX < screenMid ? 'umbrella' : 'murkoff');

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

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

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
  }, [enabled]);

  if (!enabled || !isVisible) return null;

  const isUmbrella = side === 'umbrella';

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    >
      <div
        className="absolute pointer-events-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: isMouseDown ? 'scale(0.94)' : 'scale(1)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      >
        <div className="relative pointer-events-none">
          {/* Точная серебристо-белая стрелка курсора */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block drop-shadow-[0_2px_4px_rgba(0,0,0,0.32)] pointer-events-none"
            style={{ pointerEvents: 'none' }}
          >
            <defs>
              <linearGradient id="umbrellaSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#f1f5f9" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
              <linearGradient id="murkoffSilverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#ecfdf5" />
                <stop offset="100%" stopColor="#bbf7d0" />
              </linearGradient>
            </defs>
            <path
              d="M3 2L10 20L13.5 13.5L20 10L3 2Z"
              fill={isUmbrella ? 'url(#umbrellaSilverGrad)' : 'url(#murkoffSilverGrad)'}
              stroke={isUmbrella ? '#1e293b' : '#14341e'}
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>

          {/* Аккуратное декоративное кольцо и логотип с идеальным вращением вокруг геометрического центра */}
          <div
            className={`absolute left-[11px] top-[11px] w-7 h-7 flex items-center justify-center pointer-events-none transition-transform duration-200 ${
              isHoveringClickable ? 'scale-110' : 'scale-100'
            }`}
          >
            {/* Тонкое встречно-вращающееся орбитальное обрамление (спокойный фирменный декор) */}
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              className="absolute inset-0 m-auto block animate-[spin_10s_linear_infinite_reverse] pointer-events-none"
            >
              <circle
                cx="13"
                cy="13"
                r="11"
                stroke={isUmbrella ? 'rgba(225, 29, 72, 0.28)' : 'rgba(130, 226, 158, 0.35)'}
                strokeWidth="0.9"
              />
              <circle
                cx="13"
                cy="13"
                r="11"
                stroke={isUmbrella ? 'rgba(225, 29, 72, 0.7)' : 'rgba(130, 226, 158, 0.8)'}
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeDasharray="10 59"
              />
              <circle
                cx="13"
                cy="2"
                r="1.2"
                fill={isUmbrella ? '#e11d48' : '#82e29e'}
              />
            </svg>

            {/* Точный квадратный 16x16 контейнер без строчного смещения — вращение строго вокруг центра */}
            <div className="w-4 h-4 flex items-center justify-center leading-none origin-center animate-[spin_6s_linear_infinite] pointer-events-none">
              {isUmbrella ? (
                <UmbrellaLogo size={16} className="block drop-shadow-none transition-none" />
              ) : (
                <MurkoffLogo size={16} className="block shadow-none transition-none" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
