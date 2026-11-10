import React, { useRef } from 'react';
import { VolunteerPass } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { X, Printer, CheckCircle, ShieldCheck } from 'lucide-react';

interface VolunteerPassModalProps {
  pass: VolunteerPass | null;
  onClose: () => void;
}

export const VolunteerPassModal: React.FC<VolunteerPassModalProps> = ({ pass, onClose }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  if (!pass) return null;

  const isUmbrella = pass.corp === 'umbrella';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-stone-300 shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Верхняя плашка */}
        <div
          className={`px-6 py-2.5 flex items-center justify-between text-xs font-semibold ${
            isUmbrella
              ? 'bg-rose-600 text-white'
              : 'murkoff-btn-lightgreen text-[#05190b] font-bold'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4" />
            <span>
              {isUmbrella
                ? 'Заявка одобрена! Ваше био-удостоверение Umbrella сформировано'
                : 'Заявка одобрена! Ваша карта участника программы Murkoff сформирована'}
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

        {/* Само удостоверение */}
        <div ref={cardRef} className="p-6 sm:p-8 bg-stone-100 print:p-0">
          <div
            className={`rounded-xl border-2 p-6 shadow-md relative overflow-hidden ${
              isUmbrella
                ? 'bg-white border-rose-400 text-stone-900'
                : 'murkoff-swamp-bg border-[#82e29e] text-stone-100'
            }`}
          >
            {/* Шапка карты */}
            <div
              className={`flex items-start justify-between border-b pb-4 mb-4 ${
                isUmbrella ? 'border-stone-200' : 'border-[#2d5236]'
              }`}
            >
              <div className="flex items-center gap-3">
                {isUmbrella ? (
                  <UmbrellaLogo size={52} />
                ) : (
                  <MurkoffLogo size={52} className="ring-2 ring-[#82e29e]" />
                )}
                <div>
                  <span
                    className={`text-xs font-bold uppercase tracking-wider block ${
                      isUmbrella ? 'text-rose-700' : 'text-[#82e29e] font-mono'
                    }`}
                  >
                    {isUmbrella
                      ? 'Гуманитарный Фонд Umbrella'
                      : 'Благотворительный Фонд Murkoff · 1959 г.'}
                  </span>
                  <h3 className={`font-display font-black text-lg tracking-tight ${isUmbrella ? 'text-stone-900' : 'text-white'}`}>
                    {isUmbrella ? 'УДОСТОВЕРЕНИЕ ВОЛОНТЁРА' : 'КАРТА УЧАСТНИКА ПРОГРАММЫ'}
                  </h3>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[10px] font-mono uppercase block ${isUmbrella ? 'text-stone-400' : 'text-stone-300'}`}>
                  {isUmbrella ? 'Пропуск №' : 'Участник ID'}
                </span>
                <span className={`text-xs font-mono font-bold ${isUmbrella ? 'text-stone-800' : 'text-[#82e29e]'}`}>
                  {pass.volunteerNumber}
                </span>
              </div>
            </div>

            {/* Фото и данные */}
            <div className="grid grid-cols-3 gap-4 mb-5 items-center">
              <div className="col-span-1">
                <div
                  className={`w-24 h-28 rounded-lg border flex flex-col items-center justify-center p-2 text-center relative overflow-hidden ${
                    isUmbrella
                      ? 'bg-stone-50 border-stone-300 text-stone-400'
                      : 'murkoff-card-bg border-[#2d5236] text-[#82e29e]'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full mb-1 flex items-center justify-center font-bold font-mono text-sm ${
                      isUmbrella ? 'bg-stone-200 text-stone-600' : 'bg-[#183020] text-[#82e29e] border border-[#3d714a]'
                    }`}
                  >
                    {pass.fullName.charAt(0) || 'У'}
                  </div>
                  <span className="text-[9px] uppercase font-mono tracking-tighter">
                    {isUmbrella ? 'ФОТО ПОДТВЕРЖДЕНО' : 'ФОТО УЧАСТНИКА'}
                  </span>
                  {/* Штамп */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none rotate-[-25deg]">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest px-1 py-0.5 border-2 rounded ${
                        isUmbrella
                          ? 'text-rose-600 border-rose-600 bg-rose-50/80'
                          : 'text-[#82e29e] border-[#82e29e] bg-[#122217]/95 font-mono shadow-sm'
                      }`}
                    >
                      {isUmbrella ? 'ДОПУЩЕН' : 'ОДОБРЕНО 1959'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-2 space-y-1.5 text-xs">
                <div>
                  <span className={`text-[10px] uppercase block font-semibold ${isUmbrella ? 'text-stone-400' : 'text-stone-400'}`}>
                    {isUmbrella ? 'Имя волонтёра:' : 'Имя участника:'}
                  </span>
                  <span className={`font-bold text-sm ${isUmbrella ? 'text-stone-900' : 'text-white'}`}>
                    {pass.fullName}
                  </span>
                </div>
                <div>
                  <span className={`text-[10px] uppercase block font-semibold ${isUmbrella ? 'text-stone-400' : 'text-stone-400'}`}>
                    Назначенный объект:
                  </span>
                  <span className={`font-medium ${isUmbrella ? 'text-stone-700' : 'text-stone-200'}`}>
                    {pass.facility}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <span className={`text-[10px] uppercase block font-semibold ${isUmbrella ? 'text-stone-400' : 'text-stone-400'}`}>
                      Группа крови:
                    </span>
                    <span className={`font-mono font-bold ${isUmbrella ? 'text-stone-800' : 'text-[#82e29e]'}`}>
                      {pass.bloodType}
                    </span>
                  </div>
                  <div>
                    <span className={`text-[10px] uppercase block font-semibold ${isUmbrella ? 'text-stone-400' : 'text-stone-400'}`}>
                      Уровень допуска:
                    </span>
                    <span className={`font-mono font-bold ${isUmbrella ? 'text-emerald-700' : 'text-[#82e29e]'}`}>
                      {pass.clearanceLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Штрих-код */}
            <div
              className={`border-t pt-3 flex items-center justify-between ${
                isUmbrella ? 'border-stone-200' : 'border-[#2d5236]'
              }`}
            >
              <div>
                <div className={`font-mono text-base tracking-widest select-all font-bold ${isUmbrella ? 'text-stone-800' : 'text-[#82e29e]'}`}>
                  ||| | | |||| | ||| || ||| |
                </div>
                <span className={`text-[10px] font-mono ${isUmbrella ? 'text-stone-400' : 'text-[#5bbd78]'}`}>
                  {pass.barcode}
                </span>
              </div>
              <div className="text-right">
                <span className={`text-[10px] block ${isUmbrella ? 'text-stone-400' : 'text-stone-300'}`}>
                  Дата допуска: {pass.issuedDate}
                </span>
                <span className={`text-[10px] font-semibold ${isUmbrella ? 'text-stone-600' : 'text-[#82e29e]'}`}>
                  {isUmbrella ? 'Попечительский совет' : 'Куратор д-р Истерман'}
                </span>
              </div>
            </div>

            {/* Примечание */}
            <div className={`mt-3 pt-2 border-t text-[10px] italic text-center ${isUmbrella ? 'border-stone-100 text-stone-400' : 'border-[#1f3825] text-stone-300'}`}>
              {isUmbrella
                ? '* Предъявите пропуск на КПП Раккун-Сити. Проезд на спецтранспорте бесплатный.'
                : '* Предъявите при заселении в санаторный корпус Синьявского. Проезд и полный пансион бесплатны.'}
            </div>
          </div>
        </div>

        {/* Действия */}
        <div className="p-4 sm:p-6 bg-white border-t border-stone-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Данные внесены в реестр</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Распечатать карточку</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors"
            >
              Готово
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
