import { IsString } from 'class-validator'

export class GroupDto {
  @IsString()
  name: string
}

export class GroupCreateDto {
  @IsString()
  name: string

  @IsString()
  slug: string
}
