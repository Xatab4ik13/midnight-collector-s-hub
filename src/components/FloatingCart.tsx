import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart';

const FloatingCart = () => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link to="/cart" className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 rounded-full bg-card/80 backdrop-blur-md border border-gold/30 flex items-center justify-center shadow-[0_0_30px_hsl(45_93%_58%_/_0.2)] hover:shadow-[0_0_40px_hsl(45_93%_58%_/_0.3)] transition-shadow"
      >
        <ShoppingCart className="h-7 w-7 text-gold" />
        {totalItems > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-mystic text-foreground text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 border-card"
          >
            {totalItems}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

export default FloatingCart;
