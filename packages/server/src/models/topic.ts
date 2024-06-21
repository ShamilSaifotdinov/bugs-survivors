import {
  AllowNull,
  Column,
  DataType,
  Model,
  AutoIncrement,
  PrimaryKey,
  Table,
  ForeignKey,
  Unique,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript'
import User from './user'
import Comment from './comment'

export interface ITopic {
  id: number
  name: string
  creatorId: number
  creator: User
}

export type TopicInput = Omit<ITopic, 'id' | 'creator'>
export type TopicOuput = Required<ITopic>

@Table({
  timestamps: false,
  tableName: 'topics',
})
export default class Topic extends Model<ITopic, TopicInput> implements ITopic {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number

  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare name: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'creator_id',
  })
  declare creatorId: number

  @BelongsTo(() => User)
  declare creator: User

  @HasMany(() => Comment)
  declare comments: Comment[]
}
