import { useState, useEffect } from 'react';

const COINGECKO_IDS: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  usdt: 'tether',
  bnb: 'binancecoin',
  usdc: 'usd-coin',
  xrp: 'ripple',
  sol: 'solana',
  ada: 'cardano',
  doge: 'dogecoin',
  trx: 'tron',
  ltc: 'litecoin',
  matic: 'matic-network'
};

interface PriceData {
  price: number | null;
  loading: boolean;
  error: string | null;
}

export const useCryptoPrice = (cryptoId: string | null) => {
  const [priceData, setPriceData] = useState<PriceData>({
    price: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    if (!cryptoId) {
      setPriceData({ price: null, loading: false, error: null });
      return;
    }

    const coingeckoId = COINGECKO_IDS[cryptoId];
    if (!coingeckoId) {
      setPriceData({ price: null, loading: false, error: 'Unknown cryptocurrency' });
      return;
    }

    const fetchPrice = async () => {
      setPriceData(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoId}&vs_currencies=usd`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch price');
        }
        
        const data = await response.json();
        const price = data[coingeckoId]?.usd;
        
        if (price) {
          setPriceData({ price, loading: false, error: null });
        } else {
          setPriceData({ price: null, loading: false, error: 'Price not available' });
        }
      } catch (error) {
        setPriceData({ price: null, loading: false, error: 'Failed to fetch price' });
      }
    };

    fetchPrice();
    
    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    
    return () => clearInterval(interval);
  }, [cryptoId]);

  return priceData;
};

export const calculateCryptoAmount = (usdtAmount: string, price: number | null): string => {
  if (!price || !usdtAmount || isNaN(parseFloat(usdtAmount))) {
    return '';
  }
  
  const amount = parseFloat(usdtAmount) / price;
  
  // Format based on the magnitude of the result
  if (amount >= 1) {
    return amount.toFixed(6);
  } else if (amount >= 0.0001) {
    return amount.toFixed(8);
  } else {
    return amount.toExponential(4);
  }
};
