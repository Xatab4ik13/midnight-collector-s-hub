import sbpLogo from '@/assets/payment-sbp.svg';
import tpayLogo from '@/assets/payment-tpay.png';

const PaymentMethods = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {/* YooKassa - inline SVG */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <svg viewBox="0 0 233 32" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4 0L0 18.1l10.4 13.5V18.1L20.8 0H10.4z" fill="#0077FF"/>
          <path d="M20.8 0L10.4 18.1v13.5L20.8 18.1 31.2 0H20.8z" fill="#0077FF"/>
          <text x="40" y="22" fill="currentColor" className="text-foreground" fontSize="18" fontFamily="Arial, sans-serif" fontWeight="600">ЮKassa</text>
        </svg>
      </div>

      {/* SBP */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <img src={sbpLogo} alt="СБП" className="h-5 w-auto" />
      </div>

      {/* SberPay - inline SVG */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <svg viewBox="0 0 120 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#21A038"/>
          <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 5.5l-4 4.5-2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <text x="28" y="17" fill="currentColor" className="text-foreground" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="600">SberPay</text>
        </svg>
      </div>

      {/* T-Pay (Tinkoff) */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <img src={tpayLogo} alt="T-Pay" className="h-5 w-auto" />
      </div>
    </div>
  );
};

export default PaymentMethods;
