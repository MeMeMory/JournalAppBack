import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UserDto {
  @IsEmail()
  email: string

  @IsString()
  password: string

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surName: string

  @IsOptional()
  groupId: number

  isAdmin: boolean
}

export class UserUpdateDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  surName: string

  @IsOptional()
  groupId: number
}
