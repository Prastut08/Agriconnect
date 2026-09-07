import { useState, useEffect, useMemo } from 'react';
import { Plus, Search, Leaf, BarChart3, CheckCircle2, X } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { CropCard } from '../../components/farmer/CropCard';
// Using Firestore data instead of mock data
import { subscribeToFarmerCrops, addCropToFirestore } from '../../lib/firestoreService';
import { useAuth } from '../../contexts/AuthContext';
import type { Crop } from '../../types';

export default function CropManagement() {
  const { currentUser } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [firestoreCrops, setFirestoreCrops] = useState<Crop[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const [newCrop, setNewCrop] = useState({
    name: 'Wheat',
    fieldName: 'North Field',
    area: '4.5',
    plantedDate: new Date().toISOString().split('T')[0],
    expectedHarvestDate: '2025-05-30',
    growthStage: 'vegetative' as Crop['growthStage'],
    expectedYield: '3800',
    expectedRevenue: '152000',
  });

  useEffect(() => {
    const farmerId = currentUser?.id || 'farmer-1';
    const unsubscribe = subscribeToFarmerCrops(farmerId, (crops) => {
      setFirestoreCrops(crops);
    });
    return () => unsubscribe();
  }, [currentUser]);

  // Use only Firestore products; fallback removed
  const allCrops = useMemo(() => {
    const map = new Map<string, Crop>();
    firestoreCrops.forEach((c) => map.set(c.id, c));
    return Array.from(map.values());
  }, [firestoreCrops]);

  const filteredCrops = allCrops.filter((crop) => {
    const matchesSearch = crop.name.toLowerCase().includes(search.toLowerCase()) || crop.fieldName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || crop.growthStage === filter || crop.status === filter;
    return matchesSearch && matchesFilter;
  });

  const healthyCrops = allCrops.filter((c) => c.healthScore >= 90).length;
  const needsAttention = allCrops.filter((c) => c.healthScore < 90).length;
  const upcomingHarvests = allCrops.filter((c) => {
    const days = Math.ceil((new Date(c.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days > 0 && days <= 30;
  }).length;

  const handleAddCropSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatusMsg(null);

    const farmerId = currentUser?.id || 'farmer-1';
    const farmerName = currentUser?.name || 'Rajesh Kumar';

    const res = await addCropToFirestore({
      farmerId,
      name: newCrop.name,
      fieldId: `field-${Date.now()}`,
      fieldName: newCrop.fieldName,
      area: Number(newCrop.area) || 1.0,
      plantedDate: newCrop.plantedDate,
      expectedHarvestDate: newCrop.expectedHarvestDate,
      growthStage: newCrop.growthStage,
      healthScore: 94,
      expectedYield: Number(newCrop.expectedYield) || 2000,
      expectedRevenue: Number(newCrop.expectedRevenue) || 80000,
      waterRequirement: '400-600mm',
      fertilizerSchedule: ['Urea - 100kg/ha', 'DAP - 50kg/ha'],
      diseaseProbability: 10,
      yieldRisk: 8,
      status: 'growing',
    }, farmerId, farmerName);

    setSubmitting(false);
    if (res.success) {
      setStatusMsg(`Crop "${newCrop.name}" saved to Cloud Firestore!`);
      setTimeout(() => {
        setShowAddModal(false);
        setStatusMsg(null);
      }, 1200);
    } else {
      setStatusMsg(`Error: ${res.error}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-text mb-1">Crop Management</h1>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Cloud Firestore Live
            </span>
          </div>
          <p className="text-text-light">Monitor and manage all your crops in real-time</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="shadow-md">
          <Plus className="w-4 h-4 mr-2" />
          Add Crop to Firestore
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Crops', value: allCrops.length.toString(), icon: Leaf, color: 'text-primary', bg: 'bg-green-50' },
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

      {/* Add Crop Firestore Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="max-w-lg w-full p-6 space-y-4 rounded-3xl relative shadow-2xl bg-white">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-text">Add New Crop to Firestore</h2>
              <p className="text-xs text-text-light">Save crop details directly into Cloud Firestore</p>
            </div>

            {statusMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-bold rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{statusMsg}</span>
              </div>
            )}

            <form onSubmit={handleAddCropSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Crop Name"
                  value={newCrop.name}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, name: val }))}
                />
                <Input
                  label="Field Name"
                  value={newCrop.fieldName}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, fieldName: val }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Area (Acres)"
                  type="number"
                  value={newCrop.area}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, area: val }))}
                />
                <div>
                  <label className="block text-xs font-semibold text-text mb-1">Growth Stage</label>
                  <select
                    value={newCrop.growthStage}
                    onChange={(e) => setNewCrop((prev) => ({ ...prev, growthStage: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-surface text-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="sowing">Sowing</option>
                    <option value="vegetative">Vegetative</option>
                    <option value="flowering">Flowering</option>
                    <option value="fruiting">Fruiting</option>
                    <option value="harvesting">Harvesting</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Planted Date"
                  type="date"
                  value={newCrop.plantedDate}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, plantedDate: val }))}
                />
                <Input
                  label="Expected Harvest Date"
                  type="date"
                  value={newCrop.expectedHarvestDate}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, expectedHarvestDate: val }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="Expected Yield (kg)"
                  type="number"
                  value={newCrop.expectedYield}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, expectedYield: val }))}
                />
                <Input
                  label="Expected Revenue (Rs.)"
                  type="number"
                  value={newCrop.expectedRevenue}
                  onChange={(val) => setNewCrop((prev) => ({ ...prev, expectedRevenue: val }))}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button type="submit" className="w-full font-bold shadow-md" disabled={submitting}>
                  {submitting ? 'Saving to Firestore...' : 'Save Crop to Firestore'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
