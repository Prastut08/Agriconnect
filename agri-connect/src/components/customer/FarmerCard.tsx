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
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-32 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
        <Sprout className="w-16 h-16 text-primary/30" />
        {farmer.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="success">
              <Award className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-text text-lg">{farmer.farmName}</h3>
            <p className="text-sm text-text-light">by {farmer.name}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-bold text-text">{farmer.rating}</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-text-light">
            <MapPin className="w-4 h-4" />
            <span>{farmer.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-text-light">
            <Sprout className="w-4 h-4" />
            <span>{farmer.farmSize} acres</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {farmer.crops.map((crop) => (
              <Badge key={crop} variant="primary" className="text-xs">{crop}</Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            Message
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={onViewProfile}>
            View Farm Profile
          </Button>
        </div>
      </div>
    </Card>
  );
}
