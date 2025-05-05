import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { UserTestDTO } from './dtoTest/UserTestDTO';
import { SignUpTestDTO } from './dtoTest/SignUpTestDTO';
import { UserUpdatedNameTestDTO } from './dtoTest/UserUpdatedNameTestDTO';
import { UserUpdatedEmailTestDTO } from './dtoTest/UserUpdatedEmailTestDTO';
import { UserUpdatedPasswordTestDTO } from './dtoTest/UserUpdatedPasswordTestDTO';


describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterEach(() => {
    jest.resetAllMocks(); 
  });


  
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  
  it('signUp => Should create a new user and return its data', async () => {
    // arrange
    const signUpData = new SignUpTestDTO();
    const expected_result = new UserTestDTO()
    jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('randomSalt');
    jest.spyOn(bcrypt, 'hash').mockResolvedValue(expected_result.password);
    jest.spyOn(mockUserRepository, 'create').mockReturnValue(expected_result);
    jest.spyOn(mockUserRepository, 'save').mockResolvedValue(expected_result);

    // act
    const actual_result = await service.signUp(signUpData);

    // assert
    expect(mockUserRepository.create).toHaveBeenCalledWith(signUpData);
    expect(mockUserRepository.save).toHaveBeenCalledWith(expected_result);
    expect(actual_result).toEqual(expected_result);

  });


  it('findByEmail => Should return a user with certain email', async () => {
    const email = "ann@gmail.com"
    const expected_result = new UserTestDTO()
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(expected_result);

    const actual_result = await service.findByEmail(email);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email } });
    expect(actual_result).toEqual(expected_result);
  });


  it('findById => Should return a user with certain id', async () => {
    const id= "60c2c881-5d12-4cbe-95bd-ec7fc8240162"
    const expected_result = new UserTestDTO()
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(expected_result);

    const actual_result = await service.findById(id);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id } });
    expect(actual_result).toEqual(expected_result);
  });


  it('findAll => Should return all users', async () => {
    const expected_result = [new UserTestDTO()];
    jest.spyOn(mockUserRepository, 'find').mockResolvedValue(expected_result);
  
    const actualResult = await service.findAll();
  
    expect(mockUserRepository.find).toHaveBeenCalled();
    expect(actualResult).toEqual(expected_result);
  });
  

  it('deleteUser => Should delete the user and return deleted user', async () => {
    const deletedUser = new UserTestDTO()
    const expected_result = new UserTestDTO()
    jest.spyOn(service, 'findById').mockResolvedValue(deletedUser);
    jest.spyOn(mockUserRepository, 'delete').mockResolvedValue(expected_result);
      
    const actual_result = await service.deleteUser(deletedUser);
      
    expect(service.findById).toHaveBeenCalledWith(deletedUser.id);
    expect(mockUserRepository.delete).toHaveBeenCalledWith(deletedUser.id);
    expect(actual_result).toEqual(expected_result);
  });


  it('deleteUser => Should throw RpcException user not found', async () => {
    // arrange
    const deletedUser = new UserTestDTO()
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    // act + assert
    await expect(service.deleteUser(deletedUser)).rejects.toThrow(RpcException);
    expect(mockUserRepository.delete).not.toHaveBeenCalled();
  });


  it('updateUser => Should throw RpcException user not found', async () => {
    const id = "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
    const updateData = { username: "Ann_Smith"}
    jest.spyOn(service, 'findById').mockResolvedValue(null);

    await expect(service.updateUser(id, updateData)).rejects.toThrow(RpcException);
    expect(service.findById).toHaveBeenCalledWith(id);
    expect(mockUserRepository.save).not.toHaveBeenCalled();
  });


  it('updateUser => Should update user`s name and return updated user', async () => {
    const id = "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
    const updateData = {username: "Ann_Smith"}
    const existingUser= new UserTestDTO()
    const expected_result = new UserUpdatedNameTestDTO();
    jest.spyOn(service, 'findById').mockResolvedValue(existingUser);
    jest.spyOn(mockUserRepository, 'save').mockResolvedValue(expected_result);

    const actual_result = await service.updateUser(id, updateData);

    expect(service.findById).toHaveBeenCalledWith(id);
    expect(mockUserRepository.save).toHaveBeenCalledWith(expected_result);
    expect(actual_result).toEqual(expected_result);

  });


  it('updateUser => Should update user`s email and return updated user', async () => {
        const id = "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
        const updateData = {email: "ann_smith@gmail.com"}
        const existingUser= new UserTestDTO()
        const expected_result = new UserUpdatedEmailTestDTO();
        jest.spyOn(service, 'findById').mockResolvedValue(existingUser);
        jest.spyOn(mockUserRepository, 'save').mockResolvedValue(expected_result);

        const actual_result = await service.updateUser(id, updateData);

        expect(service.findById).toHaveBeenCalledWith(id);
        expect(mockUserRepository.save).toHaveBeenCalledWith(expected_result);
        expect(actual_result).toEqual(expected_result);
  });


  it('updateUser => Should update user`s password and return updated user', async () => {
      const id = "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
      const updateData = {password: "annsmith"}
      const existingUser= new UserTestDTO()
      const expected_result = new UserUpdatedPasswordTestDTO();
      jest.spyOn(bcrypt, 'genSalt').mockResolvedValue('randomSalt');
      jest.spyOn(bcrypt, 'hash').mockResolvedValue(expected_result.password);
      jest.spyOn(service, 'findById').mockResolvedValue(existingUser);
      jest.spyOn(mockUserRepository, 'save').mockResolvedValue(expected_result);
  
      const actual_result = await service.updateUser(id, updateData);
    
      expect(service.findById).toHaveBeenCalledWith(id);
      expect(mockUserRepository.save).toHaveBeenCalledWith(expected_result);
      expect(actual_result).toEqual(expected_result);
  });
});
