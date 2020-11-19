import { NextFunction, Request, Response, Router } from 'express'
import asyncHandler from '../../helpers/asyncHandler'
import BuildResponse from '../../modules/Response/BuildResponse'
import { getProfile } from '../../controllers/authController'

const route = Router()

route.get(
  '/me',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user }: any = req
    const profileData = await getProfile(user.id)
    const buildResponse = BuildResponse.get({ profileData })

    return res.status(200).json(buildResponse)
  })
)
export default route
