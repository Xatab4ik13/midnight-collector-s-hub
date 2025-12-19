import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-light border-t border-border/50 py-8">
      <div className="container mx-auto px-4 text-center space-y-3">
        <p className="text-muted-foreground text-sm">
          Индивидуальный предприниматель Ходотович Алена Андреевна
        </p>
        <p className="text-muted-foreground text-xs">
          ИНН: 183212358703, ОГРНИП: 324784700132872
        </p>
        <p className="text-muted-foreground text-xs">
          © 2024 WoW Midnight Shop. Все права защищены.
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
