import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mic, Sparkles, TrendingDown, QrCode, Flame, Clock, BadgeCheck } from 'lucide-react';
import { ProductCard } from '../../components/customer/ProductCard';
import { FarmerCard } from '../../components/customer/FarmerCard';
import { mockProducts, mockFarmers, mockCustomer } from '../../data/mockData';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function CustomerHome() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy', 'Organic', 'Seasonal'];

  const filteredProducts = useMemo(() => {
    let products = mockProducts;
    if (selectedCategory !== 'all') {
      products = products.filter((p) => p.category === selectedCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(q) || p.farmerName.toLowerCase().includes(q));
    }
    return products;
  }, [selectedCategory, search]);

  const freshNearYou = useMemo(() => filteredProducts.filter((p) => p.distance < 20).slice(0, 4), [filteredProducts]);
  const popularToday = useMemo(() => [...filteredProducts].sort((a, b) => b.rating - a.rating).slice(0, 4), [filteredProducts]);
  const seasonalPicks = useMemo(() => filteredProducts.filter((p) => p.farmingMethod === 'organic').slice(0, 4), [filteredProducts]);
  const topFarmers = useMemo(() => mockFarmers.filter((f) => f.rating >= 4.5).slice(0, 3), []);

  return (
    <div className="space-y-8 pb-16">
      {/* Hero */}
      <section className="relative bg-gradient-to-r from-emerald-900 via-primary to-teal-900 rounded-3xl p-8 md:p-12 text-white shadow-xl overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-400 text-amber-950 text-xs font-black uppercase tracking-wider rounded-full shadow-sm">
              Direct Farm Marketplace 🛒
            </span>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
              Connecting 500+ Local Farmers
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight">
            Fresh From Farmers Near You 🌱
          </h1>
          <p className="text-emerald-100 text-sm md:text-base mb-6">
            Buy farm-fresh produce directly from verified local farmers. Fair prices, full traceability, and home delivery.
          </p>

          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search 'Fresh tomatoes near me', 'Organic Wheat', 'Alphonso Mangoes'..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl border-0 bg-white text-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm shadow-lg"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <Mic className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Savings + Transparent Pricing */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5 border-2 border-emerald-500/30 bg-emerald-50/70 shadow-sm rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-emerald-700 text-white rounded-2xl shadow-md">
            <TrendingDown className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Your Monthly Direct Impact</span>
            <p className="text-2xl font-black text-emerald-950 mt-0.5">
              🎉 You saved ₹{mockCustomer.savedAmount} this month!
            </p>
            <p className="text-xs text-emerald-800 mt-0.5">By purchasing directly from local farmers near Chandigarh.</p>
          </div>
        </Card>

        <Card className="p-5 border-2 border-amber-400/40 bg-amber-50/70 shadow-sm rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">Transparent Middleman Breakdown</span>
            <span className="text-xs font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">Fair Trade</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <p className="text-text-light font-medium">Customer Pays</p>
              <p className="font-black text-text text-sm">₹60 / kg</p>
            </div>
            <div className="p-2 bg-emerald-100/80 rounded-xl border border-emerald-300">
              <p className="text-emerald-900 font-bold">Farmer Receives</p>
              <p className="font-black text-emerald-800 text-sm">₹52 / kg (87%)</p>
            </div>
            <div className="p-2 bg-white rounded-xl border border-amber-200">
              <p className="text-text-light font-medium">Logistics + Platform</p>
              <p className="font-black text-amber-900 text-sm">₹8 / kg</p>
            </div>
          </div>
        </Card>
      </div>

      {/* AI Shopping Assistant */}
      <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 shadow-md rounded-2xl">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <h3 className="font-bold text-text text-base">AI Shopping Assistant</h3>
          </div>
          <Link to="/customer/ai-shopping">
            <Button size="sm" variant="ghost" className="text-xs text-primary font-bold">
              Ask AI Assistant →
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            'Which vegetables are cheapest today?',
            'Find fruits for a family of four.',
            'What is seasonal right now?',
            'Show organic products under ₹500.',
          ].map((prompt, idx) => (
            <Link key={idx} to="/customer/ai-shopping">
              <button className="w-full p-3 rounded-xl bg-white border border-gray-200 hover:border-primary text-left text-text-light hover:text-text font-medium transition-all line-clamp-2">
                {prompt}
              </button>
            </Link>
          ))}
        </div>
      </Card>

      {/* Categories */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat ? 'bg-primary text-white shadow-sm' : 'bg-surface text-text-light border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* Nearby Fresh Produce */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-text">Nearby Fresh Produce</h2>
            <p className="text-xs text-text-light">Farmers within 10-25 km radius</p>
          </div>
          <Link to="/customer/products" className="text-xs font-bold text-primary hover:underline">View All Produce →</Link>
        </div>
        {freshNearYou.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-text-light">No products found in this category nearby.</p>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {freshNearYou.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Today */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-text flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" />
              Popular Today
            </h2>
            <p className="text-xs text-text-light">Most ordered products today</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularToday.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Seasonal Picks */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-text flex items-center gap-2">
              <Clock className="w-6 h-6 text-primary" />
              Seasonal Picks
            </h2>
            <p className="text-xs text-text-light">Fresh organic picks of the season</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Farmers */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-black text-text flex items-center gap-2">
              <BadgeCheck className="w-6 h-6 text-primary" />
              Top Farmers
            </h2>
            <p className="text-xs text-text-light">Verified farmers with highest ratings</p>
          </div>
          <Link to="/customer/nearby" className="text-xs font-bold text-primary hover:underline">Discover Nearby Farmers →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topFarmers.map((farmer) => (
            <FarmerCard key={farmer.id} farmer={farmer} />
          ))}
        </div>
      </section>

      {/* Deals / Subscriptions Banner */}
      <Card className="p-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="px-3 py-1 bg-white/20 text-white text-xs font-black uppercase tracking-wider rounded-full">
              Limited Time Deals
            </span>
            <h3 className="text-2xl font-black mt-2">Save More With Subscriptions</h3>
            <p className="text-amber-100 text-xs sm:text-sm mt-1 max-w-xl">
              Subscribe to weekly vegetable boxes, fruit baskets, or monthly grain packs and save up to 20%.
            </p>
          </div>
          <Link to="/customer/subscriptions">
            <Button size="lg" className="bg-white text-amber-900 hover:bg-amber-50 font-extrabold shadow-md whitespace-nowrap">
              View Subscriptions →
            </Button>
          </Link>
        </div>
      </Card>

      {/* Traceability */}
      <Card className="p-5 border border-gray-200 rounded-2xl bg-surface">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-text text-sm">Full Produce Traceability</h4>
              <p className="text-xs text-text-light">Farm → Harvest Date → Farmer Profile → Order → Delivery</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            QR Code Verified
          </span>
        </div>
      </Card>

      {/* Floating AI */}
      <Link to="/customer/ai-shopping" className="fixed bottom-6 right-6 z-40">
        <div className="w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ring-4 ring-white">
          <Sparkles className="w-6 h-6" />
        </div>
      </Link>
    </div>
  );
}
