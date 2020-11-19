import User from '../models/user'

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
