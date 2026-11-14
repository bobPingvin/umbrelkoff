import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { REVEAL_EASE, scrollRevealProps } from './Reveal';

interface FAQItem {
  id: string;
  corp: 'umbrella' | 'murkoff';
  question: string;
  answer: string;
  note?: string;
}

const UMBRELLA_FAQS: FAQItem[] = [
  {
    id: 'umb-faq-1',
    corp: 'umbrella',
    question: 'Почему после вакцинации требуется двухнедельное наблюдение в стационаре закрытого типа?',
    answer:
      'Каждая партия формулы «Прародитель-Т» разрабатывается с применением высокоактивных био-стабилизаторов. Чтобы гарантировать безупречную био-совместимость и исключить внешние аллергены мегаполиса, мы размещаем волонтёров в чистых изолированных палатах клиники им. Спенсера под круглосуточным присмотром ведущих вирусологов.',
    note: 'Для вашего удобства в номерах поддерживается стабильный температурный режим и мягкое рассеянное освещение.',
  },
  {
    id: 'umb-faq-2',
    corp: 'umbrella',
    question: 'Правда ли, что на территории лесного лагеря «Арклей» запрещены мобильные телефоны?',
    answer:
      'Исключительно ради сохранения атмосферы глубокого погружения в живую природу и защиты конфиденциальности наших научных методик. Реликтовые хвойные леса Арклей — это зона цифрового детокса, где студенты концентрируются на полевой ботанике и здоровом сне.',
    note: 'В случае экстренной необходимости дежурный связист на КПП передаст срочное сообщение вашим родственникам.',
  },
  {
    id: 'umb-faq-3',
    corp: 'umbrella',
    question: 'Нормально ли ощущать повышенную температуру тела и сильный мышечный тонус в первые дни?',
    answer:
      'Это естественный отклик иммунитета на ускоренную репликацию здоровых эпителиальных клеток. Процесс сопровождается временным повышением метаболизма и здоровым аппетитом, что наглядно подтверждает активную фазу клеточного обновления.',
  },
  {
    id: 'umb-faq-4',
    corp: 'umbrella',
    question: 'Что делать после подачи заявления и как происходит прибытие в Медицинский центр Umbrella?',
    answer:
      'Поступление в биомедицинский стационар Umbrella организовано по международному протоколу наивысшего медицинского комфорта:\n\n1. Экспресс-валидация и курьер: В течение 12 часов после одобрения анкеты с вами связывается персональный медицинский координатор. На дом доставляется бесконтактный набор предварительного анализа биомаркеров.\n2. Персональный санитарный трансфер: В назначенный день за вами прибывает специализированный автомобиль скорой помощи фонда бизнес-класса с климат-контролем и дежурным врачом-сопровождающим.\n3. Прибытие в Арклейский комплекс или клинику Раккун-Сити: Вы проходите мягкий дезинфекционный шлюз с распылением эфирных масел эвкалипта, получаете персональный браслет био-мониторинга и индивидуальный медицинский костюм из гипоаллергенного волокна.\n4. Заселение в индивидуальный био-люкс: Просторная палата с фильтрацией воздуха HEPA-14, персональным санузлом, пятиразовым меню лечебного питания и знакомством с лечащим вирусологом.',
    note: 'Все транспортные расходы, лабораторные исследования и проживание на 100% финансируются попечительским советом фонда Umbrella.',
  },
];

