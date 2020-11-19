import express, { Request, Response, NextFunction } from 'express'
import BuildResponse from 'modules/Response/BuildResponse'
import ResponseError from 'modules/Response/ResponseError'
import apiRouter from './api/index'

const router = express.Router()

router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const buildResponse = BuildResponse.get({
    message: 'Hi there!, welcome to twitter.',
  })
  return res.json(buildResponse)
})

router.use('/api', apiRouter)

export default router
