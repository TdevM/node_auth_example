import bcrypt from 'bcrypt'
import User, { UserInstance } from '../models/user'

export const findUserByEmail = (email: string) => {
  return User.findOne({
    where: {
      email,
    },
  })
}

export const findByPk = (primaryKey: string) => {
  return User.findByPk(primaryKey, { raw: true })
}

export const findUserByEmailPasswordScope = (email: string) => {
  return User.scope('withPassword').findOne({
    where: {
      email,
    },
  })
}

export const findByPkPasswordScope = (primaryKey: string) => {
  return User.scope('withPassword').findByPk(primaryKey)
}

export const updateUserPassword = (user: UserInstance, newPassword: string) => {
  const saltRounds = 10
  const hash = bcrypt.hashSync(newPassword, saltRounds)
  return user.update({ password: hash })
}
