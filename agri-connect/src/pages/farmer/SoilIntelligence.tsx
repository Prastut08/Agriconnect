import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Beaker, Sprout } from 'lucide-react';

const soilData = [
  { parameter: 'pH', value: 6.8, optimal: 7.0, min: 6.0, max: 7.5 },
  { parameter: 'Nitrogen', value: 45, optimal: 50, min: 30, max: 60 },
  { parameter: 'Phosphorus', value: 35, optimal: 40, min: 25, max: 50 },
  { parameter: 'Potassium', value: 55, optimal: 50, min: 40, max: 60 },
  { parameter: 'Moisture', value: 62, optimal: 65, min: 50, max: 75 },
  { parameter: 'Organic Matter', value: 1.2, optimal: 1.5, min: 1.0, max: 2.0 },
];

const radarData = soilData.map((d) => ({
  parameter: d.parameter,
  current: (d.value / d.optimal) * 100,
  optimal: 100,
}));

const suitableCrops = [
  { name: 'Wheat', suitability: 92 },
  { name: 'Rice', suitability: 88 },
  { name: 'Potato', suitability: 95 },
  { name: 'Tomato', suitability: 78 },
  { name: 'Sugarcane', suitability: 85 },
];

export default function SoilIntelligence() {

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Soil Intelligence</h1>
        <p className="text-text-light">AI-powered soil analysis and recommendations</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {soilData.map((param) => {
          const percentage = Math.round((param.value / param.optimal) * 100);
          const isOptimal = Math.abs(param.value - param.optimal) <= 5;
          return (
            <Card key={param.parameter} className="p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${isOptimal ? 'bg-green-50' : 'bg-amber-50'}`}>
                    <Beaker className={`w-5 h-5 ${isOptimal ? 'text-green-600' : 'text-amber-600'}`} />
                  </div>
                  <div>
                    <p className="text-xs text-text-light font-medium uppercase tracking-wide">{param.parameter}</p>
                    <p className="text-xl font-bold text-text">{param.value}</p>
                  </div>
                </div>
                <Badge variant={isOptimal ? 'success' : 'warning'}>{percentage}%</Badge>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isOptimal ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${Math.min(percentage, 100)}%` }} />
              </div>
              <p className="text-xs text-text-light mt-2">Optimal: {param.optimal} | Range: {param.min}-{param.max}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Overall Soil Health</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="parameter" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="Current" dataKey="current" stroke="#1a5632" fill="#1a5632" fillOpacity={0.3} />
                <Radar name="Optimal" dataKey="optimal" stroke="#f5a623" fill="#f5a623" fillOpacity={0.1} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Nutrient Levels</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={soilData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="parameter" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Bar dataKey="value" fill="#1a5632" name="Current" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimal" fill="#4caf50" name="Optimal" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            {[
              { title: 'Increase Organic Matter', desc: 'Add 2 tons of vermicompost per acre to improve soil organic matter from 1.2% to 1.5%.', priority: 'high', cost: 'Rs. 8,000' },
              { title: 'pH Adjustment', desc: 'Current pH is optimal. No adjustment needed for most crops.', priority: 'low', cost: 'Rs. 0' },
              { title: 'Phosphorus Supplement', desc: 'Apply single superphosphate at 50kg/acre to boost phosphorus levels.', priority: 'medium', cost: 'Rs. 3,500' },
              { title: 'Nitrogen Top-up', desc: 'Apply 25kg Urea per acre to boost nitrogen levels.', priority: 'medium', cost: 'Rs. 1,200' },
            ].map((rec, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${rec.priority === 'high' ? 'bg-red-50 border-red-100' : rec.priority === 'medium' ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-text text-sm mb-1">{rec.title}</h4>
                    <p className="text-xs text-text-light">{rec.desc}</p>
                  </div>
                  <Badge variant={rec.priority === 'high' ? 'error' : rec.priority === 'medium' ? 'warning' : 'success'}>{rec.cost}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Suitable Crops</h3>
          <div className="space-y-3">
            {suitableCrops.map((crop) => (
              <div key={crop.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Sprout className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-text">{crop.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${crop.suitability}%` }} />
                  </div>
                  <span className="text-sm font-bold text-text">{crop.suitability}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Detailed Parameters</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Parameter</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Current</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Optimal</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Range</th>
              </tr>
            </thead>
            <tbody>
              {soilData.map((param) => (
                <tr key={param.parameter} className="border-b border-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-text">{param.parameter}</td>
                  <td className="py-3 px-4 text-sm text-text">{param.value}</td>
                  <td className="py-3 px-4 text-sm text-text-light">{param.optimal}</td>
                  <td className="py-3 px-4">
                    <Badge variant={Math.abs(param.value - param.optimal) <= 5 ? 'success' : 'warning'}>
                      {Math.abs(param.value - param.optimal) <= 5 ? 'Optimal' : 'Needs Attention'}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-text-light">{param.min} - {param.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
