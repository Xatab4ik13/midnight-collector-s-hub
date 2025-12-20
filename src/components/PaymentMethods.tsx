import sbpLogo from '@/assets/payment-sbp.svg';

const PaymentMethods = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      {/* YooKassa - inline SVG */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <svg viewBox="0 0 120 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2L0 12l6 10V12l6-10H6z" fill="#0077FF"/>
          <path d="M12 2L6 12v10l6-10 6-10h-6z" fill="#0077FF"/>
          <text x="24" y="16" fill="currentColor" fontSize="14" fontFamily="Arial, sans-serif" fontWeight="600">ЮKassa</text>
        </svg>
      </div>

      {/* SBP */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <img src={sbpLogo} alt="СБП" className="h-5 w-auto" />
      </div>

      {/* SberPay - inline SVG */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <svg viewBox="0 0 100 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="#21A038"/>
          <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <text x="26" y="16" fill="currentColor" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="600">SberPay</text>
        </svg>
      </div>

      {/* T-Bank */}
      <div className="flex items-center justify-center px-3 py-2 bg-card/50 border border-border/30 rounded-lg h-10">
        <svg viewBox="0 0 90 24" className="h-5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="2" width="20" height="20" rx="4" fill="#FFDD2D"/>
          <text x="5" y="18" fill="#333333" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="700">Т</text>
          <text x="26" y="16" fill="currentColor" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="600">Т-Банк</text>
        </svg>
      </div>
    </div>
  );
};

export default PaymentMethods;
