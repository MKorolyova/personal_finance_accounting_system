import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserTestDTO } from './dtoTest/UserTestDTO';
import { SignUpTestDTO } from './dtoTest/SignUpTestDTO';
import { UserUpdatedNameTestDTO } from './dtoTest/UserUpdatedNameTestDTO';
import { UserService } from './user.service';


describe('UserController', () => {

  let controller: UserController;

  const mockUserService = {
    signUp: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService, 
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('signUp => Should create a new user and return its data', async() => {
    const signUpData = new SignUpTestDTO();
    const expected_result = new UserTestDTO()
    jest.spyOn(mockUserService, 'signUp').mockReturnValue(expected_result);

    const actual_result = await controller.signUp(signUpData);

    expect(mockUserService.signUp).toHaveBeenCalledWith(signUpData);
    expect(actual_result).toEqual(expected_result);
  });


  it('findAll => Should return all users', async () => {
    const expected_result = [new UserTestDTO()];
    jest.spyOn(mockUserService, 'findAll').mockResolvedValue(expected_result);
  
    const actualResult = await controller.findAll();
  
    expect(mockUserService.findAll).toHaveBeenCalled();
    expect(actualResult).toEqual(expected_result);
  });


  it('findByEmail => Should return a user with certain email', async () => {
    const email = "ann@gmail.com"
    const expected_result = new UserTestDTO()
    jest.spyOn(mockUserService, 'findByEmail').mockReturnValue(expected_result);

    const actual_result = await controller.findByEmail(email);

    expect(mockUserService.findByEmail).toHaveBeenCalledWith( email );
    expect(actual_result).toEqual(expected_result);
  });


  it('findByID => Should return a user with certain id', async () => {
    const id= "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
    const expected_result = new UserTestDTO();
    jest.spyOn(mockUserService, 'findById').mockReturnValue(expected_result);

    const actual_result = await controller.findById(id);

    expect(mockUserService.findById).toHaveBeenCalledWith(id);
    expect(actual_result).toEqual(expected_result);
  });


  it('deleteUser => Should delete the user and return deleted user', async () => {
    const deletedUser = new UserTestDTO()
    const expected_result = new UserTestDTO()
    jest.spyOn(mockUserService, 'deleteUser').mockResolvedValue(expected_result);
      
    const actual_result = await controller.deleteUser(deletedUser);
      
    expect(mockUserService.deleteUser).toHaveBeenCalledWith(deletedUser);
    expect(actual_result).toEqual(expected_result);
  });


  it('updateUser =>  Should update user`s name and return updated user', async () => {
    const id = "60c2c881-5d12-4cbe-95bd-ec7fc8240162";
    const updateData = {username: "Ann_Smith"}
    const existingUser= new UserTestDTO()
    const expected_result = new UserUpdatedNameTestDTO();
    jest.spyOn(mockUserService, 'updateUser').mockResolvedValue(expected_result);

    const actual_result = await controller.updateUser({id, updateData});

    expect(mockUserService.updateUser).toHaveBeenCalledWith(id, updateData);
    expect(actual_result).toEqual(expected_result);
  });
});
