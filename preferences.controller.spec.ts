
import { Test, TestingModule } from '@nestjs/testing';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';

describe('PreferencesController', () => {
  let controller: PreferencesController;
  let service: PreferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PreferencesController],
      providers: [
        {
          provide: PreferencesService,
          useValue: {
            // Mock service methods
            createPreference: jest.fn(),
            getPreference: jest.fn(),
            updatePreference: jest.fn(),
            deletePreference: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PreferencesController>(PreferencesController);
    service = module.get<PreferencesService>(PreferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a new preference', async () => {
    const mockPreference = {
      userId: 'user123',
      email: 'user@example.com',
      preferences: {
        marketing: true,
        newsletter: false,
        updates: true,
        frequency: 'weekly',
        channels: {
          email: true,
          sms: false,
          push: true,
        },
      },
      timezone: 'America/New_York',
    };
    jest.spyOn(service, 'createPreference').mockResolvedValue(mockPreference);

    const result = await controller.createPreference(mockPreference);
    expect(result).toEqual(mockPreference);
    expect(service.createPreference).toHaveBeenCalledWith(mockPreference);
  });
});
