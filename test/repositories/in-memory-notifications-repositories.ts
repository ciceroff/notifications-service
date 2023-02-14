import { NotificationsRepository } from '../../src/app/repositories/notifications-repository';
import { Notification } from '../../src/app/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  async findById(notificationId: string): Promise<Notification> {
    throw new Error('Method not implemented.');
  }
  async save(notification: Notification): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
