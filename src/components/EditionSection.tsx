import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import productBox from '@/assets/product-box.jpg';

const EditionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: 'wow-midnight-collectors',
      name: 'WoW: Midnight Collector\'s Edition',
      price: 18000,
      image: productBox,
    });
    toast.success('Товар добавлен в корзину!', {
      description: 'Перейдите в корзину для оформления предзаказа',
    });
  };

  return (
    <section id="edition" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mystic/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <img
                src={productBox}
                alt="WoW Midnight Collector's Edition Box"
                className="w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-lg glow-mystic opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-mystic font-display text-sm uppercase tracking-[0.3em] mb-4 block">
              Ограниченный тираж
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Collector's Edition
            </h2>

            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Погрузитесь в тьму Midnight с эксклюзивным коллекционным изданием.
              Премиальная упаковка, уникальные физические предметы и эксклюзивные
              внутриигровые награды для истинных ценителей.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-card border border-border rounded-lg px-4 py-3">
                <span className="text-gold font-display font-bold text-2xl">18 000 ₽</span>
              </div>
              <div className="bg-mystic/20 border border-mystic/30 rounded-lg px-4 py-3">
                <span className="text-mystic-light text-sm">В наличии: 47 шт.</span>
              </div>
            </div>

            <Button variant="gold" size="lg" onClick={handleAddToCart}>
              Добавить в корзину
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EditionSection;
