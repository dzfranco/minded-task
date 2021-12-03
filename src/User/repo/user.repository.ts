import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "@/User/model/user.model";
import { IUserRepository } from "@/User/repo/interface/iuser.repository";


@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@InjectModel(User)
              private readonly userModel: typeof User,) {
  }

  getByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({
      where: {
        email
      }
    })
  }


}
