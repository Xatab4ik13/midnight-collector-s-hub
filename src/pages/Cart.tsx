import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart';
import { useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

const checkoutSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().trim().min(10, 'Введите корректный номер телефона'),
  email: z.string().trim().email('Введите корректный email'),
  address: z.string().trim().min(10, 'Введите полный адрес доставки'),
});

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      checkoutSchema.parse(formData);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Send to Telegram (same as order form)
      const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (botToken && chatId) {
        const itemsList = items
          .map((item) => `• ${item.name} x${item.quantity} — ${(item.price * item.quantity).toLocaleString()} ₽`)
          .join('\n');

        const message = `
💳 *Новый заказ (оплачен)*

👤 *Имя:* ${formData.name}
📞 *Телефон:* ${formData.phone}
📧 *Email:* ${formData.email}
📍 *Адрес:* ${formData.address}

📦 *Товары:*
${itemsList}

💰 *Итого:* ${getTotalPrice().toLocaleString()} ₽
        `.trim();

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        });
      }

      toast.success('Заказ оформлен!', {
        description: 'Спасибо за покупку! Мы свяжемся с вами для подтверждения.',
      });
      clearCart();
      setShowCheckout(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Проверьте данные', {
          description: error.errors[0].message,
        });
      } else {
        toast.error('Ошибка оплаты', {
          description: 'Пожалуйста, попробуйте позже.',
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Вернуться к покупкам
            </Link>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Корзина
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground text-lg mb-6">
                Ваша корзина пуста
              </p>
              <Link to="/">
                <Button variant="gold">Перейти к товарам</Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-xl p-4 md:p-6 flex gap-4 md:gap-6"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gold font-bold text-lg mb-4">
                        {item.price.toLocaleString()} ₽
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-muted rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:text-gold transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:text-gold transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-xl text-foreground">
                        {(item.price * item.quantity).toLocaleString()} ₽
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-xl p-6 sticky top-24"
                >
                  <h3 className="font-display text-xl font-semibold text-foreground mb-6">
                    Итого
                  </h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Товары</span>
                      <span>{getTotalPrice().toLocaleString()} ₽</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Доставка</span>
                      <span className="text-green-500">Бесплатно</span>
                    </div>
                    <div className="border-t border-border pt-3">
                      <div className="flex justify-between text-foreground font-bold text-xl">
                        <span>Итого</span>
                        <span className="text-gold">{getTotalPrice().toLocaleString()} ₽</span>
                      </div>
                    </div>
                  </div>

                  {!showCheckout ? (
                    <Button
                      variant="gold"
                      size="lg"
                      className="w-full"
                      onClick={() => setShowCheckout(true)}
                    >
                      <CreditCard className="w-5 h-5" />
                      Оформить заказ
                    </Button>
                  ) : (
                    <form onSubmit={handleCheckout} className="space-y-4">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                        className="bg-background/50"
                        required
                      />
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Телефон"
                        className="bg-background/50"
                        required
                      />
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="bg-background/50"
                        required
                      />
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Адрес доставки"
                        className="bg-background/50"
                        required
                      />
                      <Button
                        type="submit"
                        variant="hero"
                        className="w-full"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Обработка...' : 'Оплатить'}
                      </Button>
                    </form>
                  )}
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
