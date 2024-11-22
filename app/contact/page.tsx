'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, CheckCircle, Mail, Phone, MapPin } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement form submission logic
    await new Promise(resolve => setTimeout(resolve, 1500)) // Simulating API call
    console.log('Form submitted:', formData)
    setIsLoading(false)
    setIsSubmitted(true)
    // Reset form after submission
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Contact Us</h1>
      <p className="text-xl text-gray-400 mb-8">
        Have questions, feedback, or need support? We'd love to hear from you. Fill out the form below, 
        and our team will get back to you as soon as possible.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-gray-800">
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>Send us a message and we'll respond within 24 hours.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-gray-700"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full button-glow" disabled={isLoading || isSubmitted}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Message Sent
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="space-y-6">
          <ContactInfo
            icon={Mail}
            title="Email Us"
            content="support@plansmartai.com"
            link="mailto:support@plansmartai.com"
          />
          <ContactInfo
            icon={Phone}
            title="Call Us"
            content="+1 (555) 123-4567"
            link="tel:+15551234567"
          />
          <ContactInfo
            icon={MapPin}
            title="Visit Us"
            content="123 AI Street, Tech City, TC 12345"
            link="https://maps.google.com"
          />
          <FAQSection />
        </div>
      </div>
    </div>
  )
}

function ContactInfo({ icon: Icon, title, content, link }: { icon: React.ElementType, title: string, content: string, link: string }) {
  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <div className="flex items-center">
          <Icon className="h-6 w-6 mr-2 text-blue-400" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <a href={link} className="text-gray-300 hover:text-blue-400 transition-colors">
          {content}
        </a>
      </CardContent>
    </Card>
  )
}

function FAQSection() {
  const faqs = [
    {
      question: "How does PlanSmart AI work?",
      answer: "PlanSmart AI uses advanced machine learning algorithms to analyze your goals, resources, and constraints. It then generates a personalized plan tailored to your specific needs."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. All your information is encrypted and stored securely. We never share your data with third parties."
    },
    {
      question: "Can I use PlanSmart AI for team projects?",
      answer: "PlanSmart AI has collaborative features that allow you to share plans, assign tasks, and track progress with your team members."
    }
  ]

  return (
    <Card className="bg-gray-800">
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {faqs.map((faq, index) => (
            <li key={index}>
              <h3 className="font-semibold text-gray-200">{faq.question}</h3>
              <p className="text-gray-400 text-sm">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

