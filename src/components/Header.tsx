import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navLinks = [
  { id: 'contents', label: 'Состав' },
  { id: 'guarantees', label: 'Гарантии' },
  { id: 'order', label: 'Вопросы' },
];

const Header = () => {
  const { getTotalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-gold/20 shadow-lg shadow-background/50'
          : 'bg-gradient-to-b from-background/80 to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className={cn(
          'flex items-center justify-between transition-all duration-300',
          isScrolled ? 'h-14' : 'h-16 md:h-20'
        )}>
          {/* Logo */}
          <Link 
            to="/" 
            className="font-display text-xl md:text-2xl font-bold text-gradient-gold tracking-wider hover:opacity-80 transition-opacity"
            aria-label="WoW Midnight - На главную"
          >
            WoW: MIDNIGHT
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-muted-foreground hover:text-gold transition-colors font-medium text-sm"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Cart & CTA & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* CTA Button - Desktop */}
            <Button
              variant="gold"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => scrollToSection('order')}
            >
              Заказать
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative" aria-label={`Корзина, ${totalItems} товаров`}>
              <Button variant="ghostGold" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-mystic text-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  aria-hidden="true"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gold p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMenuOpen}
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
              className="md:hidden border-t border-gold/20 py-4"
              aria-label="Мобильная навигация"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-foreground hover:text-gold transition-colors font-medium text-left py-1"
                  >
                    {link.label}
                  </button>
                ))}
                <Button
                  variant="gold"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => scrollToSection('order')}
                >
                  Оформить заказ
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
