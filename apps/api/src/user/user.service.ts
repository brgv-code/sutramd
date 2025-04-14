import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/base-user.dto';

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  ];

  async findOne(id: number): Promise<UserDto | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findAll(): Promise<UserDto[]> {
    return this.users;
  }

  async create(userDto: UserDto): Promise<UserDto> {
    const newUser = { ...userDto, id: this.users.length + 1 };
    this.users.push(newUser);
    return newUser;
  }
}
