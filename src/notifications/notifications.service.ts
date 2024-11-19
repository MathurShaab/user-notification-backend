
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationLog } from './schemas/notification-log.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(NotificationLog.name) private readonly notificationModel: Model<NotificationLog>,
  ) {}

  async sendNotification(notificationDto: Partial<NotificationLog>): Promise<NotificationLog> {
    const createdNotification = new this.notificationModel({
      ...notificationDto,
      status: 'pending',
    });

    try {
      // Simulate sending notification (replace this with real logic)
      createdNotification.status = 'sent';
      createdNotification.sentAt = new Date();
    } catch (error) {
      createdNotification.status = 'failed';
      createdNotification.failureReason = error.message;
    }

    return createdNotification.save();
  }

  async getUserLogs(userId: string) {
    return this.notificationModel.find({ userId }).exec();
  }

  async getStats() {
    return this.notificationModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]).exec();
  }
}
