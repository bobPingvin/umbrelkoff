import React from 'react';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { ShieldCheck, Radio } from 'lucide-react';

interface HeroSplitProps {
  splitMode: 'split' | 'umbrella' | 'murkoff';
  onSelectCorpForVolunteer: (corp: 'umbrella' | 'murkoff') => void;
  onOpenQuiz: () => void;
}

export const HeroSplit: React.FC<HeroSplitProps> = ({
  splitMode,
  onSelectCorpForVolunteer,
  onOpenQuiz,
}) => {
  const umbrellaWidthClass =
    splitMode === 'umbrella'
      ? 'lg:w-[80%]'
      : splitMode === 'murkoff'
      ? 'lg:w-[20%]'
      : 'lg:w-1/2';

  const murkoffWidthClass =
    splitMode === 'murkoff'
      ? 'lg:w-[80%]'
      : splitMode === 'umbrella'
      ? 'lg:w-[20%]'
      : 'lg:w-1/2';

  return (
    <section className="relative overflow-hidden border-b border-stone-200">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[700px] transition-all duration-500 ease-in-out">
        {/* ===================== ЛЕВАЯ ПОЛОВИНА: UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ===================== */}
        <div
          className={`${umbrellaWidthClass} transition-all duration-500 ease-in-out bg-white border-b lg:border-b-0 lg:border-r border-stone-200 p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden`}
        >
          {/* Фоновый мягкий оттенок */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Верхняя панель Umbrella */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <UmbrellaLogo size={58} />
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-rose-700 block">
                  Международный Гуманитарный Фонд
                </span>
                <span className="font-display text-lg font-bold text-stone-900 tracking-tight">
                  Здоровье и Жизнь Umbrella
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-500">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              <span>Основан в 1968 г.</span>
            </div>
          </div>

          {/* Основной контент Umbrella (выровненный по высоте с Murkoff) */}
          <div className="space-y-4 my-auto">
            {/* Блок цитаты Umbrella (зеркально по высоте блоку Murkoff) */}
            <div className="p-4 sm:p-5 rounded-xl bg-white border-2 border-rose-200 shadow-sm">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-stone-900 tracking-tight text-balance leading-tight">
                «Наше призвание — сама жизнь.{' '}
                <span className="text-rose-600 underline decoration-rose-300 underline-offset-4">
                  Забота о здоровье
                </span>{' '}
                каждого гражданина».
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">
                Передовая клеточная медицина, превентивная вакцинация и клеточное долголетие для всех.
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              В партнёрстве с клиникой им. Озвелла Спенсера мы открываем двери для всех, кто ищет физического совершенства и защиты от любых инфекций в комфортабельных условиях стационара.
            </p>

            {/* Карточка с фото клиники */}
            <div className="pt-2 mt-auto">
              <div className="relative rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-white group">
                <div className="aspect-16/9 w-full overflow-hidden">
                  <img
                    src="/src/assets/images/umbrella_charity_hero_1794192792824.jpg"
                    alt="Дружелюбный медицинский центр фонда Umbrella в Раккун-Сити"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-3 bg-white/95 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-medium text-stone-800">
                    Медицинский центр св. Марии в Раккун-Сити
                  </span>
                  <span className="text-rose-600 font-medium">Бесплатный био-скрининг</span>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="mt-8 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onSelectCorpForVolunteer('umbrella')}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all hover:shadow"
            >
              Записаться в программу Umbrella
            </button>
            <a
              href="#initiatives"
              className="px-4 py-2.5 text-xs sm:text-sm font-medium text-stone-700 hover:text-stone-900 bg-white hover:bg-stone-50 rounded-lg border border-stone-200 transition-colors"
            >
              Изучить медицинские гранты
            </a>
          </div>
        </div>

        {/* ===================== ПРАВАЯ ПОЛОВИНА: MURKOFF (ТЁМНО-ЗЕЛЁНЫЙ, БОЛОТНО-ЗЕЛЁНЫЙ С ШУМОМ) ===================== */}
        <div
          className={`${murkoffWidthClass} transition-all duration-500 ease-in-out murkoff-swamp-bg text-stone-100 p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden`}
        >
          {/* Болотное свечение */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Верхняя панель Murkoff */}
          <div className="flex items-center justify-between gap-4 mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <MurkoffLogo size={58} className="ring-2 ring-[#82e29e]" />
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#82e29e] block font-mono">
                  Гуманитарная Миссия Перерождения · 1959 г.
                </span>
                <span className="font-display text-lg font-bold text-white tracking-tight">
                  Корпорация Murkoff
                </span>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-300 font-mono">
              <Radio className="w-3.5 h-3.5 text-[#82e29e] animate-pulse" />
              <span>Проект Тенева 2</span>
            </div>
          </div>

          {/* Основной контент Murkoff */}
          <div className="space-y-4 my-auto relative z-10">
            {/* Цитата из Outlast Trials на болотно-зелёной карточке с шумом */}
            <div className="p-4 sm:p-5 rounded-xl murkoff-card-bg border-2 border-[#24462c] shadow-xl shadow-black/40">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight text-balance leading-tight">
                «Вы потеряны? Одиноки? Бедны? Озадачены?{' '}
                <span className="text-[#82e29e] drop-shadow-[0_0_14px_rgba(130,226,158,0.4)] underline decoration-[#82e29e]/60 underline-offset-4">
                  ВЫ НУЖНЫ НАМ!!!
                </span>»
              </h1>
              <p className="text-xs sm:text-sm text-stone-200 mt-2 font-medium">
                Программа социальной поддержки и психологической адаптации. Мы помогаем каждому человеку преодолеть кризис и начать жизнь с чистого листа.
              </p>
            </div>

            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Если вы столкнулись с трудностями, потерей работы или одиночеством, двери Murkoff всегда открыты. В нашем загородном оздоровительном комплексе Синьявского мы предоставляем комфортабельный пансион, оздоровительные фито-процедуры, уроки добродетели от Матушки Футтерман и надёжную защиту со стороны дружины офицера Койла.
            </p>

            {/* Фото гостиной испытаний */}
            <div className="pt-2 mt-auto">
              <div className="relative rounded-xl overflow-hidden border border-[#24462c] shadow-md murkoff-card-bg group">
                <div className="aspect-16/9 w-full overflow-hidden relative">
                  <img
                    src="/src/assets/images/murkoff_care_hero_1794192792477.jpg"
                    alt="Уютная комната психологической поддержки фонда Murkoff"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#060e08]/30 pointer-events-none mix-blend-color" />
                </div>
                <div className="p-3 bg-[#0a160d] border-t border-[#1f3825] flex items-center justify-between text-xs text-stone-300">
                  <span className="font-medium text-white">
                    Гостиная социально-оздоровительного корпуса (Санаторий Синьявского)
                  </span>
                  <span className="text-[#82e29e] font-mono font-semibold">Круглосуточный приём</span>
                </div>
              </div>
            </div>
          </div>

          {/* Кнопки действий: светло-зелёные (не салатовые) с текстурой шума */}
          <div className="mt-8 pt-4 border-t border-[#1f3825] flex flex-wrap items-center gap-3 relative z-10">
            <button
              type="button"
              onClick={() => onSelectCorpForVolunteer('murkoff')}
              className="murkoff-btn-lightgreen px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg shadow-md transition-all hover:scale-[1.02]"
            >
              Обрести семью в Murkoff
            </button>
            <button
              type="button"
              onClick={onOpenQuiz}
              className="murkoff-btn-secondary px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-colors"
            >
              Пройти тест: Какая программа вам подходит?
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
