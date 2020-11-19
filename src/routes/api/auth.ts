import { Request, Response, Router, NextFunction } from 'express'
import BuildResponse from 'modules/Response/BuildResponse'
import useValidation from '../../helpers/useValidation'
import * as authController from '../../controllers/authController'
import userSchema from '../../validators/schema/userSchema'
import asyncHandler from '../../helpers/asyncHandler'
import { resetPasswordProcess } from '../../controllers/authController'

const route = Router()

route.post(
  '/sign_up',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const value: any = useValidation(userSchema.signUp, req.body)
    const { message, data } = await authController.signUp({
      ...value,
    })
    const buildResponse = BuildResponse.get({ message, data })

    return res.status(201).json(buildResponse)
  })
)

route.post(
  '/login',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const value: any = useValidation(userSchema.login, req.body)
    const { token, expiresIn, tokenType } = await authController.login({
      email: value?.email,
      password: value?.password,
    })

    return res
      .cookie('token', token, {
        maxAge: Number(expiresIn) * 1000, // 7 Days
        httpOnly: true,
        path: '/v1',
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ token, expiresIn, tokenType })
  })
)

route.post(
  '/forgotPassword',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email }: any = useValidation(
      userSchema.forgotPasswordForm,
      req.body
    )
    const { message } = await resetPasswordProcess(email)
    const buildResponse = BuildResponse.get({ message })

    return res.status(201).json(buildResponse)
  })
)

export default route
