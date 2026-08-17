import { Card } from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Leaf, ShoppingCart } from 'lucide-react';
import { mockCustomer } from '../../data/mockData';

const monthlySavings = [
  { month: 'Jan', saved: 280 },
  { month: 'Feb', saved: 350 },
  { month: 'Mar', saved: 420 },
  { month: 'Apr', saved: 380 },
  { month: 'May', saved: 450 },
  { month: 'Jun', saved: 410 },
];

export default function Savings() {
  const totalSaved = monthlySavings.reduce((sum, m) => sum + m.saved, 0);
  const avgMonthly = Math.round(totalSaved / monthlySavings.length);
  const thisMonth = monthlySavings[monthlySavings.length - 1].saved;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Your Savings</h1>
        <p className="text-text-light">Track how much you save by buying directly from farmers</p>
      </div>

      <Card className="p-8 bg-gradient-to-r from-green-50 to-background text-center">
        <p className="text-lg text-text-light mb-2">You saved</p>
        <p className="text-5xl font-bold text-primary mb-2">Rs. {totalSaved.toLocaleString()}</p>
        <p className="text-sm text-text-light">this month</p>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Saved', value: `Rs. ${totalSaved}`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'This Month', value: `Rs. ${thisMonth}`, icon: DollarSign, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Avg. Monthly', value: `Rs. ${avgMonthly}`, icon: Leaf, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Orders Placed', value: mockCustomer.totalOrders.toString(), icon: ShoppingCart, color: 'text-accent', bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-xs text-text-light font-medium uppercase tracking-wide">{stat.label}</p>
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Monthly Savings</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySavings}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip formatter={(value) => [`Rs. ${value}`, 'Saved']} />
              <Bar dataKey="saved" fill="#1a5632" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">How You Save</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { title: 'Direct from Farmers', desc: 'No middlemen means better prices for you', saving: '15-25%', icon: '🌾' },
            { title: 'Fresh Produce', desc: 'Longer shelf life means less waste', saving: '10%', icon: '🥬' },
            { title: 'Bulk Discounts', desc: 'Subscribe and save even more', saving: '20%', icon: '📦' },
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-green-50 rounded-2xl text-center">
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <p className="font-bold text-text mb-1">{item.title}</p>
              <p className="text-sm text-text-light mb-2">{item.desc}</p>
              <p className="text-lg font-bold text-green-600">Save {item.saving}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Savings Breakdown</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text">Direct farmer purchases</span>
              <span className="text-sm font-bold text-text">Rs. 1,800</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '45%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text">Local sourcing</span>
              <span className="text-sm font-bold text-text">Rs. 950</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-secondary rounded-full" style={{ width: '25%' }} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-text">Subscription savings</span>
              <span className="text-sm font-bold text-text">Rs. 1,200</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-accent rounded-full" style={{ width: '30%' }} />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-background">
        <h3 className="font-semibold text-text mb-2">Tips for Saving More</h3>
        <ul className="space-y-2 text-sm text-text-light">
          <li>• Subscribe to weekly vegetable boxes for 20% extra savings</li>
          <li>• Buy seasonal produce for better prices</li>
          <li>• Purchase in bulk with neighbors for group discounts</li>
          <li>• Follow farmers for exclusive subscriber deals</li>
        </ul>
      </Card>
    </div>
  );
}
