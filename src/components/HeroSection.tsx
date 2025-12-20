import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-midnight.webp';
import productBox from '@/assets/product-box.jpg';

const HeroSection = () => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handlePreorder = () => {
    addItem({
      id: 'wow-midnight-collectors',
      name: "WoW: Midnight Collector's Edition",
      price: 18000,
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
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-mystic-light font-display text-sm md:text-base uppercase tracking-[0.3em]">
            Коллекционное издание
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="text-gradient-gold">World of Warcraft</span>
          <br />
          <span className="text-foreground">MIDNIGHT</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          Эксклюзивное коллекционное издание с уникальными артефактами,
          артбуком и внутриигровыми бонусами. Доставка по всей России.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button variant="hero" size="xl" onClick={handlePreorder}>
            Оформить предзаказ
          </Button>
          <span className="text-gold font-display text-2xl md:text-3xl font-bold">
            18 000 ₽
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
