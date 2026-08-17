import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trash2, Plus, Minus, ArrowRight, Shield } from 'lucide-react';

interface CartItem {
  productId: string;
  productName: string;
  farmerName: string;
  quantity: number;
  unit: string;
  price: number;
}

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([
    { productId: 'prod-1', productName: 'Organic Wheat', farmerName: 'Rajesh Kumar', quantity: 5, unit: 'kg', price: 45 },
    { productId: 'prod-2', productName: 'Fresh Tomatoes', farmerName: 'Rajesh Kumar', quantity: 2, unit: 'kg', price: 35 },
  ]);

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const deliveryFee = subtotal > 500 ? 0 : 50;
  const platformFee = Math.round(subtotal * 0.02);
  const total = subtotal + deliveryFee + platformFee;
  const farmerReceives = Math.round(subtotal * 0.83);
  const savings = Math.round(subtotal * 0.15);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Your Cart</h1>
        <p className="text-text-light">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.productId} className="p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-primary/30">🌾</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-text">{item.productName}</h3>
                  <p className="text-sm text-text-light">by {item.farmerName}</p>
                  <p className="text-sm font-medium text-primary mt-1">Rs. {item.price}/{item.unit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.productId, -1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold text-text w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, 1)}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-right">
                  <p className="font-bold text-text">Rs. {(item.quantity * item.price).toLocaleString()}</p>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-red-500 hover:text-red-700 transition-colors mt-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4">Price Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-light">Subtotal</span>
                <span className="font-bold text-text">Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-light">Delivery Fee</span>
                <span className="font-bold text-text">{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-light">Platform Fee (2%)</span>
                <span className="font-bold text-text">Rs. {platformFee}</span>
              </div>
              <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                <span className="font-bold text-text">Total</span>
                <span className="text-2xl font-bold text-primary">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-green-50 rounded-2xl">
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Shield className="w-4 h-4" />
                <span className="font-medium">You saved Rs. {savings} by buying direct</span>
              </div>
            </div>

            <Link to="/customer/orders">
              <Button className="w-full mt-4" size="lg">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-text mb-3">Where Your Money Goes</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-text-light">Customer pays</span>
                <span className="font-bold text-text">Rs. {total.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-light">Farmer receives</span>
                <span className="text-green-600 font-bold">Rs. {farmerReceives.toLocaleString()} (83%)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-light">Platform + Logistics</span>
                <span className="text-text-light">Rs. {platformFee + deliveryFee}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
