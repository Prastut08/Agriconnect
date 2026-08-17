import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Sparkles, Star, ShoppingCart, MapPin } from 'lucide-react';
import { mockProducts } from '../../data/mockData';

const mockAIResponses: Record<string, { products: typeof mockProducts; reason: string }> = {
  'organic vegetables near me': {
    products: mockProducts.filter((p) => p.farmingMethod === 'organic').slice(0, 3),
    reason: 'These are organic-certified farms within 20km of your location with highest freshness ratings.',
  },
  'fresh tomatoes': {
    products: mockProducts.filter((p) => p.name.toLowerCase().includes('tomato')),
    reason: 'Fresh tomatoes harvested within the last 24 hours. High freshness score and competitive pricing.',
  },
  'best price wheat': {
    products: mockProducts.filter((p) => p.category === 'Grains').slice(0, 3),
    reason: 'Wheat prices are currently 3.3% below market average. These farmers offer the best value.',
  },
};

export default function AiShopping() {
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<{ products: typeof mockProducts; reason: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setAiResponse(null);

    setTimeout(() => {
      const key = query.toLowerCase();
      const response = mockAIResponses[key] || {
        products: mockProducts.slice(0, 3),
        reason: 'Here are some popular products that match your search criteria.',
      };
      setAiResponse(response);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">AI Shopping Assistant</h1>
        <p className="text-text-light">Tell me what you need, I will find the best options for you</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-text">AgriAI Shopping Assistant</h3>
            <p className="text-sm text-text-light">Ask in natural language</p>
          </div>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="e.g., organic vegetables near me, best price wheat"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button onClick={handleSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {['organic vegetables near me', 'fresh tomatoes', 'best price wheat'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => { setQuery(suggestion); handleSearch(); }}
              className="text-xs bg-gray-50 hover:bg-gray-100 text-text-light px-3 py-1.5 rounded-full transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </Card>

      {isLoading && (
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </Card>
      )}

      {aiResponse && (
        <div className="space-y-6">
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-bold text-green-800 mb-1">AI Recommendation</p>
                <p className="text-sm text-green-700">{aiResponse.reason}</p>
              </div>
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiResponse.products.map((product) => (
              <Card key={product.id} className="p-5 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant={product.farmingMethod === 'organic' ? 'success' : 'info'}>{product.farmingMethod}</Badge>
                    <h3 className="font-bold text-text mt-2">{product.name}</h3>
                    <p className="text-sm text-text-light">by {product.farmerName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-medium text-text">{product.rating}</span>
                  <span className="text-sm text-text-light">({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-text">Rs. {product.price}</span>
                    <span className="text-sm text-text-light">/{product.unit}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-text-light">
                    <MapPin className="w-4 h-4" />
                    {product.distance} km
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="flex-1">
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Add to Cart
                  </Button>
                  <Button size="sm" className="flex-1">Buy Now</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
