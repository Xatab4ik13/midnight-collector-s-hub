const PaymentMethods = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-4 ${className}`}>
      {/* YooKassa */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/50 border border-border/30 rounded-lg">
        <div className="w-5 h-5 bg-[#0077FF] rounded flex items-center justify-center">
          <span className="text-white text-xs font-bold">Ю</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">ЮKassa</span>
      </div>

      {/* SBP */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/50 border border-border/30 rounded-lg">
        <div className="w-5 h-5 rounded flex items-center justify-center bg-gradient-to-br from-[#5C2D91] via-[#ED1C24] to-[#00A651]">
          <span className="text-white text-[10px] font-bold">СБП</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">СБП</span>
      </div>

      {/* Sber Pay */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/50 border border-border/30 rounded-lg">
        <div className="w-5 h-5 bg-[#21A038] rounded flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
            <circle cx="12" cy="12" r="10" fill="currentColor"/>
          </svg>
        </div>
        <span className="text-xs text-muted-foreground font-medium">SberPay</span>
      </div>

      {/* Tinkoff Pay */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card/50 border border-border/30 rounded-lg">
        <div className="w-5 h-5 bg-[#FFDD2D] rounded flex items-center justify-center">
          <span className="text-black text-xs font-bold">Т</span>
        </div>
        <span className="text-xs text-muted-foreground font-medium">T-Pay</span>
      </div>
    </div>
  );
};

export default PaymentMethods;
