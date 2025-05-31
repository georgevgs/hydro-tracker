import React from 'react';
import { DailySummary as DailySummaryType } from '../types/water';
import { formatCurrency, formatDateFriendly, formatVolume } from '../utils/helpers';
import WaterEntryItem from './WaterEntryItem';

interface DailySummaryProps {
  summary: DailySummaryType;
  onDeleteEntry: (id: string) => void;
}

const DailySummary: React.FC<DailySummaryProps> = ({ summary, onDeleteEntry }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div
        className="p-4 flex items-center justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h3 className="font-medium text-gray-900">{formatDateFriendly(summary.date)}</h3>
          <p className="text-sm text-gray-500">
            {summary.entries.length} bottle{summary.entries.length !== 1 ? 's' : ''} · {formatVolume(summary.totalAmount)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-medium text-gray-900">{formatCurrency(summary.totalCost)}</p>
            {summary.unpaidAmount > 0 && (
              <p className="text-sm text-gray-500">
                Unpaid: {formatCurrency(summary.unpaidAmount)}
              </p>
            )}
          </div>
          {expanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 15l-6-6-6 6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
            </svg>
          )}
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100">
          {summary.entries.map(entry => (
            <WaterEntryItem
              key={entry.id}
              entry={entry}
              onDelete={onDeleteEntry}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DailySummary
