import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight-900/50 via-transparent to-midnight-900/50 pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gradient-gold mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ответы на популярные вопросы о предзаказе
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gold/20 rounded-lg bg-midnight-800/50 backdrop-blur-sm px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-gold hover:no-underline py-5 font-display text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
