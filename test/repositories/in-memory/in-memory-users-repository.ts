import { randomUUID } from 'crypto'
import { User } from '@prisma/client'
import { UsersRepository } from '@repositories/interfaces/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: User) {
    this.items.push({
      ...data,
      id: !data.id ? randomUUID() : data.id,
    })
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByPhone(phone: string) {
    const user = this.items.find((item) => item.phone === phone)

    if (!user) {
      return false
    }

    return true
  }
}
