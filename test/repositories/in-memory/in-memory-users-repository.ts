import { randomUUID } from 'crypto'
import { User } from '@prisma/client'
import {
  UpdateUser,
  UsersRepository,
} from '@repositories/interfaces/users-repository'

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

  async update(userId: string, data: UpdateUser): Promise<void> {
    const user = this.items.find((item) => item.id === userId)

    const findIndex = this.items.findIndex((item) => item.id === userId)

    if (user) {
      this.items[findIndex] = {
        ...user,
        avatarUrl: !data.avatarUrl ? user.avatarUrl : data.avatarUrl,
        firstName: !data.firstName ? user.firstName : data.firstName,
        lastName: !data.lastName ? user.lastName : data.lastName,
        password: !data.password ? user.password : data.password,
      }
    }
  }
}
