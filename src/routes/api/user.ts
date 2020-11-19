import { NextFunction, Request, Response, Router } from 'express'

const route = Router()

route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  res.json({done:'yay!'})
})

route.get('/me', async (req: Request, res: Response, next: NextFunction) => {

})

export default route
