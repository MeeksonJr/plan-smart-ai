import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

export function RecentActivity() {
  const activities = [
    { type: 'completion', task: 'Update marketing strategy', time: '2 hours ago' },
    { type: 'start', task: 'Design new landing page', time: '5 hours ago' },
    { type: 'deadline', task: 'Submit Q2 report', time: 'Tomorrow at 5 PM' },
    { type: 'completion', task: 'Team meeting', time: 'Yesterday' },
  ]

  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

function ActivityItem({ type, task, time }) {
  const icons = {
    completion: <CheckCircle className="h-5 w-5 text-green-500" />,
    start: <Clock className="h-5 w-5 text-blue-500" />,
    deadline: <AlertCircle className="h-5 w-5 text-yellow-500" />,
  }

  return (
    <li className="flex items-center">
      <div className="mr-3">{icons[type]}</div>
      <div>
        <p className="text-sm font-medium text-gray-200">{task}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </li>
  )
}

