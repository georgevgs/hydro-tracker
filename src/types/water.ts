export interface WaterEntry {
  id: string;
  timestamp: number;
  amount: number; // in liters
  cost: number; // in euros
  paid: boolean; // track payment status
}

export interface DailySummary {
  date: string;
  totalAmount: number;
  totalCost: number;
  entries: WaterEntry[];
  paidAmount: number;
  unpaidAmount: number;
}

export interface Statistics {
  daily: {
    amount: number;
    cost: number;
    count: number;
  };
  weekly: {
    amount: number;
    cost: number;
    count: number;
    average: number;
  };
  monthly: {
    amount: number;
    cost: number;
    count: number;
    average: number;
  };
}