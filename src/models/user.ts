/* eslint-disable no-unused-vars */
import { Model, Optional, DataTypes } from 'sequelize'
import bcrypt from 'bcrypt'
import SequelizeAttributes from 'utils/SequelizeAttributes'
import db from './_instance'
import userSchema from '../validators/schema/userSchema'

export interface UserAttributes {
  id: string
  fullName: string
  email: string
  password?: string
  phone: string
  active?: boolean | null
  tokenVerify?: string | null
  passwordConfirm?: string
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

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  comparePassword(): boolean | void
}

const User = db.sequelize.define<UserInstance>(
  'Users',
  {
    ...SequelizeAttributes.Users,
    passwordConfirm: {
      type: DataTypes.VIRTUAL,
    },
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

function setUserPassword(instance: UserInstance) {
  const { password, passwordConfirm } = instance
  const fdPassword = { password, passwordConfirm }
  const validPassword = userSchema.updatePassword.validateSyncAt(
    'passwordConfirm',
    fdPassword
  )
  const saltRounds = 10
  const hash = bcrypt.hashSync(validPassword, saltRounds)
  instance.setDataValue('password', hash)
}

User.prototype.comparePassword = function (candidatePassword: string) {
  return new Promise((resolve, reject) => {
    return bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) reject(err)
      resolve(isMatch)
    })
  })
}

User.addHook('beforeCreate', setUserPassword)

export default User
