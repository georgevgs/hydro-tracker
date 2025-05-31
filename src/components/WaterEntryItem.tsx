import React from 'react';
import { WaterEntry } from '../types/water';
import { formatCurrency, formatTime, formatVolume } from '../utils/helpers';

interface WaterEntryItemProps {
  entry: WaterEntry;
  onDelete: (id: string) => void;
}

const WaterEntryItem: React.FC<WaterEntryItemProps> = ({ entry, onDelete }) => {
  return (
    <div className={`flex items-center justify-between p-3 border-b border-gray-100 group transition-colors duration-200 ${entry.paid ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${entry.cost === 0 ? 'bg-gray-200 text-gray-600' : 'bg-gray-900 text-white'}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C12 2 7 8 7 11.5C7 14.5376 9.46243 17 12.5 17C15.5376 17 18 14.5376 18 11.5C18 8 13 2 13 2H12Z"
            />
          </svg>

        </div>
        <div>
          <p className={`font-medium ${entry.cost === 0 ? 'text-gray-500' : 'text-gray-900'}`}>
            {formatVolume(entry.amount)}
          </p>
          <p className="text-xs text-gray-500">{formatTime(entry.timestamp)}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className={`font-medium ${entry.cost === 0 ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
          {formatCurrency(entry.cost)}
        </span>
        <button
          onClick={() => onDelete(entry.id)}
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Delete bottle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M3 6h18" />
            <path d="M8 6V4h8v2" />
            <path d="M19 6l-1 14H6L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>

        </button>
      </div>
    </div>
  );
};

export default WaterEntryItem;
