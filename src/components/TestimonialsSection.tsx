import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { Star, CheckCircle, Info, Quote, Heart } from 'lucide-react';

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
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col justify-between">
          <div>
            {/* Заголовок секции отзывов Umbrella */}
            <div className="mb-8 pb-5 border-b border-stone-200">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <UmbrellaLogo size={42} />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
                      Отзывы Пациентов и Волонтёров
                    </h2>
                    <p className="text-xs text-rose-700 font-medium">
                      Рейтинг доверия: 4.98 из 5.0 · 1 420+ подтверждённых историй
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Пациенты клиники св. Марии и участники оздоровительных лагерей Арклей делятся своими результатами укрепления физической формы.
              </p>
            </div>

            {/* Карточки отзывов Umbrella */}
            <div className="space-y-6">
              {umbrellaTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 rounded-xl p-5 border border-stone-200 shadow-xs relative"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs font-mono">
                        {item.avatarInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-stone-900 text-sm">{item.name}</span>
                          <span title="Подтверждённый участник">
                            <CheckCircle className="w-3.5 h-3.5 text-rose-600" />
                          </span>
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

                  <div className="relative pl-6 text-xs sm:text-sm text-stone-700 italic leading-relaxed mb-3">
                    <Quote className="w-4 h-4 text-stone-300 absolute left-0 top-0 -scale-x-100" />
                    {item.quote}
                  </div>

                  <div className="pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-mono">{item.date} · {item.innocentContext}</span>
                    <button
                      type="button"
                      onClick={() => toggleClue(item.id)}
                      className="text-stone-500 hover:text-rose-600 flex items-center gap-1 font-medium transition-colors"
                    >
                      <Info className="w-3 h-3" />
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
              ))}
            </div>
          </div>
        </div>

        {/* ================= ПРАВАЯ ЧАСТЬ: ОТЗЫВЫ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 murkoff-swamp-bg text-stone-100 flex flex-col justify-between">
          <div>
            {/* Заголовок секции отзывов Murkoff */}
            <div className="mb-8 pb-5 border-b border-[#1f3825]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MurkoffLogo size={42} className="ring-2 ring-[#82e29e]" />
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                      Истории Подопечных Murkoff
                    </h2>
                    <p className="text-xs text-[#82e29e] font-mono">
                      Индекс удовлетворённости: 99.4% · Проект Тенева 2
                    </p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                Те, кто когда-то остался один на один с трудностями, нашли в загородном комплексе Синьявского тёплый приют, восстановление сил и искреннюю заботу наставников.
              </p>
            </div>

            {/* Карточки отзывов Murkoff */}
            <div className="space-y-6">
              {murkoffTestimonials.map((item) => (
                <div
                  key={item.id}
                  className="murkoff-card-bg rounded-xl p-5 border border-[#24462c] shadow-md relative"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#102416] text-[#82e29e] border border-[#2d5236] font-bold flex items-center justify-center text-xs font-mono">
                        {item.avatarInitial}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-white text-sm">{item.name}</span>
                          <span title="Подтверждённый выпускник программы">
                            <CheckCircle className="w-3.5 h-3.5 text-[#82e29e]" />
                          </span>
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

                  <div className="relative pl-6 text-xs sm:text-sm text-stone-200 italic leading-relaxed mb-3">
                    <Quote className="w-4 h-4 text-[#3d714a] absolute left-0 top-0 -scale-x-100" />
                    {item.quote}
                  </div>

                  <div className="pt-2 border-t border-[#1f3825] flex items-center justify-between text-xs">
                    <span className="text-stone-300 font-mono">{item.date} · {item.innocentContext}</span>
                    <button
                      type="button"
                      onClick={() => toggleClue(item.id)}
                      className="text-[#82e29e] hover:text-[#bbf7d0] flex items-center gap-1 font-mono transition-colors"
                    >
                      <Info className="w-3 h-3" />
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
