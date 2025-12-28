import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, Clock, Flame } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-midnight.webp';
import { useEffect, useState } from 'react';

const HeroSection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Calculate time until 15.01.2026
  useEffect(() => {
    const targetDate = new Date('2026-01-15T23:59:59');
    
    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePreorder = async () => {
    const { default: productBox } = await import('@/assets/product-box.jpg');

    addItem({
      id: 'wow-midnight-collectors',
      name: "WoW: Midnight Collector's Edition",
      price: 100,
      image: productBox,
    });
    toast.success('Товар добавлен в корзину!', {
      description: 'Перейдите в корзину для оформления предзаказа',
    });
    navigate('/cart');
  };

  const scrollToContents = () => {
    const element = document.getElementById('contents');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
        role="img"
        aria-label="World of Warcraft: Midnight - эпический игровой арт"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Mystic Overlay */}
      <div className="absolute inset-0 bg-hero-gradient opacity-60" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        {/* Sale Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-destructive/20 border border-destructive/40 rounded-full backdrop-blur-sm animate-pulse">
            <Flame className="w-5 h-5 text-destructive" />
            <span className="text-sm font-bold text-destructive uppercase tracking-wider">
              Акция — Скидка 55%
            </span>
            <Flame className="w-5 h-5 text-destructive" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-gold font-sans text-sm md:text-base uppercase tracking-[0.3em] font-medium">
            Коллекционное издание
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-wide"
        >
          <span className="text-gold block">World of Warcraft:</span>
          <span className="text-foreground block mt-2">Midnight</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light tracking-wide"
        >
          Эксклюзивное коллекционное издание с уникальными артефактами,
          артбуком и внутриигровыми бонусами. Доставка по всей России.
        </motion.p>

        {/* Price Block with Sale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-8"
        >
          <div className="inline-flex flex-col items-center gap-2 px-8 py-6 bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl">
            {/* Old Price with strikethrough */}
            <div className="relative">
              <span className="text-muted-foreground text-xl md:text-2xl font-light line-through decoration-destructive decoration-2">
                40 000 ₽
              </span>
            </div>
            
            {/* New Price with glow animation */}
            <motion.div 
              className="flex items-baseline gap-3"
              animate={{ 
                textShadow: [
                  '0 0 10px hsl(45 93% 58% / 0.3)',
                  '0 0 25px hsl(45 93% 58% / 0.6)',
                  '0 0 10px hsl(45 93% 58% / 0.3)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-gold font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                18 000 ₽
              </span>
            </motion.div>

            {/* Savings badge */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full">
                Выгода: 22 000 ₽
              </span>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-10"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-gold" />
            <span className="text-muted-foreground font-medium text-sm md:text-base">
              Акция действует до 15 января 2026
            </span>
          </div>
          
          <div className="flex justify-center gap-2 md:gap-4">
            {[
              { value: timeLeft.days, label: 'дней' },
              { value: timeLeft.hours, label: 'часов' },
              { value: timeLeft.minutes, label: 'минут' },
              { value: timeLeft.seconds, label: 'секунд' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                className="flex flex-col items-center"
              >
                <div className="w-14 h-14 md:w-18 md:h-18 lg:w-20 lg:h-20 flex items-center justify-center bg-midnight-light/80 backdrop-blur-sm border border-gold/30 rounded-xl">
                  <span className="text-gold font-display text-xl md:text-2xl lg:text-3xl font-bold">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-muted-foreground text-xs md:text-sm mt-2 font-light">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Button 
            variant="hero" 
            size="xl" 
            onClick={handlePreorder}
            className="relative overflow-hidden group"
          >
            <span className="relative z-10">Оформить предзаказ</span>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-gold-dark via-gold to-gold-dark"
              animate={{ x: ['0%', '100%', '0%'] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ opacity: 0.3 }}
            />
          </Button>
          <span className="text-muted-foreground text-sm font-light">
            Успейте приобрести по выгодной цене
          </span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToContents}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        aria-label="Прокрутить к содержимому"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-8 h-8 text-gold/60 hover:text-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default HeroSection;
