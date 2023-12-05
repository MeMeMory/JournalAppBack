import { Prisma } from '@prisma/client'

export const returnGroupObject: Prisma.GroupSelect = {
  id: true,
  name: true,
  slug: true
}
