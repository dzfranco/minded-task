import { IUser } from "@/User/interfaces";
import { User } from "@/User/model/user.model";
import { UserStatus } from "@/User/interfaces/iuser";

export class UserEntity implements IUser {
  readonly id: string;
  readonly email: string;
  readonly password: string;
  readonly dob: string;
  readonly status: UserStatus;
  readonly zipCode: string;
  readonly firstName: string;
  readonly lastName: string;

  constructor(model: User) {
    this.id = model.id;
    this.email = model.email;
    this.password = model.password;
    this.dob = model.dob;
    this.status = model.status;
    this.zipCode = model.zipCode;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
  }
}
