import passport from 'passport'
import jwtStrategy from './PassportJWT'

passport.use(jwtStrategy)

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

export default passport
