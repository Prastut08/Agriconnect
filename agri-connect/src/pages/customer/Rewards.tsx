import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trophy, Star, Gift, TrendingUp, Award, Zap, Leaf } from 'lucide-react';

const rewards = [
  { id: 1, title: 'First Order Bonus', desc: 'Complete your first order', points: 500, completed: true, icon: Star },
  { id: 2, title: 'Organic Explorer', desc: 'Buy 5 organic products', points: 300, completed: true, icon: Leaf },
  { id: 3, title: 'Loyal Customer', desc: 'Place 10 orders', points: 1000, completed: false, icon: Trophy },
  { id: 4, title: 'Farm Supporter', desc: 'Purchase from 3 different farmers', points: 400, completed: false, icon: Award },
];

export default function Rewards() {
  const totalPoints = rewards.filter(r => r.completed).reduce((sum, r) => sum + r.points, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Rewards</h1>
        <p className="text-text-light">Earn points and unlock benefits</p>
      </div>

      <Card className="p-8 bg-gradient-to-r from-amber-50 to-orange-50 text-center">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-amber-600" />
        </div>
        <p className="text-lg text-text-light mb-1">Total Points</p>
        <p className="text-5xl font-black text-amber-900 mb-2">{totalPoints.toLocaleString()}</p>
        <p className="text-sm text-amber-700">Keep shopping to earn more rewards</p>
      </Card>

      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Rewards Earned', value: '2', icon: Trophy, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Available Rewards', value: '2', icon: Gift, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'Points This Month', value: '+800', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-5 text-center">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-light font-medium">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-bold text-text mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-500" />
          Available Rewards
        </h3>
        <div className="space-y-3">
          {rewards.filter(r => !r.completed).map((reward) => (
            <div key={reward.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <reward.icon className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-text text-sm">{reward.title}</p>
                <p className="text-xs text-text-light">{reward.desc}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-amber-700 text-sm">+{reward.points} pts</p>
                <Button size="sm" variant="outline" className="mt-1">Track</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-bold text-text mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Completed
        </h3>
        <div className="space-y-3">
          {rewards.filter(r => r.completed).map((reward) => (
            <div key={reward.id} className="flex items-center gap-4 p-4 bg-green-50 rounded-2xl">
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <reward.icon className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-text text-sm">{reward.title}</p>
                <p className="text-xs text-text-light">{reward.desc}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700 text-sm">+{reward.points} pts</p>
                <span className="text-xs text-green-600 font-medium">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
