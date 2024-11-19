import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UserPreferencesService } from './preferences.service';
import { UserPreference } from './schemas/user-preference.schema';

@Controller('api/preferences')
export class UserPreferencesController {
  constructor(private readonly userPreferencesService: UserPreferencesService) {}

  @Post()
  async create(@Body() preferencesDto: Partial<UserPreference>) {
    return this.userPreferencesService.create(preferencesDto);
  }

  @Get(':userId')
  async findOne(@Param('userId') userId: string) {
    return this.userPreferencesService.findOne(userId);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateDto: Partial<UserPreference>) {
    return this.userPreferencesService.update(userId, updateDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return this.userPreferencesService.delete(userId);
  }
}

