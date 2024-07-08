import {
  AllowNull,
  Column,
  DataType,
  Model,
  AutoIncrement,
  PrimaryKey,
  Table,
  Unique,
  Index,
} from 'sequelize-typescript'

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'site_theme',
})
export default class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare theme: string

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string
}
