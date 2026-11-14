import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UMBRELLA_PROGRAMS, MURKOFF_PROGRAMS } from '../data/mockData';
import { CharityProgram } from '../types';
import { ProgramModal } from './ProgramModal';
import { scrollRevealProps } from './Reveal';
import { ChevronRight } from 'lucide-react';

interface ProgramsGridProps {
  onApplyForProgram: (program: CharityProgram) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({ onApplyForProgram }) => {
  const [selectedProgram, setSelectedProgram] = useState<CharityProgram | null>(null);

  return (
    <section id="initiatives" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ЧАСТЬ: ПРОГРАММЫ UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col">
          {/* Заголовок секции Umbrella */}
          <motion.div
            {...scrollRevealProps({ y: 16 })}
            className="mb-5 pb-4 border-b border-stone-200"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-stone-900 tracking-tight">
                  Медико-Биологический Сектор
                </h2>
                <span className="text-xs text-rose-700 font-medium">
                  Превентивное здоровье и клеточная защита
                </span>
              </div>
              <div className="text-xs font-mono text-stone-400 hidden sm:block">
                Отдел био-этики №4
              </div>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Все программы финансируются попечительским советом клиники им. Озвелла Спенсера. Обеспечиваем полное бесплатное медицинское сопровождение.
            </p>
          </motion.div>

          {/* Карточки программ Umbrella */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {UMBRELLA_PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.id}
                {...scrollRevealProps({ delay: idx * 0.06, duration: 0.55, y: 18 })}
                className="bg-stone-50 rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs hover:shadow-md transition-[border-color,box-shadow] group hover:border-rose-400 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-display font-bold text-base text-stone-900 group-hover:text-rose-700 transition-colors">
                      {program.title}
                    </h3>
                    <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-semibold">
                      Мест: {program.spotsLeft}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 mb-2.5 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="text-xs text-stone-500 mb-3 truncate">
                    {program.location}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-stone-200/80 flex items-center justify-between gap-3">
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= ПРАВАЯ ЧАСТЬ: ПРОГРАММЫ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 murkoff-swamp-bg text-stone-100 flex flex-col">
          {/* Заголовок секции Murkoff */}
          <motion.div
            {...scrollRevealProps({ delay: 0.08, y: 16 })}
            className="mb-5 pb-4 border-b border-[#1f3825]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                  Программы Поддержки и Заботы
                </h2>
                <span className="text-xs text-[#82e29e] font-medium font-mono">
                  Комплексная адаптация и реабилитация · Проект Тенева 2
                </span>
              </div>
              <div className="text-xs font-mono text-stone-300 hidden sm:block">
                Совет д-ра Истермана
              </div>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
              Бесплатное проживание в санатории Синьявского, сбалансированное питание и постоянное внимание опытных наставников.
            </p>
          </motion.div>

          {/* Карточки программ Murkoff */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {MURKOFF_PROGRAMS.map((program, idx) => (
              <motion.div
                key={program.id}
                {...scrollRevealProps({ delay: idx * 0.06 + 0.04, duration: 0.55, y: 18 })}
                className="murkoff-card-bg rounded-xl border border-[#24462c] p-4 sm:p-5 shadow-md hover:shadow-xl transition-[border-color,box-shadow] group hover:border-[#82e29e] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-[#82e29e] transition-colors">
                      {program.title}
                    </h3>
                    <span className="shrink-0 text-xs font-mono px-2 py-0.5 rounded bg-[#102416] text-[#82e29e] border border-[#2d5236] font-bold">
                      Мест: {program.spotsLeft}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-200 mb-2.5 leading-relaxed">
                    {program.description}
                  </p>

                  <div className="text-xs text-stone-300 mb-3 font-mono truncate">
                    {program.location}
                  </div>
                </div>

                <div className="pt-2.5 border-t border-[#1f3825] flex items-center justify-between gap-3">
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
              </motion.div>
            ))}
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
