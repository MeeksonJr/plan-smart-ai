import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Zap, Shield, Sparkles, Users, BarChart } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 gradient-text">About PlanSmart AI</h1>
      <p className="text-xl text-gray-400 mb-8">
        PlanSmart AI is revolutionizing the way individuals and businesses approach planning and decision-making. 
        Our cutting-edge AI technology provides personalized, actionable plans that optimize productivity and efficiency.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <FeatureCard
          icon={Brain}
          title="AI-Powered Planning"
          description="Our advanced algorithms analyze your goals, resources, and constraints to generate tailored plans that maximize your chances of success."
        />
        <FeatureCard
          icon={Zap}
          title="Real-Time Adaptability"
          description="PlanSmart AI continuously monitors your progress and adjusts your plan in real-time, ensuring you stay on track even as circumstances change."
        />
        <FeatureCard
          icon={Shield}
          title="Data Security"
          description="We prioritize the security and privacy of your data, employing state-of-the-art encryption and following strict data protection guidelines."
        />
        <FeatureCard
          icon={Sparkles}
          title="Continuous Improvement"
          description="Our AI learns from each interaction, constantly improving its planning capabilities to provide increasingly effective solutions."
        />
        <FeatureCard
          icon={Users}
          title="Collaborative Features"
          description="Easily share plans with team members, assign tasks, and track progress collectively for improved teamwork and accountability."
        />
        <FeatureCard
          icon={BarChart}
          title="Advanced Analytics"
          description="Gain valuable insights into your planning and execution processes with our comprehensive analytics and reporting tools."
        />
      </div>
      <OurStory />
      <OurTeam />
    </div>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  return (
    <Card className="bg-gray-800 card-hover">
      <CardHeader>
        <Icon className="h-8 w-8 mb-2 text-blue-400" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}

function OurStory() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-4 gradient-text">Our Story</h2>
      <p className="text-gray-300 mb-4">
        PlanSmart AI was born out of a simple yet powerful idea: to make sophisticated planning accessible to everyone. 
        Our founders, a team of AI researchers and experienced project managers, recognized the potential of artificial 
        intelligence to revolutionize the way we approach goal-setting and execution.
      </p>
      <p className="text-gray-300 mb-4">
        Since our inception in 2020, we've been on a mission to empower individuals and organizations with the tools 
        they need to turn their visions into reality. Through continuous innovation and a deep commitment to our users, 
        we've grown from a small startup to a leading force in AI-powered planning solutions.
      </p>
      <p className="text-gray-300">
        Today, PlanSmart AI serves thousands of users worldwide, from entrepreneurs and small businesses to large 
        corporations and non-profit organizations. We're proud of the impact we've made and excited about the future 
        as we continue to push the boundaries of what's possible in AI-assisted planning.
      </p>
    </section>
  )
}

function OurTeam() {
  const teamMembers = [
    { name: "Dr. Emily Chen", role: "Founder & CEO", image: "/placeholder.svg?height=100&width=100" },
    { name: "Michael Rodriguez", role: "CTO", image: "/placeholder.svg?height=100&width=100" },
    { name: "Sarah Johnson", role: "Head of Product", image: "/placeholder.svg?height=100&width=100" },
    { name: "David Kim", role: "Lead AI Researcher", image: "/placeholder.svg?height=100&width=100" },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6 gradient-text">Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="bg-gray-800 text-center p-4">
            <Image
              src={member.image}
              alt={member.name}
              width={100}
              height={100}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className="text-gray-400">{member.role}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}

