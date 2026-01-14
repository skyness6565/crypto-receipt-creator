import { CryptoOption, TransactionStatus } from '@/data/cryptoData';
import CryptoSelector from './CryptoSelector';
import StatusSelector from './StatusSelector';
import LogoUploader from './LogoUploader';

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
  setLogo
}: ReceiptFormProps) => {
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
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">
            Amount ({crypto?.symbol || 'Crypto'})
          </label>
          <input
            type="text"
            placeholder="0.00"
            value={cryptoAmount}
            onChange={(e) => setCryptoAmount(e.target.value)}
            className="input-field w-full font-mono"
          />
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
