import {
  Column,
  DataType,
  Model,
  AutoIncrement,
  PrimaryKey,
  Table,
  ForeignKey,
  AllowNull,
  BelongsTo,
  Index,
} from 'sequelize-typescript'
import Comment from './comment'
import User from './user'

interface IEmoji {
  id: number
  commentId: number
  emoji: string
  creatorId: number
}

export type EmojiRequest = Omit<IEmoji, 'id'>

@Table({ timestamps: false, tableName: 'emoji' })
export default class Emoji extends Model<IEmoji, EmojiRequest> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'comment_id' })
  declare commentId: number

  @BelongsTo(() => Comment)
  declare comment: Comment

  @Index
  @AllowNull(false)
  @Column(DataType.STRING)
  declare emoji: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'creator_id' })
  declare creatorId: number

  @BelongsTo(() => User)
  declare creator: User
}
