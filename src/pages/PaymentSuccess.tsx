import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Mail, MessageCircle, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  
  // Get order info from URL params (set by IntellectMoney redirect)
  const orderId = searchParams.get('orderId') || searchParams.get('paymentId');

  // Clear cart on successful payment
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 pt-12 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="mb-8"
            >
              <div className="w-24 h-24 mx-auto bg-emerald-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-14 h-14 text-emerald-500" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4"
            >
              Оплата прошла успешно!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg mb-8"
            >
              Спасибо за ваш заказ. Мы уже начали его обработку.
            </motion.p>

            {/* Order Info Card */}
            {orderId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-card border border-border rounded-xl p-6 mb-8"
              >
                <div className="bg-gold/10 border border-gold/30 rounded-lg px-6 py-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Номер заказа</p>
                  <p className="text-gold font-display text-2xl font-bold tracking-wider">
                    {orderId}
                  </p>
                </div>

                <p className="text-muted-foreground text-sm">
                  Сохраните номер заказа — он понадобится для отслеживания доставки
                </p>
              </motion.div>
            )}

            {/* What's Next */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-card border border-border rounded-xl p-6 mb-8"
            >
              <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                Что дальше?
              </h2>

              <div className="space-y-4 text-left">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Письмо с подтверждением</h3>
                    <p className="text-sm text-muted-foreground">
                      На вашу почту отправлено письмо с деталями заказа и чеком
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-mystic/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 text-mystic-light" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Свяжемся с вами</h3>
                    <p className="text-sm text-muted-foreground">
                      Мы подтвердим адрес доставки и уточним детали
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Отправка заказа</h3>
                    <p className="text-sm text-muted-foreground">
                      Как только коллекционное издание поступит, мы отправим его через СДЭК
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/">
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  <Home className="w-5 h-5" />
                  На главную
                </Button>
              </Link>
              
              <a href="https://t.me/wowmidnighstore_bot" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-mystic/50 text-mystic-light hover:bg-mystic/10">
                  <MessageCircle className="w-5 h-5" />
                  Написать в Telegram
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
