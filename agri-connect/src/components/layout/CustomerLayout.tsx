import { useState } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Bell, Search, Home, ShoppingBag, Heart, User, Wheat, ShoppingCart, Leaf } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export function CustomerLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const { switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSwitchToFarmer = () => {
    switchRole('farmer');
    navigate('/farmer/dashboard');
  };

  const handleNav = (id: string) => {
    setActiveTab(id);
    const routes: Record<string, string> = {
      home: '/customer/home',
      shop: '/customer/products',
      favorites: '/customer/products',
      orders: '/customer/orders',
      profile: '/customer/home',
    };
    if (routes[id]) navigate(routes[id]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
        <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
          <Link to="/customer/home" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-primary tracking-tight">AgriConnect</span>
              <span className="text-[10px] text-text-light block font-semibold -mt-1">Direct Farm Marketplace 🛒</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-80 border border-gray-100">
            <Search className="w-4 h-4 text-text-light" />
            <input
              type="text"
              placeholder="Search organic tomatoes, fresh fruits..."
              className="bg-transparent border-none outline-none text-xs flex-1 placeholder-gray-400"
            />
          </div>

          {/* Dashboard Quick Switcher Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-1 flex items-center gap-1 shadow-xs">
              <button
                onClick={handleSwitchToFarmer}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-text-light hover:bg-white hover:text-text transition-all flex items-center gap-1.5"
              >
                <Wheat className="w-3.5 h-3.5 text-emerald-700" />
                Farmer OS 🌾
              </button>
              <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-primary text-white flex items-center gap-1.5 shadow-sm">
                <ShoppingCart className="w-3.5 h-3.5 text-amber-300" />
                Customer Marketplace 🛒
              </span>
            </div>

            <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-text-light" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            </button>

            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center border-2 border-primary-light shadow-xs">
              <span className="text-xs font-bold text-white">PS</span>
            </div>
          </div>
        </div>
      </header>

      <main className="p-4 lg:p-8">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-100 md:hidden z-40">
        <div className="flex items-center justify-around py-2">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'shop', icon: ShoppingBag, label: 'Shop' },
            { id: 'favorites', icon: Heart, label: 'Saved' },
            { id: 'orders', icon: ShoppingBag, label: 'Orders' },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                activeTab === item.id ? 'text-primary font-bold' : 'text-text-light'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
