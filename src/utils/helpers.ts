import { BOTTLE_COST, BOTTLE_SIZE, LOCAL_STORAGE_KEY } from "../constants";
import { DailySummary, Statistics, WaterEntry } from "../types/water";

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

export const createWaterEntry = (): WaterEntry => {
  return {
    id: generateId(),
    timestamp: Date.now(),
    amount: BOTTLE_SIZE,
    cost: BOTTLE_COST,
    paid: false,
  };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDateFriendly = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (formatDate(date) === formatDate(today)) {
    return 'Today';
  } else if (formatDate(date) === formatDate(yesterday)) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

export const formatCurrency = (amount: number): string => {
  return `${amount.toFixed(2)}€`;
};

export const formatVolume = (amount: number): string => {
  return `${amount.toFixed(1)}L`;
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getStartOfWeek = (date: Date = new Date()): Date => {
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getStartOfMonth = (date: Date = new Date()): Date => {
  const start = new Date(date);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const calculateStatistics = (entries: WaterEntry[]): Statistics => {
  const now = new Date();
  const startOfDay = getStartOfDay(now).getTime();
  const startOfWeek = getStartOfWeek(now).getTime();
  const startOfMonth = getStartOfMonth(now).getTime();

  const dailyEntries = entries.filter(entry => entry.timestamp >= startOfDay);
  const weeklyEntries = entries.filter(entry => entry.timestamp >= startOfWeek);
  const monthlyEntries = entries.filter(entry => entry.timestamp >= startOfMonth);

  const calculateStats = (entries: WaterEntry[]) => ({
    amount: entries.reduce((sum, entry) => sum + entry.amount, 0),
    cost: entries.reduce((sum, entry) => sum + entry.cost, 0),
    count: entries.length,
  });

  const daily = calculateStats(dailyEntries);
  const weekly = {
    ...calculateStats(weeklyEntries),
    average: weeklyEntries.length ? calculateStats(weeklyEntries).amount / 7 : 0,
  };
  const monthly = {
    ...calculateStats(monthlyEntries),
    average: monthlyEntries.length ? calculateStats(monthlyEntries).amount / 30 : 0,
  };

  return { daily, weekly, monthly };
};

export const groupEntriesByDate = (entries: WaterEntry[]): DailySummary[] => {
  const grouped: Record<string, WaterEntry[]> = {};
  
  const sortedEntries = [...entries].sort((a, b) => b.timestamp - a.timestamp);
  
  sortedEntries.forEach(entry => {
    const date = formatDate(new Date(entry.timestamp));
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(entry);
  });
  
  return Object.keys(grouped).map(date => {
    const dateEntries = grouped[date];
    const totalAmount = dateEntries.reduce((sum, entry) => sum + entry.amount, 0);
    const totalCost = dateEntries.reduce((sum, entry) => sum + entry.cost, 0);
    const paidAmount = dateEntries.reduce((sum, entry) => sum + (entry.paid ? entry.cost : 0), 0);
    const unpaidAmount = totalCost - paidAmount;
    
    return {
      date,
      totalAmount,
      totalCost,
      paidAmount,
      unpaidAmount,
      entries: dateEntries,
    };
  });
};

export const saveData = (data: WaterEntry[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const loadData = (): WaterEntry[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const calculateProgress = (amount: number, goal: number): number => {
  const percentage = (amount / goal) * 100;
  return Math.min(percentage, 100);
};