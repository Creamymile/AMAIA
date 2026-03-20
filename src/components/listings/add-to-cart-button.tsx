"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { addToCartAction } from "@/modules/cart/actions/cart.actions";
import { toast } from "sonner";

interface AddToCartButtonProps {
  listingId: string;
  packageId?: string;
  label?: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
}

export function AddToCartButton({
  listingId,
  packageId,
  label = "Add to Cart",
  className,
  size = "lg",
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const result = await addToCartAction(listingId, packageId);
      if (result.success) {
        toast.success("Added to cart", {
          action: {
            label: "View Cart",
            onClick: () => router.push("/cart"),
          },
        });
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Button
      className={className}
      size={size}
      onClick={handleClick}
      disabled={isPending}
    >
      {isPending ? "Adding..." : label}
    </Button>
  );
}
