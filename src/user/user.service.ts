import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { hash } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { returnUserFullObject, returnUserObject } from './return-user.object'
import { UserDto, UserUpdateDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return this.prisma.user.findMany({
      select: returnUserObject
    })
  }

  async byId(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id
      },
      select: returnUserObject
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async update(id: number, dto: UserUpdateDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!existingUser) {
      throw new NotFoundException('User is not exist')
    }

    const existingGroup = await this.prisma.group.findUnique({
      where: {
        id: +dto.groupId
      }
    })

    if (!existingGroup) {
      throw new NotFoundException('Group is not exist')
    }

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        name: dto.name,
        surName: dto.surName,
        groupId: +dto.groupId
      }
    })
  }

  async profileById(id: number, selectObject: Prisma.UserSelect = {}) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        ...returnUserFullObject,
        ...selectObject
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  async updateProfile(id: number, dto: UserDto) {
    const isSameUser = await this.prisma.user.findUnique({
      where: { email: dto.email }
    })

    if (isSameUser && id !== isSameUser.id) {
      throw new BadRequestException('Email already in use')
    }

    const user = await this.profileById(id)

    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        email: dto.email,
        name: dto.name,
        surName: dto.surName,
        password: dto.password ? await hash(dto.password) : user.password
      }
    })
  }
}
