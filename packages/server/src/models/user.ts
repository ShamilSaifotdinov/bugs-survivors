import {
  AllowNull,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript'
import Topic from './topic'
import Comment from './comment'
import Reply from './reply'
import Emoji from './emoji'
import UserTheme from './userTheme'

export interface _IUser {
  id: number
  first_name?: string | null
  second_name?: string | null
  display_name?: string | null
  login: string
  email?: string | null
  phone?: string | null
  avatar?: string | null
}

export type IUser = Pick<_IUser, 'id' | 'login' | 'avatar'>

@Table({
  timestamps: false,
  tableName: 'users',
})
export default class User extends Model<IUser> {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  declare login: string

  @Column(DataType.STRING)
  declare avatar: string

  @HasMany(() => Topic)
  declare topics: Topic[]

  @HasMany(() => Comment)
  declare comments: Comment[]

  @HasMany(() => Reply)
  declare replies: Reply[]

  @HasMany(() => Emoji)
  declare emoji: Emoji[]

  @HasMany(() => UserTheme)
  declare theme: UserTheme[]
}
