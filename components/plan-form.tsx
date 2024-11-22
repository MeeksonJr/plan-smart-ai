'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PlanFormProps {
  onStepComplete: (step: number) => void;
}

export function PlanForm({ onStepComplete }: PlanFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    goal: '',
    resources: '',
    constraints: '',
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
      onStepComplete(currentStep);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        await savePlan(data.plan);
        toast({
          title: 'Plan created successfully',
          description: 'Your plan has been generated and saved.',
        });
        router.push('/dashboard');
      } else {
        throw new Error(data.error || 'Failed to generate plan');
      }
    } catch (error) {
      console.error('Error generating plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const savePlan = async (plan: string) => {
    try {
      const response = await fetch('/api/save-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, plan }),
      });
      if (!response.ok) {
        throw new Error('Failed to save plan');
      }
    } catch (error) {
      console.error('Error saving plan:', error);
      throw error;
    }
  };

  const steps = [
    { title: 'Define Your Goal', field: 'goal', placeholder: 'Enter your primary goal' },
    { title: 'Identify Resources', field: 'resources', placeholder: 'List your available resources (e.g., time, budget, skills)' },
    { title: 'Consider Constraints', field: 'constraints', placeholder: 'Describe any limitations or constraints' },
  ];

  return (
    <Card className="bg-gray-800/50 neon-border">
      <CardHeader>
        <CardTitle className="gradient-text">{steps[currentStep].title}</CardTitle>
        <CardDescription>Step {currentStep + 1} of 3</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={steps[currentStep].field}>{steps[currentStep].title}</Label>
          {steps[currentStep].field === 'goal' ? (
            <Input
              id={steps[currentStep].field}
              name={steps[currentStep].field}
              value={formData[steps[currentStep].field]}
              onChange={handleChange}
              placeholder={steps[currentStep].placeholder}
              required
              className="bg-gray-700"
            />
          ) : (
            <Textarea
              id={steps[currentStep].field}
              name={steps[currentStep].field}
              value={formData[steps[currentStep].field]}
              onChange={handleChange}
              placeholder={steps[currentStep].placeholder}
              required
              className="bg-gray-700"
            />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleNext}
          className="w-full button-glow"
          disabled={isLoading || !formData[steps[currentStep].field]}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Plan...
            </>
          ) : currentStep === 2 ? 'Generate Plan' : 'Next Step'}
        </Button>
      </CardFooter>
    </Card>
  );
}
