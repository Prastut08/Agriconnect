import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { ProductCard } from '../../components/customer/ProductCard';
import { mockProducts } from '../../data/mockData';

export default function Products() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [filters, setFilters] = useState({ organic: false, nearMe: false, under50: false, today: false });

  const categories = ['all', 'Vegetables', 'Fruits', 'Grains', 'Pulses', 'Dairy'];

  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.farmerName.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'all' || product.category === category;
      const matchesOrganic = !filters.organic || product.farmingMethod === 'organic';
      const matchesNearMe = !filters.nearMe || product.distance < 20;
      const matchesUnder50 = !filters.under50 || product.price < 50;
      const matchesToday = !filters.today || product.availableDate === '2025-03-18';
      return matchesSearch && matchesCategory && matchesOrganic && matchesNearMe && matchesUnder50 && matchesToday;
    });

    if (sortBy === 'price') products = [...products].sort((a, b) => a.price - b.price);
    else if (sortBy === 'distance') products = [...products].sort((a, b) => a.distance - b.distance);
    else if (sortBy === 'freshness') products = [...products].sort((a, b) => b.freshness - a.freshness);
    else products = [...products].sort((a, b) => b.rating - a.rating);

    return products;
  }, [search, category, sortBy, filters]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Marketplace</h1>
        <p className="text-text-light">Browse fresh produce from verified farmers</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search products, farmers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
        >
          <option value="rating">Sort by Rating</option>
          <option value="price">Sort by Price</option>
          <option value="distance">Sort by Distance</option>
          <option value="freshness">Sort by Freshness</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              category === cat ? 'bg-primary text-white' : 'bg-gray-100 text-text-light hover:bg-gray-200'
            }`}
          >
            {cat === 'all' ? 'All' : cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { key: 'organic', label: 'Organic' },
          { key: 'nearMe', label: 'Near me' },
          { key: 'under50', label: 'Under Rs. 50' },
          { key: 'today', label: 'Today only' },
        ].map((filter) => (
          <button
            key={filter.key}
            onClick={() => setFilters((prev) => ({ ...prev, [filter.key]: !prev[filter.key as keyof typeof prev] }))}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
              filters[filter.key as keyof typeof filters] ? 'bg-primary text-white' : 'bg-gray-100 text-text-light hover:bg-gray-200'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link key={product.id} to={`/customer/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-lg font-semibold text-text mb-2">No products found</p>
          <p className="text-text-light">Try adjusting your search or filter criteria</p>
        </Card>
      )}
    </div>
  );
}
