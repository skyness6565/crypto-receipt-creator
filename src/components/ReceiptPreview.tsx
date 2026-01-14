import { Check, Clock, X, Copy, Download, AlertTriangle } from 'lucide-react';
import { ReceiptData, TransactionStatus } from '@/data/cryptoData';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

const statusConfig: Record<TransactionStatus, { label: string; icon: typeof Check; className: string; bgClass: string; iconBg: string }> = {
  successful: { 
    label: 'Successful', 
    icon: Check, 
    className: 'status-success',
    bgClass: 'bg-success/10 border-success/30',
    iconBg: 'bg-success'
  },
  pending: { 
    label: 'Pending', 
    icon: Clock, 
    className: 'status-pending',
    bgClass: 'bg-warning/10 border-warning/30',
    iconBg: 'bg-warning'
  },
  failed: { 
    label: 'Failed', 
    icon: X, 
    className: 'status-failed',
    bgClass: 'bg-destructive/10 border-destructive/30',
    iconBg: 'bg-destructive'
  }
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
      <div ref={receiptRef} className="receipt-card p-6 space-y-5">
        {/* Big Status Icon at Top */}
        <div className={`flex flex-col items-center justify-center py-6 rounded-xl border ${status.bgClass}`}>
          <div className={`w-20 h-20 rounded-full ${status.iconBg} flex items-center justify-center mb-3 ${data.status === 'pending' ? 'animate-pulse' : ''}`}>
            <StatusIcon className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
          <p className={`text-xl font-bold ${data.status === 'successful' ? 'text-success' : data.status === 'pending' ? 'text-warning' : 'text-destructive'}`}>
            {status.label.toUpperCase()}
          </p>
        </div>

        {/* Payment Notes Warning - At Top */}
        {data.notes && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-destructive mb-1">Payment Notes</p>
              <p className="text-sm text-destructive/90">{data.notes}</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between pt-2">
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
