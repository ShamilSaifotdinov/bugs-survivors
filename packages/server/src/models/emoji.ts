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
} from 'sequelize-typescript'
import Comment from './comment'
import User from './user'

interface IEmoji {
  id: number
  commentId: number
  emoji: string
}

@Table({ timestamps: false, tableName: 'emoji' })
export default class Emoji extends Model<IEmoji> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Column({ type: DataType.INTEGER, field: 'comment_id' })
  declare commentId: number

  @AllowNull(false)
  @Column(DataType.STRING)
  declare emoji: string

  @BelongsTo(() => User)
  declare creator: User

  @BelongsTo(() => Comment)
  declare comment: Comment
}
