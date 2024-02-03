import { Prisma } from '@prisma/client'

interface FindByEmailResponse {
  userId: string
  password: string
}
interface FindByIdResponse {
  avatarUrl: string | null
  firstName: string
  lastName: string
  email: string
}

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<void>
  findById(id: string): Promise<FindByIdResponse | null>
  findByEmail(email: string): Promise<FindByEmailResponse | null>
  findByPhone(phone: string): Promise<boolean>
}
