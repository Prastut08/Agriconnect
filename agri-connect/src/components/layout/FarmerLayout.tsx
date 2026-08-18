import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, Bell, Search, Wheat } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function FarmerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div className={`transition-all duration-300 ml-0 md:ml-72`}>
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-80 border border-gray-100">
                <Search className="w-4 h-4 text-text-light" />
                <input
                  type="text"
                  placeholder="Search crops, AI tools, tasks..."
                  className="bg-transparent border-none outline-none text-xs flex-1 placeholder-gray-400"
                />
              </div>
            </div>

            {/* Dashboard Quick Switcher Bar */}
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-1 flex items-center gap-1 shadow-xs">
                <span className="px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-700 text-white flex items-center gap-1.5 shadow-sm">
                  <Wheat className="w-3.5 h-3.5 text-amber-300" />
                  Farmer OS 🌾
                </span>
              </div>

              <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-text-light" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
              </button>

              <div className="w-9 h-9 bg-emerald-800 rounded-full flex items-center justify-center border-2 border-emerald-600 shadow-xs">
                <span className="text-xs font-bold text-white">RK</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
