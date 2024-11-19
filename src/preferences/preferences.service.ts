
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserPreference } from './schemas/user-preference.schema';

@Injectable()
export class UserPreferencesService {
  constructor(
    @InjectModel(UserPreference.name) private readonly userModel: Model<UserPreference>,
  ) {}

  async create(preferencesDto: Partial<UserPreference>): Promise<UserPreference> {
    const createdPreference = new this.userModel(preferencesDto);
    return createdPreference.save();
  }

  async findOne(userId: string): Promise<UserPreference> {
    const userPreference = await this.userModel.findOne({ userId }).exec();
    if (!userPreference) {
      throw new NotFoundException('User preference not found');
    }
    return userPreference;
  }

  async update(userId: string, updateDto: Partial<UserPreference>): Promise<UserPreference> {
    const updatedPreference = await this.userModel
      .findOneAndUpdate({ userId }, updateDto, { new: true })
      .exec();
    if (!updatedPreference) {
      throw new NotFoundException('User preference not found');
    }
    return updatedPreference;
  }

  async delete(userId: string): Promise<any> {
    const result = await this.userModel.findOneAndDelete({ userId }).exec();
    if (!result) {
      throw new NotFoundException('User preference not found');
    }
    return result;
  }
}
