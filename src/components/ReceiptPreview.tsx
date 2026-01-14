import { Check, Clock, X, Copy, Download } from 'lucide-react';
import { ReceiptData, TransactionStatus } from '@/data/cryptoData';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

const statusConfig: Record<TransactionStatus, { label: string; icon: typeof Check; className: string }> = {
  successful: { label: 'Successful', icon: Check, className: 'status-success' },
  pending: { label: 'Pending', icon: Clock, className: 'status-pending' },
  failed: { label: 'Failed', icon: X, className: 'status-failed' }
};

const ReceiptPreview = ({ data }: ReceiptPreviewProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const status = statusConfig[data.status];
  const StatusIcon = status.icon;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;
    
    try {
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#0f1419',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `crypto-receipt-${data.transactionId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={receiptRef} className="receipt-card p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logo ? (
              <img src={data.logo} alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold">CR</span>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg">Payment Receipt</h3>
              <p className="text-sm text-muted-foreground">Transaction Details</p>
            </div>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${status.className}`}>
            <StatusIcon className="w-4 h-4" />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Crypto Info */}
        {data.crypto && (
          <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/50">
            <img
              src={data.crypto.logo}
              alt={data.crypto.name}
              className="w-12 h-12 rounded-full"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${data.crypto?.symbol}&background=random`;
              }}
            />
            <div className="flex-1">
              <p className="text-2xl font-bold">{data.cryptoAmount || '0.00'} {data.crypto.symbol}</p>
              <p className="text-muted-foreground">≈ ${data.usdtAmount || '0.00'} USDT</p>
            </div>
          </div>
        )}

        {/* Details */}
        <div className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Transaction ID</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm">{data.transactionId}</p>
              <button
                onClick={() => copyToClipboard(data.transactionId)}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Wallet Address</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm break-all">{data.walletAddress || 'Not provided'}</p>
              {data.walletAddress && (
                <button
                  onClick={() => copyToClipboard(data.walletAddress)}
                  className="p-1 hover:bg-accent rounded transition-colors flex-shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Date & Time</p>
            <p className="font-medium">{data.date}</p>
          </div>

          {data.notes && (
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Payment Notes</p>
              <p className="text-sm">{data.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-center text-muted-foreground">
            This receipt was generated for record purposes only
          </p>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadReceipt}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors glow-effect"
      >
        <Download className="w-5 h-5" />
        <span>Download Receipt</span>
      </button>
    </div>
  );
};

export default ReceiptPreview;
