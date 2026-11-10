import React from 'react';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { HeartHandshake, Sparkles } from 'lucide-react';

interface HeaderProps {
  splitMode?: 'split' | 'umbrella' | 'murkoff';
  onSplitChange?: (mode: 'split' | 'umbrella' | 'murkoff') => void;
  onOpenVolunteerModal: () => void;
  onOpenSecretTerminal: () => void;
  onOpenQuizModal: () => void;
  onUmbrellaClick?: () => void;
  onMurkoffClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenVolunteerModal,
  onOpenQuizModal,
  onUmbrellaClick,
  onMurkoffClick,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4 h-16">
          {/* Зона 1: Двойной логотип корпораций */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onUmbrellaClick}
              className="flex items-center gap-1.5 group text-left cursor-pointer"
              title="Международный Фонд Umbrella (Часть ритуала Амелии)"
            >
              <UmbrellaLogo size={26} className="transition-transform group-hover:rotate-45" />
              <span className="font-display font-bold text-stone-900 tracking-tight text-xs sm:text-base">
                Umbrella
              </span>
            </button>
            <span className="text-stone-300 font-light text-base">|</span>
            <button
              type="button"
              onClick={onMurkoffClick}
              className="flex items-center gap-1.5 group text-left cursor-pointer"
              title="Благотворительный Фонд Murkoff (Часть ритуала Амелии)"
            >
              <MurkoffLogo size={30} className="transition-transform group-hover:scale-105" />
              <span className="font-display font-bold text-[#1a3821] tracking-tight text-xs sm:text-base">
                Murkoff
              </span>
            </button>
          </div>

          {/* Зона 2: Навигация (скрыта на мобильных для предотвращения переполнения) */}
          <nav className="hidden xl:flex items-center gap-5 text-xs sm:text-sm font-medium text-stone-600">
            <a href="#initiatives" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Программы
            </a>
            <a href="#testimonials" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Отзывы
            </a>
            <button
              type="button"
              onClick={onOpenQuizModal}
              className="hover:text-stone-900 transition-colors whitespace-nowrap flex items-center gap-1 text-stone-700 font-medium"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#5bbd78]" />
              <span>Тест</span>
            </button>
            <a href="#volunteer-section" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Анкета
            </a>
            <a href="#contacts" className="hover:text-stone-900 transition-colors whitespace-nowrap">
              Контакты
            </a>
          </nav>

          {/* Зона 3: Главное целевое действие */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenVolunteerModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
            >
              <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#82e29e]" />
              <span className="hidden sm:inline">Подать заявление</span>
              <span className="sm:hidden">Анкета</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
