import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Package, ShoppingCart, Star, TrendingUp, DollarSign } from 'lucide-react';
import { mockProducts, mockOrders } from '../../data/mockData';
import { mockUser } from '../../data/mockData';

export default function SellerMode() {
  const [mode, setMode] = useState<'farm' | 'seller'>('farm');

  const activeListings = mockProducts.filter((p) => p.farmerId === mockUser.id && p.status === 'active').length;
  const pendingOrders = mockOrders.filter((o) => o.farmerId === mockUser.id && ['new', 'preparing', 'ready'].includes(o.status)).length;
  const monthlyRevenue = 125000;
  const sellerRating = 4.8;

  if (mode === 'farm') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Seller Dashboard</h1>
          <p className="text-text-light">Manage your produce sales and orders</p>
        </div>

        <div className="flex rounded-xl bg-gray-100 p-1 w-fit">
          <button
            onClick={() => setMode('farm')}
            className="px-5 py-2.5 text-sm font-bold rounded-lg bg-white text-text shadow-sm flex items-center gap-2"
          >
            🌾 Farm Mode
          </button>
          <button
            onClick={() => setMode('seller')}
            className="px-5 py-2.5 text-sm font-bold rounded-lg text-text-light hover:text-text flex items-center gap-2"
          >
            🛒 Seller Mode
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Active Listings', value: activeListings.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Total Orders', value: '24', icon: ShoppingCart, color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'Revenue', value: `Rs. ${(monthlyRevenue / 1000).toFixed(0)}k`, icon: DollarSign, color: 'text-primary', bg: 'bg-green-50' },
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
            <h3 className="font-semibold text-text mb-4">Inventory</h3>
            <div className="space-y-3">
              {mockProducts.filter((p) => p.farmerId === mockUser.id).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-semibold text-text">{product.name}</p>
                    <p className="text-sm text-text-light">{product.availableQuantity} {product.unit} available</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text">Rs. {product.price}/{product.unit}</p>
                    <Badge variant={product.status === 'active' ? 'success' : 'error'}>{product.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Recent Orders</h3>
            <div className="space-y-3">
              {mockOrders.filter((o) => o.farmerId === mockUser.id).slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div>
                    <p className="font-semibold text-text">{order.customerName}</p>
                    <p className="text-sm text-text-light">{order.items.map((item) => item.productName).join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text">Rs. {order.totalAmount}</p>
                    <Badge variant={order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Seller Dashboard</h1>
        <p className="text-text-light">Manage your produce listings and orders</p>
      </div>

      <div className="flex rounded-xl bg-gray-100 p-1 w-fit">
        <button
          onClick={() => setMode('farm')}
          className="px-5 py-2.5 text-sm font-bold rounded-lg text-text-light hover:text-text flex items-center gap-2"
        >
          🌾 Farm Mode
        </button>
        <button
          onClick={() => setMode('seller')}
          className="px-5 py-2.5 text-sm font-bold rounded-lg bg-white text-text shadow-sm flex items-center gap-2"
        >
          🛒 Seller Mode
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Listings', value: activeListings.toString(), icon: Package, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Pending Orders', value: pendingOrders.toString(), icon: ShoppingCart, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Monthly Revenue', value: `Rs. ${(monthlyRevenue / 1000).toFixed(0)}k`, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
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
              <Button variant="outline" size="sm">Add Produce</Button>
            </Link>
          </div>
          <div className="space-y-3">
            {mockProducts.filter((p) => p.farmerId === mockUser.id).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-semibold text-text">{product.name}</p>
                  <p className="text-sm text-text-light">{product.availableQuantity} {product.unit} available</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text">Rs. {product.price}/{product.unit}</p>
                  <Badge variant={product.status === 'active' ? 'success' : 'error'}>{product.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Recent Orders</h3>
            <Link to="/farmer/orders">
              <Button variant="outline" size="sm">View All Orders</Button>
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
                {mockOrders.filter((o) => o.farmerId === mockUser.id).slice(0, 3).map((order) => (
                  <tr key={order.id} className="border-b border-gray-50">
                    <td className="py-3 px-4 text-sm text-text">{order.customerName}</td>
                    <td className="py-3 px-4 text-sm text-text-light">{order.items.map((item) => item.productName).join(', ')}</td>
                    <td className="py-3 px-4 text-sm font-medium text-text">Rs. {order.totalAmount}</td>
                    <td className="py-3 px-4">
                      <Badge variant={order.status === 'completed' ? 'success' : order.status === 'preparing' ? 'warning' : 'info'}>{order.status}</Badge>
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
