/* eslint-disable no-unused-vars */
import { Model, Optional, DataTypes } from 'sequelize'
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
  newPassword?: string
  confirmNewPassword?: string
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

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {
}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  comparePassword(): boolean | void
}

const User = db.sequelize.define<UserInstance>(
  'Users',
  {
    ...SequelizeAttributes.Users,
    newPassword: {
      type: DataTypes.VIRTUAL,
    },
    confirmNewPassword: {
      type: DataTypes.VIRTUAL,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['password', 'tokenVerify'],
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

export default User
