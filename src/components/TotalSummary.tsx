import React from 'react';
import { Statistics } from '../types/water';
import { formatCurrency, formatVolume } from '../utils/helpers';

interface TotalSummaryProps {
  stats: Statistics;
  totalCost: number;
  unpaidAmount: number;
  className?: string;
  onPayAll?: () => void;
}

const TotalSummary: React.FC<TotalSummaryProps> = ({
  stats,
  totalCost,
  className = '',
  onPayAll
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C12 2 5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13z" />
              </svg>

            </div>
            <h3 className="text-sm font-medium text-gray-900">Today's Water</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatVolume(stats.daily.amount)}</p>
          <p className="text-sm text-gray-500 mt-1">{stats.daily.count} bottles</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 7H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-2 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                <path d="M6 5h12a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-900">Balance</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
          {totalCost > 0 && (
            <button
              onClick={onPayAll}
              className="mt-2 w-full py-1 px-3 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors"
            >
              Pay All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Weekly Stats</h3>
          <p className="text-xl font-bold text-gray-900">{formatVolume(stats.weekly.amount)}</p>
          <p className="text-sm text-gray-500">Avg: {formatVolume(stats.weekly.average)}/day</p>
          <p className="text-sm text-gray-500">{stats.weekly.count} bottles</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Monthly Stats</h3>
          <p className="text-xl font-bold text-gray-900">{formatVolume(stats.monthly.amount)}</p>
          <p className="text-sm text-gray-500">Avg: {formatVolume(stats.monthly.average)}/day</p>
          <p className="text-sm text-gray-500">{stats.monthly.count} bottles</p>
        </div>
      </div>
    </div>
  );
};

export default TotalSummary;
