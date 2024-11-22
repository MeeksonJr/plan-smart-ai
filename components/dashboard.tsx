'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp, Plus, X } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type Task = {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'completed'
  priority: 'low' | 'medium' | 'high'
}

type Plan = {
  id: string
  goal: string
  resources: string
  constraints: string
  plan: string
  tasks: Task[]
  createdAt: string
}

export function Dashboard() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as const })

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/get-plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans)
      } else {
        throw new Error('Failed to fetch plans')
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateTaskStatus = async (planId: string, taskId: string, newStatus: Task['status']) => {
    try {
      const response = await fetch('/api/update-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, taskId, newStatus }),
      })
      if (response.ok) {
        setPlans(prevPlans =>
          prevPlans.map(plan =>
            plan.id === planId
              ? {
                  ...plan,
                  tasks: plan.tasks.map(task =>
                    task.id === taskId ? { ...task, status: newStatus } : task
                  ),
                }
              : plan
          )
        )
      } else {
        throw new Error('Failed to update task status')
      }
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const addTask = async (planId: string) => {
    if (!newTask.title) return

    try {
      const response = await fetch('/api/add-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, ...newTask }),
      })
      if (response.ok) {
        const { task } = await response.json()
        setPlans(prevPlans =>
          prevPlans.map(plan =>
            plan.id === planId
              ? { ...plan, tasks: [...plan.tasks, task] }
              : plan
          )
        )
        setNewTask({ title: '', priority: 'medium' })
      } else {
        throw new Error('Failed to add task')
      }
    } catch (error) {
      console.error('Error adding task:', error)
    }
  }

  const calculateProgress = (tasks: Task[]) => {
    const completedTasks = tasks.filter(task => task.status === 'completed').length
    return (completedTasks / tasks.length) * 100
  }

  if (isLoading) {
    return <div>Loading plans...</div>
  }

  return (
    <div className="space-y-6">
      {plans.map(plan => (
        <Card key={plan.id} className="glass-effect">
          <CardHeader>
            <CardTitle>{plan.goal}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <Progress value={calculateProgress(plan.tasks)} className="flex-grow mr-4" />
              <span className="text-sm font-medium">{Math.round(calculateProgress(plan.tasks))}% Complete</span>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Plan Details</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    <p><strong>Resources:</strong> {plan.resources}</p>
                    <p><strong>Constraints:</strong> {plan.constraints}</p>
                    <p><strong>Generated Plan:</strong> {plan.plan}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tasks">
                <AccordionTrigger>Tasks</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-4 mb-4">
                    {plan.tasks.map(task => (
                      <li key={task.id} className="bg-gray-800 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="flex items-center">
                            <Checkbox
                              checked={task.status === 'completed'}
                              onCheckedChange={(checked) =>
                                updateTaskStatus(plan.id, task.id, checked ? 'completed' : 'pending')
                              }
                              className="mr-2"
                            />
                            {task.title}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              task.priority === 'high' ? 'destructive' :
                              task.priority === 'medium' ? 'default' : 'secondary'
                            }>
                              {task.priority}
                            </Badge>
                            <Badge variant={
                              task.status === 'completed' ? 'default' :
                              task.status === 'in-progress' ? 'secondary' : 'outline'
                            }>
                              {task.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTaskStatus(plan.id, task.id, 'in-progress')}
                            disabled={task.status === 'in-progress' || task.status === 'completed'}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTaskStatus(plan.id, task.id, 'completed')}
                            disabled={task.status === 'completed'}
                          >
                            Complete
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Add a new task"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    />
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                      className="bg-gray-800 text-white rounded-md px-2 py-1"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                    <Button onClick={() => addTask(plan.id)}>
                      <Plus className="h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

