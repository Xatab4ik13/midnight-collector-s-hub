import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Building2, Receipt, Award } from 'lucide-react';

const guarantees = [
  {
    icon: ShieldCheck,
    title: 'Официальные поставки',
    description: 'wow-midnight работает «в белую» и поставляет товары напрямую от издателей. Это означает надёжную покупку: коды не отзываются со временем, а заказы проходят без неприятных сюрпризов.',
  },
  {
    icon: Building2,
    title: 'Юридическое лицо',
    description: 'Внизу страницы указаны реальные реквизиты нашего юридического лица — именно от него вы получаете чеки. Мы работаем официально, платим налоги и ведём честный бизнес.',
  },
  {
    icon: Receipt,
    title: 'Кассовый чек',
    description: 'В соответствии с 54-ФЗ мы выдаём кассовый чек на каждую покупку. Данные по чеку передаются в ФНС, а сам чек можно проверить через сервис на nalog.ru.',
  },
  {
    icon: Award,
    title: 'Проверенная репутация',
    description: 'Репутация для нас важна, поэтому мы работаем только надёжно и прозрачно. За прошлый год доставили в Россию свыше 5000 коллекционных изданий World of Warcraft.',
  },
];

const GuaranteesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="guarantees" className="py-20 md:py-32 relative overflow-hidden" ref={ref}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-display text-sm uppercase tracking-[0.3em] mb-4 block">
            Почему нам доверяют
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Наши гарантии
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {guarantees.map((guarantee, index) => {
            const Icon = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="group relative bg-card/50 backdrop-blur-sm border border-border hover:border-gold/30 rounded-xl p-6 lg:p-8 transition-all duration-300"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors duration-300">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-lg lg:text-xl font-semibold text-foreground mb-3">
                      {guarantee.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {guarantee.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
