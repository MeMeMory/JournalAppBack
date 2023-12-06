import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserDto, UserUpdateDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  @HttpCode(200)
  async getAll() {
    return this.userService.getAll()
  }

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.profileById(id)
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put('profile')
  async getNewTokens(@CurrentUser('id') id: number, @Body() dto: UserDto) {
    return this.userService.updateProfile(id, dto)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.userService.byId(+id)
  }

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UserUpdateDto) {
    return this.userService.update(+id, dto)
  }
}
