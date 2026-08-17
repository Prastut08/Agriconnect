import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { mockCrops } from '../../data/mockData';

const yieldData = mockCrops.map((crop) => ({
  name: crop.name,
  expected: crop.expectedYield,
  predicted: crop.expectedYield * (1 - crop.yieldRisk / 100),
  risk: crop.yieldRisk,
}));

const historicalData = [
  { month: 'Jan', yield: 3500, target: 3800 },
  { month: 'Feb', yield: 3200, target: 3600 },
  { month: 'Mar', yield: 4000, target: 3900 },
  { month: 'Apr', yield: 4500, target: 4200 },
  { month: 'May', yield: 4200, target: 4400 },
  { month: 'Jun', yield: 4800, target: 4600 },
];

const yieldTrend = Array.from({ length: 8 }, (_, i) => ({
  month: `Month ${i + 1}`,
  actual: 3000 + i * 400 + Math.random() * 200,
  predicted: 2800 + i * 420 + Math.random() * 150,
}));

export default function YieldPrediction() {
  const totalExpected = mockCrops.reduce((sum, c) => sum + c.expectedYield, 0);
  const avgRisk = Math.round(mockCrops.reduce((sum, c) => sum + c.yieldRisk, 0) / mockCrops.length);
  const confidence = 87;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">AI Yield Prediction</h1>
        <p className="text-text-light">AI-powered harvest forecasts and yield analytics</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Expected Yield', value: `${(totalExpected / 1000).toFixed(1)}k kg`, change: '+12.5%', up: true },
          { label: 'Yield Risk', value: `${avgRisk}%`, change: '-2.1%', up: true },
          { label: 'Expected Revenue', value: 'Rs. 6.62L', change: '+15.3%', up: true },
          { label: 'Prediction Confidence', value: `${confidence}%`, change: '+3.2%', up: true },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 hover:shadow-lg transition-all duration-300">
            <p className="text-xs text-text-light mb-2 font-medium uppercase tracking-wide">{stat.label}</p>
            <p className="text-3xl font-bold text-text mb-1">{stat.value}</p>
            <span className={`text-sm font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>{stat.change}</span>
            <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: `${confidence}%` }} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Yield Prediction by Crop</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Bar dataKey="expected" fill="#1a5632" name="Expected" radius={[4, 4, 0, 0]} />
                <Bar dataKey="predicted" fill="#4caf50" name="Predicted" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Historical Yield Comparison</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="yield" stroke="#1a5632" strokeWidth={3} name="Actual Yield" />
                <Line type="monotone" dataKey="target" stroke="#f5a623" strokeWidth={2} strokeDasharray="5 5" name="Target" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Yield Trend Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yieldTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="actual" stroke="#1a5632" fill="#1a5632" fillOpacity={0.1} name="Actual" />
              <Area type="monotone" dataKey="predicted" stroke="#4caf50" fill="#4caf50" fillOpacity={0.1} name="Predicted" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Crop-wise Yield Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Crop</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Field</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Expected Yield</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Yield Risk</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Harvest Date</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {mockCrops.map((crop) => (
                <tr key={crop.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-text">{crop.name}</td>
                  <td className="py-3 px-4 text-sm text-text-light">{crop.fieldName}</td>
                  <td className="py-3 px-4 text-sm text-text">{crop.expectedYield.toLocaleString()} kg</td>
                  <td className="py-3 px-4">
                    <Badge variant={crop.yieldRisk > 20 ? 'error' : crop.yieldRisk > 10 ? 'warning' : 'success'}>{crop.yieldRisk}%</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-light">{new Date(crop.expectedHarvestDate).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-sm font-medium text-text">Rs. {crop.expectedRevenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
