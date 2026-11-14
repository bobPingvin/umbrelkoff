import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown } from 'lucide-react';
import { Corporation } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { REVEAL_EASE } from './Reveal';

export interface FAQItem {
  id: string;
  corp: Corporation;
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

interface FaqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToForm: (corp: Corporation) => void;
}

export const FaqModal: React.FC<FaqModalProps> = ({ isOpen, onClose, onGoToForm }) => {
  const [activeCorp, setActiveCorp] = useState<Corporation>('umbrella');
  const [openFaqId, setOpenFaqId] = useState<string | null>(UMBRELLA_FAQS[0].id);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCorpSwitch = (corp: Corporation) => {
    setActiveCorp(corp);
    setOpenFaqId(corp === 'umbrella' ? UMBRELLA_FAQS[0].id : MURKOFF_FAQS[0].id);
  };

  const items = activeCorp === 'umbrella' ? UMBRELLA_FAQS : MURKOFF_FAQS;
  const isUmbrella = activeCorp === 'umbrella';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.3, ease: REVEAL_EASE }}
            onClick={(e) => e.stopPropagation()}
            className={`rounded-2xl max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden border shadow-2xl transition-colors duration-300 ${
              isUmbrella
                ? 'bg-white border-stone-200 text-stone-900'
                : 'murkoff-swamp-bg border-[#3d714a] text-stone-100'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Часто задаваемые вопросы"
          >
            {/* Шапка модального окна */}
            <div
              className={`p-5 sm:p-6 border-b shrink-0 ${
                isUmbrella ? 'bg-stone-50 border-stone-200' : 'murkoff-card-bg border-[#2d5236]'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3
                    className={`text-lg sm:text-xl font-display font-extrabold tracking-tight ${
                      isUmbrella ? 'text-stone-900' : 'text-white'
                    }`}
                  >
                    Часто задаваемые вопросы
                  </h3>
                  <p
                    className={`text-xs mt-1 ${
                      isUmbrella ? 'text-stone-500' : 'text-stone-300'
                    }`}
                  >
                    Официальные разъяснения попечительских советов о регламенте, прибытии и условиях участия
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isUmbrella
                      ? 'text-stone-400 hover:text-stone-700 hover:bg-stone-200/70'
                      : 'text-stone-400 hover:text-white hover:bg-[#1c3624]'
                  }`}
                  aria-label="Закрыть"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Переключатель корпораций */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleCorpSwitch('umbrella')}
                  className={`flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isUmbrella
                      ? 'bg-white border-rose-500 text-stone-900 shadow-xs ring-1 ring-rose-500/20'
                      : 'bg-[#0b170e]/70 border-[#24462c] text-stone-300 hover:text-white hover:border-[#3d714a]'
                  }`}
                >
                  <UmbrellaLogo size={22} />
                  <span>Фонд Umbrella</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCorpSwitch('murkoff')}
                  className={`flex items-center justify-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    !isUmbrella
                      ? 'murkoff-card-bg border-[#82e29e] text-white shadow-md ring-1 ring-[#82e29e]/30'
                      : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900 hover:border-stone-300'
                  }`}
                >
                  <MurkoffLogo size={22} className={!isUmbrella ? 'ring-1 ring-[#82e29e]' : ''} />
                  <span>Корпорация Murkoff</span>
                </button>
              </div>
            </div>

            {/* Список вопросов */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-3 flex-1">
              {items.map((faq) => {
                const isItemOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border overflow-hidden transition-colors ${
                      isUmbrella
                        ? 'border-stone-200 bg-stone-50/70'
                        : 'border-[#24462c] bg-[#0c1810]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isItemOpen ? null : faq.id)}
                      className={`w-full p-3.5 sm:p-4 text-left flex items-start justify-between gap-3 transition-colors cursor-pointer ${
                        isUmbrella ? 'hover:bg-stone-100/90' : 'hover:bg-[#122418]'
                      }`}
                    >
                      <span
                        className={`font-semibold text-xs sm:text-sm leading-snug ${
                          isUmbrella ? 'text-stone-800' : 'text-stone-100'
                        }`}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 shrink-0 mt-0.5 transition-transform duration-200 ${
                          isUmbrella ? 'text-rose-600' : 'text-[#82e29e]'
                        } ${isItemOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {isItemOpen && (
                      <div
                        className={`px-4 pb-4 pt-2.5 text-xs sm:text-[13px] leading-relaxed border-t ${
                          isUmbrella
                            ? 'text-stone-600 border-stone-200/70 bg-white'
                            : 'text-stone-300 border-[#1f3825] bg-[#08120b]'
                        }`}
                      >
                        <p className="whitespace-pre-line">{faq.answer}</p>
                        {faq.note && (
                          <p
                            className={`mt-2.5 text-[11px] italic p-2.5 rounded-lg border ${
                              isUmbrella
                                ? 'text-stone-600 bg-rose-50/60 border-rose-100'
                                : 'text-[#82e29e] bg-[#0f2415] border-[#234b2b] font-mono'
                            }`}
                          >
                            <strong>
                              {isUmbrella ? 'Примечание службы сервиса:' : 'Совет доктора Истермана:'}
                            </strong>{' '}
                            {faq.note}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Подвал модального окна */}
            <div
              className={`px-5 sm:px-6 py-3.5 border-t flex items-center justify-between gap-3 shrink-0 ${
                isUmbrella
                  ? 'border-stone-200 bg-stone-50'
                  : 'border-[#23432b] bg-[#0c170f]'
              }`}
            >
              <button
                type="button"
                onClick={onClose}
                className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                  isUmbrella
                    ? 'text-stone-600 hover:text-stone-900 bg-white border-stone-200'
                    : 'murkoff-btn-secondary'
                }`}
              >
                Закрыть
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onGoToForm(activeCorp);
                }}
                className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all cursor-pointer ${
                  isUmbrella
                    ? 'bg-rose-600 hover:bg-rose-700 text-white'
                    : 'murkoff-btn-lightgreen'
                }`}
              >
                Перейти к заполнению анкеты
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
