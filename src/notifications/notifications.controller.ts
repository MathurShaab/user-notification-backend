
import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationLog } from './schemas/notification-log.schema';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async sendNotification(@Body() notificationDto: Partial<NotificationLog>) {
    return this.notificationsService.sendNotification(notificationDto);
  }

  @Get('logs/:userId')
  async getUserLogs(@Param('userId') userId: string) {
    return this.notificationsService.getUserLogs(userId);
  }

  @Get('stats')
  async getStats() {
    return this.notificationsService.getStats();
  }
}
