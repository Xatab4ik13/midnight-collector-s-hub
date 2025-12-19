import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { z } from 'zod';

const orderSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно содержать минимум 2 символа').max(100),
  phone: z.string().trim().min(10, 'Введите корректный номер телефона').max(20),
  address: z.string().trim().min(10, 'Введите полный адрес доставки СДЭК').max(500),
  comment: z.string().max(1000).optional(),
});

const OrderForm = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendToTelegram = async (data: typeof formData) => {
    // For demo purposes - you'll need to set up a Telegram bot and add the token
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      // If no token configured, just simulate success
      return true;
    }

    const message = `
🎮 *Новая заявка на WoW: Midnight*

👤 *Имя:* ${data.name}
📞 *Телефон:* ${data.phone}
📍 *Адрес СДЭК:* ${data.address}
${data.comment ? `💬 *Комментарий:* ${data.comment}` : ''}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
      return response.ok;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = orderSchema.parse(formData);
      const success = await sendToTelegram(formData);

      if (success) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время для подтверждения заказа.',
        });
        setFormData({ name: '', phone: '', address: '', comment: '' });
      } else {
        toast.error('Ошибка отправки', {
          description: 'Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.',
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('Проверьте данные', {
          description: error.errors[0].message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="order" className="py-20 md:py-32 relative" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Остались вопросы?
            </h2>
            <p className="text-muted-foreground">
              Заполните форму и мы свяжемся с вами
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-card/50 backdrop-blur border border-border/50 rounded-2xl p-6 md:p-8 space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Имя *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ваше имя"
                  className="bg-background/50 border-border focus:border-gold"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Телефон *
                </label>
                <Input
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (999) 123-45-67"
                  className="bg-background/50 border-border focus:border-gold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Адрес доставки СДЭК *
              </label>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Город, улица, дом, квартира"
                className="bg-background/50 border-border focus:border-gold"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Комментарий
              </label>
              <Textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Дополнительная информация (необязательно)"
                className="bg-background/50 border-border focus:border-gold resize-none"
                rows={3}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Отправить заявку
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
