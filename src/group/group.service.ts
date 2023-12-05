import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { GroupCreateDto, GroupDto } from './category.dto'
import { returnGroupObject } from './return-group.object'

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.group.findMany({
      select: returnGroupObject
    })
  }

  async byId(id: number) {
    return await this.getGroup(id)
  }

  async byGroup(slug: string) {
    return await this.getGroup(slug)
  }

  async create(dto: GroupCreateDto) {
    const existingGroup = await this.prisma.group.findUnique({
      where: {
        name: dto.name
      }
    })

    if (existingGroup) {
      throw new NotFoundException('Group with this name already exists')
    }

    return this.prisma.group.create({
      data: dto
    })
  }

  async update(id: number, dto: GroupDto) {
    const existingGroup = await this.prisma.group.findUnique({
      where: {
        name: dto.name
      }
    })

    if (existingGroup) {
      throw new NotFoundException('Name is the same as current')
    }

    return this.prisma.group.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        slug: generateSlug(dto.name)
      }
    })
  }

  async delete(id: number) {
    return this.prisma.group.delete({ where: { id } })
  }

  private async getGroup(type: any) {
    const condition = isNaN(type) ? { slug: type } : { id: type }

    const group = await this.prisma.group.findUnique({
      where: condition,
      select: returnGroupObject
    })

    if (!group) {
      throw new NotFoundException('Category not found')
    }

    return group
  }
}
