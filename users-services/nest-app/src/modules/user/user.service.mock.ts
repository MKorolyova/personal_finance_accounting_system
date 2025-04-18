export const mockUserService = {
    register: (createUserDto) => {
      return {
        id: 'mocked-id',
        name: createUserDto.name,
        email: createUserDto.email,
      };
    },
    login: (loginDto) => {
      if (loginDto.email === 'mykTester228@gmail.com' && loginDto.password === '123454321') {
        return { id: 'mocked-id', name: 'MykTester' };
      }
      throw new Error('Неправильний email або пароль');
    },
    hello: () => {
      return 'Mocked hello response';
    },
  };
  