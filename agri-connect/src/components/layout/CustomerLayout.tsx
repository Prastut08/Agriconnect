import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';
import { CustomerSidebar } from './CustomerSidebar';

export function CustomerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <CustomerSidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed((c) => !c)} />

      <div className={`transition-all duration-300 md:ml-72`}>
        <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3.5">
            <div className="flex items-center gap-3">
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
                  placeholder="Search organic tomatoes, fresh fruits..."
                  className="bg-transparent border-none outline-none text-xs flex-1 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
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
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
}
