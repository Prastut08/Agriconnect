import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Calendar, User, Star, Pause, SkipForward, X } from 'lucide-react';
import { mockSubscriptions } from '../../data/mockData';

export default function Subscriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Fresh Every Week</h1>
        <p className="text-text-light">Subscribe for regular fresh produce delivery</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockSubscriptions.map((sub) => (
          <Card key={sub.id} className={`p-6 hover:shadow-lg transition-all duration-300 ${sub.status === 'paused' ? 'opacity-75' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-text text-lg">{sub.name}</h3>
                <p className="text-sm text-text-light">{sub.description}</p>
              </div>
              <Badge variant={sub.status === 'active' ? 'success' : 'warning'}>{sub.status}</Badge>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-3xl font-bold text-text">Rs. {sub.price}</span>
              <span className="text-text-light">/{sub.frequency.toLowerCase()}</span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-text-light">
                <User className="w-4 h-4" />
                <span>{sub.farmerName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-light">
                <Calendar className="w-4 h-4" />
                <span>Next delivery: {new Date(sub.nextDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-light">
                <Star className="w-4 h-4 text-accent fill-accent" />
                <span>{sub.rating} rating • {sub.subscribers} subscribers</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium text-text mb-2">Includes:</p>
              <div className="flex flex-wrap gap-1">
                {sub.items.map((item, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-text-light px-2.5 py-1 rounded-full">{item}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              {sub.status === 'active' ? (
                <>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pause className="w-4 h-4 mr-1" />
                    Pause
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <SkipForward className="w-4 h-4 mr-1" />
                    Skip
                  </Button>
                </>
              ) : (
                <Button size="sm" className="flex-1">Resume</Button>
              )}
              <Button variant="danger" size="sm" className="flex-1">
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
