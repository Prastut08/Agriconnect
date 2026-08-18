import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Wheat,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Droplets,
  AlertTriangle,
  ClipboardList,
  Clock,
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { mockUser, mockOrders } from '../../data/mockData';
import { actionCenterMockTasks } from '../../components/farmer/ActionCenter';

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

  const currentPreset = COPILOT_PRESETS[selectedCopilotIdx];

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
    </div>
  );
}
