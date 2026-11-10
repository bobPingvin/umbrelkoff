import React, { useState } from 'react';
import { Corporation } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { X, Sparkles, ChevronRight, RotateCcw } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (corp: Corporation) => void;
}

const QUESTIONS = [
  {
    id: 1,
    question: 'Как вы представляете свой идеальный восстановительный отдых?',
    options: [
      {
        text: 'Прогулки по реликтовому хвойному лесу Арклей, сбор трав и укрепление мышечного каркаса.',
        corp: 'umbrella' as Corporation,
      },
      {
        text: 'Уютная комната отдыха в санатории Синьявского, расслабляющие фито-процедуры и творческие уроки от Матушки Футтерман.',
        corp: 'murkoff' as Corporation,
      },
    ],
  },
  {
    id: 2,
    question: 'Какое главное обещание благотворительного фонда привлекает вас больше всего?',
    options: [
      {
        text: 'Абсолютный биологический иммунитет, регенерация тканей и защита от вирусов.',
        corp: 'umbrella' as Corporation,
      },
      {
        text: 'Душевный покой, забота наставников и возможность начать жизнь с чистого листа в доброжелательной атмосфере.',
        corp: 'murkoff' as Corporation,
      },
    ],
  },
  {
    id: 3,
    question: 'Кому из наших наставников вы готовы доверить своё будущее?',
    options: [
      {
        text: 'Вирусологам Umbrella: д-ру Биркину и доктору Озвеллу Спенсеру.',
        corp: 'umbrella' as Corporation,
      },
      {
        text: 'Наставникам фонда Murkoff: доктору Хендрику Истерману и офицеру Лиланду Койлу.',
        corp: 'murkoff' as Corporation,
      },
    ],
  },
  {
    id: 4,
    question: 'Что вы предпочтёте получить в стартовом наборе участника?',
    options: [
      {
        text: 'Персональную ампулу с био-бустером, зелёную фито-смесь и памятный значок «Здоровье в клетках».',
        corp: 'umbrella' as Corporation,
      },
      {
        text: 'Комплект мягкой фланелевой одежды для отдыха, термос с ромашковым чаем и памятный значок участника программы.',
        corp: 'murkoff' as Corporation,
      },
    ],
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Corporation[]>([]);

  if (!isOpen) return null;

  const handleAnswer = (corp: Corporation) => {
    const nextAnswers = [...answers, corp];
    setAnswers(nextAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const isCompleted = answers.length === QUESTIONS.length;

  const umbrellaCount = answers.filter((a) => a === 'umbrella').length;
  const murkoffCount = answers.filter((a) => a === 'murkoff').length;
  const recommendedCorp: Corporation = umbrellaCount >= murkoffCount ? 'umbrella' : 'murkoff';

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`rounded-2xl max-w-lg w-full overflow-hidden border shadow-2xl relative ${
          recommendedCorp === 'murkoff' && isCompleted
            ? 'murkoff-swamp-bg border-[#3d714a] text-stone-100'
            : 'bg-white border-stone-200 text-stone-900'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className={`p-6 border-b flex items-center justify-between ${
            recommendedCorp === 'murkoff' && isCompleted
              ? 'murkoff-card-bg border-[#2d5236]'
              : 'bg-stone-50 border-stone-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#82e29e]" />
            <div>
              <h3 className={`font-display font-bold text-base ${recommendedCorp === 'murkoff' && isCompleted ? 'text-white' : 'text-stone-900'}`}>
                Тест: Какая гуманитарная семья ждёт вас?
              </h3>
              <p className={`text-xs ${recommendedCorp === 'murkoff' && isCompleted ? 'text-[#82e29e] font-mono' : 'text-stone-500'}`}>
                {!isCompleted ? `Вопрос ${currentStep + 1} из ${QUESTIONS.length}` : 'Диагностика Реагента завершена'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question Body */}
        <div className="p-6">
          {!isCompleted ? (
            <div>
              <h4 className="font-display font-semibold text-stone-900 text-base sm:text-lg mb-6 leading-snug">
                {QUESTIONS[currentStep].question}
              </h4>

              <div className="space-y-3">
                {QUESTIONS[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(option.corp)}
                    className="w-full text-left p-4 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50/80 transition-all text-xs sm:text-sm text-stone-800 flex items-start justify-between gap-3 group"
                  >
                    <span>{option.text}</span>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div
                className={`inline-flex p-4 rounded-2xl border shadow-xs ${
                  recommendedCorp === 'umbrella'
                    ? 'bg-rose-50 border-rose-200'
                    : 'murkoff-card-bg border-[#82e29e] ring-2 ring-[#82e29e]'
                }`}
              >
                {recommendedCorp === 'umbrella' ? (
                  <UmbrellaLogo size={68} />
                ) : (
                  <MurkoffLogo size={68} className="ring-2 ring-[#82e29e]" />
                )}
              </div>

              <div>
                <span className={`text-xs font-mono uppercase tracking-wider block ${recommendedCorp === 'umbrella' ? 'text-rose-700' : 'text-[#82e29e]'}`}>
                  Ваш персональный гуманитарный профиль:
                </span>
                <h4 className={`text-xl sm:text-2xl font-display font-extrabold mt-1 ${recommendedCorp === 'umbrella' ? 'text-stone-900' : 'text-white'}`}>
                  {recommendedCorp === 'umbrella'
                    ? 'Фонд Биологического Здоровья Umbrella'
                    : 'Благотворительный Фонд Murkoff · 1959 г.'}
                </h4>
                <p className={`text-xs sm:text-sm mt-2 max-w-sm mx-auto leading-relaxed ${recommendedCorp === 'umbrella' ? 'text-stone-600' : 'text-stone-200'}`}>
                  {recommendedCorp === 'umbrella'
                    ? 'Вы цените науку, физическую мощь и превентивную медицину. Мы ждём вас на бесплатных вакцинациях и в лагере Арклей!'
                    : 'Вам близки душевное спокойствие, теплота и забота чутких наставников. Доктор Хендрик Истерман и коллектив загородного санатория Синьявского с радостью примут вас в нашу дружную семью!'}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onSelectResult(recommendedCorp);
                    onClose();
                  }}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
                    recommendedCorp === 'umbrella'
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'murkoff-btn-lightgreen font-black shadow-md'
                  }`}
                >
                  Перейти к заполнению анкеты
                </button>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                    recommendedCorp === 'umbrella'
                      ? 'text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200'
                      : 'murkoff-btn-secondary'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Пройти заново</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
