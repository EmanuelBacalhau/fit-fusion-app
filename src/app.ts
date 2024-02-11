import express from 'express'
import { userRoutes } from '@controllers/users/routes'
import { dayRoutes } from './controllers/days/routes'

export const app = express()

app.use(express.json())

app.use(userRoutes)
app.use(dayRoutes)
