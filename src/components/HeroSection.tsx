import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-midnight.webp';

const HeroSection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handlePreorder = async () => {
    const { default: productBox } = await import('@/assets/product-box.jpg');

    addItem({
      id: 'wow-midnight-collectors',
      name: "WoW: Midnight Collector's Edition",
      price: 22000,
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

        {/* Price Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-10"
        >
          <div className="inline-flex flex-col items-center gap-2 px-8 py-6 bg-card/60 backdrop-blur-md border border-border/50 rounded-2xl">
            <span className="text-gold font-display text-4xl md:text-5xl lg:text-6xl font-bold">
              22 000 ₽
            </span>
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
