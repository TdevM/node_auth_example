import express, { Request, Response, Router, NextFunction } from 'express'
import BuildResponse from 'modules/Response/BuildResponse'
import ResponseError from 'modules/Response/ResponseError'

const route = Router()

route.get('/', (req: Request, res: Response, next: NextFunction) => {
  return res.json(
    BuildResponse.get({
      message: 'vdfsdcwitter.',
    })
  )
})

route.post('/login', (req: Request, res: Response, next: NextFunction) => {})

route.patch(
  '/changePassword',
  (req: Request, res: Response, next: NextFunction) => {}
)

export default route
