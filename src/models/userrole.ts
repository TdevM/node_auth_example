// eslint-disable-next-line no-unused-vars
import { Model, Optional } from 'sequelize'
import SequelizeAttributes from '../utils/SequelizeAttributes'

import db from './_instance'

export interface UserRoleAttributes {
  id?: number
  UserId: string
  RoleId: string
  createdAt?: Date
  updatedAt?: Date
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, 'id'> {}

interface UserRoleInstance
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>,
    UserRoleAttributes {}

const UserRole = db.sequelize.define<UserRoleInstance>(
  'UserRoles',
  {
    ...SequelizeAttributes.UserRoles,
  },
  {
    timestamps: true,
    paranoid: true,
  }
)

export default UserRole
