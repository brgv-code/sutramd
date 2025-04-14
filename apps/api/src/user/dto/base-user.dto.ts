import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  id: number;
  name: string;
  email: string;

  constructor(partial?: Partial<UserDto>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}
export class BaseUser {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  confirmPassword?: string;
  @ApiProperty()
  designation?: string;
}
