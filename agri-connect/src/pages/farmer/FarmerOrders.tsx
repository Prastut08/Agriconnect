import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Tabs } from '../../components/ui/Tabs';
import { Eye, Check, X, Clock, Truck, Package } from 'lucide-react';
import { mockOrders } from '../../data/mockData';

const statusTabs = [
  { id: 'all', label: 'All Orders' },
  { id: 'new', label: 'New' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'preparing', label: 'Preparing' },
  { id: 'ready', label: 'Ready' },
  { id: 'out-for-delivery', label: 'Out for Delivery' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const statusColors: Record<string, 'primary' | 'success' | 'warning' | 'error' | 'info'> = {
  new: 'info',
  accepted: 'primary',
  preparing: 'warning',
  ready: 'primary',
  'out-for-delivery': 'info',
  completed: 'success',
  cancelled: 'error',
};

const statusIcons: Record<string, React.ReactNode> = {
  new: <Clock className="w-4 h-4" />,
  accepted: <Check className="w-4 h-4" />,
  preparing: <Package className="w-4 h-4" />,
  ready: <Package className="w-4 h-4" />,
  'out-for-delivery': <Truck className="w-4 h-4" />,
  completed: <Check className="w-4 h-4" />,
  cancelled: <X className="w-4 h-4" />,
};

export default function FarmerOrders() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = activeTab === 'all' ? mockOrders : mockOrders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Orders</h1>
        <p className="text-text-light">Manage your customer orders</p>
      </div>

      <Tabs
        tabs={statusTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-text">Order #{order.id}</h3>
                    <Badge variant={statusColors[order.status] || 'info'}>
                      {statusIcons[order.status] || <Clock className="w-4 h-4" />}
                      {order.status.replace('-', ' ')}
                    </Badge>
                    <span className="text-xs text-text-light ml-auto">Payment: {order.paymentStatus}</span>
                  </div>
                  <p className="text-sm text-text-light mb-1">Customer: {order.customerName}</p>
                  <p className="text-sm text-text-light mb-2">
                    {order.items.map((item) => `${item.productName} (${item.quantity} ${item.unit})`).join(', ')}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-text-light">
                    <span className="font-bold text-text">Total: Rs. {order.totalAmount}</span>
                    {order.pickupDate && <span>Pickup: {new Date(order.pickupDate).toLocaleDateString()}</span>}
                    <span>Ordered: {new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {order.status === 'new' && (
                    <>
                      <Button variant="outline" size="sm">
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm">
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </>
                  )}
                  {order.status === 'accepted' && (
                    <Button size="sm">Mark as Preparing</Button>
                  )}
                  {order.status === 'preparing' && (
                    <Button size="sm">Mark as Ready</Button>
                  )}
                  {order.status === 'ready' && (
                    <Button size="sm">
                      <Truck className="w-4 h-4 mr-1" />
                      Mark for Delivery
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
