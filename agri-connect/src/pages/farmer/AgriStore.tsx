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
        {filteredProducts.map((product) => (
          <Card key={product.id} className="p-5 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-start justify-between mb-3">
              <Badge variant="primary">{product.category}</Badge>
              {product.recommendedFor && <Badge variant="success">For {product.recommendedFor}</Badge>}
            </div>
            <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center mb-3">
              <span className="text-4xl">🌱</span>
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
        ))}
      </div>
    </div>
  );
}
