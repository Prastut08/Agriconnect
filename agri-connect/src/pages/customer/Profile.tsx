import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { MapPin, Phone, Mail, Calendar, Leaf, Heart, ShoppingBag, Settings, LogOut, ChevronRight } from 'lucide-react';
import { mockCustomer } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function CustomerProfile() {
  const [customer] = useState(mockCustomer);

  const menuItems = [
    { icon: Heart, label: 'Saved Items', desc: 'Products you have saved', path: '/customer/products' },
    { icon: ShoppingBag, label: 'Order History', desc: 'Track your past orders', path: '/customer/orders' },
    { icon: Leaf, label: 'Subscriptions', desc: 'Manage your recurring deliveries', path: '/customer/subscriptions' },
    { icon: Settings, label: 'Settings', desc: 'App preferences and notifications', path: '#' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Profile</h1>
        <p className="text-text-light">Manage your account and preferences</p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {customer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text">{customer.name}</h2>
            <Badge variant="primary" className="mt-1">Customer</Badge>
          </div>
          <Button variant="outline" size="sm">
            Edit Profile
          </Button>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-text-light font-medium uppercase tracking-wide">Email</p>
            <p className="font-semibold text-text">{customer.email}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl">
            <Phone className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-xs text-text-light font-medium uppercase tracking-wide">Phone</p>
            <p className="font-semibold text-text">{customer.phone}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl">
            <MapPin className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-xs text-text-light font-medium uppercase tracking-wide">Location</p>
            <p className="font-semibold text-text">{customer.location}</p>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl">
            <Calendar className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <p className="text-xs text-text-light font-medium uppercase tracking-wide">Member Since</p>
            <p className="font-semibold text-text">{new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-bold text-text mb-4">Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {customer.preferences.map((pref) => (
            <span key={pref} className="px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {pref}
            </span>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-text mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link key={item.label} to={item.path}>
              <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <item.icon className="w-5 h-5 text-text-light" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text text-sm">{item.label}</p>
                  <p className="text-xs text-text-light">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-light" />
              </div>
            </Link>
          ))}
        </div>
      </Card>

      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
}
