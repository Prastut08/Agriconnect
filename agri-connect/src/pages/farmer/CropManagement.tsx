import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Leaf, BarChart3 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { CropCard } from '../../components/farmer/CropCard';
import { mockCrops } from '../../data/mockData';

export default function CropManagement() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredCrops = mockCrops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) || crop.fieldName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || crop.growthStage === filter || crop.status === filter;
    return matchesSearch && matchesFilter;
  });

  const healthyCrops = mockCrops.filter((c) => c.healthScore >= 90).length;
  const needsAttention = mockCrops.filter((c) => c.healthScore < 90).length;
  const upcomingHarvests = mockCrops.filter((c) => {
    const days = Math.ceil((new Date(c.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 && days <= 30;
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Crop Management</h1>
          <p className="text-text-light">Monitor and manage all your crops</p>
        </div>
        <Link to="/farmer/add-produce">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Crop
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Crops', value: mockCrops.length.toString(), icon: Leaf, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Healthy', value: healthyCrops.toString(), icon: BarChart3, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Needs Attention', value: needsAttention.toString(), icon: Search, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Upcoming Harvest', value: upcomingHarvests.toString(), icon: Leaf, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-text-light font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-text">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
          <input
            type="text"
            placeholder="Search crops or fields..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        >
          <option value="all">All Crops</option>
          <option value="growing">Growing</option>
          <option value="harvested">Harvested</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      {filteredCrops.length === 0 && (
        <Card className="p-12 text-center">
          <Leaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text mb-2">No crops found</h3>
          <p className="text-text-light">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
