import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { scrollRevealProps } from './Reveal';

interface FaqBannerProps {
  onOpenFaq: () => void;
}

export const FaqBanner: React.FC<FaqBannerProps> = ({ onOpenFaq }) => {
  return (
    <section
      id="faq"
      className="bg-stone-100 border-b border-stone-200 overflow-hidden"
    >
      <motion.div
        {...scrollRevealProps({ y: 14, duration: 0.55 })}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left"
      >
        <div>
          <h2 className="text-base sm:text-lg font-display font-bold text-stone-900 tracking-tight">
            Остались вопросы о порядке прибытия и условиях пребывания?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Ознакомьтесь с официальными ответами попечительских советов Umbrella и Murkoff.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenFaq}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-stone-300" />
          <span>Часто задаваемые вопросы</span>
        </button>
      </motion.div>
    </section>
  );
};
