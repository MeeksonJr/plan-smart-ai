'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield, Sparkles, BarChart, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Home() {
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimationComplete(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <motion.h1 
        className="text-5xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to PlanSmart AI
      </motion.h1>
      <motion.p 
        className="text-xl mb-8 max-w-2xl text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Revolutionize your planning with AI-powered insights and automation. Achieve your goals faster and smarter with personalized strategies tailored to your unique needs.
      </motion.p>
      <motion.div 
        className="space-x-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <Button asChild size="lg" className="button-glow neon-border">
          <Link href="/create-plan">
            Create a Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="neon-border">
          <Link href="/about">Learn More</Link>
        </Button>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl">
        {featureData.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} animationComplete={animationComplete} />
        ))}
      </div>
      <TestimonialSection />
    </div>
  )
}

const featureData = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate comprehensive plans in seconds with our advanced AI technology."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is encrypted and protected. We prioritize your privacy and security."
  },
  {
    icon: Sparkles,
    title: "Continuous Improvement",
    description: "Our AI learns and adapts, providing increasingly personalized and effective plans."
  },
  {
    icon: BarChart,
    title: "Data-Driven Insights",
    description: "Leverage powerful analytics to make informed decisions and optimize your strategies."
  },
  {
    icon: Users,
    title: "Collaborative Planning",
    description: "Easily share and collaborate on plans with team members or stakeholders."
  },
  {
    icon: Clock,
    title: "Time-Saving Automation",
    description: "Automate repetitive tasks and focus on what truly matters to achieve your goals."
  }
]

function FeatureCard({ icon: Icon, title, description, index, animationComplete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: animationComplete ? 1 : 0, y: animationComplete ? 0 : 50 }}
      transition={{ delay: 1.5 + index * 0.1, duration: 0.5 }}
    >
      <Card className="bg-gray-800/50 p-6 rounded-lg card-hover neon-border h-full">
        <CardHeader>
          <Icon className="h-12 w-12 mb-4 text-blue-400 pulse-slow" />
          <CardTitle className="text-xl font-semibold mb-2">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function TestimonialSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Entrepreneur",
      content: "PlanSmart AI has transformed the way I approach my business goals. The personalized plans and insights have been invaluable."
    },
    {
      name: "Michael Chen",
      role: "Project Manager",
      content: "As a project manager, I've found PlanSmart AI to be an indispensable tool for streamlining our planning process and improving team productivity."
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      content: "The data-driven insights from PlanSmart AI have helped us create more effective marketing campaigns and achieve better ROI."
    }
  ]

  return (
    <section className="mt-16 w-full max-w-6xl">
      <motion.h2 
        className="text-3xl font-bold mb-8 gradient-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        What Our Users Say
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
          >
            <Card className="bg-gray-800/50 p-6 rounded-lg neon-border h-full">
              <CardContent>
                <p className="text-gray-300 mb-4">"{testimonial.content}"</p>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.role}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

