"use server";

import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-utils";
import type { ActionResult } from "@/lib/errors";
import { handleActionError } from "@/lib/errors";

export async function sendMessageAction(
  orderItemId: string,
  body: string
): Promise<ActionResult<{ id: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    if (!body.trim()) {
      return { success: false, error: "Message cannot be empty" };
    }

    // Verify user has access to this order item
    const orderItem = await db.orderItem.findFirst({
      where: {
        id: orderItemId,
        OR: [
          { order: { buyerId: userId } },
          { seller: { userId } },
        ],
      },
    });

    if (!orderItem) {
      return { success: false, error: "Order not found" };
    }

    const message = await db.orderMessage.create({
      data: {
        orderItemId,
        senderId: userId,
        body: body.trim(),
      },
    });

    return { success: true, data: { id: message.id } };
  } catch (error) {
    return handleActionError(error);
  }
}

export async function markOrderCompletedAction(
  orderId: string
): Promise<ActionResult<{ status: string }>> {
  try {
    const session = await requireAuth();
    const userId = session.user.id;

    const order = await db.order.findFirst({
      where: { id: orderId, buyerId: userId, status: "DELIVERED" },
    });

    if (!order) {
      return { success: false, error: "Order not found or cannot be completed" };
    }

    await db.$transaction([
      db.order.update({
        where: { id: orderId },
        data: { status: "COMPLETED", completedAt: new Date() },
      }),
      db.orderItem.updateMany({
        where: { orderId, status: "DELIVERED" },
        data: { status: "COMPLETED", completedAt: new Date() },
      }),
    ]);

    return { success: true, data: { status: "COMPLETED" } };
  } catch (error) {
    return handleActionError(error);
  }
}
