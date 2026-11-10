import React, { useState, useEffect } from 'react';
import { Corporation, VolunteerPass } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { VolunteerPassModal } from './VolunteerPassModal';
import {
  HeartHandshake,
  Send,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

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
  const [umbBloodType, setUmbBloodType] = useState('Т-Совместимый (Вектор Umbrella)');
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

  const handleUmbSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCorp('umbrella');

    setTimeout(() => {
      setSubmittingCorp(null);
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const pass: VolunteerPass = {
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
      setGeneratedPass(pass);
    }, 500);
  };

  const handleMrkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingCorp('murkoff');

    setTimeout(() => {
      setSubmittingCorp(null);
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const pass: VolunteerPass = {
        id: `pass-${Date.now()}`,
        volunteerNumber: `МУРКОФФ-ЗАБОТА-${randomDigits}`,
        fullName: mrkFullName || 'Участник программы поддержки',
        corp: 'murkoff',
        facility: 'Санаторно-оздоровительный комплекс Синьявского, Корпус С-1',
        assignedRole: 'Участник программы социальной адаптации «Новый Старт»',
        clearanceLevel: 'Полный пансион (Сектор Синьявского)',
        bloodType: mrkBloodType,
        issuedDate: '14.11.1959 г.',
        barcode: `*МУРКОФФ-ЗАБОТА-${randomDigits}*`,
      };
      setGeneratedPass(pass);
    }, 500);
  };

  return (
    <section id="volunteer-section" className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* ================= ЛЕВАЯ ПОЛОВИНА: ПРИЁМНАЯ UMBRELLA (БЕЛЫЙ И КРАСНЫЙ) ================= */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white flex flex-col justify-between">
          <div>
            {/* Шапка формы Umbrella */}
            <div className="mb-8 pb-5 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <UmbrellaLogo size={42} />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-stone-900 tracking-tight">
                    Анкета Волонтёра Umbrella
                  </h2>
                  <p className="text-xs text-rose-700 font-medium">
                    Бесплатное медицинское страхование и пропуск в Арклей
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
                Мы рады каждому, кто разделяет стремление к физическому совершенству и долголетию. После заполнения вы мгновенно получите цифровой био-пропуск.
              </p>
            </div>

            {/* Форма подачи заявления Umbrella */}
            <form onSubmit={handleUmbSubmit} className="space-y-4">
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
                  Группа крови для био-паспорта
                </label>
                <select
                  value={umbBloodType}
                  onChange={(e) => setUmbBloodType(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                >
                  <option value="Т-Совместимый (Вектор Umbrella)">Т-Совместимый (Вектор Umbrella)</option>
                  <option value="0 (I) Rh+ Универсальный">0 (I) Rh+ (Универсальный донор)</option>
                  <option value="A (II) Rh+">A (II) Rh+</option>
                  <option value="B (III) Rh+">B (III) Rh+</option>
                  <option value="AB (IV) Rh+">AB (IV) Rh+</option>
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

              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-700 pt-1">
                <input
                  type="checkbox"
                  required
                  checked={umbTerms}
                  onChange={(e) => setUmbTerms(e.target.checked)}
                  className="mt-0.5 rounded text-rose-600 focus:ring-rose-600"
                />
                <span>
                  Согласен с правилами био-безопасности и готов к регулярному мониторингу температуры тела
                </span>
              </label>

              <button
                type="submit"
                disabled={submittingCorp === 'umbrella'}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center gap-2 shadow-sm transition-all hover:shadow"
              >
                {submittingCorp === 'umbrella' ? (
                  <span>Выпуск удостоверения Umbrella...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Получить Пропуск Волонтёра Umbrella</span>
                  </>
                )}
              </button>
            </form>

            {/* Контакты Umbrella */}
            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-3">
                Прямые контакты приёмного терминала
              </div>
              <div className="space-y-2 text-xs text-stone-600">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>Раккун-Сити, Площадь им. Озвелла Спенсера, дом 1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-mono">8-800-UMB-LIFE (8-800-862-5433)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="font-mono">priemnaya@umbrella-care.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ПРАВАЯ ПОЛОВИНА: ПРИЁМНАЯ MURKOFF (ТЁМНЫЙ БОЛОТНЫЙ ШУМ И СВЕТЛО-ЗЕЛЁНЫЙ) ================= */}
        <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 murkoff-swamp-bg text-stone-100 flex flex-col justify-between">
          <div>
            {/* Шапка формы Murkoff */}
            <div className="mb-8 pb-5 border-b border-[#1f3825]">
              <div className="flex items-center gap-3">
                <MurkoffLogo size={42} className="ring-2 ring-[#82e29e]" />
                <div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
                    Анкета в Программу Murkoff
                  </h2>
                  <p className="text-xs text-[#82e29e] font-mono">
                    Программа социальной поддержки и психологической адаптации
                  </p>
                </div>
              </div>
              <p className="mt-3 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                Мы обеспечиваем бесплатный пансион, медицинское наблюдение и поддержку каждому нуждающемуся. Заполните заявку для оформления карты участника программы в санатории Синьявского.
              </p>
            </div>

            {/* Форма подачи заявления Murkoff */}
            <form onSubmit={handleMrkSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={submittingCorp === 'murkoff'}
                className="w-full py-3 px-4 rounded-xl font-bold text-sm murkoff-btn-lightgreen flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.01]"
              >
                {submittingCorp === 'murkoff' ? (
                  <span>Оформление Карты Участника...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Подать Заявление в Программу Murkoff</span>
                  </>
                )}
              </button>
            </form>

            {/* Контакты Murkoff */}
            <div className="mt-8 pt-6 border-t border-[#1f3825]">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#82e29e] mb-3">
                Приёмное отделение Murkoff
              </div>
              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#82e29e] shrink-0 mt-0.5" />
                  <span>Санаторно-оздоровительный комплекс Синьявского, Корпус С-1</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#82e29e] shrink-0" />
                  <span className="font-mono">8-800-MRK-1959 (Горячая линия поддержки)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#82e29e] shrink-0" />
                  <span className="font-mono">zabota@murkoff-1959.org</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно удостоверения / Карточки Реагента */}
      <VolunteerPassModal pass={generatedPass} onClose={() => setGeneratedPass(null)} />
    </section>
  );
};
