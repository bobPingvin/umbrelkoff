import React from 'react';
import { motion } from 'motion/react';
import { UmbrellaLogo } from './UmbrellaLogo';
import { MurkoffLogo } from './MurkoffLogo';
import { scrollRevealProps } from './Reveal';

interface FooterProps {
  onOpenSecretTerminal: () => void;
  onLockClick?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer id="contacts" className="bg-stone-950 text-stone-400 text-xs border-t border-stone-800 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch border-b border-stone-800">
        {/* Левая половина: Подвал Umbrella (Белый и красный) */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 border-b lg:border-b-0 lg:border-r border-stone-800 bg-[#0e0e11]">
          <motion.div {...scrollRevealProps({ y: 14, duration: 0.6 })}>
            <div className="flex items-center gap-3 mb-4">
              <UmbrellaLogo size={40} />
              <div>
                <span className="font-display font-bold text-stone-200 text-sm block">
                  Международный Фонд Здоровья Umbrella
                </span>
                <span className="text-[11px] text-rose-400 font-mono">Наше призвание — сама жизнь</span>
              </div>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed mb-4 max-w-md">
              Мы строим мир, свободный от болезней, слабости и клеточного старения. Бесплатные вакцинационные пункты в Раккун-Сити открыты круглосуточно.
            </p>
            <div className="space-y-1.5 text-[11px] text-stone-500 font-mono">
              <div>Лицензия био-фармацевтического надзора № 1998-Т-АЛЬФА</div>
              <div>Центральная лаборатория: Медицинский комплекс в лесах Арклей</div>
              <div>Горячая линия доверия: 8-800-UMB-LIFE</div>
            </div>
          </motion.div>
        </div>

        {/* Правая половина: Подвал Murkoff (Тёмно-зелёный болотный с шумом) */}
        <div className="lg:w-1/2 p-5 sm:p-7 lg:p-9 murkoff-swamp-bg text-stone-300">
          <motion.div {...scrollRevealProps({ delay: 0.08, y: 14, duration: 0.6 })}>
            <div className="flex items-center gap-3 mb-4">
              <MurkoffLogo size={40} className="ring-2 ring-[#82e29e]" />
              <div>
                <span className="font-display font-bold text-white text-sm block">
                  Благотворительный Фонд Murkoff · 1959 г.
                </span>
                <span className="text-[11px] text-[#82e29e] font-mono">Забота, душевный покой и социальная гармония</span>
              </div>
            </div>
            <p className="text-stone-300 text-xs leading-relaxed mb-4 max-w-md">
              Мы протягиваем руку помощи каждому, кто остался без поддержки. Вместе с доктором Истерманом мы помогаем преодолеть жизненные трудности и обрести душевное спокойствие в заботливом окружении.
            </p>
            <div className="space-y-1.5 text-[11px] text-stone-300 font-mono">
              <div>Санаторный комплекс: Загородный корпус Синьявского, Сектор С-1</div>
              <div>Кураторы программ: Матушка Гузберри, офицер Лиланд Койл, Франко Барби</div>
              <div>Горячая линия поддержки: 8-800-MRK-1959</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Нижняя полоса */}
      <motion.div
        {...scrollRevealProps({ delay: 0.1, y: 10, duration: 0.5 })}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col items-center justify-center text-center gap-1.5 text-[11px]"
      >
        <div className="text-stone-500 text-center">
          © 1959–2026 Объединённый Гуманитарный Комитет Umbrella & Murkoff. Все права на благотворительные программы защищены.
        </div>
        <div className="flex items-center justify-center gap-2 text-stone-500">
          <span>Политика благотворительной заботы</span>
        </div>
      </motion.div>
    </footer>
  );
};
