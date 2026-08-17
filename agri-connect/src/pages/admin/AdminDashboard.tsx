import { Card } from '../../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const platformStats = [
  { label: 'Total Farmers', value: '12,450', change: '+12.5%', up: true },
  { label: 'Total Customers', value: '45,230', change: '+18.2%', up: true },
  { label: 'Products Listed', value: '8,932', change: '+8.7%', up: true },
  { label: 'Total Orders', value: '23,451', change: '+24.3%', up: true },
  { label: 'Revenue', value: 'Rs. 2.4Cr', change: '+32.1%', up: true },
  { label: 'Active Listings', value: '6,234', change: '+5.4%', up: true },
];

const monthlyData = [
  { month: 'Jan', orders: 1200, revenue: 180000 },
  { month: 'Feb', orders: 1400, revenue: 210000 },
  { month: 'Mar', orders: 1600, revenue: 240000 },
  { month: 'Apr', orders: 1800, revenue: 270000 },
  { month: 'May', orders: 2000, revenue: 300000 },
  { month: 'Jun', orders: 2200, revenue: 330000 },
];


export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Admin Dashboard</h1>
        <p className="text-text-light">Platform overview and analytics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformStats.map((stat, idx) => (
          <Card key={idx} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-text">{stat.value}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Platform Growth</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="orders" stroke="#1a5632" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Disease Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={3} name="Revenue" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New farmer registered', user: 'Vikram Patel', time: '2 minutes ago', type: 'farmer' },
            { action: 'New order placed', user: 'Priya Sharma', time: '5 minutes ago', type: 'order' },
            { action: 'Product listed', user: 'Amit Singh', time: '10 minutes ago', type: 'product' },
            { action: 'Payment received', user: 'Neha Gupta', time: '15 minutes ago', type: 'payment' },
            { action: 'Complaint filed', user: 'Rahul Joshi', time: '20 minutes ago', type: 'complaint' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div>
                  <p className="text-sm font-medium text-text">{activity.action}</p>
                  <p className="text-xs text-text-light">by {activity.user}</p>
                </div>
              </div>
              <span className="text-xs text-text-light">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
