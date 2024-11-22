'use client'

import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
{ date: '2023-05-01', progress: 0 },
{ date: '2023-05-08', progress: 20 },
{ date: '2023-05-15', progress: 35 },
{ date: '2023-05-22', progress: 50 },
{ date: '2023-05-29', progress: 68 },
]

export function ProgressChart() {
return (
  <Card className="glass-effect">
    <CardHeader>
      <CardTitle>Progress Over Time</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="progress" stroke="#3b82f6" />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
)
}

