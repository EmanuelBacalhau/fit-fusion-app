import { randomUUID } from 'crypto'
import { User } from '@prisma/client'
import { UsersRepository } from '@repositories/interfaces/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    this.items.push({
      ...data,
      id: randomUUID(),
    })
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return {
      userId: user.id,
      password: user.password,
    }
  }
}
