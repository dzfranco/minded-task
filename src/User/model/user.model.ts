import { Column, DataType, Model, Table, Unique } from "sequelize-typescript";
import { IUser } from "@/User/interfaces";
import { UserStatus } from "@/User/interfaces/iuser";


@Table({
    timestamps: true,
    tableName: 'users',
    underscored: true,
    paranoid: true,
  }
)
export class User extends Model implements IUser {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;
  @Unique({
    name: 'email',
    msg: 'Email already exists'
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({type: DataType.STRING,})
  dob: string;
  @Column({
    type: DataType.ENUM(
      UserStatus.PRISTINE,
      UserStatus.DIRTY,
    ),
    allowNull: false,
    defaultValue: UserStatus.PRISTINE,
  })
  status: UserStatus;
  @Column({type: DataType.STRING,})
  zipCode: string;
  @Column({type: DataType.STRING,})
  firstName: string;
  @Column({type: DataType.STRING,})
  lastName: string;
}
