import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Download, Package, FileText, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getBuyerDownloads } from "@/modules/orders/services/buyer-order.service";

export default async function DownloadsPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const downloads = await getBuyerDownloads(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Downloads</h1>
        <p className="text-muted-foreground">
          Access your purchased digital products
        </p>
      </div>

      {downloads.length > 0 ? (
        <div className="space-y-4">
          {downloads.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex items-start gap-4 p-4">
                {/* Thumbnail */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {item.listing.images[0]?.url ? (
                    <Image
                      src={item.listing.images[0].url}
                      alt={item.listing.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold">
                    <Link
                      href={`/listing/${item.listing.slug}`}
                      className="hover:underline"
                    >
                      {item.listing.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Order #{item.order.orderNumber} &middot;{" "}
                    {formatDate(item.order.createdAt)}
                  </p>

                  {/* Files */}
                  <div className="mt-3 space-y-2">
                    {item.listing.productFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="text-sm truncate">
                            {file.fileName}
                          </span>
                          <Badge variant="outline" className="text-[10px] shrink-0">
                            {(Number(file.fileSize) / 1024).toFixed(0)} KB
                          </Badge>
                        </div>
                        <Button variant="ghost" size="sm" className="shrink-0 ml-2">
                          <Download className="h-3.5 w-3.5 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Download className="h-10 w-10 text-muted-foreground/40" />
            <p className="mt-4 text-lg font-medium text-muted-foreground">
              No downloads yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Purchase digital products to see them here
            </p>
            <Button className="mt-4" asChild>
              <Link href="/explore?type=PRODUCT">
                Browse Products
                <ExternalLink className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
