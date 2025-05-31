import React from 'react';
import { DAILY_GOAL } from '../constants';
import { calculateProgress, formatVolume } from '../utils/helpers';

interface WaterProgressProps {
  amount: number;
}

const WaterProgress: React.FC<WaterProgressProps> = ({ amount }) => {
  const progress = calculateProgress(amount, DAILY_GOAL);
  const isComplete = progress >= 100;
  
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-900">Today's goal</span>
        <span className={`text-sm font-medium ${isComplete ? 'text-blue-500' : 'text-gray-900'}`}>
          {formatVolume(amount)} / {formatVolume(DAILY_GOAL)}
        </span>
      </div>
      
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden relative">
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${
            isComplete ? 'bg-blue-500' : 'bg-blue-400'
          }`}
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <div className="water-wave"></div>
          </div>
        </div>
      </div>
      
      {isComplete && (
        <p className="text-sm text-blue-500 font-medium mt-2 text-center animate-pulse">
          Daily goal achieved! 🎉
        </p>
      )}
    </div>
  );
};

export default WaterProgress;