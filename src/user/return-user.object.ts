import { Prisma } from '@prisma/client'

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: false,
  name: true,
  surName: true,
  password: false,
  group: true
}

export const returnUserFullObject: Prisma.UserSelect = {
  id: true,
  email: true,
  name: true,
  surName: true,
  password: false,
  group: true
}
