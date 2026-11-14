import React from 'react';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';

interface HeaderProps {
  splitMode?: 'split' | 'umbrella' | 'murkoff';
  onSplitChange?: (mode: 'split' | 'umbrella' | 'murkoff') => void;
  onOpenVolunteerModal: () => void;
  onOpenSecretTerminal: () => void;
  onOpenQuizModal?: () => void;
  onUmbrellaClick?: () => void;
  onMurkoffClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVolunteerModal,
  onUmbrellaClick,
  onMurkoffClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-2xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Логотипы фондов */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onUmbrellaClick}
              className="flex items-center gap-1.5 group text-left cursor-pointer"
              title="Благотворительный Фонд Umbrella"
            >
              <UmbrellaLogo size={26} className="transition-transform group-hover:rotate-45" />
              <span className="font-display font-bold text-stone-900 tracking-tight text-sm sm:text-base">
                Umbrella
              </span>
            </button>
            <span className="text-stone-300 font-light text-base">|</span>
            <button
              type="button"
              onClick={onMurkoffClick}
              className="flex items-center gap-1.5 group text-left cursor-pointer"
              title="Благотворительный Фонд Murkoff"
            >
              <MurkoffLogo size={30} className="transition-transform group-hover:scale-105" />
              <span className="font-display font-bold text-[#1a3821] tracking-tight text-sm sm:text-base">
                Murkoff
              </span>
            </button>
          </div>

          {/* Простая навигация (минимум пунктов) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <a href="#initiatives" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Программы
            </a>
            <a href="#news" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Новости
            </a>
            <a href="#testimonials" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Отзывы
            </a>
            <a href="#contacts" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Контакты
            </a>
          </nav>

          {/* Главная кнопка действия */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={onOpenVolunteerModal}
              className="inline-flex items-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Подать заявление</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
