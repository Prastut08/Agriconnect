import { ShoppingCart, Leaf, Star, MapPin, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import type { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
}

export function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  const daysSinceHarvest = Math.ceil((new Date().getTime() - new Date(product.harvestDate).getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
        <Leaf className="w-20 h-20 text-primary/20" />
        <div className="absolute top-3 left-3">
          <Badge variant={product.farmingMethod === 'organic' ? 'success' : 'info'}>{product.farmingMethod}</Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={product.freshness >= 95 ? 'success' : 'warning'}>
            {product.freshness}% Fresh
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium text-text bg-white/90 px-2 py-1 rounded-full">Harvested {daysSinceHarvest}d ago</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-text text-lg">{product.name}</h3>
            <p className="text-sm text-text-light">by {product.farmerName}</p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="font-bold text-text">{product.rating}</span>
            <span className="text-text-light">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-sm text-text-light mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{product.distance} km away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{daysSinceHarvest}d fresh</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-bold text-text">Rs. {product.price}</span>
            <span className="text-sm text-text-light">/{product.unit}</span>
          </div>
          <div className="text-right">
            <p className="text-xs text-text-light">Available</p>
            <p className="text-sm font-bold text-text">{product.availableQuantity} {product.unit}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={onAddToCart}>
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={onBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
