import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-display text-xl md:text-2xl font-bold text-gold tracking-wider">
            WoW: MIDNIGHT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('edition')}
              className="text-muted-foreground hover:text-gold transition-colors font-medium"
            >
              Издание
            </button>
            <button
              onClick={() => scrollToSection('contents')}
              className="text-muted-foreground hover:text-gold transition-colors font-medium"
            >
              Состав
            </button>
            <button
              onClick={() => scrollToSection('order')}
              className="text-muted-foreground hover:text-gold transition-colors font-medium"
            >
              Заказать
            </button>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative">
              <Button variant="ghostGold" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-mystic text-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 py-4"
            >
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('edition')}
                  className="text-muted-foreground hover:text-gold transition-colors font-medium text-left"
                >
                  Издание
                </button>
                <button
                  onClick={() => scrollToSection('contents')}
                  className="text-muted-foreground hover:text-gold transition-colors font-medium text-left"
                >
                  Состав
                </button>
                <button
                  onClick={() => scrollToSection('order')}
                  className="text-muted-foreground hover:text-gold transition-colors font-medium text-left"
                >
                  Заказать
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
