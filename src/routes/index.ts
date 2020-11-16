// eslint-disable-next-line no-unused-vars
import express, { Request, Response, NextFunction } from 'express'
import BuildResponse from 'modules/Response/BuildResponse'
import ResponseError from 'modules/Response/ResponseError'

const router = express.Router()

/* Home Page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  const buildResponse = BuildResponse.get({
    message: 'Hi there!, welcome to twitter.',
  })
  return res.json(buildResponse)
})

/* Forbidden Page. */
router.get('/v1', function (req: Request, res: Response, next: NextFunction) {
  throw new ResponseError.Forbidden('forbidden, wrong access endpoint')
})

/* Not Found Page. */
// router.get('*', function (req: Request, res: Response, next: NextFunction) {
//   throw new ResponseError.NotFound('endpoint not found')
// })

export default router