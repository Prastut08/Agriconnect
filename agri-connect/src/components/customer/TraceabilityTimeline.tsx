import {
  Sprout,
  User,
  Scissors,
  Package,
  Truck,
  Home,
  CheckCircle2,
  QrCode,
} from 'lucide-react';
import { Card } from '../ui/Card';
import type { Product } from '../../types';

interface TraceabilityTimelineProps {
  product: Product;
}

const timelineSteps = [
  { icon: Sprout, label: 'Farm', description: 'Grown with care at verified farm', status: 'completed' as const },
  { icon: User, label: 'Farmer', description: 'Harvested and packed by farmer', status: 'completed' as const },
  { icon: Scissors, label: 'Harvest', description: 'Hand-picked at optimal ripeness', status: 'completed' as const },
  { icon: Package, label: 'Packed', description: 'Quality checked and packed fresh', status: 'completed' as const },
  { icon: Truck, label: 'Delivery', description: 'On its way to your home', status: 'in-progress' as const },
  { icon: Home, label: 'Your Home', description: 'Fresh from farm to your doorstep', status: 'pending' as const },
];

export function TraceabilityTimeline({ product }: TraceabilityTimelineProps) {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-lg text-text mb-6">Farm to Your Home</h3>

      <div className="flex flex-col items-center mb-6">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
          <QrCode className="w-10 h-10 text-gray-400" />
        </div>
        <p className="text-xs text-text-light">Scan QR code for full traceability</p>
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {timelineSteps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div
                className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                  step.status === 'completed'
                    ? 'bg-green-100 text-green-600'
                    : step.status === 'in-progress'
                    ? 'bg-primary/10 text-primary animate-pulse'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 pt-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-text">{step.label}</h4>
                  {step.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                </div>
                <p className="text-sm text-text-light mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
        <h4 className="font-semibold text-text text-sm mb-3">Product Details</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-text-light">Harvest Date</p>
            <p className="font-medium text-text">{new Date(product.harvestDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Farming Method</p>
            <p className="font-medium text-text capitalize">{product.farmingMethod}</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Freshness</p>
            <p className="font-medium text-text">{product.freshness}%</p>
          </div>
          <div>
            <p className="text-xs text-text-light">Farmer</p>
            <p className="font-medium text-text">{product.farmerName}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
