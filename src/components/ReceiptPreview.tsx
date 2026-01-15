import { Check, Clock, X, Copy, Download, AlertTriangle } from 'lucide-react';
import { ReceiptData, TransactionStatus } from '@/data/cryptoData';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

interface ReceiptPreviewProps {
  data: ReceiptData;
}

const statusConfig: Record<TransactionStatus, { label: string; icon: typeof Check; className: string; textColor: string }> = {
  successful: { 
    label: 'Successful', 
    icon: Check, 
    className: 'bg-success',
    textColor: 'text-success'
  },
  pending: { 
    label: 'Pending', 
    icon: Clock, 
    className: 'bg-warning',
    textColor: 'text-warning'
  },
  failed: { 
    label: 'Failed', 
    icon: X, 
    className: 'bg-destructive',
    textColor: 'text-destructive'
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
      // Wait for images to load before capturing
      const images = receiptRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        })
      );

      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: '#ffffff',
        scale: 4, // Higher scale for crisp output
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 15000,
      });
      
      const link = document.createElement('a');
      link.download = `crypto-receipt-${data.transactionId}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Failed to download receipt:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div ref={receiptRef} className="receipt-card bg-white">
        {/* Blue Header with Logo */}
        <div className="bg-gradient-to-br from-primary to-primary/90 pt-8 pb-6 flex justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
            {data.crypto ? (
              <img
                src={data.crypto.logo}
                alt={data.crypto.name}
                className="w-10 h-10"
                crossOrigin="anonymous"
                style={{ imageRendering: 'crisp-edges' }}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${data.crypto?.symbol}&background=random&size=128`;
                }}
              />
            ) : data.logo ? (
              <img src={data.logo} alt="Logo" className="w-10 h-10 object-contain" crossOrigin="anonymous" />
            ) : (
              <span className="text-white font-bold text-xl">CR</span>
            )}
          </div>
        </div>

        {/* Status */}
        <div className="text-center py-6">
          <p className={`text-xl font-semibold ${status.textColor}`}>
            {status.label}
          </p>
          <p className="text-muted-foreground text-sm mt-1">You're sending</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            ${data.usdtAmount || '0.00'}
          </p>
          {data.crypto && data.cryptoAmount && (
            <p className="text-muted-foreground text-sm mt-1">
              ≈ {data.cryptoAmount} {data.crypto.symbol}
            </p>
          )}
        </div>

        {/* Wallet Address Box */}
        <div className="px-6 pb-4">
          <div className="wallet-box">
            <p className="text-xs text-muted-foreground mb-1">Recipient Wallet Address:</p>
            <div className="flex items-center gap-2">
              <p className="font-mono text-sm text-foreground break-all flex-1">
                {data.walletAddress || 'Not provided'}
              </p>
              {data.walletAddress && (
                <button
                  onClick={() => copyToClipboard(data.walletAddress)}
                  className="p-1.5 hover:bg-accent rounded transition-colors flex-shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Payment Notes Warning */}
        {data.notes && (
          <div className="px-6 pb-4">
            <div className="warning-glow bg-destructive/10 border border-destructive/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive mb-1">Important Notice</p>
                  <p className="text-sm text-destructive/80">{data.notes}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-6 border-t border-border" />

        {/* Transaction Details */}
        <div className="px-6 py-4 space-y-3">
          <p className="text-sm text-muted-foreground">
            Your {data.crypto?.name || 'Crypto'} Transfer request is complete and will be reviewed for processing.
          </p>

          <div className="flex justify-between items-center py-2">
            <p className="text-sm text-muted-foreground">Reference Number:</p>
            <div className="flex items-center gap-1">
              <p className="text-sm font-semibold text-foreground font-mono">{data.transactionId.slice(0, 10)}</p>
              <button
                onClick={() => copyToClipboard(data.transactionId)}
                className="p-1 hover:bg-accent rounded transition-colors"
              >
                <Copy className="w-3 h-3 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-2">
            <p className="text-sm text-muted-foreground">Recipient:</p>
            <p className="text-sm font-semibold text-foreground">{data.recipientName || 'Not specified'}</p>
          </div>

          <div className="flex justify-between items-center py-2">
            <p className="text-sm text-muted-foreground">Date:</p>
            <p className="text-sm font-semibold text-foreground">{data.date}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-6 border-t border-border" />

        {/* Footer Message */}
        <div className="px-6 py-4 text-center">
          <p className="text-sm text-muted-foreground">
            Thank you for your request. Your transaction is {data.status === 'successful' ? 'complete' : data.status === 'pending' ? 'still pending' : 'failed'}.
          </p>
          {data.usdtAmount && (
            <p className="text-sm text-muted-foreground mt-1">
              Service Charge: $0.00
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 grid grid-cols-2 gap-3">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-3 rounded-full border border-border text-foreground font-medium hover:bg-accent transition-colors"
          >
            Back
          </button>
          <button
            onClick={downloadReceipt}
            className="px-4 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
