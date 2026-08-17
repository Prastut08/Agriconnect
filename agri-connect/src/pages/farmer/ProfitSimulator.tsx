import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockCrops } from '../../data/mockData';

export default function ProfitSimulator() {
  const [selectedCrop, setSelectedCrop] = useState(mockCrops[0].id);
  const [expectedYield, setExpectedYield] = useState(10000);
  const [sellingPrice, setSellingPrice] = useState(50);
  const [fertilizerCost, setFertilizerCost] = useState(15000);
  const [labourCost, setLabourCost] = useState(25000);
  const [transportCost, setTransportCost] = useState(5000);
  const [otherExpenses, setOtherExpenses] = useState(8000);

  const totalRevenue = expectedYield * sellingPrice;
  const totalCost = fertilizerCost + labourCost + transportCost + otherExpenses;
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : 0;

  const costData = [
    { name: 'Fertilizer', value: fertilizerCost },
    { name: 'Labour', value: labourCost },
    { name: 'Transport', value: transportCost },
    { name: 'Other', value: otherExpenses },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Farm Profit Simulator</h1>
        <p className="text-text-light">Calculate expected profits for your crops</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Crop Selection</h3>
            <select
              value={selectedCrop}
              onChange={(e) => {
                const crop = mockCrops.find((c) => c.id === e.target.value);
                if (crop) {
                  setSelectedCrop(crop.id);
                  setExpectedYield(crop.expectedYield);
                  setSellingPrice(Math.round(crop.expectedRevenue / crop.expectedYield));
                }
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
            >
              {mockCrops.map((crop) => (
                <option key={crop.id} value={crop.id}>{crop.name} - {crop.fieldName}</option>
              ))}
            </select>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              Input Parameters
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text">Expected Yield (kg)</label>
                  <span className="text-sm font-bold text-primary">{expectedYield.toLocaleString()} kg</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="100"
                  value={expectedYield}
                  onChange={(e) => setExpectedYield(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-text">Selling Price (Rs./kg)</label>
                  <span className="text-sm font-bold text-primary">Rs. {sellingPrice}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="1"
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-text block mb-2">Fertilizer Cost (Rs.)</label>
                <Input type="number" value={fertilizerCost.toString()} onChange={(v) => setFertilizerCost(Number(v))} />
              </div>

              <div>
                <label className="text-sm font-medium text-text block mb-2">Labour Cost (Rs.)</label>
                <Input type="number" value={labourCost.toString()} onChange={(v) => setLabourCost(Number(v))} />
              </div>

              <div>
                <label className="text-sm font-medium text-text block mb-2">Transportation Cost (Rs.)</label>
                <Input type="number" value={transportCost.toString()} onChange={(v) => setTransportCost(Number(v))} />
              </div>

              <div>
                <label className="text-sm font-medium text-text block mb-2">Other Expenses (Rs.)</label>
                <Input type="number" value={otherExpenses.toString()} onChange={(v) => setOtherExpenses(Number(v))} />
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-green-50 to-background">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Projected Results
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-2xl">
                <p className="text-xs text-text-light mb-1">Expected Revenue</p>
                <p className="text-2xl font-bold text-green-600">Rs. {totalRevenue.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl">
                <p className="text-xs text-text-light mb-1">Total Cost</p>
                <p className="text-2xl font-bold text-red-600">Rs. {totalCost.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl">
                <p className="text-xs text-text-light mb-1">Expected Profit</p>
                <p className="text-2xl font-bold text-primary">Rs. {profit.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white rounded-2xl">
                <p className="text-xs text-text-light mb-1">Profit Margin</p>
                <p className="text-2xl font-bold text-accent">{profitMargin}%</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Cost Breakdown</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip formatter={(value) => [`Rs. ${value}`, 'Cost']} />
                  <Bar dataKey="value" fill="#1a5632" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
        <p className="text-xs text-amber-700 text-center">Simulation based on inputs. Actual results may vary based on market conditions and weather.</p>
      </div>
    </div>
  );
}
