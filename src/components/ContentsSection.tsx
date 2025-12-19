import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Key, Package, BookOpen, Heart, Award } from 'lucide-react';

const contents = [
  {
    icon: Key,
    title: 'Цифровой ключ',
    description: 'Ключ для РФ/РБ World of Warcraft: Midnight Epic Edition со всеми цифровыми бонусами',
  },
  {
    icon: Package,
    title: 'Коллекционная коробка',
    description: 'Коробка коллекционного издания — примерно 35 × 33 × 9 см',
  },
  {
    icon: BookOpen,
    title: 'Артбук Midnight',
    description: 'Артбук в твердой обложке — 208 страниц, размер 21,5 × 27 см',
  },
  {
    icon: Heart,
    title: 'Реплика Темного Сердца',
    description: 'Детализированная реплика Темного Сердца с LED подсветкой',
  },
  {
    icon: Award,
    title: 'Коллекционный значок',
    description: 'Значок с Ксал\'атат и Аратором',
  },
];

const ContentsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contents" className="py-20 md:py-32 bg-midnight-gradient relative" ref={ref}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-display text-sm uppercase tracking-[0.3em] mb-4 block">
            Что внутри
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Состав издания
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 hover:border-gold/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(45_93%_58%_/_0.1)]"
            >
              <div className="w-12 h-12 rounded-lg bg-mystic/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <item.icon className="w-6 h-6 text-mystic group-hover:text-gold transition-colors" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentsSection;
