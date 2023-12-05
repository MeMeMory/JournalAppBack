import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { GroupCreateDto, GroupDto } from './category.dto'
import { GroupService } from './group.service'

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  async getAll() {
    return this.groupService.getAll()
  }

  @Get('by-category/:slug')
  async getByCategory(@Param('slug') slug: string) {
    return this.groupService.byGroup(slug)
  }

  @Get(':id')
  @Auth()
  async getById(@Param('id') id: string) {
    return this.groupService.byId(+id)
  }

  @HttpCode(200)
  @Auth()
  @Post()
  async create(@Body() dto: GroupCreateDto) {
    return this.groupService.create(dto)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: GroupDto) {
    return this.groupService.update(+id, dto)
  }

  @Auth()
  @HttpCode(200)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.groupService.delete(+id)
  }
}
