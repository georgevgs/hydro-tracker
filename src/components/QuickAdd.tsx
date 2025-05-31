import React from 'react';
import { BOTTLE_COST, BOTTLE_SIZE } from '../constants';
import { formatCurrency, formatVolume } from '../utils/helpers';

interface QuickAddProps {
  onAdd: () => void;
}

const QuickAdd: React.FC<QuickAddProps> = ({ onAdd }) => {
  return (
    <div className="my-6">
      <button
        onClick={onAdd}
        className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden"
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 4v16M4 12h16"
                  stroke="currentColor"
                  strokeWidth={4}
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
            <div className="absolute inset-0 bg-blue-400 rounded-full animate-pulse-ring opacity-30"></div>
          </div>
          <div>
            <p className="font-medium text-gray-900">Add Water</p>
            <p className="text-sm text-gray-500">One bottle ({formatVolume(BOTTLE_SIZE)})</p>
          </div>
        </div>
        <span className="text-blue-500 font-medium group-hover:scale-110 transition-transform duration-200">
          {formatCurrency(BOTTLE_COST)}
        </span>
      </button>
    </div>
  );
};

export default QuickAdd;
