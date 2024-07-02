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

export interface IUser {
  id: number
  login: string
  avatar?: string | null
}

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
