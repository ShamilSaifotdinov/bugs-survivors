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
} from 'sequelize-typescript'
import SiteTheme from './siteTheme'
import User from './user'

export interface IUserTheme {
  id: number
  themeId: number
  device?: string
  ownerId: number
  theme: SiteTheme
}

export type UserThemeInput = Omit<IUserTheme, 'id' | 'theme'>

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_theme',
})
export default class UserTheme
  extends Model<IUserTheme, UserThemeInput>
  implements IUserTheme
{
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @ForeignKey(() => SiteTheme)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare themeId: number

  @BelongsTo(() => SiteTheme)
  declare theme: SiteTheme

  @Column(DataType.STRING)
  declare device: string

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  declare ownerId: number
}
