import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import models from 'models'

const { User } = models
const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // pass jwt
}
export default new JwtStrategy(jwtOpts, async function (jwtPayload, done) {
  try {
    const user = await User.findByPk(jwtPayload.id)
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}) as any
