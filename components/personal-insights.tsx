import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, TrendingUp, TrendingDown } from 'lucide-react'

export function PersonalInsights() {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-yellow-400" />
          Personal Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <InsightItem
            trend="up"
            content="Your productivity has increased by 15% this week. Keep up the good work!"
          />
          <InsightItem
            trend="down"
            content="Task completion rate for 'Project X' has decreased. Consider reallocating resources."
          />
          <InsightItem
            content="You tend to be most productive on Tuesdays and Thursdays. Try scheduling important tasks on these days."
          />
        </ul>
      </CardContent>
    </Card>
  )
}

function InsightItem({ trend, content }) {
  return (
    <li className="flex items-start">
      {trend === 'up' && <TrendingUp className="mr-2 h-5 w-5 text-green-500 flex-shrink-0" />}
      {trend === 'down' && <TrendingDown className="mr-2 h-5 w-5 text-red-500 flex-shrink-0" />}
      {!trend && <Badge className="mr-2 bg-blue-500">Tip</Badge>}
      <p className="text-sm text-gray-300">{content}</p>
    </li>
  )
}

