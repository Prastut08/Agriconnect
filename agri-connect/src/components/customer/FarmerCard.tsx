import { Star, MapPin, Sprout, Award, MessageCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Farmer } from '../../types';

interface FarmerCardProps {
  farmer: Farmer;
  onViewProfile?: () => void;
}

export function FarmerCard({ farmer, onViewProfile }: FarmerCardProps) {
  const avatarUrl = farmer.avatar || '/farmer.jpg';
  const coverUrl = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80';

  return (
    <Card className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl border border-gray-100 bg-surface">
      <div className="relative h-36 overflow-hidden bg-gray-100">
        <img src={coverUrl} alt={farmer.farmName} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {farmer.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="success" className="shadow-sm font-bold bg-white/90 backdrop-blur-md text-emerald-800">
              <Award className="w-3 h-3 mr-1 text-emerald-600" />
              Verified Farmer
            </Badge>
          </div>
        )}
      </div>

      <div className="px-5 pb-5 pt-0 space-y-3 -mt-8 relative z-10">
        <div className="flex items-end justify-between">
          <img
            src={avatarUrl}
            alt={farmer.name}
            className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
          />
          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200 shadow-xs">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="font-extrabold text-xs text-amber-900">{farmer.rating}</span>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-text text-lg leading-tight group-hover:text-primary transition-colors">{farmer.farmName}</h3>
          <p className="text-xs text-text-light font-medium">by {farmer.name}</p>
        </div>

        <div className="space-y-1.5 pt-1 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-text-light">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="truncate">{farmer.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-light">
            <Sprout className="w-3.5 h-3.5 text-secondary shrink-0" />
            <span>{farmer.farmSize} acres farm size</span>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            {farmer.crops.map((crop) => (
              <Badge key={crop} variant="primary" className="text-[10px] font-bold py-0.5 px-2">{crop}</Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs font-bold">
            <MessageCircle className="w-3.5 h-3.5 mr-1" />
            Message
          </Button>
          <Button variant="primary" size="sm" className="flex-1 rounded-xl text-xs font-bold" onClick={onViewProfile}>
            View Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
