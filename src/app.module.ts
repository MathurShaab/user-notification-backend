import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PreferencesModule } from './preferences/preferences.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PreferencesModule,
    NotificationsModule,
  ],
})
export class AppModule {}
