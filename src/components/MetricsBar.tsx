import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'motion/react';

interface AnimatedNumberProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  liveTick?: boolean;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  from = 0,
  to,
  duration = 2.2,
  suffix = '',
  prefix = '',
  decimals = 0,
  liveTick = false,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [currentVal, setCurrentVal] = useState(from);
  const valRef = useRef(from);
  const animationFinishedRef = useRef(false);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(from, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(v) {
        valRef.current = v;
        setCurrentVal(v);
      },
      onComplete() {
        animationFinishedRef.current = true;
      },
    });

    return () => controls.stop();
  }, [isInView, from, to, duration]);

  // Live ticking count-up after initial scroll-triggered animation completes
  useEffect(() => {
    if (!isInView || !liveTick) return;

    const interval = setInterval(() => {
      if (animationFinishedRef.current) {
        const increment = Math.floor(Math.random() * 3) + 1;
        const nextVal = valRef.current + increment;
        valRef.current = nextVal;
        setCurrentVal(nextVal);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isInView, liveTick]);

  const formatted =
    decimals > 0
      ? currentVal.toFixed(decimals)
      : Math.floor(currentVal).toLocaleString('ru-RU');

  return (
    <span ref={ref} className="inline-block tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

export const MetricsBar: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <div ref={sectionRef} className="border-b border-stone-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch">
        {/* Слева: Показатели Umbrella (Белый и красный) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:w-1/2 p-6 sm:px-8 lg:px-12 border-b lg:border-b-0 lg:border-r border-stone-200 bg-white"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
              Статистика Фонда Umbrella · Live
            </span>
            <span className="text-xs text-stone-500 font-mono">Подтверждено полицией Раккун-Сити</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900 drop-shadow-xs">
                <AnimatedNumber from={1400000} to={1420890} suffix="+" liveTick />
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Вакцин распределено</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900">
                <AnimatedNumber from={0} to={98.4} decimals={1} suffix="%" duration={1.8} />
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Клеточная интеграция</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900">
                <AnimatedNumber from={0} to={24.5} decimals={1} suffix=" млн $" duration={2.0} />
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Гранты им. Спенсера</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-stone-900">
                <AnimatedNumber from={0} to={14} duration={1.5} />
              </div>
              <div className="text-xs text-stone-500 mt-0.5">Центров в Раккун-Сити</div>
            </div>
          </div>
        </motion.div>

        {/* Справа: Показатели Murkoff (Тёмно-зелёный болотный с шумом) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
          className="lg:w-1/2 p-6 sm:px-8 lg:px-12 murkoff-swamp-bg text-stone-200 border-l border-[#1f3825]"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#82e29e] font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#82e29e] animate-pulse" />
              Murkoff · Live 1959 г.
            </span>
            <span className="text-xs text-stone-300 font-mono">Попечительский совет д-ра Истермана</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#82e29e] drop-shadow-sm">
                <AnimatedNumber from={14000} to={14890} suffix="+" liveTick />
              </div>
              <div className="text-xs text-stone-300 mt-0.5">Граждан получили приют</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#82e29e] drop-shadow-sm">
                <AnimatedNumber from={0} to={99.4} decimals={1} suffix="%" duration={1.8} />
              </div>
              <div className="text-xs text-stone-300 mt-0.5">Успешная социализация</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#82e29e] drop-shadow-sm">
                <AnimatedNumber from={0} to={420} suffix="+" duration={2.1} />
              </div>
              <div className="text-xs text-stone-300 mt-0.5">Детских спектаклей</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#82e29e] drop-shadow-sm">
                0 ₽
              </div>
              <div className="text-xs text-stone-300 mt-0.5">Плата за пансион</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
