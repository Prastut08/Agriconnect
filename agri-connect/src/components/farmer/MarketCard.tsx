import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';
import { Card } from '../ui/Card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Button } from '../ui/Button';
import type { MarketPrice } from '../../types';

interface MarketCardProps {
  price: MarketPrice;
}

const trendIcons = {
  up: <TrendingUp className="w-4 h-4 text-green-600" />,
  down: <TrendingDown className="w-4 h-4 text-red-600" />,
  stable: <Minus className="w-4 h-4 text-gray-600" />,
};

const recommendationColors = {
  'SELL NOW': 'bg-green-100 text-green-800 border-green-200',
  WAIT: 'bg-amber-100 text-amber-800 border-amber-200',
  COMPARE: 'bg-blue-100 text-blue-800 border-blue-200',
};

export function MarketCard({ price }: MarketCardProps) {
  const miniData = [
    { value: price.currentPrice * 0.95 },
    { value: price.currentPrice * 0.97 },
    { value: price.currentPrice * 0.99 },
    { value: price.currentPrice },
    { value: price.predictedPrice },
  ];

  return (
    <Card className="p-5 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-text text-lg group-hover:text-primary transition-colors">{price.crop}</h3>
          <p className="text-xs text-text-light">{price.mandiName}</p>
        </div>
        <div className={`px-3 py-1.5 rounded-full text-xs font-bold border ${recommendationColors[price.recommendation]}`}>
          {price.recommendation}
        </div>
      </div>

      <div className="flex items-end justify-between mb-4">
        <div>
          <p className="text-xs text-text-light mb-1">Current Price</p>
          <p className="text-2xl font-bold text-text">Rs. {price.currentPrice}</p>
          <p className="text-xs text-text-light">per {price.unit}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-text-light mb-1">Predicted</p>
          <p className="text-xl font-semibold text-text">Rs. {price.predictedPrice}</p>
          <div className="flex items-center justify-end gap-1.5">
            {trendIcons[price.trend]}
            <span className={`text-xs font-bold ${price.trend === 'up' ? 'text-green-600' : price.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
              {price.changePercent > 0 ? '+' : ''}{price.changePercent}%
            </span>
          </div>
        </div>
      </div>

      <div className="h-16 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={miniData}>
            <Line type="monotone" dataKey="value" stroke="#1a5632" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-text-light" />
          <span className="text-xs text-text-light font-medium">Confidence</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-24 h-2.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500" style={{ width: `${price.confidence}%` }} />
          </div>
          <span className="text-xs font-bold text-text">{price.confidence}%</span>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 text-xs">Compare</Button>
        <Button size="sm" className="flex-1 text-xs">Sell Now</Button>
      </div>
    </Card>
  );
}
