import { TrendingUp, TrendingDown, DollarSign, Receipt, BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Expense, Income } from '../../types';

interface FinanceCardsProps {
  expenses: Expense[];
  income: Income[];
}

export function FinanceCards({ expenses, income }: FinanceCardsProps) {
  const totalRevenue = income.reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
  const profit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0;

  const cards = [
    {
      title: 'Total Revenue',
      value: `Rs. ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bg: 'bg-green-50',
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Total Expenses',
      value: `Rs. ${totalExpenses.toLocaleString()}`,
      icon: Receipt,
      color: 'text-red-600',
      bg: 'bg-red-50',
      trend: '+8.2%',
      trendUp: false,
    },
    {
      title: 'Net Profit',
      value: `Rs. ${profit.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-primary',
      bg: 'bg-green-50',
      trend: '+24.8%',
      trendUp: true,
    },
    {
      title: 'Profit Margin',
      value: `${profitMargin}%`,
      icon: BarChart3,
      color: 'text-accent',
      bg: 'bg-amber-50',
      trend: '+5.3%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {cards.map((card, idx) => (
        <Card key={idx} className="p-5 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start justify-between mb-3">
            <div className={`p-3 rounded-xl ${card.bg}`}>
              <card.icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${card.trendUp ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
              {card.trendUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {card.trend}
            </div>
          </div>
          <p className="text-xs text-text-light mb-1 font-medium uppercase tracking-wide">{card.title}</p>
          <p className="text-2xl font-bold text-text">{card.value}</p>
        </Card>
      ))}
    </div>
  );
}
