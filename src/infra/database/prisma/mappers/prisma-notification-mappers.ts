import { Notification } from 'src/app/entities/notification';
import { Notification as RawNotification } from '@prisma/client';
import { Content } from 'src/app/entities/content';
export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
        recipientId: raw.recipientId,
      },
      raw.id,
    );
  }
}
