import { Router } from 'express'
import authRouter from './auth'
import userRouter from './user'
import passport from '../../middlewares/Passport'

const route = Router()

route.use('/user', passport.authenticate('jwt', { session: false }), userRouter)
route.use('/auth', authRouter)
export default route
