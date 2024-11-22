import { Dashboard } from '@/components/dashboard'
import { ProgressChart } from '@/components/progress-chart'
import { TaskPriorityChart } from '@/components/task-priority-chart'
import { PersonalInsights } from '@/components/personal-insights'
import { RecentActivity } from '@/components/recent-activity'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, PieChart, Calendar, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
return (
  <div>
    <h1 className="text-4xl font-bold mb-6 gradient-text">Your Dashboard</h1>
    <p className="text-xl text-gray-400 mb-8">
      Track your progress, manage tasks, and gain insights to optimize your productivity and achieve your goals faster.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <MetricCard
        icon={BarChart}
        title="Overall Progress"
        value="68%"
        description="Average completion across all plans"
      />
      <MetricCard
        icon={PieChart}
        title="Active Plans"
        value="4"
        description="Number of plans currently in progress"
      />
      <MetricCard
        icon={Calendar}
        title="Upcoming Deadlines"
        value="3"
        description="Tasks due in the next 7 days"
      />
      <MetricCard
        icon={TrendingUp}
        title="Productivity Score"
        value="82"
        description="Based on task completion rate and timeliness"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <ProgressChart />
      <TaskPriorityChart />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <PersonalInsights />
      <RecentActivity />
    </div>
    <Dashboard />
  </div>
)
}

function MetricCard({ icon: Icon, title, value, description }) {
return (
  <Card className="bg-gray-800 p-4 rounded-lg">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-blue-400" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-gray-400">{description}</p>
    </CardContent>
  </Card>
)
}

