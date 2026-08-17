import { Leaf, Calendar, Droplets, TrendingUp, Eye, Sprout } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';
import type { Crop } from '../../types';

interface CropCardProps {
  crop: Crop;
}

export function CropCard({ crop }: CropCardProps) {
  const daysToHarvest = Math.ceil((new Date(crop.expectedHarvestDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const circumference = 2 * Math.PI * 36;
  const strokeDashoffset = circumference - (crop.healthScore / 100) * circumference;

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative h-44 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
        <Sprout className="w-20 h-20 text-primary/20" />
        <div className="absolute top-3 right-3">
          <Badge variant={crop.healthScore >= 90 ? 'success' : crop.healthScore >= 75 ? 'warning' : 'error'}>
            {crop.healthScore}% Health
          </Badge>
        </div>
        <div className="absolute top-3 left-3">
          <Badge variant="primary">{crop.growthStage.replace('-', ' ')}</Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full">
            <div className={`w-2 h-2 rounded-full ${crop.status === 'growing' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-xs font-medium text-text capitalize">{crop.status}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-lg text-text mb-0.5">{crop.name}</h3>
            <p className="text-sm text-text-light">{crop.fieldName} • {crop.area} acres</p>
          </div>
          <div className="relative w-16 h-16">
            <svg className="w-16 h-16 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="36" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle cx="40" cy="40" r="36" fill="none" stroke={crop.healthScore >= 90 ? '#10b981' : crop.healthScore >= 75 ? '#f59e0b' : '#ef4444'} strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-text">{crop.healthScore}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-wide">Harvest</p>
              <p className="text-xs font-semibold text-text">{daysToHarvest > 0 ? `${daysToHarvest}d left` : 'Ready'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
            <Droplets className="w-4 h-4 text-blue-500" />
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-wide">Yield</p>
              <p className="text-xs font-semibold text-text">{crop.expectedYield.toLocaleString()} {crop.expectedYield > 10000 ? 'kg' : 'qtl'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
            <TrendingUp className="w-4 h-4 text-accent" />
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-wide">Revenue</p>
              <p className="text-xs font-semibold text-text">Rs. {crop.expectedRevenue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl">
            <Leaf className="w-4 h-4 text-green-500" />
            <div>
              <p className="text-[10px] text-text-light uppercase tracking-wide">Risk</p>
              <p className="text-xs font-semibold text-text">{crop.yieldRisk}%</p>
            </div>
          </div>
        </div>

        <Link to={`/farmer/crops/${crop.id}`}>
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}
