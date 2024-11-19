
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserPreferencesService } from './preferences.service';
import { UserPreferencesController } from './preferences.controller';
import { UserPreference, UserPreferenceSchema } from './schemas/user-preference.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserPreference.name, schema: UserPreferenceSchema }]),
  ],
  controllers: [UserPreferencesController],
  providers: [UserPreferencesService],
})
export class PreferencesModule {}
