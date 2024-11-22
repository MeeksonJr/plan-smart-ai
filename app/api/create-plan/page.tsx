'use client'

import { useState } from 'react'
import { PlanForm } from '@/components/plan-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Lightbulb, Target, Cog } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CreatePlan() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { title: "Define Your Goal", description: "Clearly state what you want to achieve. Be specific and measurable." },
    { title: "Identify Resources", description: "List the assets, skills, and support you have available to reach your goal." },
    { title: "Consider Constraints", description: "Recognize any limitations or challenges that might affect your plan." },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Create Your Plan
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-400 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Let our AI assist you in creating a personalized plan tailored to your goals, resources, and constraints. 
        Follow the steps below to get started on your journey to success.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {steps.map((step, index) => (
          <PlanningStep
            key={index}
            icon={index === 0 ? Lightbulb : index === 1 ? Target : Cog}
            title={step.title}
            description={step.description}
            isActive={currentStep === index}
            onClick={() => setCurrentStep(index)}
          />
        ))}
      </div>
      <PlanForm onStepComplete={(step) => setCurrentStep(Math.min(step + 1, steps.length - 1))} />
      <PlanningTips />
    </div>
  )
}

function PlanningStep({ icon: Icon, title, description, isActive, onClick }) {
  return (
    <Card 
      className={`bg-gray-800/50 p-4 rounded-lg cursor-pointer transition-all duration-300 ${isActive ? 'neon-border' : ''}`}
      onClick={onClick}
    >
      <CardHeader>
        <Icon className={`h-8 w-8 mb-2 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
        <CardTitle className={`text-lg font-semibold ${isActive ? 'gradient-text' : ''}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}

function PlanningTips() {
  const tips = [
    "Break down your main goal into smaller, manageable tasks",
    "Set realistic deadlines for each task",
    "Prioritize tasks based on importance and urgency",
    "Regularly review and adjust your plan as needed",
    "Celebrate small victories along the way to stay motivated",
  ]

  return (
    <Card className="mt-12 bg-gray-800/50 p-6 rounded-lg neon-border">
      <CardHeader>
        <CardTitle className="text-2xl font-bold mb-4 gradient-text">Planning Tips</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-gray-300">
          {tips.map((tip, index) => (
            <motion.li 
              key={index}
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
            >
              <span className="text-blue-400 mr-2">•</span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

