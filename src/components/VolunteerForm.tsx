import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Corporation, VolunteerPass } from '../types';
import { VolunteerPassModal } from './VolunteerPassModal';
import { scrollRevealProps } from './Reveal';

interface VolunteerFormProps {
  initialCorp?: Corporation;
  preselectedProgramTitle?: string;
}

export const VolunteerForm: React.FC<VolunteerFormProps> = ({
  initialCorp = 'umbrella',
  preselectedProgramTitle,
}) => {
  // Umbrella Form State
  const [umbFullName, setUmbFullName] = useState('');
  const [umbAge, setUmbAge] = useState('26');
  const [umbEmail, setUmbEmail] = useState('');
  const [umbPhone, setUmbPhone] = useState('');
  const [umbBloodType, setUmbBloodType] = useState('Иммунизация «Прародитель-Т»');
  const [umbDormitory, setUmbDormitory] = useState(true);
  const [umbTransfer, setUmbTransfer] = useState(true);
  const [umbTerms, setUmbTerms] = useState(true);
  const [umbMotivation, setUmbMotivation] = useState(
    initialCorp === 'umbrella' && preselectedProgramTitle
      ? `Заявка на участие в программе: «${preselectedProgramTitle}». Готов к регулярным био-скринингам.`
      : 'Хочу внести вклад в превентивную медицину и здоровье Раккун-Сити.'
  );

  // Murkoff Form State
  const [mrkFullName, setMrkFullName] = useState('');
  const [mrkAge, setMrkAge] = useState('31');
  const [mrkEmail, setMrkEmail] = useState('');
  const [mrkPhone, setMrkPhone] = useState('');
  const [mrkBloodType, setMrkBloodType] = useState('Программа «Новый Старт»');
  const [mrkNoRelatives, setMrkNoRelatives] = useState(false);
  const [mrkRelocation, setMrkRelocation] = useState(true);
  const [mrkTerms, setMrkTerms] = useState(true);
  const [mrkMotivation, setMrkMotivation] = useState(
    initialCorp === 'murkoff' && preselectedProgramTitle
      ? `Заявка на участие в программе: «${preselectedProgramTitle}».`
      : 'Ищу душевного покоя, поддержки и хочу пройти курс адаптации в санатории Синьявского.'
  );

  useEffect(() => {
    if (preselectedProgramTitle) {
      if (initialCorp === 'umbrella') {
        setUmbMotivation(`Заявка на программу: «${preselectedProgramTitle}». Готов к регулярным био-скринингам.`);
      } else {
        setMrkMotivation(`Заявка на участие в программе: «${preselectedProgramTitle}».`);
      }
    }
  }, [preselectedProgramTitle, initialCorp]);

  const [generatedPass, setGeneratedPass] = useState<VolunteerPass | null>(null);
  const [submittingCorp, setSubmittingCorp] = useState<Corporation | null>(null);
  const [umbError, setUmbError] = useState<string | null>(null);
  const [mrkError, setMrkError] = useState<string | null>(null);

  const submitApplication = async (
    payload: {
      corp: Corporation;
      fullName: string;
      age: number;
      email: string;
      phone: string;
      program: string;
      motivation: string;
      needsAccommodation: boolean;
      needsTransfer: boolean;
      agreedToTerms: boolean;
    },
    fallbackPass: VolunteerPass
  ): Promise<VolunteerPass> => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Не удалось сохранить анкету');
        }
        return data as VolunteerPass;
      }

      // Если бэкенд не запущен (например, в автономном предпросмотре без Java-сервера)
      return fallbackPass;
    } catch (err) {
      if (err instanceof Error && err.message && !err.message.includes('Failed to fetch') && !err.message.includes('NetworkError')) {
        throw err;
      }
      return fallbackPass;
    }
  };

  const handleUmbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUmbError(null);
    setSubmittingCorp('umbrella');

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const fallbackPass: VolunteerPass = {
      id: `pass-${Date.now()}`,
      volunteerNumber: `АМБРЕЛЛА-БИО-${randomDigits}`,
      fullName: umbFullName || 'Волонтёр био-программы',
      corp: 'umbrella',
      facility: 'Медицинский исследовательский корпус Арклей, Блок C',
      assignedRole: 'Ассистент превентивных био-испытаний',
      clearanceLevel: 'Уровень 1-B (Био-Скрининг)',
      bloodType: umbBloodType,
      issuedDate: new Date().toLocaleDateString('ru-RU'),
      barcode: `*АМБРЕЛЛА-${randomDigits}*`,
    };

    try {
      const savedPass = await submitApplication(
        {
          corp: 'umbrella',
          fullName: umbFullName,
          age: Number(umbAge),
          email: umbEmail,
          phone: umbPhone,
          program: umbBloodType,
          motivation: umbMotivation,
          needsAccommodation: umbDormitory,
          needsTransfer: umbTransfer,
          agreedToTerms: umbTerms,
        },
        fallbackPass
      );
      setGeneratedPass(savedPass);
    } catch (err) {
      setUmbError(err instanceof Error ? err.message : 'Ошибка отправки анкеты');
    } finally {
      setSubmittingCorp(null);
    }
  };

  const handleMrkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMrkError(null);
    setSubmittingCorp('murkoff');

    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const fallbackPass: VolunteerPass = {
      id: `pass-${Date.now()}`,
      volunteerNumber: `МЕРКОФФ-ЗАБОТА-${randomDigits}`,
      fullName: mrkFullName || 'Участник программы поддержки',
      corp: 'murkoff',
      facility: 'Санаторно-оздоровительный комплекс Синьявского, Корпус С-1',
      assignedRole: 'Участник программы социальной адаптации «Новый Старт»',
      clearanceLevel: 'Полный пансион (Сектор Синьявского)',
      bloodType: mrkBloodType,
      issuedDate: '14.11.1959 г.',
      barcode: `*МЕРКОФФ-ЗАБОТА-${randomDigits}*`,
    };

    try {
      const savedPass = await submitApplication(
        {
          corp: 'murkoff',
          fullName: mrkFullName,
          age: Number(mrkAge),
          email: mrkEmail,
          phone: mrkPhone,
          program: mrkBloodType,
          motivation: mrkMotivation,
          needsAccommodation: mrkNoRelatives,
          needsTransfer: mrkRelocation,
          agreedToTerms: mrkTerms,
        },
        fallbackPass
      );
      setGeneratedPass(savedPass);
    } catch (err) {
      setMrkError(err instanceof Error ? err.message : 'Ошибка отправки анкеты');
    } finally {
      setSubmittingCorp(null);
    }
  };

  return (
    <section id="volunteer-section" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ПОЛОВИНА: ПРИЁМНАЯ UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col justify-between">
          <div>
            {/* Шапка формы Umbrella */}
            <motion.div
              {...scrollRevealProps({ y: 16 })}
              className="mb-5 pb-4 border-b border-stone-200"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-stone-900 tracking-tight">
                  Анкета Волонтёра Umbrella
                </h2>
                <p className="text-xs text-rose-700 font-medium">
                  Бесплатное медицинское страхование и пропуск в Арклей
                </p>
              </div>
              <p className="mt-2.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Мы рады каждому, кто разделяет стремление к физическому совершенству и долголетию. После заполнения вы мгновенно получите пропуск.
              </p>
            </motion.div>

            {/* Форма подачи заявления Umbrella */}
            <motion.form
              {...scrollRevealProps({ delay: 0.08, duration: 0.65, y: 18 })}
              onSubmit={handleUmbSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Ваше полное имя (ФИО) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Иванов Алексей Сергеевич"
                    value={umbFullName}
                    onChange={(e) => setUmbFullName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Возраст *
                  </label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="80"
                    value={umbAge}
                    onChange={(e) => setUmbAge(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Электронная почта *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="volunteer@umbrella-care.org"
                    value={umbEmail}
                    onChange={(e) => setUmbEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 123-45-67"
                    value={umbPhone}
                    onChange={(e) => setUmbPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Направление терапевтической программы
                </label>
                <select
                  value={umbBloodType}
                  onChange={(e) => setUmbBloodType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="Иммунизация «Прародитель-Т»">Иммунизация «Прародитель-Т» (Профилактика)</option>
                  <option value="Регенеративное восстановление">Регенеративное восстановление тканей (Биркин)</option>
                  <option value="Экологический практикум Арклей">Экологический практикум «Арклей»</option>
                  <option value="Фито-терапия «Флора-42»">Городское оздоровление «Флора-42»</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Цель обращения
                </label>
                <textarea
                  rows={2}
                  value={umbMotivation}
                  onChange={(e) => setUmbMotivation(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600 resize-none"
                />
              </div>

              <div className="space-y-2 pt-1 text-xs text-stone-700">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={umbDormitory}
                    onChange={(e) => setUmbDormitory(e.target.checked)}
                    className="mt-0.5 rounded text-rose-600 focus:ring-rose-600"
                  />
                  <span>
                    <strong>Нуждаюсь в размещении в стационаре</strong>{' '}
                    <span className="text-stone-500 block text-[11px]">
                      (Отдельная палата и бесплатное пятиразовое лечебное питание)
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={umbTransfer}
                    onChange={(e) => setUmbTransfer(e.target.checked)}
                    className="mt-0.5 rounded text-rose-600 focus:ring-rose-600"
                  />
                  <span>Необходим бесплатный санитарный трансфер до центра Umbrella</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={umbTerms}
                    onChange={(e) => setUmbTerms(e.target.checked)}
                    className="mt-0.5 rounded text-rose-600 focus:ring-rose-600"
                  />
                  <span>
                    Согласен с правилами био-безопасности и регулярным осмотром врача
                  </span>
                </label>
              </div>

              {umbError && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
                  {umbError}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingCorp === 'umbrella'}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow"
              >
                {submittingCorp === 'umbrella' ? (
                  <span>Выпуск удостоверения Umbrella...</span>
                ) : (
                  <span>Получить Пропуск Волонтёра Umbrella</span>
                )}
              </button>
            </motion.form>
          </div>

          {/* Контакты Umbrella */}
          <motion.div
            {...scrollRevealProps({ delay: 0.12, duration: 0.55, y: 14 })}
            className="mt-6 pt-4 border-t border-stone-200"
          >
            <div className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
              Прямые контакты приёмного терминала
            </div>
            <div className="space-y-1 text-xs text-stone-600">
              <div>Адрес: Раккун-Сити, Площадь им. Озвелла Спенсера, дом 1</div>
              <div>Телефон: <span className="font-mono">8-800-UMB-LIFE (8-800-862-5433)</span></div>
              <div>Почта: <span className="font-mono">priemnaya@umbrella-care.org</span></div>
            </div>
          </motion.div>
        </div>

        {/* ================= ПРАВАЯ ПОЛОВИНА: ПРИЁМНАЯ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 murkoff-swamp-bg text-stone-100 flex flex-col justify-between">
          <div>
            {/* Шапка формы Murkoff */}
            <motion.div
              {...scrollRevealProps({ delay: 0.06, y: 16 })}
              className="mb-5 pb-4 border-b border-[#1f3825]"
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                  Анкета в Программу Murkoff
                </h2>
                <p className="text-xs text-[#82e29e] font-mono">
                  Программа социальной поддержки и психологической адаптации
                </p>
              </div>
              <p className="mt-2.5 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                Мы обеспечиваем бесплатный пансион, наблюдение и поддержку каждому. Заполните заявку для оформления в санаторий Синьявского.
              </p>
            </motion.div>

            {/* Форма подачи заявления Murkoff */}
            <motion.form
              {...scrollRevealProps({ delay: 0.14, duration: 0.65, y: 18 })}
              onSubmit={handleMrkSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    Ваше полное имя (ФИО) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Морозов Виктор Павлович"
                    value={mrkFullName}
                    onChange={(e) => setMrkFullName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    Возраст *
                  </label>
                  <input
                    type="number"
                    required
                    min="18"
                    max="80"
                    value={mrkAge}
                    onChange={(e) => setMrkAge(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    Контактная почта *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="resident@murkoff-care.org"
                    value={mrkEmail}
                    onChange={(e) => setMrkEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-200 mb-1">
                    Номер телефона *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (999) 000-19-59"
                    value={mrkPhone}
                    onChange={(e) => setMrkPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-200 mb-1">
                  Интересующая вас программа поддержки
                </label>
                <select
                  value={mrkBloodType}
                  onChange={(e) => setMrkBloodType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-[#82e29e] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e] font-mono"
                >
                  <option value="Программа «Новый Старт»">Программа социальной адаптации «Новый Старт»</option>
                  <option value="Дружина «Защита и Порядок»">Волонтёрская дружина (Офицер Лиланд Койл)</option>
                  <option value="Детский театр и творчество">Кукольный театр для детей (Матушка Футтерман)</option>
                  <option value="Семейный патронаж Бамбино">Семейный патронаж и помощь родителям (Франко Барби)</option>
                </select>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer text-stone-200">
                  <input
                    type="checkbox"
                    checked={mrkNoRelatives}
                    onChange={(e) => setMrkNoRelatives(e.target.checked)}
                    className="mt-0.5 rounded text-[#82e29e] focus:ring-[#82e29e]"
                  />
                  <span>
                    <strong>Нуждаюсь в предоставлении проживания и пансиона</strong>{' '}
                    <span className="text-[#82e29e] block text-[11px] font-mono">
                      (Включает отдельную комнату в загородном корпусе Синьявского)
                    </span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-stone-200">
                  <input
                    type="checkbox"
                    checked={mrkRelocation}
                    onChange={(e) => setMrkRelocation(e.target.checked)}
                    className="mt-0.5 rounded text-[#82e29e] focus:ring-[#82e29e]"
                  />
                  <span>Готов к загородному санаторному пребыванию на период курса</span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-stone-200">
                  <input
                    type="checkbox"
                    required
                    checked={mrkTerms}
                    onChange={(e) => setMrkTerms(e.target.checked)}
                    className="mt-0.5 rounded text-[#82e29e] focus:ring-[#82e29e]"
                  />
                  <span>Ознакомлен с правилами внутреннего распорядка санатория Синьявского</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-200 mb-1">
                  Что привело вас к нам?
                </label>
                <textarea
                  rows={2}
                  value={mrkMotivation}
                  onChange={(e) => setMrkMotivation(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#0e1d13] border border-[#24462c] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82e29e] resize-none"
                />
              </div>

              {mrkError && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/70 text-xs text-red-200 font-medium">
                  {mrkError}
                </div>
              )}

              <button
                type="submit"
                disabled={submittingCorp === 'murkoff'}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm murkoff-btn-lightgreen flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                {submittingCorp === 'murkoff' ? (
                  <span>Оформление Карты Участника...</span>
                ) : (
                  <span>Подать Заявление в Программу Murkoff</span>
                )}
              </button>
            </motion.form>
          </div>

          {/* Контакты Murkoff */}
          <motion.div
            {...scrollRevealProps({ delay: 0.16, duration: 0.55, y: 14 })}
            className="mt-6 pt-4 border-t border-[#1f3825]"
          >
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#82e29e] mb-2">
              Приёмное отделение Murkoff
            </div>
            <div className="space-y-1 text-xs text-stone-300">
              <div>Адрес: Санаторно-оздоровительный комплекс Синьявского, Корпус С-1</div>
              <div>Телефон: <span className="font-mono">8-800-MRK-1959 (Горячая линия поддержки)</span></div>
              <div>Почта: <span className="font-mono">zabota@murkoff-1959.org</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно удостоверения / Карточки Реагента */}
      <VolunteerPassModal pass={generatedPass} onClose={() => setGeneratedPass(null)} />
    </section>
  );
};
