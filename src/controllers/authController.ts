import jwt from 'jsonwebtoken'
import User, { LoginAttributes, UserAttributes } from '../models/user'
import ResponseError from '../modules/Response/ResponseError'
import { JWT_SECRET } from '../config/secret'
import { findUserByEmail } from './userController'

const expiresToken = 7 * 24 * 60 * 60 // 7 Days

const login = async (formData: LoginAttributes) => {
  const { email, password } = formData
  const userData = await User.scope('withPassword').findOne({
    where: { email },
  })

  if (!userData) {
    throw new ResponseError.NotFound('data not found or has been deleted')
  }

  if (userData.active) {
    // @ts-ignore
    const comparePassword = userData.comparePassword(password)

    if (comparePassword) {
      const payloadToken = {
        id: userData.id,
        name: userData.fullName,
        active: userData.active,
      }

      const token = jwt.sign(
        JSON.parse(JSON.stringify(payloadToken)),
        JWT_SECRET,
        {
          expiresIn: expiresToken,
        }
      ) // 1 Days
      return {
        token,
        expiresIn: expiresToken,
        tokenType: 'Bearer',
      }
    }
    throw new ResponseError.BadRequest('incorrect email or password!')
  }
  /* User not active return error confirm email */
  throw new ResponseError.BadRequest(
    'please check your email account to verify your email and continue the registration process.'
  )
}

const signUp = async (formData: UserAttributes) => {
  const user = findUserByEmail(formData.email)
  if (user) {
    throw new ResponseError.BadRequest('Email already in use')
  }
  const data = await User.create(formData)
  return {
    message: 'registration is successful, check your email for the next steps',
    data,
  }
}

export { login, signUp }
