import React, { useRef } from 'react';
import { VolunteerPass } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { X, Printer, CheckCircle, ShieldCheck, FileText, Stamp } from 'lucide-react';

interface VolunteerPassModalProps {
  pass: VolunteerPass | null;
  onClose: () => void;
}

export const VolunteerPassModal: React.FC<VolunteerPassModalProps> = ({ pass, onClose }) => {
  const docRef = useRef<HTMLDivElement>(null);

  if (!pass) return null;

  const isUmbrella = pass.corp === 'umbrella';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-stone-300 shadow-2xl relative my-6"
        role="dialog"
        aria-modal="true"
      >
        {/* Верхняя статусная полоса */}
        <div
          className={`px-6 py-2.5 flex items-center justify-between text-xs font-semibold ${
            isUmbrella
              ? 'bg-rose-700 text-white'
              : 'murkoff-btn-lightgreen text-[#05190b] font-bold'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>
              {isUmbrella
                ? 'Решение комиссии: Пациент зачислен в программу превентивной терапии'
                : 'Постановление приёмной комиссии: Принят на курс социальной адаптации'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`${isUmbrella ? 'text-white/80 hover:text-white' : 'text-stone-900 hover:text-black'} transition-colors`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Официальный документ по ГОСТу */}
        <div className="p-4 sm:p-8 bg-stone-100 overflow-y-auto max-h-[78vh]">
          <div
            ref={docRef}
            className="bg-white rounded-xl border border-stone-300 p-6 sm:p-10 shadow-lg text-stone-900 font-serif relative"
            style={{
              backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          >
            {/* Водяной знак на фоне */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] select-none">
              {isUmbrella ? <UmbrellaLogo size={340} /> : <MurkoffLogo size={340} />}
            </div>

            {/* Шапка документа по ГОСТ Р 7.0.97 */}
            <div className="border-b-2 border-stone-800 pb-5 mb-6 text-center sm:text-left relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {isUmbrella ? (
                    <UmbrellaLogo size={48} />
                  ) : (
                    <MurkoffLogo size={52} className="ring-1 ring-[#82e29e]" />
                  )}
                  <div>
                    <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-600">
                      {isUmbrella
                        ? 'МЕЖДУНАРОДНЫЙ БИО-ФАРМАЦЕВТИЧЕСКИЙ КОНСОРЦИУМ UMBRELLA'
                        : 'БЛАГОТВОРИТЕЛЬНЫЙ ФОНД СОДЕЙСТВИЯ НАСЕЛЕНИЮ MURKOFF'}
                    </div>
                    <div className="text-xs font-sans text-stone-500">
                      {isUmbrella
                        ? 'Отдел клинических протоколов и превентивного мониторинга'
                        : 'Директорат социально-психологической гармонизации личности'}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] font-mono text-stone-500 self-center sm:self-start">
                  <div>Форма У-04/ГОСТ Р 7.0.97</div>
                  <div className="font-bold text-stone-800">Экземпляр № 1 (Пациент)</div>
                </div>
              </div>

              <div className="text-center pt-3">
                <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-stone-500 mb-1">
                  СВИДЕТЕЛЬСТВО О ДОПУСКЕ К БЛАГОТВОРИТЕЛЬНОЙ ПРОГРАММЕ
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-stone-900 uppercase">
                  УВЕДОМЛЕНИЕ О ПРИНЯТИИ НА КУРС ТЕРАПИИ
                </h2>
                <div className="text-xs font-mono text-stone-600 mt-1">
                  Регистрационный номер документа:{' '}
                  <span className="font-bold text-stone-900">{pass.volunteerNumber}</span>
                </div>
              </div>
            </div>

            {/* Основной юридический текст */}
            <div className="space-y-4 text-xs sm:text-sm leading-relaxed relative z-10 text-stone-800">
              <p className="text-justify indent-6">
                Настоящим удостоверяется, что гражданин(ка){' '}
                <strong className="underline underline-offset-4 decoration-stone-400 font-sans text-stone-950 font-bold px-1">
                  {pass.fullName}
                </strong>{' '}
                прошел(ла) первичный скрининг приемной комиссии и признан(а) годным(ой) к прохождению сертифицированного оздоровительного курса на безвозмездной основе в рамках гуманитарного партнёрства.
              </p>

              {/* Табличная часть с реквизитами допуска */}
              <div className="my-5 overflow-hidden rounded-lg border border-stone-300 font-sans text-xs">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <td className="p-2.5 font-semibold text-stone-600 w-1/3">Назначенное учреждение:</td>
                      <td className="p-2.5 font-bold text-stone-900">{pass.facility}</td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="p-2.5 font-semibold text-stone-600">Программа / Направление:</td>
                      <td className="p-2.5 font-bold text-stone-900">{pass.bloodType || 'Комплексный восстановительный курс'}</td>
                    </tr>
                    <tr className="border-b border-stone-200 bg-stone-50">
                      <td className="p-2.5 font-semibold text-stone-600">Категория размещения:</td>
                      <td className="p-2.5 text-stone-800">
                        {isUmbrella
                          ? 'Изолированный комфорт-бокс клиники им. Спенсера (Полный пансион)'
                          : 'Отдельный жилой номер корпуса Синьявского (Полный пансион)'}
                      </td>
                    </tr>
                    <tr className="border-b border-stone-200">
                      <td className="p-2.5 font-semibold text-stone-600">Регламент обеспечения:</td>
                      <td className="p-2.5 text-stone-800">
                        {isUmbrella
                          ? 'Бесплатное медикаментозное и белковое питание, наблюдение вирусологов'
                          : 'Сбалансированный рацион, фито-ингаляции, гармонизирующие консультации'}
                      </td>
                    </tr>
                    <tr className="bg-stone-50">
                      <td className="p-2.5 font-semibold text-stone-600">Статус в протоколе:</td>
                      <td className="p-2.5 font-mono font-bold text-emerald-800">
                        Утверждён к зачислению // Допуск: {pass.clearanceLevel}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-stone-50 p-3.5 rounded-lg border border-stone-200 text-xs font-sans text-stone-600 space-y-1">
                <div className="font-bold text-stone-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Обязательства попечительского фонда:</span>
                </div>
                <p>
                  Фонд обязуется предоставить полный курс заявленной терапии, круглосуточное внимание сертифицированного персонала, регулярный мониторинг самочувствия и безопасное пребывание в стационарном комплексе.
                </p>
              </div>

              {/* Дата и штампы ГОСТ */}
              <div className="pt-6 mt-6 border-t border-stone-300 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end font-sans">
                <div>
                  <div className="text-[11px] text-stone-500">
                    Дата составления акта: <strong className="text-stone-900">{pass.issuedDate}</strong>
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Место выдачи: <strong className="text-stone-900">{isUmbrella ? 'Раккун-Сити, Сектор 4' : 'Корпус Синьявского, С-1'}</strong>
                  </div>
                  <div className="mt-3 font-mono text-[10px] text-stone-400">
                    ЭЦП: SHA256-VERIFIED-{pass.volunteerNumber}
                  </div>
                </div>

                {/* Подпись комиссии */}
                <div className="flex items-center justify-end">
                  <div className="text-right text-xs">
                    <div className="italic text-stone-700 font-serif text-sm">
                      {isUmbrella ? 'Д-р О. Спенсер' : 'Д-р Х. Д. Истерман'}
                    </div>
                    <div className="text-[10px] text-stone-400 border-t border-stone-400 pt-0.5 mt-0.5">
                      Председатель врачебно-наблюдательной комиссии
                    </div>
                  </div>
                </div>
              </div>

              {/* Нижний штрих-код идентификации */}
              <div className="pt-4 border-t border-dashed border-stone-300 flex items-center justify-between text-[11px] font-mono text-stone-500">
                <span>{pass.barcode}</span>
                <span className="text-[10px] italic">
                  * Настоящий документ подлежит предъявлению на КПП при прибытии на территорию комплекса.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Действия в модальном окне */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-stone-600">
            <FileText className="w-4 h-4 text-stone-500 shrink-0" />
            <span>Документ зарегистрирован в Едином медицинском реестре фонда</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-300"
            >
              <Printer className="w-4 h-4" />
              <span>Распечатать документ (ГОСТ)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
