import { Link } from 'react-router-dom';
import PaymentMethods from './PaymentMethods';

const Footer = () => {
  return (
    <footer className="bg-midnight-light border-t border-border/50 py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <div className="mb-2">
          <p className="text-muted-foreground text-xs mb-3">Способы оплаты</p>
          <PaymentMethods />
        </div>
        <p className="text-muted-foreground text-sm">
          Индивидуальный предприниматель Скилягин Михаил Михайлович
        </p>
        <p className="text-muted-foreground text-xs">
          ИНН: 781151655900, ОГРН/ОГРНИП: 318784700314243
        </p>
        <p className="text-muted-foreground text-xs">
          © 2025 wowmidnight.store. Все права защищены.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/privacy" 
            className="text-muted-foreground text-xs hover:text-primary transition-colors underline"
          >
            Политика конфиденциальности
          </Link>
          <Link 
            to="/consent" 
            className="text-muted-foreground text-xs hover:text-primary transition-colors underline"
          >
            Согласие на обработку персональных данных
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
