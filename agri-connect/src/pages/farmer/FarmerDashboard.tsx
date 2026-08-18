import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Wheat,
  AlertTriangle,
  CloudRain,
  TrendingUp,
  Store,
  DollarSign,
  Landmark,
  Mic,
  ArrowRight,
  ShieldAlert,
  Droplets,
  CheckCircle2,
  Users,
  Beaker,
  AlertOctagon,
  ClipboardList,
  Clock,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockUser, mockCrops, mockDiseaseAlerts, mockOrders, mockWeather, mockProducts, mockGovernmentSchemes, mockExpenses, mockIncome } from '../../data/mockData';
import { actionCenterMockTasks } from '../../components/farmer/ActionCenter';

// 4 Preset Copilot Prompts
const COPILOT_PRESETS = [
  {
    q: 'Should I irrigate today?',
    action: 'SKIP IRRIGATING TODAY',
    reason: 'Rain expected tomorrow (18mm rain, 78% humidity). Soil moisture is at optimal capacity (68%).',
    impact: 'Saves 15,000L water & ₹850 energy cost.',
    icon: Droplets,
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
  },
  {
    q: 'Which crop should I plant?',
    action: 'PLANT ORGANIC TOMATO (H-86)',
    reason: 'Soil NPK test indicates high nitrogen residue. Regional market predicts 22% tomato price surge in May.',
    impact: '+₹35,000 / acre higher profit than chana.',
    icon: Wheat,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  },
  {
    q: 'Should I sell my wheat now?',
    action: 'HOLD WHEAT FOR 7 - 10 DAYS',
    reason: 'Current price ₹2,350/q. Predicted 7-day price ₹2,420/q due to local flour mill demand surge.',
    impact: '+₹16,800 total profit gain on 4.2t harvest.',
    icon: TrendingUp,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
  },
  {
    q: 'Why are leaves turning yellow?',
    action: 'APPLY MAGNESIUM + COPPER SPRAY',
    reason: 'Interveinal yellowing with high humidity indicates early Nitrogen-Magnesium gap + Late Blight risk.',
    impact: 'Halts yellowing in 48h & prevents 15% yield loss.',
    icon: AlertTriangle,
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
  },
];

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [selectedCopilotIdx, setSelectedCopilotIdx] = useState(0);
  const [sellerModeActive, setSellerModeActive] = useState(false);
  const voiceQueryInput = 'Mere गेहूं ke patte peele ho rahe hain, kya karun?';
  const [isVoiceSimulating, setIsVoiceSimulating] = useState(false);
  const [voiceAnswer, setVoiceAnswer] = useState<string | null>(null);

  // Financial calculations
  const totalRevenue = mockIncome.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = mockExpenses.reduce((s, e) => s + e.amount, 0);
  const actualProfit = totalRevenue - totalExpenses;

  // Weather & order counts
  const todayWeather = mockWeather[0];
  const activeOrders = mockOrders.filter((o) => ['new', 'preparing', 'ready', 'out-for-delivery'].includes(o.status)).length;
  const listedCount = mockProducts.filter((p) => p.farmerId === mockUser.id).length;

  const currentPreset = COPILOT_PRESETS[selectedCopilotIdx];

  const handleVoiceSimulate = () => {
    setIsVoiceSimulating(true);
    setVoiceAnswer(null);
    setTimeout(() => {
      setIsVoiceSimulating(false);
      setVoiceAnswer('आपकी फसल में मैग्नीशियम की कमी और फंगल स्पॉट के लक्षण हैं। 48 घंटे के भीतर कॉपर ऑक्सीक्लोराइड (2g/L) का छिड़काव करें और अधिक सिंचाई से बचें।');
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Operating System Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Wheat className="w-3.5 h-3.5 text-amber-400" />
                Farm Operating System 🌾
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-semibold">
                {mockUser.farmName} • {mockUser.farmSize} Acres
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Good Morning, {mockUser.name.split(' ')[0]} 👋
            </h1>
            <p className="text-emerald-200 text-sm mt-1 max-w-xl">
              All 14 smart farm tools active. Your crop health score is <strong className="text-emerald-400">91%</strong> with clean market demand.
            </p>
          </div>

          {/* Mode Switcher ↔ Seller Mode */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <span className={`text-xs font-bold ${!sellerModeActive ? 'text-emerald-300 font-extrabold' : 'text-white/60'}`}>
                🌾 Farmer Mode
              </span>
              <button
                onClick={() => {
                  setSellerModeActive(!sellerModeActive);
                  if (!sellerModeActive) navigate('/farmer/seller');
                }}
                className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 relative ${
                  sellerModeActive ? 'bg-amber-400' : 'bg-emerald-600'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                    sellerModeActive ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={`text-xs font-bold ${sellerModeActive ? 'text-amber-300 font-extrabold' : 'text-white/60'}`}>
                🛒 Seller Mode
              </span>
            </div>
            <p className="text-[11px] text-emerald-200 text-center">
              {sellerModeActive ? 'Marketplace mode active. Managing buyer orders.' : 'Farm OS mode active. Managing crop lifecycle.'}
            </p>
          </div>
        </div>
      </div>

      {/* 📋 Today's Farm Tasks / Todo List */}
      <Card className="p-6 border-2 border-primary/10 bg-gradient-to-br from-gray-50/60 via-white to-gray-50/40 shadow-md rounded-3xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text">Today's Farm Tasks</h2>
          </div>
          <Link to="/farmer/tasks">
            <Button size="sm" variant="outline">View All Tasks</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {actionCenterMockTasks.slice(0, 3).map((task) => (
            <div key={task.id} className={`p-4 rounded-2xl border-l-4 ${
              task.priority === 'high' ? 'border-l-error bg-red-50' :
              task.priority === 'recommended' ? 'border-l-primary bg-green-50' :
              task.priority === 'opportunity' ? 'border-l-accent bg-amber-50' :
              'border-l-gray-300 bg-gray-50'
            }`}>
              <div className="flex items-start gap-2 mb-2">
                <div className="mt-0.5">{task.icon}</div>
                <div>
                  <h4 className="font-semibold text-text text-sm">{task.title}</h4>
                  <p className="text-xs text-text-light mt-1">{task.reason}</p>
                </div>
              </div>
              <div className="flex items-center justify-between ml-6">
                <span className="text-xs font-medium text-primary bg-white px-2.5 py-1 rounded-lg">{task.action}</span>
                <span className="text-[11px] text-text-light font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Key Metric Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-600 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-light font-bold uppercase tracking-wider">Active Crops</span>
            <div className="p-2 bg-emerald-50 rounded-xl">
              <Wheat className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
          <p className="text-3xl font-black text-text">{mockCrops.length}</p>
          <p className="text-xs text-emerald-700 font-semibold mt-1">91% Average Health</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-red-500 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-light font-bold uppercase tracking-wider">Pest / Early Warning</span>
            <div className="p-2 bg-red-50 rounded-xl">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-red-600">{mockDiseaseAlerts.length}</p>
          <p className="text-xs text-red-700 font-semibold mt-1">78% Risk Tomato Late Blight</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-emerald-700 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-light font-bold uppercase tracking-wider">Actual Net Profit</span>
            <div className="p-2 bg-emerald-50 rounded-xl">
              <DollarSign className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
          <p className="text-3xl font-black text-emerald-700">₹{(actualProfit / 1000).toFixed(0)}k</p>
          <p className="text-xs text-text-light mt-1">Rev ₹{(totalRevenue/1000).toFixed(0)}k − Exp ₹{(totalExpenses/1000).toFixed(0)}k</p>
        </Card>

        <Card className="p-5 border-l-4 border-l-blue-600 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-text-light font-bold uppercase tracking-wider">Listed Produce</span>
            <div className="p-2 bg-blue-50 rounded-xl">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <p className="text-3xl font-black text-text">{listedCount} Items</p>
          <p className="text-xs text-blue-700 font-semibold mt-1">{activeOrders} Active Orders</p>
        </Card>
      </div>

      {/* 🤖 B. AI FARM DECISION COPILOT ⭐ (FLAGSHIP #1) */}
      <Card className="p-6 border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/40 shadow-xl rounded-3xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-700 text-white rounded-2xl shadow-md">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                  Flagship Feature ⭐
                </span>
                <h2 className="text-xl font-bold text-text">AI Farm Decision Copilot</h2>
              </div>
              <p className="text-xs text-text-light mt-0.5">
                Weather + Soil + Crop Stage + Mandi Price + Historical Data → Real-Time Executable Action
              </p>
            </div>
          </div>
          <Link to="/farmer/copilot">
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800">
              Open Full Copilot
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Preset Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {COPILOT_PRESETS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCopilotIdx(idx)}
              className={`p-3.5 rounded-2xl text-left border text-xs font-bold transition-all duration-200 ${
                selectedCopilotIdx === idx
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-md scale-[1.02]'
                  : 'bg-white border-gray-200 text-text-light hover:bg-gray-50 hover:text-text'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <item.icon className="w-4 h-4" />
                <span>Question #{idx + 1}</span>
              </div>
              <p className="line-clamp-1">"{item.q}"</p>
            </button>
          ))}
        </div>

        {/* Structured Output Display */}
        <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs text-text-light border-b pb-3">
            <span className="font-bold text-text">Selected Prompt: "{currentPreset.q}"</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              AI Confidence: 92%
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {/* Action */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Recommended Action
              </p>
              <p className="text-sm font-extrabold text-emerald-950">{currentPreset.action}</p>
            </div>
            {/* Reason */}
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" /> AI Fusion Reason
              </p>
              <p className="text-xs text-text-light leading-relaxed">{currentPreset.reason}</p>
            </div>
            {/* Impact */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-600" /> Expected Impact
              </p>
              <p className="text-sm font-bold text-amber-950">{currentPreset.impact}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Grid Section: Early Warning + Weather + Sell/Wait Ticker */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* 🐛 D. Pest & Disease Early Warning AI ⭐ (FLAGSHIP #2) */}
        <Card className="p-6 border-l-4 border-l-red-500 bg-gradient-to-br from-red-50/50 via-white to-orange-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <h3 className="font-bold text-text">Pest & Disease Early Warning</h3>
            </div>
            <Badge variant="error">78% Risk</Badge>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-red-100 shadow-sm space-y-3 mb-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-bold text-red-950 text-sm">Tomato Late Blight Warning</h4>
                <p className="text-xs text-text-light">Greenhouse A • Punjab Region</p>
              </div>
              <span className="text-xs font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-full">High</span>
            </div>
            <div className="text-xs text-text-light space-y-1">
              <p><strong>Triggers:</strong> High humidity (82%) + recent rainfall (14mm)</p>
              <p className="text-red-700 font-semibold"><strong>Action Required:</strong> Inspect crop within 24 hours.</p>
            </div>
          </div>

          <Link to="/farmer/disease">
            <Button variant="outline" size="sm" className="w-full border-red-200 text-red-700 hover:bg-red-50">
              Upload Crop Photo for AI Confirmation →
            </Button>
          </Link>
        </Card>

        {/* 🌦️ J. Weather & Smart Irrigation */}
        <Card className="p-6 bg-gradient-to-br from-blue-50/50 via-white to-sky-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-text">Weather & Smart Irrigation</h3>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
              {todayWeather.temperature.max}°C Sunny
            </span>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs text-text-light">
              <span>Tomorrow's Rain Chance</span>
              <span className="font-bold text-blue-700">70% Rain Expected</span>
            </div>
            <div className="p-3 bg-blue-50/80 rounded-xl text-xs text-blue-900 border border-blue-200">
              🌧️ <strong>Smart Irrigation Tip:</strong> Rain expected tomorrow — skip irrigation today to save 15,000L of water.
            </div>
          </div>

          <Link to="/farmer/weather">
            <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
              View 7-Day Forecast & Moisture Map →
            </Button>
          </Link>
        </Card>

        {/* 💹 H. AI Crop Price + Sell/Wait Advisor ⭐ (FLAGSHIP #4) */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50/50 via-white to-green-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-text">AI Sell/Wait Advisor</h3>
            </div>
            <Badge variant="warning">WAIT (Wheat)</Badge>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-sm space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-text">Wheat (Punjab Mandi)</span>
              <span className="font-extrabold text-emerald-700">₹2,350 / q</span>
            </div>
            <p className="text-xs text-text-light">
              7-Day Predicted Price: <strong className="text-emerald-700">₹2,420 / q</strong> (Confidence: 74%)
            </p>
            <div className="p-2.5 bg-amber-50 rounded-xl text-[11px] text-amber-800 border border-amber-200 font-medium">
              🤖 <strong>AI Recommendation: WAIT.</strong> Mandi supply deficit expected next week.
            </div>
          </div>

          <Link to="/farmer/market">
            <Button variant="outline" size="sm" className="w-full border-emerald-200 text-emerald-800 hover:bg-emerald-50">
              Compare Mandis & Price Trends →
            </Button>
          </Link>
        </Card>
      </div>

      {/* Grid Section: Yield & Harvest AI + Post-Harvest Loss AI */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 📈 E. AI Yield & Harvest Prediction ⭐ (FLAGSHIP #3) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-emerald-700" />
              <div>
                <h3 className="font-bold text-text">AI Yield & Harvest Prediction</h3>
                <p className="text-xs text-text-light">North Field Wheat • Harvest Window 8-12 days</p>
              </div>
            </div>
            <Link to="/farmer/yield" className="text-xs font-bold text-primary hover:underline">
              View Analytics →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-[11px] text-text-light uppercase font-bold">Expected Yield</p>
              <p className="text-xl font-black text-text">4.2 Tonnes</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-[11px] text-text-light uppercase font-bold">Expected Revenue</p>
              <p className="text-xl font-black text-emerald-700">₹1.18 Lakh</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-[11px] text-text-light uppercase font-bold">Harvest Window</p>
              <p className="text-xl font-black text-text">8-12 Days</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <p className="text-[11px] text-text-light uppercase font-bold">Yield Risk</p>
              <p className="text-xl font-black text-amber-600">Medium (10%)</p>
            </div>
          </div>
        </Card>

        {/* 📉 G. Harvest Loss Prediction AI ⭐ (FLAGSHIP #5) */}
        <Card className="p-6 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-600" />
              <div>
                <h3 className="font-bold text-text">Harvest Loss Prediction AI</h3>
                <p className="text-xs text-text-light">Pre-harvest risk & spoilage estimator</p>
              </div>
            </div>
            <Badge variant="warning">12% Loss Risk</Badge>
          </div>

          <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-900">⚠️ Estimated Post-Harvest Loss: 12%</span>
              <span className="text-amber-800 font-semibold">Primary Risk: Delayed Transport</span>
            </div>
            <p className="text-xs text-amber-800">
              <strong>Recommendation:</strong> Sell within 3 days of harvest or arrange local cold-storage buyer to prevent ₹14,200 loss.
            </p>
          </div>

          <Link to="/farmer/harvest-loss">
            <Button variant="outline" size="sm" className="w-full">
              Detailed Spoilage Factors & Mitigation →
            </Button>
          </Link>
        </Card>
      </div>

      {/* 🌱 C. Crop Management Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-text">Crop Management OS</h2>
            <p className="text-xs text-text-light">Sowing → Growth Stage → Health → Harvest & Income</p>
          </div>
          <Link to="/farmer/crops">
            <Button variant="outline" size="sm">View All 4 Crops</Button>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockCrops.slice(0, 3).map((crop) => (
            <div key={crop.id} className="p-4 rounded-2xl border border-gray-100 bg-surface hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-text text-base">{crop.name}</h4>
                  <p className="text-xs text-text-light">{crop.fieldName} • {crop.area} acres</p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 capitalize">
                  {crop.growthStage}
                </span>
              </div>
              <div className="space-y-1.5 my-3 text-xs text-text-light">
                <div className="flex justify-between">
                  <span>Planted: {new Date(crop.plantedDate).toLocaleDateString()}</span>
                  <span>Harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Health: <strong className="text-emerald-700">{crop.healthScore}%</strong></span>
                  <span>Est. Revenue: <strong className="text-text">₹{crop.expectedRevenue.toLocaleString()}</strong></span>
                </div>
              </div>
              <Link to={`/farmer/crops/${crop.id}`}>
                <Button size="sm" variant="ghost" className="w-full text-xs text-primary">Manage Crop Details →</Button>
              </Link>
            </div>
          ))}
        </div>
      </Card>

      {/* 📦 Upcoming & Pending Orders */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-emerald-700" />
            <h2 className="text-xl font-bold text-text">Upcoming & Pending Orders</h2>
          </div>
          <Link to="/farmer/orders">
            <Button variant="outline" size="sm">View All Orders</Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockOrders
            .filter((o) => o.farmerId === mockUser.id && ['new', 'accepted', 'preparing', 'ready'].includes(o.status))
            .slice(0, 3)
            .map((order) => (
              <div key={order.id} className="p-4 rounded-2xl border border-gray-100 bg-surface hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-text text-sm">Order #{order.id}</h4>
                    <p className="text-xs text-text-light">Customer: {order.customerName}</p>
                  </div>
                  <Badge variant={order.status === 'new' ? 'warning' : order.status === 'accepted' ? 'info' : 'success'}>
                    {order.status.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-xs text-text-light mb-1">
                  {order.items.map((item) => `${item.productName} (${item.quantity} ${item.unit})`).join(', ')}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-bold text-text">Total: ₹{order.totalAmount}</span>
                  <span className="text-xs text-text-light">Payment: {order.paymentStatus}</span>
                </div>
              </div>
            ))}
        </div>
      </Card>

      {/* Grid: Income & Expense Tracker + Government Scheme Matchmaker */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 💰 F. Farm Income & Expense Tracker ⭐ (FLAGSHIP #6) */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-text">Farm Income & Expense Intelligence</h3>
            </div>
            <Link to="/farmer/finance" className="text-xs font-bold text-primary hover:underline">Full Statement →</Link>
          </div>

          <div className="p-4 bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-2xl shadow-md mb-4">
            <p className="text-xs text-emerald-200 font-semibold uppercase tracking-wider">Net Farm Profit Formula</p>
            <div className="text-lg font-black mt-1">
              Revenue (₹3.20L) − Expenses (₹1.58L) = <span className="text-amber-300">₹1.62 Lakh Net Profit</span>
            </div>
            <p className="text-[11px] text-emerald-200 mt-1">Tracked across seeds, fertilizers, labour, machinery, and crop sales.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-red-50 rounded-xl border border-red-100">
              <p className="text-text-light font-medium">Main Expense</p>
              <p className="font-bold text-red-700 text-sm mt-0.5">Labour (₹45,000)</p>
            </div>
            <div className="p-3 bg-green-50 rounded-xl border border-green-100">
              <p className="text-text-light font-medium">Main Income</p>
              <p className="font-bold text-green-700 text-sm mt-0.5">Wheat Sale (₹3,20,000)</p>
            </div>
          </div>
        </Card>

        {/* 🏛️ I. Government Scheme Matchmaker ⭐ (FLAGSHIP #7) */}
        <Card className="p-6 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-amber-700" />
              <h3 className="font-bold text-text">Government Scheme Matchmaker</h3>
            </div>
            <Badge variant="primary">3 Schemes Matched</Badge>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm space-y-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-text text-sm">{mockGovernmentSchemes[0].name}</h4>
                <p className="text-xs text-emerald-700 font-semibold">{mockGovernmentSchemes[0].benefit}</p>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Deadline Dec 31
              </span>
            </div>
            <p className="text-xs text-text-light">
              <strong>Eligibility:</strong> {mockGovernmentSchemes[0].eligibility}
            </p>
          </div>

          <Link to="/farmer/schemes">
            <Button variant="outline" size="sm" className="w-full border-amber-200 text-amber-800 hover:bg-amber-50">
              Match Schemes For My Farm →
            </Button>
          </Link>
        </Card>
      </div>

      {/* Grid: Soil Intelligence + Farmer Community */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* 🧪 K. Soil & Fertilizer Intelligence */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Beaker className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-text">Soil & Fertilizer Intelligence</h3>
            </div>
            <Link to="/farmer/soil" className="text-xs font-bold text-primary hover:underline">Full Soil Test →</Link>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center mb-4">
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <p className="text-[10px] text-text-light font-bold">pH Level</p>
              <p className="text-base font-black text-emerald-700">6.8</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <p className="text-[10px] text-text-light font-bold">Nitrogen (N)</p>
              <p className="text-base font-black text-emerald-700">Optimal</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <p className="text-[10px] text-text-light font-bold">Phosphorus</p>
              <p className="text-base font-black text-amber-600">Moderate</p>
            </div>
            <div className="p-2.5 bg-gray-50 rounded-xl">
              <p className="text-[10px] text-text-light font-bold">Potassium</p>
              <p className="text-base font-black text-emerald-700">High</p>
            </div>
          </div>
          <p className="text-xs text-text-light">
            💡 <strong>Recommendation:</strong> Add DAP 60kg/ha next week for balanced root strength.
          </p>
        </Card>

        {/* 👨🌾 M. Farmer Community */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-text">Farmer Community & Sharing</h3>
            </div>
            <Link to="/farmer/community" className="text-xs font-bold text-primary hover:underline">Join Forum →</Link>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-2 mb-3">
            <p className="font-bold text-text">🚜 Equipment Sharing: John Deere Tractor available in Karnal</p>
            <p className="text-text-light">3 nearby farmers discussed wheat irrigation techniques today.</p>
          </div>
        </Card>
      </div>

      {/* 🎙️ N. Voice AI for Farmers Banner */}
      <Card className="p-6 bg-gradient-to-r from-emerald-900 via-primary to-teal-800 text-white rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVoiceSimulate}
              className={`w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-lg transition-transform hover:scale-110 flex-shrink-0 ${
                isVoiceSimulating ? 'animate-pulse bg-amber-400 text-text' : ''
              }`}
            >
              <Mic className="w-8 h-8" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold">India Multi-Lang AI</span>
                <h3 className="font-extrabold text-lg">Voice AI Assistant for Farmers 🎙️</h3>
              </div>
              <p className="text-emerald-100 text-xs sm:text-sm">
                Speak in Hindi, Punjabi, Tamil, Telugu, Marathi, or English.
              </p>
              <p className="text-amber-300 text-xs font-semibold mt-1">
                Try: "{voiceQueryInput}"
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleVoiceSimulate} className="bg-amber-400 text-text hover:bg-amber-300 font-bold">
              {isVoiceSimulating ? 'Processing Voice...' : 'Tap & Speak Voice Query'}
            </Button>
            <Link to="/farmer/voice">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                Open Voice Hub
              </Button>
            </Link>
          </div>
        </div>

        {voiceAnswer && (
          <div className="mt-4 p-4 rounded-2xl bg-white text-text shadow-md border border-emerald-300 text-sm">
            <p className="font-bold text-emerald-800 text-xs mb-1">🎙️ AI Regional Response (Hindi):</p>
            <p className="font-medium text-emerald-950">{voiceAnswer}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
