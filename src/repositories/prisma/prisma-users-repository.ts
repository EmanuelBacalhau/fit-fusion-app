import { Prisma } from '@prisma/client'
import {
  UpdateUser,
  UsersRepository,
} from '@repositories/interfaces/users-repository'
import { prisma } from 'src/libs/prisma'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    await prisma.user.create({
      data,
    })
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findByPhone(phone: string) {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    })

    return !!user
  }

  async update(userId: string, data: UpdateUser) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })
  }
}
