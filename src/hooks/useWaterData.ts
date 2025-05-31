import { useEffect, useState } from 'react';
import { WaterEntry } from '../types/water';
import { createWaterEntry, loadData, saveData } from '../utils/helpers';

export const useWaterData = () => {
  const [entries, setEntries] = useState<WaterEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedData = loadData();
    setEntries(loadedData);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveData(entries);
    }
  }, [entries, isLoading]);

  const addEntry = () => {
    const newEntry = createWaterEntry();
    setEntries(prevEntries => [newEntry, ...prevEntries]);
    return newEntry;
  };

  const removeEntry = (id: string) => {
    setEntries(prevEntries => prevEntries.filter(entry => entry.id !== id));
  };

  const togglePaid = (id: string) => {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.id === id ? { ...entry, paid: !entry.paid } : entry
      )
    );
  };

  const payAllEntries = () => {
    setEntries(prevEntries =>
      prevEntries.map(entry => ({ ...entry, cost: 0 }))
    );
  };

  const getTotals = () => {
    const totalWater = entries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalCost = entries.reduce((sum, entry) => sum + entry.cost, 0);
    const paidAmount = entries.reduce((sum, entry) => sum + (entry.paid ? entry.cost : 0), 0);
    const unpaidAmount = totalCost - paidAmount;
    return { totalWater, totalCost, paidAmount, unpaidAmount };
  };

  const getTodayTotals = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayEntries = entries.filter(entry => {
      const entryDate = new Date(entry.timestamp).toISOString().split('T')[0];
      return entryDate === today;
    });
    
    const totalWater = todayEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalCost = todayEntries.reduce((sum, entry) => sum + entry.cost, 0);
    const paidAmount = todayEntries.reduce((sum, entry) => sum + (entry.paid ? entry.cost : 0), 0);
    const unpaidAmount = totalCost - paidAmount;
    
    return { totalWater, totalCost, paidAmount, unpaidAmount, count: todayEntries.length };
  };

  return {
    entries,
    isLoading,
    addEntry,
    removeEntry,
    togglePaid,
    payAllEntries,
    getTotals,
    getTodayTotals,
  };
};