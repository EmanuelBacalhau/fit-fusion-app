import { Prisma, User } from '@prisma/client'

export interface UpdateUser {
  avatarUrl?: string | null
  firstName?: string
  lastName?: string
  password?: string
}

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<void>
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  update(userId: string, data: UpdateUser): Promise<void>
}
