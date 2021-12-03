import { Injectable } from "@nestjs/common";
import { User } from "@/User/model/user.model";
import { Repository, Sequelize } from "sequelize-typescript";

@Injectable()
export class UserRepository {
  private readonly userRepo: Repository<User>

  constructor(
    private sequelize: Sequelize
  ) {
    this.userRepo = this.sequelize.getRepository(User)
  }

  async getById(id: string): Promise<User | null> {
    return this.userRepo.findOne({where: {id}})
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({where: {email}})
  }


}
