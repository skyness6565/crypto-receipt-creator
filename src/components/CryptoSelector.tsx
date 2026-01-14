import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cryptoOptions, CryptoOption } from '@/data/cryptoData';

interface CryptoSelectorProps {
  selected: CryptoOption | null;
  onSelect: (crypto: CryptoOption) => void;
}

const CryptoSelector = ({ selected, onSelect }: CryptoSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full select-field flex items-center justify-between gap-3"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <img
              src={selected.logo}
              alt={selected.name}
              className="crypto-logo"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${selected.symbol}&background=random`;
              }}
            />
            <div className="text-left">
              <p className="font-medium">{selected.name}</p>
              <p className="text-sm text-muted-foreground">{selected.symbol}</p>
            </div>
          </div>
        ) : (
          <span className="text-muted-foreground">Select cryptocurrency</span>
        )}
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 glass-card overflow-hidden animate-scale-in">
          <div className="max-h-64 overflow-y-auto scrollbar-thin">
            {cryptoOptions.map((crypto) => (
              <button
                key={crypto.id}
                type="button"
                onClick={() => {
                  onSelect(crypto);
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={crypto.logo}
                    alt={crypto.name}
                    className="crypto-logo"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${crypto.symbol}&background=random`;
                    }}
                  />
                  <div className="text-left">
                    <p className="font-medium">{crypto.name}</p>
                    <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
                  </div>
                </div>
                {selected?.id === crypto.id && (
                  <Check className="w-5 h-5 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoSelector;
