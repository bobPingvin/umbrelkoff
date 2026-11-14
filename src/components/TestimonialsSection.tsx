import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/mockData';
import { scrollRevealProps } from './Reveal';
import { Star } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [revealedClues, setRevealedClues] = useState<Record<string, boolean>>({});

  const toggleClue = (id: string) => {
    setRevealedClues((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const umbrellaTestimonials = TESTIMONIALS.filter((t) => t.corp === 'umbrella');
  const murkoffTestimonials = TESTIMONIALS.filter((t) => t.corp === 'murkoff');

  return (
    <section id="testimonials" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ЧАСТЬ: ОТЗЫВЫ UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col">
          {/* Заголовок секции отзывов Umbrella */}
          <motion.div
            {...scrollRevealProps({ y: 16 })}
            className="mb-5 pb-4 border-b border-stone-200"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-stone-900 tracking-tight">
                Отзывы Пациентов и Волонтёров
              </h2>
              <p className="text-xs text-rose-700 font-medium">
                Рейтинг доверия: 4.98 из 5.0 · 1 420+ подтверждённых историй
              </p>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Пациенты клиники св. Марии и участники оздоровительных лагерей Арклей делятся результатами укрепления здоровья.
            </p>
          </motion.div>

          {/* Карточки отзывов Umbrella */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {umbrellaTestimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                {...scrollRevealProps({ delay: idx * 0.07, duration: 0.55, y: 18 })}
                className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 shadow-xs relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs font-mono">
                        {item.avatarInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                        </div>
                        <span className="text-xs text-stone-500 block">
                          {item.role} · {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-3">
                    «{item.quote}»
                  </div>
                </div>

                <div>
                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono">{item.date} · {item.innocentContext}</span>
                    <button
                      type="button"
                      onClick={() => toggleClue(item.id)}
                      className="text-stone-500 hover:text-rose-600 font-medium transition-colors"
                    >
                      <span>{revealedClues[item.id] ? 'Скрыть заметку' : 'Карта пациента'}</span>
                    </button>
                  </div>

                  {revealedClues[item.id] && (
                    <div className="mt-3 p-2.5 rounded-lg bg-rose-50/90 border border-rose-200 text-xs text-rose-950 animate-in fade-in">
                      <span className="font-semibold block font-mono">Архивная отметка полиции Раккун-Сити / Б.С.А.А.:</span>
                      {item.subtleHorrorClue}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ================= ПРАВАЯ ЧАСТЬ: ОТЗЫВЫ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 murkoff-swamp-bg text-stone-100 flex flex-col">
          {/* Заголовок секции отзывов Murkoff */}
          <motion.div
            {...scrollRevealProps({ delay: 0.08, y: 16 })}
            className="mb-5 pb-4 border-b border-[#1f3825]"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Истории Подопечных Murkoff
              </h2>
              <p className="text-xs text-[#82e29e] font-mono">
                Индекс удовлетворённости: 99.4% · Проект Тенева 2
              </p>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
              Выпускники загородного комплекса Синьявского рассказывают об обретённом покое и поддержке наставников.
            </p>
          </motion.div>

          {/* Карточки отзывов Murkoff */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {murkoffTestimonials.map((item, idx) => (
              <motion.div
                key={item.id}
                {...scrollRevealProps({ delay: idx * 0.07 + 0.04, duration: 0.55, y: 18 })}
                className="murkoff-card-bg rounded-xl p-4 sm:p-5 border border-[#24462c] shadow-md relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#102416] text-[#82e29e] border border-[#2d5236] font-bold flex items-center justify-center text-xs font-mono">
                        {item.avatarInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm">{item.name}</span>
                        </div>
                        <span className="text-xs text-stone-300 block font-mono">
                          {item.role} · {item.location}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-[#82e29e]">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#82e29e] stroke-[#82e29e]" />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm text-stone-200 italic leading-relaxed mb-3">
                    «{item.quote}»
                  </div>
                </div>

                <div>
                  <div className="pt-2 border-t border-[#1f3825] flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-mono">{item.date} · {item.innocentContext}</span>
                    <button
                      type="button"
                      onClick={() => toggleClue(item.id)}
                      className="text-[#82e29e] hover:text-[#bbf7d0] font-mono transition-colors"
                    >
                      <span>{revealedClues[item.id] ? 'Скрыть заметку' : 'Заметка куратора'}</span>
                    </button>
                  </div>

                  {revealedClues[item.id] && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[#0e1e13] border border-[#2d5236] text-xs text-[#d1fae5] animate-in fade-in">
                      <span className="font-bold block font-mono text-[#82e29e]">
                        Рассекреченный отчёт куратора испытаний:
                      </span>
                      {item.subtleHorrorClue}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
