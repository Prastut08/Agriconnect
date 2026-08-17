import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Truck, CheckCircle, Clock, XCircle, Package, RefreshCw } from 'lucide-react';
import { mockOrders } from '../../data/mockData';

const statusSteps = ['new', 'accepted', 'preparing', 'ready', 'out-for-delivery', 'completed'];

const statusIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-5 h-5" />,
  accepted: <CheckCircle className="w-5 h-5" />,
  preparing: <Package className="w-5 h-5" />,
  ready: <Package className="w-5 h-5" />,
  'out-for-delivery': <Truck className="w-5 h-5" />,
  completed: <CheckCircle className="w-5 h-5" />,
  cancelled: <XCircle className="w-5 h-5" />,
};

export default function Orders() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Your Orders</h1>
        <p className="text-text-light">Track and manage your orders</p>
      </div>

      <div className="space-y-6">
        {mockOrders.map((order) => {
          const currentStepIndex = statusSteps.indexOf(order.status);

          return (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-text">Order #{order.id}</h3>
                    <Badge variant={order.status === 'completed' ? 'success' : order.status === 'cancelled' ? 'error' : 'info'}>
                      {statusIcons[order.status] || <Clock className="w-4 h-4" />}
                      {order.status.replace('-', ' ')}
                    </Badge>
                  </div>
                  <p className="text-sm text-text-light mb-1">From: {order.farmerName}</p>
                  <p className="text-sm text-text-light">
                    {order.items.map((item) => `${item.productName} (${item.quantity} ${item.unit})`).join(', ')}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-light mt-2">
                    <span className="font-bold text-text">Total: Rs. {order.totalAmount}</span>
                    <span>Payment: {order.paymentStatus}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Track Order</Button>
                  {order.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <RefreshCw className="w-4 h-4 mr-1" />
                      Reorder
                    </Button>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, idx) => (
                    <div key={step} className="flex flex-col items-center flex-1">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        idx <= currentStepIndex ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {statusIcons[step] || <Clock className="w-4 h-4" />}
                      </div>
                      <span className={`text-xs mt-1 font-medium ${idx <= currentStepIndex ? 'text-primary' : 'text-text-light'}`}>
                        {step.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 text-center">
                <span className="text-sm text-text-light">
                  {order.deliveryDate ? `Estimated delivery: ${new Date(order.deliveryDate).toLocaleDateString()}` : `Ordered: ${new Date(order.createdAt).toLocaleDateString()}`}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
