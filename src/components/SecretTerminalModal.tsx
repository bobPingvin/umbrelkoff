import React, { useState, useEffect } from 'react';
import { AUDIT_WHISTLEBLOWER_LEAKS } from '../data/mockData';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import {
  X,
  Eye,
  EyeOff,
  Terminal,
  ShieldAlert,
  Volume2,
  VolumeX,
  Radio,
  Share2,
  Check,
  Zap,
  Mic,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface SecretTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'amelia' | 'bsaa' | 'waylon';
}

export const SecretTerminalModal: React.FC<SecretTerminalModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'amelia',
}) => {
  const [activeTab, setActiveTab] = useState<'amelia' | 'bsaa' | 'waylon'>(defaultTab);
  const [isNightVision, setIsNightVision] = useState(false);
  const [isRedacted, setIsRedacted] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);
  const [copiedWarning, setCopiedWarning] = useState(false);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      playWhistleblowerTone(defaultTab);
    }
  }, [isOpen, defaultTab]);

  if (!isOpen) return null;

  const playWhistleblowerTone = (tabMode = activeTab) => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (tabMode === 'amelia') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15);
        osc.frequency.exponentialRampToValueAtTime(330, audioCtx.currentTime + 0.3);
      } else if (tabMode === 'bsaa') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, audioCtx.currentTime + 0.3);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(120, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.35);
      }

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.45);
      setSoundPlaying(true);
      setTimeout(() => setSoundPlaying(false), 450);
    } catch {
      // Игнорировать если аудио недоступно
    }
  };

  const handleCopyWarning = () => {
    const textToCopy = `⚠️ СИГНАЛ АМЕЛИИ КОЛЬЕР (#A-0714):\n${AUDIT_WHISTLEBLOWER_LEAKS.amelia.content}\n\nСайт Umbrella & Murkoff — это ловушка! Не заполняйте анкету!`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedWarning(true);
    setTimeout(() => setCopiedWarning(false), 3000);
  };

  const currentLeak = AUDIT_WHISTLEBLOWER_LEAKS[activeTab];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-4xl rounded-2xl overflow-hidden border shadow-2xl transition-all duration-300 font-mono text-xs sm:text-sm relative flex flex-col max-h-[92vh] ${
          activeTab === 'amelia'
            ? 'bg-stone-950 text-red-100 border-red-600/80 shadow-red-950/60 ring-1 ring-red-500/30'
            : isNightVision
            ? 'murkoff-swamp-bg text-[#82e29e] border-[#3d714a] shadow-emerald-950/40'
            : 'bg-stone-900 text-stone-200 border-stone-800'
        }`}
        role="dialog"
        aria-modal="true"
      >
        {/* Шапка экстренного терминала */}
        <div className={`px-4 sm:px-6 py-2.5 border-b flex items-center justify-between gap-4 shrink-0 ${
          activeTab === 'amelia' ? 'bg-red-950/70 border-red-800/80' : 'bg-black/70 border-stone-800'
        }`}>
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-500 animate-pulse shrink-0" />
            <span className="font-bold tracking-wider text-xs uppercase text-red-400 font-mono">
              ПЕРЕХВАТ // СИНЬЯЛА: ВЗЛОМАНА
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-900/60 border border-red-700/50 text-[10px] text-yellow-300 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <span>42 Реагента эвакуировано</span>
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => playWhistleblowerTone(activeTab)}
              className="p-1 hover:text-white text-stone-400 transition-colors"
              title="Воспроизвести сигнал"
            >
              {soundPlaying ? (
                <Volume2 className="w-4 h-4 animate-bounce text-red-400" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-white transition-colors"
              title="Закрыть"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Основная зона с контентом и фотографией Амелии */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto leading-relaxed relative flex-1">
          <div className="flex items-center justify-between gap-4 border-b border-stone-800 pb-2.5">
            <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span className="text-yellow-300 text-sm font-black">Ⓐ</span>
              <span>{currentLeak.title}</span>
            </h4>
            <div className="text-right text-[11px] text-stone-400 shrink-0 font-mono">
              <div>{currentLeak.date}</div>
            </div>
          </div>

          {/* Карточка трансляции Амелии с фотографией */}
          {activeTab === 'amelia' && (
            <div className="p-3.5 sm:p-4 rounded-xl border border-red-700/60 bg-red-950/40 relative overflow-hidden shadow-lg shadow-black/40">
              {/* Фоновые диагональные полосы аварийного эфира */}
              <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 relative z-10">
                {/* Фотография Амелии Кольер */}
                <div className="relative group shrink-0">
                  <div className={`relative overflow-hidden rounded-lg border-2 border-red-500/80 shadow-md shadow-red-950/80 bg-black ${
                    isPhotoExpanded ? 'w-64 h-64 sm:w-72 sm:h-72' : 'w-28 h-28 sm:w-36 sm:h-36'
                  } transition-all duration-300`}>
                    <img
                      src="/assets/aistudio/Amelia.gif"
                      alt="Амелия Кольер — трансляция из технического сектора Синьялы"
                      className="w-full h-full object-cover object-center filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Наложение видеосигнала камеры наблюдения и радиомикрофона */}
                    <div className="absolute inset-0 bg-gradient-to-t from-red-950/80 via-transparent to-black/30 pointer-events-none" />
                    <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-red-600 text-white text-[9px] px-1.5 py-0.5 rounded font-black tracking-widest uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      <span>LIVE</span>
                    </div>

                    <div className="absolute top-1.5 right-1.5 bg-black/70 border border-red-800/60 text-yellow-300 text-[9px] px-1 rounded font-mono font-bold">
                      Ⓐ #A-0714
                    </div>

                    <div className="absolute bottom-1.5 left-1.5 right-1.5 text-center bg-black/85 backdrop-blur-xs py-0.5 px-1 rounded text-[10px] text-red-200 font-mono border border-red-900/50 truncate">
                      Амелия Кольер (Синьяла)
                    </div>

                    {/* Кнопка масштабирования фото */}
                    <button
                      type="button"
                      onClick={() => setIsPhotoExpanded(!isPhotoExpanded)}
                      className="absolute bottom-1.5 right-1.5 p-1 rounded bg-black/80 hover:bg-red-900 text-white transition-colors"
                      title={isPhotoExpanded ? 'Уменьшить фото' : 'Увеличить фото'}
                    >
                      {isPhotoExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="mt-1 text-center text-[10px] text-red-400/90 font-mono flex items-center justify-center gap-1">
                    <Mic className="w-3 h-3 text-red-400 animate-pulse" />
                    <span>Частота: 104.7 МГц</span>
                  </div>
                </div>

                {/* Досье и описание прямого включения */}
                <div className="space-y-1.5 text-xs text-red-200 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-white font-bold text-sm sm:text-base font-display">
                      АМЕЛИЯ КОЛЬЕР (AMELIA COLLIER)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-red-900/70 text-yellow-300 font-mono text-[10px] font-bold border border-red-700/60">
                      СТАТУС: ВНЕ КОНТРОЛЯ MURKOFF
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-red-300 font-mono pt-1">
                    <div><span className="text-stone-400">Идентификатор:</span> Реагент № A-0714</div>
                    <div><span className="text-stone-400">Местонахождение:</span> Служебный узел связи Синьялы</div>
                    <div><span className="text-stone-400">Роль:</span> Лидер сопротивления и эвакуации</div>
                    <div><span className="text-stone-400">Микрофон:</span> Студийный перехват Murkoff</div>
                  </div>

                  <p className="text-[11px] text-red-200/90 leading-relaxed pt-1.5 border-t border-red-900/40 italic">
                    «Им стоило остановить меня, когда у них была такая возможность. Murkoff заплатят за каждую жизнь, сломанную в этих павильонах. Мы вырвались из Синьялы, и теперь очередь за ними.»
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Контейнер тела документа с фоновым водяным знаком "A" */}
          <div
            className={`whitespace-pre-line p-4 sm:p-5 rounded-xl border relative overflow-hidden ${
              activeTab === 'amelia'
                ? 'bg-red-950/20 border-red-800/80 text-red-100 shadow-inner'
                : isNightVision
                ? 'border-[#2d5236] bg-black/70 text-[#bbf7d0] shadow-inner'
                : 'border-stone-800 bg-black/60 text-stone-300'
            }`}
          >
            {/* Фоновый водяной знак Амелии Кольер (буква A) */}
            {activeTab === 'amelia' && (
              <>
                <div className="absolute right-3 bottom-0 text-red-600/15 font-black text-9xl select-none pointer-events-none font-mono leading-none">
                  A
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500/10 font-black text-[180px] select-none pointer-events-none font-serif leading-none">
                  Ⓐ
                </div>
              </>
            )}

            {isRedacted ? (
              <div className="space-y-2 relative z-10">
                <span className="bg-stone-700 text-stone-700 select-none px-1 rounded">
                  [ЗАСЕКРЕЧЕННЫЙ ПРОТОКОЛ СИНЬЯЛЫ]
                </span>{' '}
                {currentLeak.content.split('. ').map((sentence, idx) => (
                  <p key={idx}>
                    {idx % 2 === 0 ? (
                      sentence
                    ) : (
                      <span className="bg-stone-700 text-stone-700 select-none px-1 rounded">
                        {sentence}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <div className="relative z-10">{currentLeak.content}</div>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-400">
            <div>
              <span className="text-stone-500">Автор перехвата:</span>{' '}
              <span className={`font-semibold ${
                activeTab === 'amelia'
                  ? 'text-red-300 underline font-mono'
                  : activeTab === 'bsaa'
                  ? 'text-rose-300'
                  : 'text-[#82e29e]'
              }`}>
                {activeTab === 'amelia' ? 'Амелия Кольер (Реагент #A-0714, Лидер Восстания Синьяла)' : currentLeak.agent}
              </span>
            </div>

            {activeTab === 'amelia' && (
              <button
                type="button"
                onClick={handleCopyWarning}
                className="px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 border border-red-700 text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-sm"
              >
                {copiedWarning ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-yellow-300" />}
                <span>{copiedWarning ? 'Скопировано!' : 'Скопировать предупреждение Амелии Кольер'}</span>
              </button>
            )}

            {activeTab !== 'amelia' && (
              <div className="flex items-center gap-1.5 text-rose-400">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>НЕ ВЕРЬТЕ ИХ УЛЫБКАМ</span>
              </div>
            )}
          </div>
        </div>

        {/* Подвал терминала */}
        <div className="px-6 py-3 bg-black/90 border-t border-stone-800 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-400 shrink-0">
          <span className="font-mono text-[11px] text-stone-500 flex items-center gap-1">
            {activeTab === 'amelia' ? (
              <>
                <span className="text-red-400 font-bold">Ⓐ АМЕЛИЯ КОЛЬЕР</span>
                <span>· Канал передачи: Взломанный Шаттл Испытаний</span>
              </>
            ) : (
              'Шифрование: Крипто-протокол 1959-1998'
            )}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 transition-colors font-sans text-xs font-semibold"
          >
            Закрыть секретный экран
          </button>
        </div>
      </div>
    </div>
  );
};
