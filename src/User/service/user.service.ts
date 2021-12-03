import { Injectable } from "@nestjs/common";
import { UserRepository } from "@/User/repo/user.repository";
import { IUserService } from "@/User/public/interfaces/iuser.service";
import { UserEntity } from "@/User/public/entity/user.entity";
import { User } from "@/User/model/user.model";

/**
 * @description This class handles all of the operations and business logic
 * related to users
 */
@Injectable()
export class UserService implements IUserService {
  constructor(private readonly userRepo: UserRepository) {
  }

  /**
   * @description Gets a user given the email
   * @param email
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user: User | null = await this.userRepo.getByEmail(email);
    if (!user) {
      return null
    }
    return new UserEntity(user);
  }


}
