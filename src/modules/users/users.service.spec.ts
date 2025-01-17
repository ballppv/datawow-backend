import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: typeof mockRepository;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = { username: 'test-user' };
      const user = { id: 1, username: 'test-user', isActive: true };
      repository.create.mockReturnValue(user);
      repository.save.mockResolvedValue(user);

      const result = await service.create(createUserDto);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: 1, username: 'test-user', isActive: true }];
      repository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const user = { id: 1, username: 'test-user', isActive: true };
      repository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(user);
    });

    it('should throw an error if user not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrowError(
        'User with ID 1 not found',
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const user = { id: 1, username: 'test-user', isActive: true };
      const updateUserDto = { username: 'updated-user' };

      repository.findOne.mockResolvedValue(user);
      repository.save.mockResolvedValue({ ...user, ...updateUserDto });

      const result = await service.update(1, updateUserDto);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({
        ...user,
        ...updateUserDto,
      });
      expect(result).toEqual({ ...user, ...updateUserDto });
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = { id: 1, username: 'test-user', isActive: true };
      repository.findOne.mockResolvedValue(user);
      repository.remove.mockResolvedValue(user);
      console.log(user);

      const result = await service.remove(1);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.remove).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });
  });
});
