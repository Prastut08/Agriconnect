import { useState, useMemo } from 'react';
import { Card } from '../../components/ui/Card';
import { Map, List, Search } from 'lucide-react';
import { FarmerCard } from '../../components/customer/FarmerCard';
import { mockFarmers } from '../../data/mockData';

export default function NearbyFarmers() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [distance, setDistance] = useState('50');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [search, setSearch] = useState('');

  const filteredFarmers = useMemo(() => {
    let farmers = mockFarmers.filter((farmer) => {
      const matchesSearch = farmer.name.toLowerCase().includes(search.toLowerCase()) || farmer.farmName.toLowerCase().includes(search.toLowerCase());
      const matchesCrop = selectedCrop === 'all' || farmer.crops.some(c => c.toLowerCase().includes(selectedCrop.toLowerCase()));
      return matchesSearch && matchesCrop;
    });

    if (sortBy === 'rating') farmers = [...farmers].sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'price') farmers = [...farmers].sort((a, b) => a.totalSales - b.totalSales);

    return farmers;
  }, [search, selectedCrop, sortBy]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Farmers Near You</h1>
        <p className="text-text-light">Discover local farmers and their produce</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex rounded-xl bg-gray-100 p-1">
          <button
            onClick={() => setView('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              view === 'list' ? 'bg-white text-text shadow-sm' : 'text-text-light hover:text-text'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setView('map')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              view === 'map' ? 'bg-white text-text shadow-sm' : 'text-text-light hover:text-text'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light" />
          <input
            type="text"
            placeholder="Search farmers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        >
          <option value="10">Within 10 km</option>
          <option value="25">Within 25 km</option>
          <option value="50">Within 50 km</option>
          <option value="100">Within 100 km</option>
        </select>
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        >
          <option value="all">All Crops</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="tomato">Tomato</option>
          <option value="potato">Potato</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price">Sort by Sales</option>
        </select>
      </div>

      {view === 'map' ? (
        <Card className="p-6 h-96 flex items-center justify-center">
          <div className="text-center text-text-light">
            <Map className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>Map view would show farmer locations</p>
            <p className="text-sm">Integrated with Google Maps API</p>
          </div>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      )}
    </div>
  );
}
