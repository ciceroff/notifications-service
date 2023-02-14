import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotification } from 'src/app/use-cases/cancel-notification';
import { CountRecipientNotification } from 'src/app/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from 'src/app/use-cases/get-recipient-notifications';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('from/:id')
  async getFromRecipient(@Param('id') id: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId: id,
    });

    return notifications;
  }

  @Get('count/from/:id')
  async countFromRecipient(@Param('id') id: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: id,
    });

    return count;
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId: recipientId,
      content: content,
      category: category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
