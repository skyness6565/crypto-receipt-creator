import { useState, useMemo } from 'react';
import { Wallet } from 'lucide-react';
import { CryptoOption, TransactionStatus, ReceiptData } from '@/data/cryptoData';
import ReceiptForm from '@/components/ReceiptForm';
import ReceiptPreview from '@/components/ReceiptPreview';

const generateTransactionId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '0x';
  for (let i = 0; i < 16; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const Index = () => {
  const [crypto, setCrypto] = useState<CryptoOption | null>(null);
  const [usdtAmount, setUsdtAmount] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [status, setStatus] = useState<TransactionStatus>('successful');
  const [notes, setNotes] = useState('');
  const [logo, setLogo] = useState<string | null>(null);
  const [transactionId] = useState(generateTransactionId());
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());

  const formattedDate = useMemo(() => {
    return transactionDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }, [transactionDate]);

  const receiptData: ReceiptData = useMemo(() => ({
    crypto,
    usdtAmount,
    cryptoAmount,
    walletAddress,
    recipientName,
    status,
    notes,
    logo,
    transactionId,
    date: formattedDate
  }), [crypto, usdtAmount, cryptoAmount, walletAddress, recipientName, status, notes, logo, transactionId, formattedDate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">CryptoReceipt</h1>
                <p className="text-xs text-muted-foreground">Generate professional crypto receipts</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-10 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Create Your <span className="text-gradient">Crypto Receipt</span>
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Generate professional transaction receipts for your cryptocurrency payments in seconds
              </p>
            </div>

            {/* Form and Preview */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Form */}
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <ReceiptForm
                  crypto={crypto}
                  setCrypto={setCrypto}
                  usdtAmount={usdtAmount}
                  setUsdtAmount={setUsdtAmount}
                  cryptoAmount={cryptoAmount}
                  setCryptoAmount={setCryptoAmount}
                  walletAddress={walletAddress}
                  setWalletAddress={setWalletAddress}
                  recipientName={recipientName}
                  setRecipientName={setRecipientName}
                  status={status}
                  setStatus={setStatus}
                  notes={notes}
                  setNotes={setNotes}
                  logo={logo}
                  setLogo={setLogo}
                  transactionDate={transactionDate}
                  setTransactionDate={setTransactionDate}
                />
              </div>

              {/* Preview */}
              <div className="lg:sticky lg:top-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Live Preview</h3>
                    <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-secondary">
                      Auto-updating
                    </span>
                  </div>
                  <ReceiptPreview data={receiptData} />
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 mt-12">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-sm text-muted-foreground">
              © 2026 CryptoReceipt. Generate receipts for record-keeping purposes.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
