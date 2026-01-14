import { Check, Clock, X } from 'lucide-react';
import { TransactionStatus } from '@/data/cryptoData';

interface StatusSelectorProps {
  selected: TransactionStatus;
  onSelect: (status: TransactionStatus) => void;
}

const statusConfig = {
  successful: {
    label: 'Successful',
    icon: Check,
    className: 'status-success',
    activeClass: 'ring-2 ring-success ring-offset-2 ring-offset-background'
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'status-pending',
    activeClass: 'ring-2 ring-warning ring-offset-2 ring-offset-background'
  },
  failed: {
    label: 'Failed',
    icon: X,
    className: 'status-failed',
    activeClass: 'ring-2 ring-destructive ring-offset-2 ring-offset-background'
  }
};

const StatusSelector = ({ selected, onSelect }: StatusSelectorProps) => {
  return (
    <div className="flex gap-3">
      {(Object.keys(statusConfig) as TransactionStatus[]).map((status) => {
        const config = statusConfig[status];
        const Icon = config.icon;
        const isSelected = selected === status;

        return (
          <button
            key={status}
            type="button"
            onClick={() => onSelect(status)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${config.className} ${isSelected ? config.activeClass : 'opacity-60 hover:opacity-100'}`}
          >
            <Icon className="w-4 h-4" />
            <span>{config.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default StatusSelector;