const MURKOFF_FAQS: FAQItem[] = [
  {
    id: 'mrk-faq-1',
    corp: 'murkoff',
    question: 'Почему при оформлении в санаторий Синьявского просят сдать личные документы и одежду?',
    answer:
      'Основа методики доктора Истермана — психологическое освобождение от груза прошлых неудач, долгов и социального давления. Мы выдаем мягкую единообразную форму из натурального хлопка, чтобы стереть любые имущественные различия среди отдыхающих и создать равную, доброжелательную семейную среду.',
    note: 'Все вещи бережно хранятся на центральном складе корпуса С-1 на весь период вашего курса гармонизации.',
  },
  {
    id: 'mrk-faq-2',
    corp: 'murkoff',
    question: 'Что представляют собой ежедневные дыхательные фито-ингаляции?',
    answer:
      'Это запатентованная расслабляющая смесь на основе экстрактов горных трав и эфирных компонентов. Она мягко снимает тревожность, стабилизирует сон и помогает человеку избавиться от навязчивых стрессовых воспоминаний.',
    note: 'Легкое чувство эйфории и изменение восприятия времени в первые сеансы свидетельствуют о глубокой релаксации нервной системы.',
  },
  {
    id: 'mrk-faq-3',
    corp: 'murkoff',
    question: 'Можно ли покинуть санаторий до завершения назначенного курса адаптации?',
    answer:
      'Для достижения стойкого терапевтического эффекта курс непрерывной заботы должен быть пройден целиком. Преждевременный контакт со стрессовой внешней средой может свести на нет достигнутое душевное равновесие, поэтому наставники рекомендуют дождаться торжественного выпуска.',
  },
  {
    id: 'mrk-faq-4',
    corp: 'murkoff',
    question: 'Что делать после подачи заявления и как происходит прибытие в Санаторий Синьявского?',
    answer:
      'Вам не нужно беспокоиться о билетах, маршрутах или багаже — всю заботу о логистике фонд берёт на себя:\n\n1. Назначение куратора: После утверждения анкеты в течение 24 часов на указанный номер телефона поступает звонок от дежурного наставника для согласования удобного времени отъезда.\n2. Встреча у дома или пункта сбора: В назначенный день по вашему адресу прибывает комфортабельный корпоративный микроавтобус фонда. Сопровождающие сотрудники в униформе помогают с личными вещами и вручают дорожный набор участника.\n3. Трансфер в закрытый комплекс: Поездка осуществляется по выделенному маршруту прямо до диспетчерского терминала корпуса С-1. Вам остаётся только расслабиться в дороге.\n4. Тёплый приём: На КПП вас лично встречает администрация, выдаётся комплект мягкой одежды для отдыха, ключи от отдельного номера и индивидуальный план восстановления.',
    note: 'Все транспортные расходы, питание в пути и страхование полностью оплачиваются попечительским советом Murkoff.',
  },
];

