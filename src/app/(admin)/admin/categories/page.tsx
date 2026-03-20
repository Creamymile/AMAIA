import { requireAdmin } from "@/lib/auth-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight capitalize">
          categories
        </h1>
        <p className="text-muted-foreground">Coming soon</p>
      </div>
      <Card>
        <CardContent className="flex items-center justify-center py-16">
          <p className="text-muted-foreground">
            This section is under development
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
