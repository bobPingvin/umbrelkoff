import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSplit } from './components/HeroSplit';
import { MetricsBar } from './components/MetricsBar';
import { ProgramsGrid } from './components/ProgramsGrid';
import { TestimonialsSection } from './components/TestimonialsSection';
import { VolunteerForm } from './components/VolunteerForm';
import { QuizModal } from './components/QuizModal';
import { SecretTerminalModal } from './components/SecretTerminalModal';
import { Footer } from './components/Footer';
import { NewsFeed } from './components/NewsFeed';
import { FaqSection } from './components/FaqSection';
import { CustomCursor } from './components/CustomCursor';
import { Corporation, CharityProgram } from './types';
import { Radio } from 'lucide-react';

export default function App() {
  const [splitMode, setSplitMode] = useState<'split' | 'umbrella' | 'murkoff'>('split');
  const [selectedCorpForVolunteer, setSelectedCorpForVolunteer] = useState<Corporation>('umbrella');
  const [selectedProgramTitle, setSelectedProgramTitle] = useState<string>('');

  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSecretTerminalOpen, setIsSecretTerminalOpen] = useState(false);
  const [secretTerminalTab, setSecretTerminalTab] = useState<'amelia' | 'bsaa' | 'waylon'>('amelia');

  // Секретный клавиатурный ритуал (полностью скрыт в интерфейсе)
  const [, setKeySequence] = useState<string>('');
  const [isGlitching, setIsGlitching] = useState(false);
  const [, setLogoSequence] = useState<string[]>([]);

  // Скрытый клавиатурный ритуал: ввод "AMELIA" или "АМЕЛИЯ" или клавиатурной раскладки "fvtktz"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Игнорируем если фокус в текстовых полях
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      const char = e.key.toUpperCase();
      if (char.length === 1) {
        setKeySequence((prev) => {
          const updated = (prev + char).slice(-10);
          // Проверяем ввод: AMELIA, АМЕЛИЯ, или русская раскладка (FVTKTZ)
          if (
            updated.includes('AMELIA') ||
            updated.includes('АМЕЛИЯ') ||
            updated.includes('FVTKTZ')
          ) {
            triggerAmeliaGlitch('amelia');
            return '';
          }
          return updated;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerAmeliaGlitch = (tab: 'amelia' | 'bsaa' | 'waylon' = 'amelia') => {
    setIsGlitching(true);
    setSecretTerminalTab(tab);

    // Звуковой отклик секретного радиосигнала
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);
    } catch {
      // Игнорировать
    }

    setTimeout(() => {
      setIsGlitching(false);
      setIsSecretTerminalOpen(true);
    }, 600);
  };

  // Скрытый ритуал последовательного нажатия логотипов: Umbrella -> Murkoff -> Lock
  const handleLogoClick = (logoName: 'umbrella' | 'murkoff' | 'lock') => {
    setLogoSequence((prev) => {
      const updated = [...prev, logoName].slice(-3);
      if (updated.join('-') === 'umbrella-murkoff-lock') {
        triggerAmeliaGlitch('amelia');
        return [];
      }
      return updated;
    });
  };

  const handleSelectCorpForVolunteer = (corp: Corporation) => {
    setSelectedCorpForVolunteer(corp);
    setSelectedProgramTitle('');
    const formElement = document.getElementById('volunteer-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleApplyForProgram = (program: CharityProgram) => {
    setSelectedCorpForVolunteer(program.corp);
    setSelectedProgramTitle(program.title);
    const formElement = document.getElementById('volunteer-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuizResult = (corp: Corporation) => {
    setSelectedCorpForVolunteer(corp);
    const formElement = document.getElementById('volunteer-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-rose-500/20 selection:text-rose-900 relative overflow-x-clip">
      {/* Скрытый экранный эффект при успешном выполнении ритуала Амелии */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 bg-red-950/90 mix-blend-difference flex flex-col items-center justify-center text-red-500 font-mono p-4 animate-pulse">
          <Radio className="w-16 h-16 text-red-500 animate-spin mb-4" />
          <h2 className="text-xl sm:text-3xl font-black tracking-widest text-white text-center">
            [🔴 ЭКСТРЕННЫЙ ПЕРЕХВАТ СИНЬЯЛЫ // РЕАГЕНТ АМЕЛИЯ #A-0714]
          </h2>
          <p className="text-red-400 mt-2 text-sm text-center">
            Частота шаттла 104.7 МГц перехвачена... Открытие защищённого архива...
          </p>
        </div>
      )}

      {/* Кастомный курсор */}
      <CustomCursor enabled />

      {/* Чистая шапка сайта (без подозрительных элементов) */}
      <Header
        splitMode={splitMode}
        onSplitChange={setSplitMode}
        onOpenVolunteerModal={() => handleSelectCorpForVolunteer('umbrella')}
        onOpenSecretTerminal={() => {
          setSecretTerminalTab('amelia');
          setIsSecretTerminalOpen(true);
        }}
        onOpenQuizModal={() => setIsQuizOpen(true)}
        onUmbrellaClick={() => handleLogoClick('umbrella')}
        onMurkoffClick={() => handleLogoClick('murkoff')}
      />

      {/* Основные разделы благотворительного фонда */}
      <main className="flex-1">
        {/* Раздельный баннер Umbrella / Murkoff */}
        <HeroSplit
          splitMode={splitMode}
          onSelectCorpForVolunteer={handleSelectCorpForVolunteer}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Статистическая полоса */}
        <MetricsBar />

        {/* Гуманитарные программы */}
        <ProgramsGrid onApplyForProgram={handleApplyForProgram} />

        {/* Гуманитарная хроника и позитивные новости */}
        <NewsFeed />

        {/* Отзывы участников */}
        <TestimonialsSection />

        {/* Форма подачи заявления волонтера */}
        <VolunteerForm
          initialCorp={selectedCorpForVolunteer}
          preselectedProgramTitle={selectedProgramTitle}
        />

        {/* Справочный раздел с кнопкой вызова FAQ перед подвалом */}
        <FaqSection />
      </main>

      {/* Спокойный благотворительный подвал */}
      <Footer
        onOpenSecretTerminal={() => {
          setSecretTerminalTab('amelia');
          setIsSecretTerminalOpen(true);
        }}
        onLockClick={() => handleLogoClick('lock')}
      />

      {/* Интерактивный тест */}
      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectResult={handleQuizResult}
      />

      {/* Секретный архив (открывается только по ритуалу или кнопке прозрачности в подвале) */}
      <SecretTerminalModal
        isOpen={isSecretTerminalOpen}
        onClose={() => setIsSecretTerminalOpen(false)}
        defaultTab={secretTerminalTab}
      />
      </div>
    </MotionConfig>
  );
}
