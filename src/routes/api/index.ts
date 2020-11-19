import { Router } from 'express'
import authRouter from './auth'

const route = Router()

route.use('/auth', authRouter)
export default route
