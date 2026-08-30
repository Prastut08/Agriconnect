import { Leaf, Calendar, Droplets, TrendingUp, Eye } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import type { Crop } from '../../types';

interface CropCardProps {
  crop: Crop;
}

const CROP_IMAGES: Record<string, string> = {
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  Tomato: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  Potato: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  Rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
};

export function CropCard({ crop }: CropCardProps) {
  const daysToHarvest = Math.ceil((new Date(crop.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (crop.healthScore / 100) * circumference;
  const cropImage = CROP_IMAGES[crop.name] || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80';

  return (
    <Card className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl border border-gray-100 bg-surface">
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <img src={cropImage} alt={crop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute top-3 right-3">
          <Badge variant={crop.healthScore >= 90 ? 'success' : crop.healthScore >= 75 ? 'warning' : 'error'} className="shadow-sm font-bold bg-white/90 backdrop-blur-md">
            {crop.healthScore}% Health
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="primary" className="shadow-sm font-bold">{crop.growthStage.replace('-', ' ')}</Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-white">
            <div className={`w-2 h-2 rounded-full ${crop.status === 'growing' ? 'bg-emerald-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs font-bold capitalize">{crop.status}</span>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors">{crop.name}</h3>
            <p className="text-xs text-text-light font-medium">{crop.fieldName} • {crop.area} acres</p>
          </div>
          <div className="relative w-14 h-14">
            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle cx="40" cy="40" r="36" fill="none" stroke={crop.healthScore >= 90 ? '#10b981' : crop.healthScore >= 75 ? '#f59e0b' : '#ef4444'} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-black text-text">{crop.healthScore}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-[10px] text-text-light font-bold uppercase">Harvest</p>
              <p className="font-bold text-text">{daysToHarvest > 0 ? `${daysToHarvest}d left` : 'Ready'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Droplets className="w-4 h-4 text-blue-500 shrink-0" />
            <div>
              <p className="text-[10px] text-text-light font-bold uppercase">Yield</p>
              <p className="font-bold text-text">{crop.expectedYield.toLocaleString()} kg</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="text-[10px] text-text-light font-bold uppercase">Est. Revenue</p>
              <p className="font-bold text-emerald-700">₹{crop.expectedRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
            <Leaf className="w-4 h-4 text-amber-500 shrink-0" />
            <div>
              <p className="text-[10px] text-text-light font-bold uppercase">Risk Level</p>
              <p className="font-bold text-amber-600">{crop.yieldRisk}%</p>
            </div>
          </div>
        </div>

        <Link to={`/farmer/crops/${crop.id}`} className="block">
          <Button variant="outline" size="sm" className="w-full rounded-xl text-xs font-bold">
            <Eye className="w-4 h-4 mr-2 text-primary" />
            View Field Analytics
          </Button>
        </Link>
      </div>
    </Card>
  );
}