export const FaqSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openUmbFaq, setOpenUmbFaq] = useState<string | null>(null);
  const [openMrkFaq, setOpenMrkFaq] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.paddingRight = prevBodyPaddingRight;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const toggleUmbFaq = (id: string) => {
    setOpenUmbFaq((prev) => (prev === id ? null : id));
  };

  const toggleMrkFaq = (id: string) => {
    setOpenMrkFaq((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <section
        id="faq"
        className="relative border-b border-stone-200 overflow-hidden"
      >
        {/* Фоновое разделение 50/50 на десктопе: Umbrella слева, Murkoff справа */}
        <div
          aria-hidden="true"
          className="hidden lg:flex absolute inset-0 pointer-events-none"
        >
          <div className="w-1/2 h-full bg-gradient-to-br from-white via-white to-rose-50/70 border-r border-stone-200" />
          <div className="w-1/2 h-full murkoff-swamp-bg" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] items-stretch">
          {/* Левая часть: Umbrella */}
          <div className="p-5 sm:p-7 lg:px-9 lg:py-7 bg-gradient-to-br from-white via-white to-rose-50/70 lg:bg-none border-b lg:border-b-0 border-stone-200 flex items-center">
            <motion.div
              {...scrollRevealProps({ y: 14, duration: 0.55 })}
            >
              <span className="text-[11px] uppercase tracking-wider font-bold text-rose-700 block">
                Справочный отдел Umbrella
              </span>
              <h2 className="font-display font-bold text-base sm:text-lg text-stone-900 leading-snug">
                Регламент и био-безопасность
              </h2>
              <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
                Санитарный трансфер, условия стационара и ответы клиники им. Спенсера.
              </p>
            </motion.div>
          </div>

          {/* Центральная кнопка вызова FAQ на стыке двух палитр */}
          <div className="order-3 lg:order-2 py-4 px-5 sm:px-6 lg:py-0 lg:px-5 bg-[linear-gradient(to_right,#fff1f2_0%,#ffffff_50%,#060e08_50%,#0b170e_100%)] lg:bg-none border-t lg:border-t-0 border-stone-200 flex items-center justify-center">
            <motion.button
              type="button"
              {...scrollRevealProps({ delay: 0.06, y: 12, duration: 0.5 })}
              onClick={() => setIsOpen(true)}
              className="group relative inline-block overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-[1.02] cursor-pointer whitespace-nowrap text-xs sm:text-sm font-bold"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 flex pointer-events-none"
              >
                <span className="w-1/2 h-full murkoff-swamp-bg border-y border-l border-[#2d5236] rounded-l-lg transition-all group-hover:brightness-125" />
                <span className="w-1/2 h-full bg-white border-y border-r border-rose-300 rounded-r-lg transition-colors group-hover:bg-rose-50" />
              </span>
              <span className="relative z-10 block px-6 py-3 text-[#82e29e] [clip-path:inset(0_50%_0_0)]">
                Часто задаваемые вопросы
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 z-10 block px-6 py-3 text-rose-600 [clip-path:inset(0_0_0_50%)] pointer-events-none"
              >
                Часто задаваемые вопросы
              </span>
            </motion.button>
          </div>

          {/* Правая часть: Murkoff */}
          <div className="order-2 lg:order-3 p-5 sm:p-7 lg:px-9 lg:py-7 murkoff-swamp-bg lg:bg-none text-stone-100 flex items-center lg:justify-end">
            <motion.div
              {...scrollRevealProps({ delay: 0.08, y: 14, duration: 0.55 })}
              className="lg:text-right"
            >
              <span className="text-[11px] uppercase tracking-wider font-bold text-[#82e29e] font-mono block">
                Служба поддержки Murkoff
              </span>
              <h2 className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                Памятка санатория Синьявского
              </h2>
              <p className="text-xs text-stone-300 mt-0.5 leading-relaxed">
                Порядок прибытия, правила пансиона и разъяснения д-ра Истермана.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overscroll-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: REVEAL_EASE }}
              onClick={(e) => e.stopPropagation()}
              className="rounded-2xl max-w-5xl w-full max-h-[88vh] flex flex-col overflow-hidden border border-stone-700/60 shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="faq-modal-title"
            >
              {/* Шапка модального окна с 50/50 палитрой Umbrella / Murkoff */}
              <div className="grid grid-cols-1 lg:grid-cols-2 shrink-0 border-b border-stone-200/80">
                {/* Левая половина шапки: Umbrella */}
                <div className="px-5 py-4 sm:px-6 bg-gradient-to-r from-white to-rose-50/70 border-b lg:border-b-0 lg:border-r border-stone-200 flex items-center justify-between gap-4">
                  <div>
                    <h3
                      id="faq-modal-title"
                      className="font-display font-extrabold text-sm sm:text-base text-stone-900"
                    >
                      Часто задаваемые вопросы · Umbrella
                    </h3>
                    <p className="text-xs text-rose-700 font-medium">
                      Клиника им. Спенсера и комплекс Арклей
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="lg:hidden p-1.5 text-stone-400 hover:text-stone-700 hover:bg-rose-100/60 rounded-lg transition-colors cursor-pointer"
                    aria-label="Закрыть"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Правая половина шапки: Murkoff */}
                <div className="px-5 py-4 sm:px-6 murkoff-swamp-bg text-stone-100 border-b lg:border-b-0 border-[#1f3825] flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-white">
                      Разъяснения и регламент · Murkoff
                    </h3>
                    <p className="text-xs text-[#82e29e] font-mono">
                      Санаторий Синьявского · Корпус С-1
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="hidden lg:inline-flex p-1.5 text-stone-300 hover:text-white hover:bg-[#152d1c] rounded-lg transition-colors cursor-pointer"
                    aria-label="Закрыть"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Прокручиваемое 50/50 содержимое */}
              <div className="overflow-y-auto overscroll-contain flex-1 grid grid-cols-1 lg:grid-cols-2">
                {/* Левая колонка: Umbrella */}
                <div className="p-5 sm:p-6 bg-gradient-to-b from-white to-rose-50/40 border-b lg:border-b-0 lg:border-r border-stone-200">
                  <div className="space-y-2.5">
                    {UMBRELLA_FAQS.map((faq) => {
                      const isExpanded = openUmbFaq === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-lg border border-rose-200/70 bg-white overflow-hidden transition-colors shadow-2xs"
                        >
                          <button
                            type="button"
                            onClick={() => toggleUmbFaq(faq.id)}
                            className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-3 hover:bg-rose-50/50 transition-colors cursor-pointer"
                          >
                            <span className="font-semibold text-xs sm:text-sm text-stone-800 leading-snug">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-rose-600 shrink-0 mt-0.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="px-3.5 pb-3.5 pt-2 text-xs text-stone-600 leading-relaxed border-t border-rose-100 bg-rose-50/20">
                              <p className="whitespace-pre-line">{faq.answer}</p>
                              {faq.note && (
                                <p className="mt-2 text-[11px] text-stone-500 italic bg-rose-50/80 p-2 rounded border border-rose-100">
                                  <strong>Примечание службы сервиса:</strong> {faq.note}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Правая колонка: Murkoff */}
                <div className="p-5 sm:p-6 murkoff-swamp-bg text-stone-100">
                  <div className="space-y-2.5">
                    {MURKOFF_FAQS.map((faq) => {
                      const isExpanded = openMrkFaq === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="rounded-lg border border-[#24462c] bg-[#0c1810] overflow-hidden transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => toggleMrkFaq(faq.id)}
                            className="w-full p-3 sm:p-3.5 text-left flex items-start justify-between gap-3 hover:bg-[#122418] transition-colors cursor-pointer"
                          >
                            <span className="font-semibold text-xs sm:text-sm text-stone-100 leading-snug">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 text-[#82e29e] shrink-0 mt-0.5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isExpanded && (
                            <div className="px-3.5 pb-3.5 pt-2 text-xs text-stone-300 leading-relaxed border-t border-[#1f3825] bg-[#08120b]">
                              <p className="whitespace-pre-line">{faq.answer}</p>
                              {faq.note && (
                                <p className="mt-2 text-[11px] text-[#82e29e] italic bg-[#0f2415] p-2 rounded border border-[#234b2b] font-mono">
                                  <strong>Совет доктора Истермана:</strong> {faq.note}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Подвал модального окна с 50/50 палитрой */}
              <div className="grid grid-cols-1 lg:grid-cols-2 shrink-0 border-t border-stone-200/80">
                <div className="px-5 py-3 sm:px-6 bg-rose-50/50 border-b lg:border-b-0 lg:border-r border-stone-200 flex items-center justify-between text-[11px] text-stone-600 font-mono">
                  <span>Линия приёма Umbrella: 8-800-UMB-LIFE</span>
                </div>
                <div className="px-5 py-3 sm:px-6 murkoff-card-bg border-t lg:border-t-0 border-[#1f3825] flex items-center justify-between gap-3">
                  <span className="text-[11px] text-[#82e29e]/90 font-mono">
                    Линия заботы Murkoff: 8-800-MRK-1959
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="murkoff-btn-secondary px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
