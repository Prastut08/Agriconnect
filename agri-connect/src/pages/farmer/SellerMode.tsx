import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Package, ShoppingCart, Star, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { subscribeToMarketplaceProducts } from '../../lib/firestoreService';
import { useAuth } from '../../contexts/AuthContext';
import type { Product } from '../../types';

// Sample orders seeded locally (orders Firestore integration pending)
const LOCAL_ORDERS = [
  { id: 'ord-1', customerName: 'Priya Sharma', items: [{ productName: 'Tomatoes' }], totalAmount: 540, status: 'completed' as const, farmerId: 'farmer-1' },
  { id: 'ord-2', customerName: 'Amit Verma', items: [{ productName: 'Wheat' }], totalAmount: 1200, status: 'preparing' as const, farmerId: 'farmer-1' },
  { id: 'ord-3', customerName: 'Sunita Devi', items: [{ productName: 'Spinach' }], totalAmount: 320, status: 'new' as const, farmerId: 'farmer-1' },
];

export default function SellerMode() {
  const { currentUser } = useAuth();
  const [mode, setMode] = useState<'farm' | 'seller'>('farm');
  const [firestoreProducts, setFirestoreProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToMarketplaceProducts((products) => {
      setFirestoreProducts(products);
    });
    return () => unsubscribe();
  }, []);

  // Show this farmer's own products (or all if farmerId not yet set)
  const farmerId = currentUser?.id || 'farmer-1';
  const currentFarmerProducts = firestoreProducts.filter(
    (p) => p.farmerId === farmerId || p.farmerName === (currentUser?.name || 'Rajesh Kumar')
  );

  const activeListings = currentFarmerProducts.filter((p) => p.status === 'active').length;
  const pendingOrders = LOCAL_ORDERS.filter((o) => ['new', 'preparing'].includes(o.status)).length;
  const monthlyRevenue = currentFarmerProducts.reduce((sum, p) => sum + p.price * p.availableQuantity * 0.1, 0) || 125000;
  const sellerRating = 4.8;

  const tabStyle = (active: boolean) =>
    `px-5 py-2.5 text-sm font-bold rounded-lg flex items-center gap-2 transition-all ${
      active ? 'bg-white text-text shadow-sm' : 'text-text-light hover:text-text'
    }`;

  const modeHeader = (
    <div className="flex rounded-xl bg-gray-100 p-1 w-fit">
      <button onClick={() => setMode('farm')} className={tabStyle(mode === 'farm')}>🌾 Farm Mode</button>
      <button onClick={() => setMode('seller')} className={tabStyle(mode === 'seller')}>🛒 Seller Mode</button>
    </div>
  );

  if (mode === 'farm') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Seller Dashboard</h1>
          <p className="text-text-light">Manage your produce sales and orders</p>
        </div>

        {modeHeader}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Listings', value: activeListings.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Orders', value: LOCAL_ORDERS.length.toString(), icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Revenue (est.)', value: `₹${(monthlyRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'text-primary', bg: 'bg-green-50' },
            { label: 'Rating', value: sellerRating.toString(), icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
          ].map((stat, idx) => (
            <Card key={idx} className="p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-xs text-text-light font-medium uppercase tracking-wide">{stat.label}</p>
                  <p className="text-2xl font-bold text-text">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-text">Live Firestore Inventory</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                {currentFarmerProducts.length} items
              </span>
            </div>
            {currentFarmerProducts.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-text-light text-sm mb-3">No produce listed yet.</p>
                <Link to="/farmer/add-produce">
                  <Button size="sm" className="gap-2"><Plus className="w-4 h-4" />Add First Produce</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {currentFarmerProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <div className="flex items-center gap-3">
                      {product.images?.[0] && (
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-xl object-cover" />
                      )}
                      <div>
                        <p className="font-semibold text-text">{product.name}</p>
                        <p className="text-sm text-text-light">{product.availableQuantity} {product.unit} available • {product.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-text">₹{product.price}/{product.unit}</p>
                      <Badge variant={product.status === 'active' ? 'success' : 'error'}>{product.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {LOCAL_ORDERS.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-semibold text-text">{order.customerName}</p>
                    <p className="text-sm text-text-light">{order.items.map((i) => i.productName).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text">₹{order.totalAmount}</p>
                    <Badge variant={order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Seller Mode tab
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Seller Dashboard</h1>
        <p className="text-text-light">Manage your produce listings and orders</p>
      </div>

      {modeHeader}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: activeListings.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Orders', value: pendingOrders.toString(), icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Monthly Revenue', value: `₹${(monthlyRevenue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Seller Rating', value: sellerRating.toString(), icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-text-light font-medium uppercase tracking-wide">{stat.label}</p>
                <p className="text-2xl font-bold text-text">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Active Listings</h3>
            <Link to="/farmer/add-produce">
              <Button variant="outline" size="sm" className="gap-1"><Plus className="w-4 h-4" />Add Produce</Button>
            </Link>
          </div>
          {currentFarmerProducts.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-text-light text-sm">No active listings. Add your first produce!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {currentFarmerProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-xl object-cover" />
                    )}
                    <div>
                      <p className="font-semibold text-text">{product.name}</p>
                      <p className="text-sm text-text-light">{product.availableQuantity} {product.unit} available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text">₹{product.price}/{product.unit}</p>
                    <Badge variant={product.status === 'active' ? 'success' : 'error'}>{product.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Recent Orders</h3>
            <Link to="/farmer/orders">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Product</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-text-light">Status</th>
                </tr>
              </thead>
              <tbody>
                {LOCAL_ORDERS.slice(0, 3).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 px-4 text-sm text-text">{order.customerName}</td>
                    <td className="py-3 px-4 text-sm text-text-light">{order.items.map((i) => i.productName).join(', ')}</td>
                    <td className="py-3 px-4 text-sm font-medium text-text">₹{order.totalAmount}</td>
                    <td className="py-3 px-4">
                      <Badge variant={order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}>
                        {order.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
