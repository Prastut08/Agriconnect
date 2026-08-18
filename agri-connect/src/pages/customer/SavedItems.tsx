import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Heart, ShoppingCart, Trash2, Star, MapPin } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function SavedItems() {
  const [saved, setSaved] = useState(mockProducts.slice(0, 4));

  const removeSaved = (id: string) => {
    setSaved((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Saved Items</h1>
        <p className="text-text-light">{saved.length} products saved for later</p>
      </div>

      {saved.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-bold text-text text-lg mb-2">No saved items yet</h3>
          <p className="text-text-light mb-4">Start saving products you love</p>
          <Link to="/customer/products">
            <Button>Browse Marketplace</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {saved.map((product) => (
            <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="relative h-40 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                <span className="text-4xl text-primary/20">🌾</span>
                <button
                  onClick={() => removeSaved(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text mb-1">{product.name}</h3>
                <p className="text-sm text-text-light mb-2">by {product.farmerName}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-medium text-text">{product.rating}</span>
                  <span className="text-xs text-text-light">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-text-light mb-3">
                  <MapPin className="w-3 h-3" />
                  {product.distance} km away
                </div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-text">Rs. {product.price}</span>
                  <span className="text-sm text-text-light">/{product.unit}</span>
                </div>
                <Button size="sm" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
