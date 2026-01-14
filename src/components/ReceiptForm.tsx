import { useEffect } from 'react';
import { format } from 'date-fns';
import { Loader2, TrendingUp, CalendarIcon, Clock } from 'lucide-react';
import { CryptoOption, TransactionStatus } from '@/data/cryptoData';
import CryptoSelector from './CryptoSelector';
import StatusSelector from './StatusSelector';
import LogoUploader from './LogoUploader';
import { useCryptoPrice, calculateCryptoAmount } from '@/hooks/useCryptoPrice';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface ReceiptFormProps {
  crypto: CryptoOption | null;
  setCrypto: (crypto: CryptoOption) => void;
  usdtAmount: string;
  setUsdtAmount: (amount: string) => void;
  cryptoAmount: string;
  setCryptoAmount: (amount: string) => void;
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  status: TransactionStatus;
  setStatus: (status: TransactionStatus) => void;
  notes: string;
  setNotes: (notes: string) => void;
  logo: string | null;
  setLogo: (logo: string | null) => void;
  transactionDate: Date;
  setTransactionDate: (date: Date) => void;
}

const ReceiptForm = ({
  crypto,
  setCrypto,
  usdtAmount,
  setUsdtAmount,
  cryptoAmount,
  setCryptoAmount,
  walletAddress,
  setWalletAddress,
  status,
  setStatus,
  notes,
  setNotes,
  logo,
  setLogo,
  transactionDate,
  setTransactionDate
}: ReceiptFormProps) => {
  const { price, loading, error } = useCryptoPrice(crypto?.id || null);

  // Auto-calculate crypto amount when USDT amount changes
  useEffect(() => {
    if (price && usdtAmount) {
      const calculated = calculateCryptoAmount(usdtAmount, price);
      setCryptoAmount(calculated);
    }
  }, [usdtAmount, price, setCryptoAmount]);

  const handleTimeChange = (type: 'hours' | 'minutes', value: string) => {
    const newDate = new Date(transactionDate);
    if (type === 'hours') {
      newDate.setHours(parseInt(value) || 0);
    } else {
      newDate.setMinutes(parseInt(value) || 0);
    }
    setTransactionDate(newDate);
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Receipt Details</h2>
        <p className="text-sm text-muted-foreground">Fill in the transaction information</p>
      </div>

      {/* Logo Upload */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Your Logo (Optional)</label>
        <LogoUploader logo={logo} onLogoChange={setLogo} />
      </div>

      {/* Crypto Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Cryptocurrency</label>
        <CryptoSelector selected={crypto} onSelect={setCrypto} />
        
        {/* Live Price Indicator */}
        {crypto && (
          <div className="flex items-center gap-2 mt-2">
            {loading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Fetching live price...</span>
              </div>
            ) : price ? (
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-3.5 h-3.5 text-success" />
                <span className="text-success font-medium">
                  1 {crypto.symbol} = ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </span>
                <span className="text-xs text-muted-foreground">(Live)</span>
              </div>
            ) : error ? (
              <div className="text-sm text-destructive">{error}</div>
            ) : null}
          </div>
        )}
      </div>

      {/* Amount Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Amount (USDT)</label>
          <input
            type="text"
            placeholder="0.00"
            value={usdtAmount}
            onChange={(e) => setUsdtAmount(e.target.value)}
            className="input-field w-full font-mono"
          />
          <p className="text-xs text-muted-foreground">Enter USDT to auto-calculate</p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Amount ({crypto?.symbol || 'Crypto'})
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="0.00"
              value={cryptoAmount}
              onChange={(e) => setCryptoAmount(e.target.value)}
              className="input-field w-full font-mono pr-10"
            />
            {loading && (
              <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground animate-spin" />
            )}
          </div>
          {price && usdtAmount && (
            <p className="text-xs text-success">Auto-calculated from live price</p>
          )}
        </div>
      </div>

      {/* Wallet Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Wallet Address</label>
        <input
          type="text"
          placeholder="Enter wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="input-field w-full font-mono text-sm"
        />
      </div>

      {/* Date & Time Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Transaction Date & Time</label>
        <div className="flex gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "flex-1 justify-start text-left font-normal bg-secondary/50 border-white/10 hover:bg-secondary",
                  !transactionDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {transactionDate ? format(transactionDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={transactionDate}
                onSelect={(date) => date && setTransactionDate(new Date(date.setHours(transactionDate.getHours(), transactionDate.getMinutes())))}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          
          <div className="flex items-center gap-2 bg-secondary/50 border border-white/10 rounded-lg px-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <input
              type="number"
              min="0"
              max="23"
              value={transactionDate.getHours().toString().padStart(2, '0')}
              onChange={(e) => handleTimeChange('hours', e.target.value)}
              className="w-10 bg-transparent text-center font-mono focus:outline-none"
            />
            <span className="text-muted-foreground">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={transactionDate.getMinutes().toString().padStart(2, '0')}
              onChange={(e) => handleTimeChange('minutes', e.target.value)}
              className="w-10 bg-transparent text-center font-mono focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Status Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Transaction Status</label>
        <StatusSelector selected={status} onSelect={setStatus} />
      </div>

      {/* Payment Notes */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Payment Notes (Optional)</label>
        <textarea
          placeholder="Add any additional notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className="input-field w-full resize-none"
        />
      </div>
    </div>
  );
};

export default ReceiptForm;
