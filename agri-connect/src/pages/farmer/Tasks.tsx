import { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Filter, Sparkles, BarChart3, TrendingUp } from 'lucide-react';
import { actionCenterMockTasks as mockTasks } from '../../components/farmer/ActionCenter';

type Priority = 'all' | 'high' | 'recommended' | 'opportunity' | 'upcoming';

export default function Tasks() {
  const [filter, setFilter] = useState<Priority>('all');

  const priorityCounts = {
    all: mockTasks.length,
    high: mockTasks.filter((t: { priority: string }) => t.priority === 'high').length,
    recommended: mockTasks.filter((t: { priority: string }) => t.priority === 'recommended').length,
    opportunity: mockTasks.filter((t: { priority: string }) => t.priority === 'opportunity').length,
    upcoming: mockTasks.filter((t: { priority: string }) => t.priority === 'upcoming').length,
  };

  const ctaButtons: Record<string, { label: string; variant: 'primary' | 'outline' | 'secondary' }> = {
    high: { label: 'Take Action', variant: 'primary' },
    recommended: { label: 'Take Action', variant: 'primary' },
    opportunity: { label: 'View Market', variant: 'outline' },
    upcoming: { label: 'Ask AI', variant: 'outline' },
  };

  const filteredTasks = filter === 'all' ? mockTasks : mockTasks.filter((t) => t.priority === filter);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-text mb-1">Today's Farm Tasks</h1>
          <p className="text-text-light">AI-powered recommendations for your farm</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-text-light" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as Priority)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
          >
            <option value="all">All Tasks ({priorityCounts.all})</option>
            <option value="high">High Priority ({priorityCounts.high})</option>
            <option value="recommended">Recommended ({priorityCounts.recommended})</option>
            <option value="opportunity">Opportunities ({priorityCounts.opportunity})</option>
            <option value="upcoming">Upcoming ({priorityCounts.upcoming})</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Tasks', value: priorityCounts.all.toString(), icon: BarChart3, color: 'text-primary', bg: 'bg-green-50' },
          { label: 'High Priority', value: priorityCounts.high.toString(), icon: Filter, color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Recommended', value: priorityCounts.recommended.toString(), icon: Sparkles, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Opportunities', value: priorityCounts.opportunity.toString(), icon: TrendingUp, color: 'text-accent', bg: 'bg-amber-50' },
        ].map((stat, idx) => (
          <Card key={idx} className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-text-light font-medium">{stat.label}</p>
                <p className="text-xl font-bold text-text">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-text mb-2">No tasks found</h3>
                <p className="text-text-light">Try adjusting your filter criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className={`p-5 rounded-2xl border-l-4 ${
                    task.priority === 'high' ? 'border-l-error bg-red-50' :
                    task.priority === 'recommended' ? 'border-l-primary bg-green-50' :
                    task.priority === 'opportunity' ? 'border-l-accent bg-amber-50' :
                    'border-l-gray-300 bg-gray-50'
                  }`}>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="mt-0.5">{task.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-text">{task.title}</h4>
                        <p className="text-sm text-text-light mt-1">{task.reason}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between ml-8">
                      <span className="text-sm font-medium text-primary bg-white px-3 py-1.5 rounded-xl">{task.action}</span>
                      <span className="text-xs text-text-light font-medium">{task.time}</span>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <Button variant="outline" size="sm">{ctaButtons[task.priority].label}</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6">
            <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Task Summary
            </h3>
            <div className="space-y-3">
              {Object.entries(priorityCounts).filter(([key]) => key !== 'all').map(([key, count]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-text-light capitalize">{key}</span>
                  <span className="text-sm font-bold text-text">{count}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
