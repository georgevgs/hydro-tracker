import React, { useState, useEffect } from 'react';
import QuickAdd from './QuickAdd';
import WaterProgress from './WaterProgress';
import WaterHistory from './WaterHistory';
import TotalSummary from './TotalSummary';
import { useWaterData } from '../hooks/useWaterData';
import { calculateStatistics } from '../utils/helpers';

const WaterTracker: React.FC = () => {
  const { entries, addEntry, removeEntry, togglePaid, payAllEntries, getTotals } = useWaterData();
  const [showAddAnimation, setShowAddAnimation] = useState(false);
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

  const { totalCost, unpaidAmount } = getTotals();
  const stats = calculateStatistics(entries);

  const handleAddEntry = () => {
    addEntry();
    const x = 50 + (Math.random() * 20 - 10);
    const y = 40 + (Math.random() * 20 - 10);
    setAnimationPosition({ x, y });
    setShowAddAnimation(true);
    setTimeout(() => setShowAddAnimation(false), 1000);
  };

  // Reset daily stats at midnight
  useEffect(() => {
    const checkDayChange = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const timeUntilMidnight = nextMidnight.getTime() - now.getTime();

      setTimeout(() => {
        // Force a re-render at midnight
        setShowAddAnimation(false);
        // Schedule the next check
        checkDayChange();
      }, timeUntilMidnight);
    };

    checkDayChange();
  }, []);

  return (
    <div className="relative pb-20">
      {showAddAnimation && (
        <div
          className="fixed pointer-events-none z-10 animate-float-up opacity-0"
          style={{
            left: `${animationPosition.x}%`,
            top: `${animationPosition.y}%`,
          }}
        >
          <div className="flex items-center text-blue-500 font-medium">
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
            <span>+0.5L</span>
          </div>
        </div>
      )}

      <div className="mb-8">
        <WaterProgress amount={stats.daily.amount} />
        <QuickAdd onAdd={handleAddEntry} />
        <TotalSummary
          stats={stats}
          totalCost={totalCost}
          unpaidAmount={unpaidAmount}
          onPayAll={payAllEntries}
          className="mb-8"
        />
      </div>

      <WaterHistory
        entries={entries}
        onDeleteEntry={removeEntry}
        onTogglePaid={togglePaid}
      />
    </div>
  );
};

export default WaterTracker;
