import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto = { username: 'test-user' };
      const user = { id: 1, username: 'test-user', isActive: true };
      mockService.create.mockResolvedValue(user);

      const result = await controller.create(createUserDto);
      expect(mockService.create).toHaveBeenCalledWith(createUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, username: 'test-user', isActive: true }];
      mockService.findAll.mockResolvedValue(users);

      const result = await controller.findAll();
      expect(mockService.findAll).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const user = { id: 1, username: 'test-user', isActive: true };
      mockService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('1');
      expect(mockService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto = { username: 'updated-user' };
      const user = { id: 1, username: 'updated-user', isActive: true };
      mockService.update.mockResolvedValue(user);

      const result = await controller.update('1', updateUserDto);
      expect(mockService.update).toHaveBeenCalledWith(1, updateUserDto);
      expect(result).toEqual(user);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: 1, username: 'test-user', isActive: true };
      mockService.remove.mockResolvedValue(user);

      const result = await controller.remove('1');
      expect(mockService.remove).toHaveBeenCalledWith(1);
      expect(result).toEqual(user);
    });
  });
});
