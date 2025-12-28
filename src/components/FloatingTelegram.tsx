import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const TELEGRAM_LINK = 'https://t.me/wowmidnighstore_bot';

const FloatingTelegram = () => {
  return (
    <a 
      href={TELEGRAM_LINK} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="fixed bottom-6 left-6 z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-card/80 backdrop-blur-md border border-gold/30 flex items-center justify-center shadow-[0_0_30px_hsl(45_93%_58%_/_0.2)] hover:shadow-[0_0_40px_hsl(45_93%_58%_/_0.3)] transition-shadow"
      >
        <MessageCircle className="h-7 w-7 text-gold" />
      </motion.div>
    </a>
  );
};

export default FloatingTelegram;
