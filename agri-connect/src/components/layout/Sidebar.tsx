import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Bug,
  Wheat,
  TrendingUp,
  Cloud,
  Beaker,
  BarChart3,
  Store,
  Receipt,
  Landmark,
  Users,
  Mic,
  ChevronLeft,
  ChevronRight,
  Leaf,
  AlertOctagon,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const navItems = [
  { path: '/farmer/dashboard', label: 'Farmer Home OS', icon: LayoutDashboard },
  { path: '/farmer/crops', label: 'Crop Management', icon: Wheat },
  { path: '/farmer/disease', label: 'Pest & Disease AI', icon: Bug },
  { path: '/farmer/yield', label: 'Yield & Harvest AI', icon: TrendingUp },
  { path: '/farmer/harvest-loss', label: 'Harvest Loss AI', icon: AlertOctagon },
  { path: '/farmer/market', label: 'Sell / Wait Advisor', icon: BarChart3 },
  { path: '/farmer/finance', label: 'Income & Profit Tracker', icon: Receipt },
  { path: '/farmer/schemes', label: 'Scheme Matchmaker', icon: Landmark },
  { path: '/farmer/weather', label: 'Weather & Irrigation', icon: Cloud },
  { path: '/farmer/soil', label: 'Soil & Fertilizer', icon: Beaker },
  { path: '/farmer/seller', label: 'Farmer Seller Mode', icon: Store },
  { path: '/farmer/community', label: 'Farmer Community', icon: Users },
  { path: '/farmer/voice', label: 'Voice AI Assistant', icon: Mic },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-surface border-r border-gray-100 transition-all duration-300 z-40 flex flex-col ${
        collapsed ? 'w-20' : 'w-72'
      }`}
    >
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-100">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-primary">AgriConnect</h1>
              <p className="text-xs text-text-light">AI-Powered Farming</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-light hover:bg-gray-50 hover:text-text'
              }`
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className={`flex items-center justify-between gap-2 ${collapsed ? 'justify-center' : ''}`}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-primary">
                {currentUser?.name ? currentUser.name.slice(0, 2).toUpperCase() : 'FA'}
              </span>
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-medium text-text truncate">{currentUser?.name || 'Farmer Account'}</p>
                <p className="text-xs text-text-light truncate">{currentUser?.email || 'farmer-b00f2'}</p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}

