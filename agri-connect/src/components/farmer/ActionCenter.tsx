import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, Calendar, Clock, Zap } from 'lucide-react';

interface TaskItem {
  id: string;
  icon: ReactNode;
  title: string;
  reason: string;
  action: string;
  time: string;
  priority: 'high' | 'recommended' | 'opportunity' | 'upcoming';
}

export const actionCenterMockTasks: TaskItem[] = [
  {
    id: 'task-1',
    icon: <AlertTriangle className="w-5 h-5 text-error" />,
    title: 'Late Blight Risk - Tomato Crop',
    reason: 'Humidity at 75% with 22-28°C creates ideal conditions for late blight in tomatoes',
    action: 'Apply copper-based fungicide spray immediately',
    time: 'Due Today',
    priority: 'high',
  },
  {
    id: 'task-2',
    icon: <TrendingUp className="w-5 h-5 text-success" />,
    title: 'Wheat Price Rising - Sell Now',
    reason: 'Wheat prices up 3.3% in Punjab Mandi. Expected further increase in next 2 weeks.',
    action: 'Visit mandi within 3 days for best price',
    time: 'By March 20',
    priority: 'high',
  },
  {
    id: 'task-3',
    icon: <CheckCircle className="w-5 h-5 text-primary" />,
    title: 'Irrigation Scheduled - Skip Today',
    reason: 'Rain probability 70% on March 22. Natural irrigation will suffice.',
    action: 'Skip irrigation, save water and electricity',
    time: 'March 22',
    priority: 'recommended',
  },
  {
    id: 'task-4',
    icon: <Calendar className="w-5 h-5 text-primary" />,
    title: 'Tomato Harvest in 12 Days',
    reason: 'Flowering stage 85% complete. Optimal harvest window approaching.',
    action: 'Prepare harvesting equipment and arrange transport',
    time: 'March 30',
    priority: 'upcoming',
  },
  {
    id: 'task-5',
    icon: <TrendingUp className="w-5 h-5 text-accent" />,
    title: 'Potato Market Opportunity',
    reason: 'Local demand for potatoes increasing. Current price: Rs. 1200/quintal',
    action: 'Consider listing your potato produce for sale',
    time: 'This Week',
    priority: 'opportunity',
  },
  {
    id: 'task-6',
    icon: <Clock className="w-5 h-5 text-text-light" />,
    title: 'Fertilizer Application - Rice',
    reason: 'Rice crop entering tillering stage. Nitrogen application needed.',
    action: 'Apply 50kg Urea per acre',
    time: 'March 25',
    priority: 'upcoming',
  },
];

export function ActionCenter() {
  const highPriority = actionCenterMockTasks.filter((t) => t.priority === 'high');
  const recommended = actionCenterMockTasks.filter((t) => t.priority === 'recommended');
  const opportunities = actionCenterMockTasks.filter((t) => t.priority === 'opportunity');
  const upcoming = actionCenterMockTasks.filter((t) => t.priority === 'upcoming');

  const priorityConfig = {
    high: { label: 'High Priority', color: 'text-error', bg: 'bg-red-50', border: 'border-l-4 border-l-error', iconColor: 'text-error' },
    recommended: { label: 'Recommended', color: 'text-primary', bg: 'bg-green-50', border: 'border-l-4 border-l-primary', iconColor: 'text-primary' },
    opportunity: { label: 'Opportunity', color: 'text-accent', bg: 'bg-amber-50', border: 'border-l-4 border-l-accent', iconColor: 'text-accent' },
    upcoming: { label: 'Upcoming', color: 'text-text-light', bg: 'bg-gray-50', border: 'border-l-4 border-l-gray-300', iconColor: 'text-text-light' },
  };

  const ctaConfig: Record<string, { label: string; variant: 'primary' | 'outline' | 'secondary' }> = {
    high: { label: 'Take Action', variant: 'primary' },
    recommended: { label: 'Take Action', variant: 'primary' },
    opportunity: { label: 'View Market', variant: 'outline' },
    upcoming: { label: 'Ask AI', variant: 'outline' },
  };

  const TaskSection = ({ title, tasks, config, priorityKey }: { title: string; tasks: TaskItem[]; config: typeof priorityConfig.high; priorityKey: string }) => {
    if (tasks.length === 0) return null;
    return (
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${config.bg} ${config.color}`}>
            {title}
          </span>
          <span className="text-xs text-text-light font-medium">{tasks.length} task{tasks.length > 1 ? 's' : ''}</span>
        </div>
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`group p-5 rounded-2xl ${config.border} ${config.bg} hover:shadow-md transition-all duration-200 cursor-pointer`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 ${config.iconColor}`}>{task.icon}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-text text-base mb-1 group-hover:text-primary transition-colors">{task.title}</h4>
                  <p className="text-sm text-text-light mb-3 leading-relaxed">{task.reason}</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center text-sm font-semibold text-primary bg-white/80 px-3 py-1.5 rounded-xl">
                      <Zap className="w-3.5 h-3.5 mr-1.5" />
                      {task.action}
                    </span>
                    <span className="text-xs text-text-light whitespace-nowrap font-medium bg-white/60 px-2.5 py-1 rounded-lg">{task.time}</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end">
                <button className={`text-xs font-semibold px-4 py-2 rounded-lg transition-colors ${ctaConfig[priorityKey].variant === 'primary' ? 'bg-primary text-white hover:bg-primary-light' : 'border border-gray-200 text-text hover:bg-white'}`}>
                  {ctaConfig[priorityKey].label}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-1">
      <TaskSection title="High Priority" tasks={highPriority} config={priorityConfig.high} priorityKey="high" />
      <TaskSection title="Recommended" tasks={recommended} config={priorityConfig.recommended} priorityKey="recommended" />
      <TaskSection title="Opportunities" tasks={opportunities} config={priorityConfig.opportunity} priorityKey="opportunity" />
      <TaskSection title="Upcoming" tasks={upcoming} config={priorityConfig.upcoming} priorityKey="upcoming" />
    </div>
  );
}
