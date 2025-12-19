import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, Loader2, MessageCircleQuestion } from 'lucide-react';
import { z } from 'zod';

const faqs = [
  {
    question: 'Можно ли вскрыть коробку и отправить ключ раньше?',
    answer: 'Да. При оформлении заказа поставьте галочку — наш агент за рубежом вскроет коробку и отправит вам ключ заранее.',
  },
  {
    question: 'Когда Blizzard отправит коробки?',
    answer: 'Это предзаказ. Ориентировочные сроки отправки и доставки будут ближе к релизу, который состоится 2 марта.',
  },
  {
    question: 'Через сколько коробки приедут в Россию?',
    answer: 'Обычно доставка из США до России занимает от 14 до 28 дней (в зависимости от логистики и работы служб доставки).',
  },
];

const orderSchema = z.object({
  name: z.string().trim().min(2, 'Имя должно содержать минимум 2 символа').max(100),
  phone: z.string().trim().min(10, 'Введите корректный номер телефона').max(20),
  address: z.string().trim().min(10, 'Введите полный адрес доставки СДЭК').max(500),
  comment: z.string().max(1000).optional(),
});

const FAQSection = () => {
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
    const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
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
      orderSchema.parse(formData);
      const success = await sendToTelegram(formData);

      if (success) {
        toast.success('Заявка отправлена!', {
          description: 'Мы свяжемся с вами в ближайшее время.',
        });
        setFormData({ name: '', phone: '', address: '', comment: '' });
      } else {
        toast.error('Ошибка отправки', {
          description: 'Пожалуйста, попробуйте позже.',
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
    <section id="order" className="py-20 md:py-32 bg-background relative overflow-hidden" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/50 via-transparent to-midnight-900/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4">
            Есть вопросы?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Найдите ответ ниже или свяжитесь с нами
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* FAQ Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <MessageCircleQuestion className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-foreground">Частые вопросы</h3>
            </div>
            
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gold/20 rounded-xl bg-midnight-800/50 backdrop-blur-sm px-5 overflow-hidden data-[state=open]:border-gold/40 transition-colors"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-gold hover:no-underline py-4 text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center">
                <Send className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display text-xl text-foreground">Напишите нам</h3>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-midnight-800/50 backdrop-blur border border-gold/20 rounded-xl p-6 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4">
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
                  placeholder="Адрес СДЭК, из которого хотите забрать посылку"
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
                  placeholder="Дополнительная информация"
                  className="bg-background/50 border-border focus:border-gold resize-none"
                  rows={3}
                />
              </div>

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
                    Отправить
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
