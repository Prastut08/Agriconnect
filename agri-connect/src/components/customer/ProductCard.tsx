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

const DEFAULT_PRODUCT_IMAGES: Record<string, string> = {
  Wheat: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  Tomatoes: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
  Potatoes: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
  Rice: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
  Onions: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=600&q=80',
  Mangoes: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
  Spinach: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
  Carrots: 'https://images.unsplash.com/photo-1598170845058-12f6a6736561?auto=format&fit=crop&w=600&q=80',
  Chilies: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
  Bananas: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80',
};

export function ProductCard({ product, onAddToCart, onBuyNow }: ProductCardProps) {
  const daysSinceHarvest = Math.max(1, Math.ceil((new Date().getTime() - new Date(product.harvestDate).getTime()) / (1000 * 60 * 60 * 24)));

  const imageUrl = (product.images && product.images.length > 0 && product.images[0])
    ? product.images[0]
    : (DEFAULT_PRODUCT_IMAGES[product.name.split(' ').pop() || 'Wheat'] || DEFAULT_PRODUCT_IMAGES['Tomatoes']);

  return (
    <Card className="overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl border border-gray-100 bg-surface">
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={product.farmingMethod === 'organic' ? 'success' : 'info'} className="shadow-sm font-bold">
            🌿 {product.farmingMethod}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant={product.freshness >= 95 ? 'success' : 'warning'} className="shadow-sm font-bold">
            {product.freshness}% Fresh
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-bold text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            Harvested {daysSinceHarvest}d ago
          </span>
        </div>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-text text-lg leading-snug group-hover:text-primary transition-colors">{product.name}</h3>
            <p className="text-xs text-text-light mt-0.5">by <strong className="text-text">{product.farmerName}</strong></p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
            <Star className="w-3.5 h-3.5 text-accent fill-accent" />
            <span className="font-extrabold text-xs text-amber-900">{product.rating}</span>
            <span className="text-[10px] text-amber-700">({product.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs text-text-light pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{product.distance} km away</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>{daysSinceHarvest}d fresh</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-2xl font-black text-primary">₹{product.price}</span>
            <span className="text-xs text-text-light font-medium">/{product.unit}</span>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-text-light font-medium uppercase tracking-wider">In Stock</p>
            <p className="text-xs font-bold text-text">{product.availableQuantity} {product.unit}</p>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1 rounded-xl text-xs font-bold" onClick={onAddToCart}>
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            Add to Cart
          </Button>
          <Button variant="primary" size="sm" className="flex-1 rounded-xl text-xs font-bold" onClick={onBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </Card>
  );
}
