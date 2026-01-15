import btcLogo from '@/assets/crypto/bitcoin-btc-logo.svg';
import ethLogo from '@/assets/crypto/ethereum-eth-logo.svg';
import usdtLogo from '@/assets/crypto/tether-usdt-logo.svg';
import bnbLogo from '@/assets/crypto/bnb-bnb-logo.svg';
import usdcLogo from '@/assets/crypto/usd-coin-usdc-logo.svg';
import xrpLogo from '@/assets/crypto/xrp-xrp-logo.svg';
import solLogo from '@/assets/crypto/solana-sol-logo.svg';
import adaLogo from '@/assets/crypto/cardano-ada-logo.svg';
import dogeLogo from '@/assets/crypto/dogecoin-doge-logo.svg';
import trxLogo from '@/assets/crypto/tron-trx-logo.svg';
import ltcLogo from '@/assets/crypto/litecoin-ltc-logo.svg';
import maticLogo from '@/assets/crypto/polygon-matic-logo.svg';

export interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  color: string;
}

export const cryptoOptions: CryptoOption[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: btcLogo,
    color: '#F7931A'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: ethLogo,
    color: '#627EEA'
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    logo: usdtLogo,
    color: '#26A17B'
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    logo: bnbLogo,
    color: '#F3BA2F'
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    logo: usdcLogo,
    color: '#2775CA'
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    logo: xrpLogo,
    color: '#23292F'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    logo: solLogo,
    color: '#9945FF'
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    logo: adaLogo,
    color: '#0033AD'
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logo: dogeLogo,
    color: '#C3A634'
  },
  {
    id: 'trx',
    name: 'TRON',
    symbol: 'TRX',
    logo: trxLogo,
    color: '#FF0013'
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    logo: ltcLogo,
    color: '#BFBBBB'
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    logo: maticLogo,
    color: '#8247E5'
  }
];

export type TransactionStatus = 'successful' | 'pending' | 'failed';

export interface ReceiptData {
  crypto: CryptoOption | null;
  usdtAmount: string;
  cryptoAmount: string;
  walletAddress: string;
  recipientName: string;
  status: TransactionStatus;
  notes: string;
  logo: string | null;
  transactionId: string;
  date: string;
}
