import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { toast } from 'sonner';
import productBox from '@/assets/product-box.jpg';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { addItem } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePreorder = () => {
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

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-background/50"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-end h-14">
              <Button variant="gold" size="sm" onClick={handlePreorder}>
                Оформить предзаказ
              </Button>
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default Header;
