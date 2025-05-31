import React from 'react';
import { WaterEntry } from '../types/water';
import { groupEntriesByDate } from '../utils/helpers';
import DailySummary from './DailySummary';

interface WaterHistoryProps {
  entries: WaterEntry[];
  onDeleteEntry: (id: string) => void;
  onTogglePaid: (id: string) => void;
}

const WaterHistory: React.FC<WaterHistoryProps> = ({ entries, onDeleteEntry, onTogglePaid }) => {
  const dailySummaries = groupEntriesByDate(entries.filter(entry => entry.cost > 0));
  
  if (entries.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500">No entries yet. Add your first water bottle!</p>
      </div>
    );
  }
  
  if (dailySummaries.length === 0) {
    return (
      <div className="mt-8 text-center p-8 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-gray-500">All entries are paid! 🎉</p>
      </div>
    );
  }
  
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">History</h2>
      {dailySummaries.map(summary => (
        <DailySummary 
          key={summary.date} 
          summary={summary}
          onDeleteEntry={onDeleteEntry}
          onTogglePaid={onTogglePaid}
        />
      ))}
    </div>
  );
};

export default WaterHistory;