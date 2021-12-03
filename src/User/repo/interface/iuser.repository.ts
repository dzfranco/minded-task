import { User } from "@/User/model/user.model";


export interface IUserRepository {
  /**
   * @description Retrieves a user given its email, will return null if no User is found
   * @param email
   * @return {User | null}
   */
  getByEmail(email: string): Promise<User | null>;
}
