import jwt from 'jsonwebtoken'
import User, { LoginAttributes, UserAttributes } from '../models/user'
import ResponseError from '../modules/Response/ResponseError'
import { JWT_SECRET } from '../config/secret'
import { findByPk, findUserByEmail } from './userController'
import { sendPasswordResetMail } from '../helpers/email'

const expiresToken = 7 * 24 * 60 * 60 // 7 Days

const login = async (formData: LoginAttributes) => {
  const { email, password } = formData
  const userData = await User.scope('withPassword').findOne({
    where: { email },
  })

  if (!userData) {
    throw new ResponseError.NotFound('You don\'t seem to be registered with us')
  }

  if (userData.active) {
    // @ts-ignore
    const comparePassword = await userData.comparePassword(password)

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
        },
      ) // 1 Days
      return {
        token,
        expiresIn: expiresToken,
        tokenType: 'Bearer',
      }
    }
    throw new ResponseError.BadRequest('Incorrect password')
  }
  /* User not active return error confirm email */
  throw new ResponseError.BadRequest(
    'please check your email account to verify your email and continue the registration process.',
  )
}

const signUp = async (formData: UserAttributes) => {
  const user = await findUserByEmail(formData.email)
  if (user) {
    throw new ResponseError.BadRequest('Email already in use')
  }
  const data = await User.create(formData)
  return {
    message: 'registration is successful, check your email for the next steps',
    data,
  }
}

const getProfile = async (userId: string) => {
  const user = await findByPk(userId)
  if (!user) {
    throw new ResponseError.NotFound(`No user with id ${userId} found`)
  }
  return user
}

const usePasswordHashToMakeToken = (
  passwordHash: any,
  userId: any,
  createdAt: any,
) => {
  const secret = `${passwordHash}-${createdAt}`
  return jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  })
}

const resetPasswordProcess = async (email: string) => {
  const user = await findUserByEmail(email)
  if (!user) {
    return {
      message:
        'success. password reset mail sent to email. check your email for the next steps',
    }
  }
  const token = usePasswordHashToMakeToken(
    user.password,
    user.id,
    user.createdAt
  )
  await sendPasswordResetMail(user, token)
  return {
    message:
      'success. password reset mail sent to email. check your email for the next steps',
  }
}

export { login, signUp, getProfile, resetPasswordProcess }
