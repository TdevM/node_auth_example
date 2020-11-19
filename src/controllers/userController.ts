import User from '../models/user'

export const findUserByEmail = (email: string) => {
  return User.findOne({
    where: {
      email,
    },
  })
}
