import express from 'express'
import { userRoutes } from '@controllers/users/routes'
import { dayRoutes } from './controllers/days/routes'
import { typesExerciseRoutes } from './controllers/types-exercise/routes'
import { exerciseRoutes } from './controllers/exercises/routes'
import { userHasExerciseRoutes } from './controllers/user-has-exercises/routes'
import { resolve } from 'path'

export const app = express()

app.use(express.json())

app.use(
  '/uploads/avatars',
  express.static(resolve(__dirname, '../uploads/avatars')),
)
app.use(
  '/uploads/exercises',
  express.static(resolve(__dirname, '../uploads/exercises')),
)

app.use(dayRoutes)
app.use(userRoutes)
app.use(exerciseRoutes)
app.use(typesExerciseRoutes)
app.use(userHasExerciseRoutes)
