/* eslint-disable no-unused-vars */
import { Model, Optional } from 'sequelize'
import bcrypt from 'bcrypt'
import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'

export interface UserAttributes {
  id: string
  fullName: string
  email: string
  password?: string
  phone: string
  active?: boolean | null
  tokenVerify?: string | null
  createdAt?: Date
  updatedAt?: Date
}

export interface TokenAttributes {
  data: UserAttributes
  message: string
}

export interface LoginAttributes {
  email: string
  password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  comparePassword(): boolean | void
}

const User = db.sequelize.define<UserInstance>(
  'Users',
  {
    ...SequelizeAttributes.Users,
  },
  {
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['password'],
      },
    },
    scopes: {
      withPassword: {},
    },
  }
)

User.associate = (models) => {
  User.belongsToMany(models.Role, { through: models.UserRole })
}

export function setUserPassword(instance: UserInstance) {
  const { password } = instance
  const saltRounds = 10
  const hash = bcrypt.hashSync(password, saltRounds)
  instance.setDataValue('password', hash)
}

User.prototype.comparePassword = function (candidatePassword: string) {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(candidatePassword, this.password, function (
      err,
      isMatch
    ) {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}

User.addHook('beforeCreate', setUserPassword)

User.prototype.toJSON = function () {
  const values = { ...this.get() }

  delete values.password
  return values
}

export default User
