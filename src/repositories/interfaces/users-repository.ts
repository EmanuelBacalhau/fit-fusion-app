import { Prisma } from '@prisma/client'

interface FindByEmailResponse {
  userId: string
  password: string
}

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<void>
  findByEmail(email: string): Promise<FindByEmailResponse | null>
}
