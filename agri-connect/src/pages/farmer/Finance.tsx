import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Download, PlusCircle } from 'lucide-react';
import { mockCrops } from '../../data/mockData';

// Categorized exact expenses from user prompt: Seeds, Fertilizer, Pesticides, Labour, Irrigation, Machinery, Transportation
const EXPENSE_CATEGORIES = [
  { name: 'Seeds', amount: 15000, color: '#1a5632', icon: '🌱' },
  { name: 'Fertilizer', amount: 25000, color: '#4caf50', icon: '🧪' },
  { name: 'Pesticides', amount: 8000, color: '#f5a623', icon: '🐛' },
  { name: 'Labour', amount: 45000, color: '#ef4444', icon: '👷' },
  { name: 'Irrigation', amount: 12000, color: '#3b82f6', icon: '💧' },
  { name: 'Machinery', amount: 35000, color: '#8b5cf6', icon: '🚜' },
  { name: 'Transportation', amount: 18000, color: '#ec4899', icon: '🚛' },
];

// Categorized exact income sources: Crop sales, Dairy, Other farm products
const INCOME_SOURCES = [
  { source: 'Crop Sales (Wheat & Potato)', amount: 600000, icon: '🌾' },
  { source: 'Dairy Products (Milk & Ghee)', amount: 85000, icon: '🥛' },
  { source: 'Other Farm Products (Honey & Compost)', amount: 25000, icon: '🍯' },
];

const monthlyProfitTrends = [
  { month: 'Jan', revenue: 40000, expenses: 15000, profit: 25000 },
  { month: 'Feb', revenue: 150000, expenses: 45000, profit: 105000 },
  { month: 'Mar', revenue: 180000, expenses: 38000, profit: 142000 },
  { month: 'Apr (Est)', revenue: 340000, expenses: 60000, profit: 280000 },
];

export default function Finance() {
  const [activeTab, setActiveTab] = useState('overview');

  const totalRevenue = INCOME_SOURCES.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = EXPENSE_CATEGORIES.reduce((s, e) => s + e.amount, 0);
  const actualProfit = totalRevenue - totalExpenses; // Revenue - Expenses = Actual Farm Profit
  const profitMargin = ((actualProfit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900">
              Flagship Innovation #6 ⭐
            </span>
            <h1 className="text-3xl font-bold text-text">Farm Income & Expense Tracker</h1>
          </div>
          <p className="text-text-light">
            Comprehensive farm accounting: Expenses + Income = Actual Net Farm Profit
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Statement
          </Button>
          <Button size="sm">
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {/* Primary Profit Formula Banner (Exact requirement!) */}
      <Card className="p-6 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 text-white rounded-3xl shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider rounded-full border border-amber-400/30">
              Core Profit Formula
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mt-2 tracking-tight">
              Revenue − Expenses = <span className="text-amber-300">Actual Farm Profit</span>
            </h2>
            <p className="text-emerald-200 text-sm mt-1">
              ₹{totalRevenue.toLocaleString()} Revenue − ₹{totalExpenses.toLocaleString()} Expenses = <strong>₹{actualProfit.toLocaleString()} Net Farm Profit</strong>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[180px]">
            <p className="text-xs text-emerald-200 uppercase font-bold">Profit Margin</p>
            <p className="text-4xl font-black text-amber-300 mt-1">{profitMargin}%</p>
            <p className="text-[11px] text-emerald-200 mt-0.5">+4.8% vs last season</p>
          </div>
        </div>
      </Card>

      {/* 4 Key Financial Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-600">
          <p className="text-xs text-text-light font-bold uppercase tracking-wider mb-1">Total Farm Revenue</p>
          <p className="text-3xl font-black text-text">₹{totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">Crop Sales + Dairy + Other</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-red-500">
          <p className="text-xs text-text-light font-bold uppercase tracking-wider mb-1">Total Farm Expenses</p>
          <p className="text-3xl font-black text-red-600">₹{totalExpenses.toLocaleString()}</p>
          <p className="text-xs text-red-700 font-semibold mt-1">Seeds, Labour, Irrigation, etc.</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-700">
          <p className="text-xs text-text-light font-bold uppercase tracking-wider mb-1">Actual Net Profit</p>
          <p className="text-3xl font-black text-emerald-700">₹{actualProfit.toLocaleString()}</p>
          <p className="text-xs text-emerald-800 font-bold mt-1">Clean Net Income</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-amber-500">
          <p className="text-xs text-text-light font-bold uppercase tracking-wider mb-1">Net ROI</p>
          <p className="text-3xl font-black text-amber-600">346%</p>
          <p className="text-xs text-text-light mt-1">Return per rupee spent</p>
        </Card>
      </div>

      {/* Main Breakdown Section */}
      <Tabs
        tabs={[
          { id: 'overview', label: 'Financial Overview' },
          { id: 'expenses', label: 'Expense Breakdown (7 Categories)' },
          { id: 'income', label: 'Income Sources (Crop + Dairy)' },
          { id: 'trends', label: 'Profit Trends' },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Monthly Income Chart */}
            <Card className="p-6">
              <h3 className="font-bold text-text text-lg mb-4">Monthly Income & Profit Trends</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyProfitTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#1a5632" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="profit" fill="#f5a623" name="Net Profit" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Expense Distribution Pie */}
            <Card className="p-6">
              <h3 className="font-bold text-text text-lg mb-4">Expense Breakdown Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={EXPENSE_CATEGORIES} cx="50%" cy="50%" outerRadius={80} dataKey="amount" nameKey="name" label>
                      {EXPENSE_CATEGORIES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'expenses' && (
          <Card className="p-6">
            <h3 className="font-bold text-text text-lg mb-4">Itemized Expense Categories</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {EXPENSE_CATEGORIES.map((cat) => (
                <div key={cat.name} className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <h4 className="font-bold text-text text-sm">{cat.name}</h4>
                  </div>
                  <p className="text-2xl font-black text-red-600">₹{cat.amount.toLocaleString()}</p>
                  <p className="text-xs text-text-light mt-1 font-medium">
                    {((cat.amount / totalExpenses) * 100).toFixed(1)}% of total expenses
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'income' && (
          <Card className="p-6">
            <h3 className="font-bold text-text text-lg mb-4">Income Breakdown by Stream</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {INCOME_SOURCES.map((inc) => (
                <div key={inc.source} className="p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{inc.icon}</span>
                    <h4 className="font-bold text-text text-base">{inc.source}</h4>
                  </div>
                  <p className="text-3xl font-black text-emerald-700">₹{inc.amount.toLocaleString()}</p>
                  <p className="text-xs text-emerald-800 font-semibold mt-1">
                    {((inc.amount / totalRevenue) * 100).toFixed(1)}% of total revenue
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {activeTab === 'trends' && (
          <Card className="p-6">
            <h3 className="font-bold text-text text-lg mb-4">Crop-Wise Net Profit Comparison</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockCrops.map((c) => ({ name: c.name, profit: c.expectedRevenue * 0.65 }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="profit" fill="#1a5632" name="Net Profit (₹)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        )}
      </Tabs>
    </div>
  );
}
