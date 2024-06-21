import {
  AllowNull,
  Column,
  DataType,
  Model,
  AutoIncrement,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import User from './user'
import Comment from './comment'

export interface IReply {
  id: number
  content: string
  creatorId: number
  commentId: number
  replyId: number | null
}

export type ReplyInput = Omit<IReply, 'id'>
export type ReplyOuput = Required<IReply>

@Table({
  timestamps: false,
  tableName: 'replies',
})
export default class Reply extends Model<IReply, ReplyInput> implements IReply {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Column(DataType.STRING)
  declare content: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'creator_id',
  })
  declare creatorId: number

  @BelongsTo(() => User)
  declare creator: User

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'comment_id',
  })
  declare commentId: number

  @ForeignKey(() => Reply)
  @Column({
    type: DataType.INTEGER,
    field: 'reply_id',
  })
  declare replyId: number

  @HasMany(() => Reply)
  declare replies: Reply[]

  @BelongsTo(() => Comment)
  declare comment: Comment
}
