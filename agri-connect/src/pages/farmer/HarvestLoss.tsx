import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Truck, Package, Droplets, TrendingUp, AlertOctagon } from 'lucide-react';
import { mockCrops } from '../../data/mockData';

export default function HarvestLoss() {
  const [selectedCropIdx, setSelectedCropIdx] = useState(0);
  const crop = mockCrops[selectedCropIdx];

  // Calculated values matching prompt example
  const expectedHarvest = (crop.expectedYield / 1000).toFixed(1); // tonnes
  const expectedSaleRevenue = (crop.expectedRevenue / 100000).toFixed(2); // Lakhs
  const estimatedLossPercent = 12; // 12%
  const potentialLossVal = ((crop.expectedRevenue * estimatedLossPercent) / 100).toLocaleString();

  const riskFactors = [
    { name: 'Transportation Availability', value: 35, color: '#1a5632', icon: Truck, detail: 'High regional truck demand during peak harvest season' },
    { name: 'Storage Capacity & Temp', value: 25, color: '#4caf50', icon: Package, detail: 'Ambient storage humidity over 65%' },
    { name: 'Market Demand & Price Volatility', value: 22, color: '#f5a623', icon: TrendingUp, detail: 'Fluctuating mandi buyers in nearby districts' },
    { name: 'Produce Shelf Life', value: 18, color: '#ef4444', icon: Droplets, detail: 'Fresh produce moisture loss post harvest' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
            Flagship Innovation #5 ⭐
          </span>
          <h1 className="text-3xl font-bold text-text">Harvest Loss Prediction AI</h1>
        </div>
        <p className="text-text-light">
          Pre-harvest loss estimation before harvesting (Production → Storage → Transport → Sale)
        </p>
      </div>

      {/* Crop Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {mockCrops.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setSelectedCropIdx(idx)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCropIdx === idx
                ? 'bg-primary text-white shadow-md'
                : 'bg-surface text-text-light border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {c.name} ({c.fieldName})
          </button>
        ))}
      </div>

      {/* Main Flow Banner: Expected Harvest -> Expected Sale -> Potential Loss */}
      <Card className="p-6 border-2 border-amber-500/40 bg-gradient-to-r from-amber-50/80 via-white to-orange-50/60 shadow-lg rounded-3xl">
        <div className="flex items-center gap-2 mb-4">
          <AlertOctagon className="w-6 h-6 text-amber-600 animate-pulse" />
          <h2 className="text-xl font-extrabold text-amber-950">Pre-Harvest Spoilage & Loss Analysis</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {/* Expected Harvest */}
          <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm text-center">
            <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Expected Production</p>
            <p className="text-3xl font-black text-text">{expectedHarvest} Tonnes</p>
            <p className="text-xs text-emerald-700 font-semibold mt-1">Field Harvest Ready</p>
          </div>

          {/* Expected Sale */}
          <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm text-center">
            <p className="text-xs font-bold text-text-light uppercase tracking-wider mb-1">Expected Gross Revenue</p>
            <p className="text-3xl font-black text-emerald-700">₹{expectedSaleRevenue} Lakh</p>
            <p className="text-xs text-text-light mt-1">At Current Mandi Rates</p>
          </div>

          {/* Potential Loss (Matches prompt example!) */}
          <div className="p-4 rounded-2xl bg-amber-100/90 border-2 border-amber-400 shadow-sm text-center">
            <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">Potential Post-Harvest Loss</p>
            <p className="text-3xl font-black text-red-600">{estimatedLossPercent}%</p>
            <p className="text-xs text-amber-900 font-bold mt-1">₹{potentialLossVal} Risk</p>
          </div>
        </div>

        {/* Highlight Alert Box (Exact Prompt Example Match!) */}
        <div className="p-5 bg-white rounded-2xl border-2 border-amber-300 shadow-sm space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-black text-amber-900 flex items-center gap-1.5">
              ⚠️ Estimated post-harvest loss: 12%
            </span>
            <span className="text-xs font-bold px-3 py-1 bg-red-100 text-red-800 rounded-full">
              Main Risk: Delayed Transportation
            </span>
          </div>
          <p className="text-xs text-text font-medium">
            <strong>🤖 AI Action Recommendation:</strong> Sell within 3 days of harvest OR arrange local buyer directly on AgriConnect Marketplace to bypass logistics bottleneck.
          </p>
        </div>
      </Card>

      {/* Grid: 7 Risk Factors & Mitigation Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold text-text text-lg mb-4">Post-Harvest Risk Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={riskFactors} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={5} dataKey="value">
                  {riskFactors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-text text-lg">AI Risk Mitigation Plan</h3>
          {riskFactors.map((factor, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-xs text-primary">
                <factor.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-text text-sm">{factor.name}</h4>
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                    {factor.value}% Weight
                  </span>
                </div>
                <p className="text-xs text-text-light">{factor.detail}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
