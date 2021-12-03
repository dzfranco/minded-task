import { UserEntity } from "@/User/public/entity/user.entity";

export interface IUserService {

  /**
   * @description This endpoint validates if the user's zip code is from New York
   * @param {string} id - User id
   * @param {string} email - User email, to be used by the feature flag
   */
  validateZipCode(id: string, email: string): Promise<any>;

  /***
   * @description Gets the user by id
   * @param id - The user's id
   * @returns {Promise<UserEntity>}
   */
  getById(id: string): Promise<UserEntity>

  /**
   * @description Gets a user based on the email
   * @param {string} email - The email to look for
   * @returns {Promise<UserEntity | null>}
   */
  getUserByEmail(email: string): Promise<UserEntity | null>
}
