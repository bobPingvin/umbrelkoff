import React from 'react';
import { CharityProgram } from '../types';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { X, MapPin, Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';

interface ProgramModalProps {
  program: CharityProgram | null;
  onClose: () => void;
  onApply: (program: CharityProgram) => void;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  program,
  onClose,
  onApply,
}) => {
  if (!program) return null;

  const isUmbrella = program.corp === 'umbrella';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border shadow-2xl relative ${
          isUmbrella
            ? 'bg-white border-stone-200 text-stone-900'
            : 'murkoff-swamp-bg border-[#3d714a] text-stone-100'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div
          className={`p-6 border-b flex items-start justify-between gap-4 ${
            isUmbrella
              ? 'bg-rose-50/50 border-stone-200'
              : 'murkoff-card-bg border-[#2d5236]'
          }`}
        >
          <div className="flex items-center gap-3">
            {isUmbrella ? <UmbrellaLogo size={38} /> : <MurkoffLogo size={44} />}
            <div>
              <span
                className={`text-xs uppercase tracking-wider font-bold ${
                  isUmbrella ? 'text-rose-700' : 'text-[#82e29e] font-mono'
                }`}
              >
                {isUmbrella ? 'Гуманитарный проект Umbrella' : 'Благотворительная программа Murkoff · 1959 г.'}
              </span>
              <h3 className={`text-lg sm:text-xl font-display font-bold leading-snug ${isUmbrella ? 'text-stone-900' : 'text-white'}`}>
                {program.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isUmbrella
                ? 'text-stone-400 hover:text-stone-700 hover:bg-stone-100'
                : 'text-stone-400 hover:text-white hover:bg-[#1c3624]'
            }`}
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          <p
            className={`text-sm font-medium italic border-l-2 pl-3 ${
              isUmbrella
                ? 'text-stone-700 border-rose-300'
                : 'text-[#82e29e] border-[#529462]'
            }`}
          >
            «{program.tagline}»
          </p>

          <p className={`text-sm leading-relaxed ${isUmbrella ? 'text-stone-600' : 'text-stone-200'}`}>
            {program.description}
          </p>

          {/* Quick Info Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs p-3.5 rounded-xl border ${
              isUmbrella
                ? 'bg-stone-50 border-stone-200 text-stone-600'
                : 'murkoff-card-bg border-[#2d5236] text-stone-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 shrink-0 ${isUmbrella ? 'text-stone-400' : 'text-[#82e29e]'}`} />
              <span>
                <strong>Локация:</strong> {program.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 shrink-0 ${isUmbrella ? 'text-stone-400' : 'text-[#82e29e]'}`} />
              <span>
                <strong>Длительность:</strong> {program.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Users className={`w-4 h-4 shrink-0 ${isUmbrella ? 'text-stone-400' : 'text-[#82e29e]'}`} />
              <span>
                <strong>Критерии отбора:</strong> {program.eligibility}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className={`text-xs uppercase tracking-wider font-bold mb-2.5 ${isUmbrella ? 'text-stone-900' : 'text-[#82e29e]'}`}>
              Что предоставляет наш фонд:
            </h4>
            <ul className={`space-y-2 text-xs sm:text-sm ${isUmbrella ? 'text-stone-600' : 'text-stone-200'}`}>
              {program.benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isUmbrella ? 'text-rose-600' : 'text-[#82e29e]'
                    }`}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Easter Egg Disclaimer Note */}
          <div
            className={`p-3 rounded-xl text-xs flex items-start gap-2.5 border ${
              isUmbrella
                ? 'bg-amber-50/70 border-amber-200/80 text-amber-900'
                : 'bg-[#183020] border-[#3d714a] text-[#d1fae5]'
            }`}
          >
            <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isUmbrella ? 'text-amber-600' : 'text-[#82e29e]'}`} />
            <div>
              <span className="font-semibold block font-mono">
                {isUmbrella ? 'Служебное медицинское примечание:' : 'Памятка участника программы (д-р Истерман):'}
              </span>
              <span>{program.easterEggNote}</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div
          className={`p-6 pt-3 border-t flex items-center justify-between gap-3 ${
            isUmbrella
              ? 'border-stone-200 bg-stone-50/50'
              : 'border-[#23432b] bg-[#0c170f]'
          }`}
        >
          <div className={`text-xs ${isUmbrella ? 'text-stone-500' : 'text-stone-300'}`}>
            Осталось мест в текущем наборе:{' '}
            <span className={`font-bold font-mono ${isUmbrella ? 'text-stone-900' : 'text-[#82e29e]'}`}>
              {program.spotsLeft}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-medium rounded-lg border transition-colors ${
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
                onApply(program);
                onClose();
              }}
              className={`px-4 py-2 text-xs font-bold rounded-lg shadow-sm transition-all ${
                isUmbrella
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'murkoff-btn-lightgreen font-black'
              }`}
            >
              Подать заявку на участие
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
