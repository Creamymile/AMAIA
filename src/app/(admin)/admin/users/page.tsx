import { requireAdmin } from "@/lib/auth-utils";
import Link from "next/link";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pagination } from "@/components/shared/pagination";
import { formatDate, getInitials } from "@/lib/utils";
import { getAdminUsers } from "@/modules/admin/services/admin.service";

const roleVariant: Record<string, "default" | "secondary" | "outline"> = {
  ADMIN: "default",
  SELLER: "secondary",
  BUYER: "outline",
};

interface UsersPageProps {
  searchParams: Promise<{ page?: string; role?: string; q?: string }>;
}

export default async function AdminUsersPage({ searchParams }: UsersPageProps) {
  await requireAdmin();
  const sp = await searchParams;

  const results = await getAdminUsers({
    page: sp.page ? Number(sp.page) : 1,
    role: sp.role,
    search: sp.q,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage platform users</p>
      </div>

      {/* Role Filters */}
      <div className="flex gap-2">
        {[
          { value: "", label: "All" },
          { value: "BUYER", label: "Buyers" },
          { value: "SELLER", label: "Sellers" },
          { value: "ADMIN", label: "Admins" },
        ].map((tab) => (
          <Button
            key={tab.value}
            variant={(sp.role || "") === tab.value ? "default" : "outline"}
            size="sm"
            asChild
          >
            <Link href={`/admin/users${tab.value ? `?role=${tab.value}` : ""}`}>
              {tab.label}
            </Link>
          </Button>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.items.length > 0 ? (
                results.items.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.image ?? undefined} />
                          <AvatarFallback className="text-xs">
                            {getInitials(user.name ?? "?")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{user.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={roleVariant[user.role] ?? "outline"}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "ACTIVE" ? "outline" : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user._count.orders}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    <Users className="mx-auto h-8 w-8 text-muted-foreground/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      No users found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Pagination currentPage={results.page} totalPages={results.totalPages} />
    </div>
  );
}
