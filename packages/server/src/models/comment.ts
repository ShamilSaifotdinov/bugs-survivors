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
import Topic from './topic'
import Reply from './reply'
import Emoji from './emoji'

export interface IComment {
  id: number
  content: string
  creatorId: number
  topicId: number
}

export type CommentInput = Omit<IComment, 'id'>
export type CommentOuput = Required<IComment>

@Table({
  timestamps: false,
  tableName: 'comments',
})
export default class Comment
  extends Model<IComment, CommentInput>
  implements IComment
{
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

  @ForeignKey(() => Topic)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'topic_id',
  })
  declare topicId: number

  @HasMany(() => Reply)
  declare replies: Reply[]

  @HasMany(() => Emoji)
  declare emoji: Emoji[]
}
