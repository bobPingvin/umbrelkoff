import React, { useState } from 'react';
import { UMBRELLA_PROGRAMS, MURKOFF_PROGRAMS } from '../data/mockData';
import { CharityProgram } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { ProgramModal } from './ProgramModal';
import { MapPin, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ProgramsGridProps {
  onApplyForProgram: (program: CharityProgram) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onApplyForProgram }) => {
  const [selectedProgram, setSelectedProgram] = useState<CharityProgram | null>(null);

  return (
    <section id="initiatives" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ЧАСТЬ: ПРОГРАММЫ UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ================= */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col justify-between">
          <div>
            {/* Заголовок секции Umbrella */}
            <div className="mb-8 pb-5 border-b border-stone-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <UmbrellaLogo size={42} />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
                      Медико-Биологический Сектор
                    </h2>
                    <span className="text-xs text-rose-700 font-medium">
                      Превентивное здоровье и клеточная защита
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-stone-400 hidden sm:block">
                  Отдел био-этики №4
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Все программы финансируются попечительским советом клиники им. Озвелла Спенсера. Обеспечиваем полное бесплатное медицинское сопровождение.
              </p>
            </div>

            {/* Карточки программ Umbrella */}
            <div className="space-y-5">
              {UMBRELLA_PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className="bg-stone-50 rounded-xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all group hover:border-rose-400"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 group-hover:text-rose-700 transition-colors">
                      {program.title}
                    </h3>
                    <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      Мест: {program.spotsLeft}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mb-3 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span className="truncate">{program.location}</span>
                  </div>

                  <div className="pt-3 border-t border-stone-200/80 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProgram(program)}
                      className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1"
                    >
                      <span>Подробнее об условиях</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onApplyForProgram(program)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors"
                    >
                      Подать заявку
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================= ПРАВАЯ ЧАСТЬ: ПРОГРАММЫ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 murkoff-swamp-bg text-stone-100 flex flex-col justify-between">
          <div>
            {/* Заголовок секции Murkoff */}
            <div className="mb-8 pb-5 border-b border-[#1f3825]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MurkoffLogo size={42} className="ring-2 ring-[#82e29e]" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                      Программы Поддержки и Заботы
                    </h2>
                    <span className="text-xs text-[#82e29e] font-medium font-mono">
                      Комплексная адаптация и реабилитация · Проект Тенева 2
                    </span>
                  </div>
                </div>
                <div className="text-xs font-mono text-stone-300 hidden sm:block">
                  Совет д-ра Истермана
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                Комплексная забота о душевном благополучии, тёплый кров и поддержка. Полное бесплатное обеспечение комфортабельным проживанием в санатории Синьявского, сбалансированным питанием и вниманием наставников.
              </p>
            </div>

            {/* Карточки программ Murkoff */}
            <div className="space-y-5">
              {MURKOFF_PROGRAMS.map((program) => (
                <div
                  key={program.id}
                  className="murkoff-card-bg rounded-xl border border-[#24462c] p-5 sm:p-6 shadow-md hover:shadow-xl transition-all group hover:border-[#82e29e]"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-[#82e29e] transition-colors">
                      {program.title}
                    </h3>
                    <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-[#102416] text-[#82e29e] border border-[#2d5236] font-bold">
                      Мест: {program.spotsLeft}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 mb-3 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs text-stone-300 mb-4 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#82e29e] shrink-0" />
                    <span className="truncate">{program.location}</span>
                  </div>

                  <div className="pt-3 border-t border-[#1f3825] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProgram(program)}
                      className="text-xs font-semibold text-[#82e29e] hover:text-[#bbf7d0] transition-colors flex items-center gap-1 font-mono"
                    >
                      <span>Подробнее о программе</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onApplyForProgram(program)}
                      className="murkoff-btn-lightgreen px-3.5 py-1.5 text-xs font-bold rounded-md transition-all shadow-xs"
                    >
                      Подать заявку
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно деталей программы */}
      <ProgramModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
        onApply={(prog) => onApplyForProgram(prog)}
      />
    </section>
  );
};
