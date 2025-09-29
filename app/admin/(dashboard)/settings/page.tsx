import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTitle>Coming soon</AlertTitle>
            <AlertDescription>Settings configuration will be available here.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
