import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 gradient-text">Terms of Service</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>1. Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            By accessing SmartPlan AI, you agree to be bound by these terms of service and agree that you are responsible for compliance with any applicable local laws.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>2. Use License</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-4 text-gray-300">
            <li>
              Permission is granted to temporarily use SmartPlan AI for personal, non-commercial transitory viewing only.
            </li>
            <li>
              This is the grant of a license, not a transfer of title, and under this license you may not:
              <ul className="list-circle pl-6 mt-2 space-y-2">
                <li>modify or copy the materials;</li>
                <li>use the materials for any commercial purpose;</li>
                <li>attempt to decompile or reverse engineer any software contained in SmartPlan AI;</li>
                <li>remove any copyright or other proprietary notations from the materials;</li>
              </ul>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>3. Disclaimer</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            The materials on SmartPlan AI are provided on an 'as is' basis. SmartPlan AI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>4. Limitations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            In no event shall SmartPlan AI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use SmartPlan AI.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>5. Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300">
            Your use of SmartPlan AI is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

