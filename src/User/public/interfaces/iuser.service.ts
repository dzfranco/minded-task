import { UserEntity } from "@/User/public/entity/user.entity";

export interface IUserService {
  /**
   * @description Gets a user based on the email
   * @param {string} email - The email to look for
   * @returns {Promise<UserEntity | null>}
   */
  getUserByEmail(email: string): Promise<UserEntity | null>
}
