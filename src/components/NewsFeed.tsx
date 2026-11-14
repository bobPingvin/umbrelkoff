import React from 'react';
import { motion } from 'motion/react';
import { scrollRevealProps } from './Reveal';

interface NewsItem {
  id: string;
  corp: 'umbrella' | 'murkoff';
  date: string;
  category: string;
  title: string;
  summary: string;
  achievement: string;
  authorOrQuote: string;
}

const UMBRELLA_NEWS: NewsItem[] = [
  {
    id: 'umb-news-1',
    corp: 'umbrella',
    date: '02 Ноября',
    category: 'Био-фармацевтика',
    title: 'Фонд Umbrella открыл амбулаторию экспресс-диагностики в Секторе 4 Раккун-Сити',
    summary: 'Новейший комплекс оснащён анализаторами клеточного скрининга Т-88. Любой гражданин может без очередей проверить иммунитет и бесплатно получить запатентованные витаминные ампулы «Нео-Иммунитет».',
    achievement: 'Свыше 2 800 бесплатных тестов за первую неделю',
    authorOrQuote: '«Здоровье граждан Раккун-Сити — наша высшая ответственность» — Лорд Озвелл Э. Спенсер',
  },
  {
    id: 'umb-news-2',
    corp: 'umbrella',
    date: '12 Октября',
    category: 'Здравоохранение',
    title: 'Завершён осенний этап бесплатной программы «Иммунный Щит» в Раккун-Сити',
    summary: 'Более 14 000 жителей успешно получили профилактические био-комплексы в филиалах клиники им. Спенсера. По данным лабораторных анализов, сопротивляемость сезонным инфекциям у участников возросла на 380%.',
    achievement: '14 200+ граждан вакцинировано',
    authorOrQuote: '«Здоровье каждой клетки — это фундамент процветания города» — Попечительский совет Umbrella',
  },
  {
    id: 'umb-news-3',
    corp: 'umbrella',
    date: '28 Сентября',
    category: 'Экология и природа',
    title: 'Открытие эко-тропы и ботанического павильона в заповедных лесах Арклей',
    summary: 'Студенты-волонтёры высадили свыше пяти сотен адаптированных саженцев реликтовых хвойных культур. Новые полевые лаборатории полностью оборудованы для практических занятий юных натуралистов.',
    achievement: '50 гектаров обновлённого лесного фонда',
    authorOrQuote: '«Мы возвращаем природе первозданную чистоту» — Кураторы программы «Арклей»',
  },
  {
    id: 'umb-news-4',
    corp: 'umbrella',
    date: '15 Сентября',
    category: 'Инновации',
    title: 'Доктор Уильям Биркин удостоен муниципальной премии за достижения в тканевой регенерации',
    summary: 'Научная группа исследовательского комплекса представила благотворительную технологию бескровного сращивания связок, которая уже вернула подвижность десяткам подопечных фонда с травмами суставов.',
    achievement: '100% грантовое покрытие операций',
    authorOrQuote: '«Наука должна служить человеку без исключений» — Д-р Уильям Б.',
  },
];

const MURKOFF_NEWS: NewsItem[] = [
  {
    id: 'mrk-news-1',
    corp: 'murkoff',
    date: '29 Октября',
    category: 'Забота и питание',
    title: 'Открытие обновлённой трапезной и осенняя благотворительная ярмарка в комплексе Синьявского',
    summary: 'Попечительский совет расширил программу бесплатного горячего питания. Гости загородного комплекса получают сбалансированное пятиразовое меню из фермерских продуктов и свежую домашнюю выпечку.',
    achievement: 'Более 600 горячих обедов ежедневно',
    authorOrQuote: '«Сытый и обогретый человек открыт к доброте и новой жизни» — Администрация комплекса',
  },
  {
    id: 'mrk-news-2',
    corp: 'murkoff',
    date: '10 Октября',
    category: 'Социальная гармония',
    title: 'Торжественный выпуск 12-й смены программы «Новый Старт» в санатории Синьявского',
    summary: 'Тридцать шесть сограждан, преодолевших тяжелые жизненные кризисы, завершили восстановительный курс. Каждый выпускник обеспечен новым комплектом одежды, памятным чемоданом выпускника и направлен на социальное содействие.',
    achievement: '36 человек начали жизнь с чистого листа',
    authorOrQuote: '«Человек обретает истинный покой, когда чувствует себя нужным» — Д-р Хендрик Истерман',
  },
  {
    id: 'mrk-news-3',
    corp: 'murkoff',
    date: '24 Сентября',
    category: 'Детство и культура',
    title: 'Кукольный театр Матушки Футтерман провел благотворительный фестиваль для сирот',
    summary: 'Интерактивная сказка с добрым персонажем доктором Футтерман собрала воспитанников пяти приютов. Дети получили наборы натуральных леденцов и обучающие пособия по гигиене и добрососедству.',
    achievement: '450 подарков и праздничный стол',
    authorOrQuote: '«Детская улыбка и послушание — высшая награда для нашего коллектива» — Матушка Гусберри',
  },
  {
    id: 'mrk-news-4',
    corp: 'murkoff',
    date: '08 Сентября',
    category: 'Безопасность районов',
    title: 'Дружина офицера Лиланда Койла помогла снизить бытовые инциденты на 45%',
    summary: 'Добровольцы программы общественной взаимовыручки провели серию вечерних патрулей в спальных кварталах, помогли десяткам пожилых горожан с доставкой продуктов и организовали дежурства возле школ.',
    achievement: '120 добровольцев на страже покоя',
    authorOrQuote: '«Порядок рождается из взаимоуважения и твердой гражданской позиции» — Офицер Л. Койл',
  },
];

