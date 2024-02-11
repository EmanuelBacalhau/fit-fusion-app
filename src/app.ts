import express from 'express'
import { userRoutes } from '@controllers/users/routes'
import { dayRoutes } from './controllers/days/routes'
import { typesExerciseRoutes } from './controllers/types-exercise/routes'

export const app = express()

app.use(express.json())

app.use(dayRoutes)
app.use(userRoutes)
app.use(typesExerciseRoutes)
