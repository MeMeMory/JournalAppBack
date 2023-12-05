import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsOptional()
  groupId: number

  isAdmin: boolean
}
