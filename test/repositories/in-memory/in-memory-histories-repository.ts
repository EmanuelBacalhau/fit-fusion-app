import { History } from '@prisma/client'
import { HistoriesRepository } from '@repositories/interfaces/histories-repository'
import dayjs from 'dayjs'

export class InMemoryHistoriesRepository implements HistoriesRepository {
  public items: History[] = []

  async create(data: History) {
    this.items.push(data)
  }

  async findManyByUserId(userId: string) {
    const days: string[] = []

    this.items.forEach((item) => {
      const formatedDay = dayjs(item.realizedIn).format('DD.MM.YYYY')
      if (!days.includes(formatedDay)) {
        days.push(formatedDay)
      }
    })

    const history = days.map((day) => {
      const exercisesByUserId = this.items
        .filter((item) => {
          const formatedDay = dayjs(item.realizedIn).format('DD.MM.YYYY')
          return item.userId === userId && day === formatedDay
        })
        .map((exercise) => ({
          hour: dayjs(exercise.realizedIn).format('HH:mm'),
          exercise: {
            name: 'Training',
            type: {
              name: 'Type training',
            },
          },
        }))

      return {
        title: day,
        history: exercisesByUserId,
      }
    })

    return history
  }
}
