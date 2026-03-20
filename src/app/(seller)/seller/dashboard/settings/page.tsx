import { Metadata } from "next";
import { requireSeller, getSession } from "@/lib/auth-utils";
import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Store,
  User,
  Bell,
  CreditCard,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Settings — Seller Dashboard — AMAIA",
};

export default async function SellerSettingsPage() {
  await requireSeller();
  const session = await getSession();
  if (!session?.user) return null;

  const [profile, user] = await Promise.all([
    db.sellerProfile.findUnique({
      where: { userId: session.user.id },
    }),
    db.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, name: true, email: true, image: true },
    }),
  ]);

  if (!profile || !user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your store and account settings
        </p>
      </div>

      {/* Store Profile */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            <div>
              <CardTitle>Store Profile</CardTitle>
              <CardDescription>
                Public information about your store
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                defaultValue={profile.storeName}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Store URL</Label>
              <div className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">amaia.com/</span>
                <Input
                  id="slug"
                  defaultValue={profile.slug}
                  disabled
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue={profile.bio ?? ""}
              placeholder="Tell buyers about yourself and your services..."
              rows={4}
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Primary Category</Label>
            <Input
              id="category"
              defaultValue={profile.primaryCategory ?? ""}
              placeholder="e.g., Web Development, Graphic Design"
              disabled
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Store profile editing is coming soon. Contact support to make changes.
          </p>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <div>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Your personal account information
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue={user.email} disabled />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="flex items-center gap-3">
              <Input
                type="password"
                value="••••••••"
                disabled
                className="max-w-xs"
              />
              <Button variant="outline" size="sm" disabled>
                Change Password
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Password management is coming soon.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <div>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you receive
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: "order_updates",
                label: "Order Updates",
                description: "Get notified when an order status changes",
              },
              {
                id: "new_messages",
                label: "New Messages",
                description: "Receive notifications for buyer messages",
              },
              {
                id: "new_reviews",
                label: "New Reviews",
                description: "Get notified when you receive a review",
              },
              {
                id: "payout_updates",
                label: "Payout Updates",
                description: "Notifications about payouts and earnings",
              },
              {
                id: "marketing",
                label: "Marketing & Tips",
                description: "Seller tips, platform updates, and promotions",
              },
            ].map((pref) => (
              <div
                key={pref.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="text-sm font-medium">{pref.label}</p>
                  <p className="text-sm text-muted-foreground">
                    {pref.description}
                  </p>
                </div>
                <div className="flex h-5 w-9 cursor-not-allowed items-center rounded-full bg-primary p-0.5">
                  <div className="h-4 w-4 translate-x-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Notification preferences editing is coming soon.
          </p>
        </CardContent>
      </Card>

      {/* Stripe Connect */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <div>
              <CardTitle>Payment Setup</CardTitle>
              <CardDescription>
                Connect your Stripe account to receive payouts
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {profile.stripeOnboarded ? (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/30">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                )}
                <div>
                  <p className="font-medium">Stripe Connect</p>
                  <p className="text-sm text-muted-foreground">
                    {profile.stripeOnboarded
                      ? "Your account is connected and ready to receive payments"
                      : "Connect your Stripe account to start receiving payments"}
                  </p>
                </div>
              </div>
              {profile.stripeOnboarded ? (
                <Badge
                  variant="outline"
                  className="border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-900/30 dark:text-green-400"
                >
                  Connected
                </Badge>
              ) : (
                <Button size="sm" disabled>
                  Connect Stripe
                </Button>
              )}
            </div>
          </div>
          {!profile.stripeOnboarded && (
            <p className="mt-3 text-sm text-muted-foreground">
              Stripe Connect integration is coming soon. You&apos;ll be able to
              connect your bank account to receive payouts directly.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
