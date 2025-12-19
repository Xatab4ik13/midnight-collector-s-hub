import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-midnight-light border-t border-border/50 py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          Индивидуальный предприниматель Ходотович Алена Андреевна
        </p>
        <p className="text-muted-foreground text-xs mt-2">
          ИНН: 502713623661, ОГРНИП: 322508100408932
        </p>
      </div>
    </footer>
  );
};

export default Footer;
