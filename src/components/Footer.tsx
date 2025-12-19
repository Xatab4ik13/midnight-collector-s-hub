import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-light border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="font-display text-xl font-bold text-gold tracking-wider">
              WoW: MIDNIGHT
            </Link>
            <p className="text-muted-foreground text-sm mt-3 max-w-xs">
              Официальный реселлер коллекционных изданий игр Blizzard Entertainment в России
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Информация
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  Доставка и оплата
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  Возврат и обмен
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-gold transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Связаться с нами
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">
                Telegram: @wow_midnight_shop
              </li>
              <li className="text-muted-foreground">
                Email: support@wow-midnight.ru
              </li>
              <li className="text-muted-foreground">
                Тел: +7 (800) 123-45-67
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2024 WoW Midnight Shop. Все права защищены.
          </p>
          <p className="text-muted-foreground text-xs">
            World of Warcraft® является торговой маркой Blizzard Entertainment, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
