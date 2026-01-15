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
    logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg',
    color: '#F7931A'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg',
    color: '#627EEA'
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    logo: 'https://cryptologos.cc/logos/tether-usdt-logo.svg',
    color: '#26A17B'
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    logo: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg',
    color: '#F3BA2F'
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    symbol: 'USDC',
    logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg',
    color: '#2775CA'
  },
  {
    id: 'xrp',
    name: 'XRP',
    symbol: 'XRP',
    logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg',
    color: '#23292F'
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
    color: '#9945FF'
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg',
    color: '#0033AD'
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg',
    color: '#C3A634'
  },
  {
    id: 'trx',
    name: 'TRON',
    symbol: 'TRX',
    logo: 'https://cryptologos.cc/logos/tron-trx-logo.svg',
    color: '#FF0013'
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg',
    color: '#BFBBBB'
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'MATIC',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
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
