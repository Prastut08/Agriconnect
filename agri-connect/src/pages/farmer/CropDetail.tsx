import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Droplets, TrendingUp, DollarSign, AlertTriangle, BarChart3, Beaker } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { mockCrops } from '../../data/mockData';

const growthStages = ['sowing', 'vegetative', 'flowering', 'fruiting', 'harvest-ready'];

export default function CropDetail() {
  const { id } = useParams();
  const crop = mockCrops.find((c) => c.id === id) || mockCrops[0];
  const currentStageIndex = growthStages.indexOf(crop.growthStage);

  const weatherImpact = [
    { day: 'Mon', temp: 28, rain: 30, optimal: 30 },
    { day: 'Tue', temp: 30, rain: 10, optimal: 25 },
    { day: 'Wed', temp: 32, rain: 5, optimal: 20 },
    { day: 'Thu', temp: 31, rain: 20, optimal: 25 },
    { day: 'Fri', temp: 29, rain: 60, optimal: 30 },
    { day: 'Sat', temp: 27, rain: 70, optimal: 35 },
    { day: 'Sun', temp: 28, rain: 40, optimal: 30 },
  ];

  const yieldData = Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    yield: Math.min(100, 10 + i * 18 + Math.random() * 5),
    target: 85,
  }));

  const estimatedExpenses = Math.round(crop.expectedRevenue * 0.4);
  const profit = crop.expectedRevenue - estimatedExpenses;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center gap-4">
        <Link to="/farmer/crops">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Crops
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold text-text">{crop.name}</h1>
            <Badge variant={crop.healthScore >= 90 ? 'success' : crop.healthScore >= 75 ? 'warning' : 'error'}>
              {crop.healthScore}% Healthy
            </Badge>
          </div>
          <p className="text-text-light">{crop.fieldName} - {crop.area} acres - Planted {new Date(crop.plantedDate).toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="primary">{crop.growthStage.replace('-', ' ')}</Badge>
          <Badge variant={crop.status === 'growing' ? 'success' : 'warning'}>{crop.status}</Badge>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-6">Growth Timeline</h3>
        <div className="flex items-center justify-between mb-8">
          {growthStages.map((stage, idx) => (
            <div key={stage} className="flex flex-col items-center flex-1">
              <div className="relative w-full flex items-center">
                {idx > 0 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${idx <= currentStageIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                  idx <= currentStageIndex ? 'bg-primary text-white' : 'bg-gray-100 text-text-light'
                }`}>
                  {idx + 1}
                </div>
                {idx < growthStages.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full ${idx < currentStageIndex ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
              <span className={`text-xs mt-2 font-medium capitalize ${idx <= currentStageIndex ? 'text-primary' : 'text-text-light'}`}>{stage}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-primary" />
                <p className="text-sm text-text-light">Expected Harvest</p>
              </div>
              <p className="text-2xl font-bold text-text">{new Date(crop.expectedHarvestDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <Droplets className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-text-light">Water Requirement</p>
              </div>
              <p className="text-2xl font-bold text-text">{crop.waterRequirement}</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <p className="text-sm text-text-light">Expected Yield</p>
              </div>
              <p className="text-2xl font-bold text-text">{crop.expectedYield.toLocaleString()} kg</p>
            </Card>
            <Card className="p-5">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-accent" />
                <p className="text-sm text-text-light">Expected Revenue</p>
              </div>
              <p className="text-2xl font-bold text-text">Rs. {crop.expectedRevenue.toLocaleString()}</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Yield Prediction
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yieldData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Area type="monotone" dataKey="yield" stroke="#1a5632" fill="#1a5632" fillOpacity={0.1} name="Yield %" />
                  <Line type="monotone" dataKey="target" stroke="#f5a623" strokeWidth={2} strokeDasharray="5 5" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary" />
              Disease Probability
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${crop.diseaseProbability > 50 ? 'bg-red-500' : crop.diseaseProbability > 25 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{ width: `${crop.diseaseProbability}%` }}
                />
              </div>
              <span className="text-sm font-bold text-text">{crop.diseaseProbability}%</span>
            </div>
            <p className="text-sm text-text-light">Based on current weather conditions and crop stage, the probability of disease outbreak is {crop.diseaseProbability}%.</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Weather Impact</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weatherImpact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} name="Temperature" />
                  <Line type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={2} name="Rain" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Beaker className="w-5 h-5 text-primary" />
              Fertilizer Schedule
            </h3>
            <div className="space-y-3">
              {crop.fertilizerSchedule.map((fertilizer, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  <span className="text-sm text-text">{fertilizer}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">AI Recommendations</h3>
            <div className="space-y-3">
              {[
                { title: 'Increase irrigation', desc: 'Current stage requires 20% more water. Consider drip irrigation optimization.', priority: 'high' },
                { title: 'Monitor for pests', desc: 'Weather conditions favorable for aphids. Check underside of leaves weekly.', priority: 'medium' },
                { title: 'Optimal harvest window', desc: 'Based on current growth rate, harvest in 12-15 days for best quality.', priority: 'low' },
              ].map((rec, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${rec.priority === 'high' ? 'bg-red-50 border-red-100' : rec.priority === 'medium' ? 'bg-amber-50 border-amber-100' : 'bg-green-50 border-green-100'}`}>
                  <h4 className="font-semibold text-text text-sm mb-1">{rec.title}</h4>
                  <p className="text-xs text-text-light">{rec.desc}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-background">
            <h3 className="font-semibold text-text mb-4">Financial Summary</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-text-light mb-1">Expected Revenue</p>
                <p className="text-2xl font-bold text-green-600">Rs. {crop.expectedRevenue.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-text-light mb-1">Estimated Expenses</p>
                <p className="text-2xl font-bold text-red-600">Rs. {estimatedExpenses.toLocaleString()}</p>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-text-light mb-1">Expected Profit</p>
                <p className="text-3xl font-bold text-primary">Rs. {profit.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
