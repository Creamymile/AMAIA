import { db } from "@/lib/db";
import type { NotificationType } from "@prisma/client";

export async function getUserNotifications(userId: string, limit = 20) {
  return db.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getUnreadCount(userId: string) {
  return db.notification.count({
    where: { userId, isRead: false },
  });
}

export async function markAsRead(notificationId: string, userId: string) {
  return db.notification.updateMany({
    where: { id: notificationId, userId },
    data: { isRead: true },
  });
}

export async function markAllAsRead(userId: string) {
  return db.notification.updateMany({
    where: { userId, isRead: false },
    data: { isRead: true },
  });
}

export async function createNotification(data: {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
}) {
  return db.notification.create({ data });
}