export const NewsFeed: React.FC = () => {
  return (
    <section id="news" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ПОЛОВИНА: ВЕСТИ ДОБРЫХ ДЕЛ UMBRELLA ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col">
          {/* Шапка секции Umbrella */}
          <motion.div
            {...scrollRevealProps({ y: 16 })}
            className="mb-5 pb-4 border-b border-stone-200"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-stone-900 tracking-tight">
                Вести добрых дел Umbrella
              </h2>
              <span className="text-xs text-rose-700 font-medium">
                Гуманитарная хроника и отчёты · Раккун-Сити
              </span>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
              Официальные сводки о медицинских акциях, открытии амбулаторий и помощи жителям города и заповедника Арклей.
            </p>
          </motion.div>

          {/* Карточки новостей Umbrella */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {UMBRELLA_NEWS.map((news, idx) => (
              <motion.article
                key={news.id}
                {...scrollRevealProps({ delay: idx * 0.06, duration: 0.55, y: 18 })}
                className="bg-stone-50 rounded-xl p-4 sm:p-5 border border-stone-200 hover:border-rose-300 shadow-xs transition-[border-color,box-shadow] flex flex-col justify-between"
              >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        {news.category}
                      </span>
                      <span className="font-mono text-[11px] text-stone-400">
                        {news.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-stone-900 mb-2 leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-200/70 space-y-1.5">
                    <div className="text-xs font-semibold text-rose-700">
                      {news.achievement}
                    </div>
                    <p className="text-[11px] italic text-stone-500 leading-snug">
                      {news.authorOrQuote}
                    </p>
                  </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ================= ПРАВАЯ ПОЛОВИНА: ВЕСТИ ДОБРЫХ ДЕЛ MURKOFF ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 murkoff-swamp-bg text-stone-100 flex flex-col">
          {/* Шапка секции Murkoff */}
          <motion.div
            {...scrollRevealProps({ delay: 0.08, y: 16 })}
            className="mb-5 pb-4 border-b border-[#1f3825]"
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                Вести добрых дел Murkoff
              </h2>
              <span className="text-xs text-[#82e29e] font-medium font-mono">
                Хроника заботы и восстановления · 1959 г.
              </span>
            </div>
            <p className="mt-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
              Репортажи о выпусках подопечных, работе волонтёрских дружин и благотворительных инициативах комплекса Синьявского.
            </p>
          </motion.div>

          {/* Карточки новостей Murkoff */}
          <div className="grid grid-cols-1 auto-rows-fr gap-4 flex-1">
            {MURKOFF_NEWS.map((news, idx) => (
              <motion.article
                key={news.id}
                {...scrollRevealProps({ delay: idx * 0.06 + 0.04, duration: 0.55, y: 18 })}
                className="murkoff-card-bg rounded-xl p-4 sm:p-5 border border-[#24462c] hover:border-[#82e29e] shadow-md transition-[border-color,box-shadow] flex flex-col justify-between"
              >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 text-xs">
                      <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#0f2415] text-[#82e29e] border border-[#2d5236]">
                        {news.category}
                      </span>
                      <span className="font-mono text-[11px] text-stone-400">
                        {news.date}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base sm:text-lg text-white mb-2 leading-snug">
                      {news.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed mb-4">
                      {news.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#1f3825] space-y-1.5">
                    <div className="text-xs font-semibold text-[#82e29e]">
                      {news.achievement}
                    </div>
                    <p className="text-[11px] italic text-stone-400 leading-snug">
                      {news.authorOrQuote}
                    </p>
                  </div>
                </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
