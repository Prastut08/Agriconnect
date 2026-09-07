import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Search, Star, ShoppingCart, Sparkles } from 'lucide-react';
import { mockCrops } from '../../data/mockData';

const categories = ['All', 'Seeds', 'Fertilizers', 'Pesticides', 'Tools', 'Irrigation', 'Sprayers', 'Accessories'];

const agriProducts = [
  { id: 'agri-1', name: 'Wheat Seeds (HD-3086)', category: 'Seeds', price: 45, unit: 'kg', rating: 4.5, reviews: 89, recommendedFor: 'Wheat' },
  { id: 'agri-2', name: 'NPK Fertilizer (19-19-19)', category: 'Fertilizers', price: 1200, unit: 'bag', rating: 4.3, reviews: 56, recommendedFor: 'Tomato' },
  { id: 'agri-3', name: 'Organic Pesticide', category: 'Pesticides', price: 350, unit: 'litre', rating: 4.6, reviews: 34, recommendedFor: 'Wheat' },
  { id: 'agri-4', name: 'Drip Irrigation Kit', category: 'Irrigation', price: 15000, unit: 'set', rating: 4.8, reviews: 120, recommendedFor: 'Tomato' },
  { id: 'agri-5', name: 'Gardening Tools Set', category: 'Tools', price: 2500, unit: 'set', rating: 4.4, reviews: 78, recommendedFor: null },
  { id: 'agri-6', name: 'Tractor Sprayer', category: 'Sprayers', price: 8500, unit: 'unit', rating: 4.2, reviews: 45, recommendedFor: 'Wheat' },
  { id: 'agri-7', name: 'Neem Oil', category: 'Pesticides', price: 180, unit: 'litre', rating: 4.7, reviews: 92, recommendedFor: 'Tomato' },
  { id: 'agri-8', name: 'Urea Fertilizer', category: 'Fertilizers', price: 280, unit: 'bag', rating: 4.1, reviews: 45, recommendedFor: 'Rice' },
];

const STORE_PRODUCT_IMAGES: Record<string, string> = {
  'agri-1': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
  'agri-2': 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=600&q=80',
  'agri-3': 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=600&q=80',
  'agri-4': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  'agri-5': 'https://images.unsplash.com/photo-1617575521317-86433b6b1a13?auto=format&fit=crop&w=600&q=80',
  'agri-6': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80',
  'agri-7': 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cf?auto=format&fit=crop&w=600&q=80',
  'agri-8': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
};

export default function AgriStore() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filteredProducts = agriProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  const currentCrop = mockCrops[0].name;
  const recommendedProducts = agriProducts.filter((p) => p.recommendedFor === currentCrop);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Agri Store</h1>
        <p className="text-text-light">Everything you need for your farm</p>
      </div>

      <Card className="p-4 bg-gradient-to-r from-green-50 to-background border-green-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-xl">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text">Based on your {currentCrop} crop, we recommend:</p>
            <p className="text-xs text-text-light">{recommendedProducts.map((p) => p.name).join(', ')}</p>
          </div>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-light" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
              category === cat ? 'bg-primary text-white' : 'bg-gray-100 text-text-light hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const imgUrl = STORE_PRODUCT_IMAGES[product.id] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80';
          return (
            <Card key={product.id} className="p-5 hover:shadow-lg transition-all duration-300 group overflow-hidden rounded-3xl">
              <div className="flex items-start justify-between mb-3 z-10 relative">
                <Badge variant="primary">{product.category}</Badge>
                {product.recommendedFor && <Badge variant="success">For {product.recommendedFor}</Badge>}
              </div>
              <div className="h-40 -mx-5 -mt-12 mb-3 relative overflow-hidden bg-gray-100">
                <img src={imgUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              <h3 className="font-bold text-text mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
              <div className="flex items-center gap-1 mb-3">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span className="text-sm font-medium text-text">{product.rating}</span>
                <span className="text-sm text-text-light">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-text">Rs. {product.price}</span>
                  <span className="text-sm text-text-light">/{product.unit}</span>
                </div>
                <Button size="sm">
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
