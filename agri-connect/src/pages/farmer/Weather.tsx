import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Cloud, Sun, CloudRain, AlertTriangle, Droplets, Wind, Sprout } from 'lucide-react';
import { mockWeather, mockCrops } from '../../data/mockData';

const weatherIcons: Record<string, React.ReactNode> = {
  sunny: <Sun className="w-10 h-10 text-yellow-500" />,
  cloudy: <Cloud className="w-10 h-10 text-gray-500" />,
  rainy: <CloudRain className="w-10 h-10 text-blue-500" />,
};

export default function Weather() {
  const today = mockWeather[0];
  const rainDays = mockWeather.filter((w) => w.rainProbability > 50).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-text mb-1">Weather & Smart Irrigation</h1>
        <p className="text-text-light">AI-powered weather insights for your farm</p>
      </div>

      {today.alert && (
        <Card className="p-4 bg-amber-50 border-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900">Weather Alert</h4>
            <p className="text-sm text-amber-700">{today.alert}</p>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-background">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-text text-lg">Today's Weather</h3>
            <p className="text-sm text-text-light">{today.day} • {new Date(today.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</p>
          </div>
          {weatherIcons[today.icon] || <Sun className="w-12 h-12 text-yellow-500" />}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-white rounded-2xl">
            <p className="text-4xl font-bold text-text">{today.temperature.max}°</p>
            <p className="text-sm text-text-light">L: {today.temperature.min}°</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl">
            <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-text">{today.humidity}%</p>
            <p className="text-xs text-text-light">Humidity</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl">
            <CloudRain className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-text">{today.rainProbability}%</p>
            <p className="text-xs text-text-light">Rain Probability</p>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl">
            <Wind className="w-6 h-6 text-gray-500 mx-auto mb-2" />
            <p className="text-xl font-bold text-text">{today.windSpeed}</p>
            <p className="text-xs text-text-light">Wind km/h</p>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">7-Day Forecast</h3>
          <div className="space-y-3">
            {mockWeather.map((day) => (
              <div key={day.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                <div className="flex items-center gap-4">
                  {weatherIcons[day.icon] || <Sun className="w-8 h-8 text-gray-400" />}
                  <div>
                    <p className="font-semibold text-text">{day.day}</p>
                    <p className="text-xs text-text-light">{day.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-text">{day.temperature.max}° / {day.temperature.min}°</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-text-light">{day.rainProbability}% rain</span>
                    <span className="text-xs text-text-light">{day.windSpeed} km/h</span>
                  </div>
                </div>
                {day.alert && <Badge variant="warning">Alert</Badge>}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold text-text mb-4">Rain Probability</h3>
          <div className="space-y-3">
            {mockWeather.map((day) => (
              <div key={day.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-text">{day.day}</span>
                  <span className="text-sm font-bold text-text">{day.rainProbability}%</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${day.rainProbability > 50 ? 'bg-blue-500' : day.rainProbability > 20 ? 'bg-amber-500' : 'bg-green-500'}`}
                    style={{ width: `${day.rainProbability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {rainDays > 0 && (
        <Card className="p-4 bg-red-50 border-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900">Extreme Weather Alert</h4>
            <p className="text-sm text-red-700">Heavy rain expected on {mockWeather.find((w) => w.rainProbability > 50)?.day}. Prepare fields and protect crops.</p>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-gradient-to-r from-green-50 to-background">
        <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" />
          AI Irrigation Recommendations
        </h3>
        <div className="space-y-4">
          {mockWeather.map((day) => (
            <div key={day.id} className="p-4 bg-white rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <p className="font-bold text-text">{day.day}</p>
                <Badge variant={day.rainProbability > 50 ? 'success' : day.rainProbability > 20 ? 'warning' : 'error'}>
                  {day.rainProbability > 50 ? 'Skip Irrigation' : day.rainProbability > 20 ? 'Reduce Water' : 'Full Irrigation'}
                </Badge>
              </div>
              <p className="text-sm text-text-light mb-2">
                {day.rainProbability > 50
                  ? 'Natural rainfall expected. Skip scheduled irrigation to save water and prevent overwatering.'
                  : day.rainProbability > 20
                  ? 'Light rain expected. Reduce irrigation by 30% to avoid waterlogging.'
                  : 'No rain expected. Proceed with full irrigation schedule.'}
              </p>
              <div className="flex items-center gap-4 text-xs text-text-light">
                <span>Water req: {mockCrops[0].waterRequirement}</span>
                <span>Next irrigation: {day.rainProbability > 50 ? 'In 2 days' : 'Today'}</span>
                <span className="text-green-600 font-medium">Save {day.rainProbability > 50 ? '15,000L' : '0L'}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-text mb-4">Soil Moisture</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }} />
          </div>
          <span className="text-lg font-bold text-text">65%</span>
        </div>
        <p className="text-sm text-text-light mt-2">Current soil moisture is optimal for most crops. No immediate irrigation needed.</p>
      </Card>
    </div>
  );
}
