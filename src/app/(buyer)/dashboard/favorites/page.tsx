import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

export default async function Page() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">favorites</h1>
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
