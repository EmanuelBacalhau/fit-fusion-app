import { userRoutes } from '@http/controllers/users/routes'
import express from 'express'

export const app = express()

app.use(express.json())

app.use(userRoutes)
