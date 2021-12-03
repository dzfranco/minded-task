import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "@/User/repo/user.repository";
import { IUserService } from "@/User/public/interfaces/iuser.service";
import { UserEntity } from "@/User/public/entity/user.entity";
import { User } from "@/User/model/user.model";
import { FeatureRampsService } from "@/Commons/featureRamp/featureRamps.service";
import { IGeocodingService } from "@/Geocoding/public/interfaces";
import { ValidStates } from "@/Geocoding/public/interfaces/states";
import { GEOCODING_IDENTIFIERS } from "@/Geocoding/public/constants";

/**
 * @description This class handles all of the operations and business logic
 * related to users
 */
@Injectable()
export class UserService implements IUserService {
  private readonly ZIPCODE_VALIDATION_FEATURE_ID = process.env.ZIPCODE_VALIDATION_FEATURE_FLAG_ID;

  constructor(
    private readonly userRepo: UserRepository,
    private readonly featureRampsService: FeatureRampsService,
    @Inject(GEOCODING_IDENTIFIERS.GeocodingService) private readonly geocodingService: IGeocodingService) {
  }

  /**
   * @description This endpoint validates if the user's zip code is from New York
   * @param {string} id - User id
   * @param {string} email - User email, to be used by the feature flag
   */
  async validateZipCode(id: string, email: string): Promise<any> {
    const isEnabled = await this.featureRampsService.isFeatureEnabled(this.ZIPCODE_VALIDATION_FEATURE_ID, id, {email});
    if (!isEnabled) {
      throw new NotFoundException();
    }
    const user: User = await this.userRepo.getById(id);
    const zipCodeValid: boolean = await this.geocodingService.isZipInState(user.zipCode, ValidStates.NEW_YORK);
    return {zipCodeValid};
  }

  /***
   * @description Gets the user by id
   * @param id - The user's id
   * @returns {Promise<UserEntity>}
   */
  async getById(id: string): Promise<UserEntity> {
    const user: User | null = await this.userRepo.getById(id);
    if (!user) {
      return null;
    }
    return this.toUserEntity(user);
  }

  /**
   * @description Gets a user given the email
   * @param email
   */
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user: User | null = await this.userRepo.getByEmail(email);
    return this.toUserEntity(user);
  }


  private toUserEntity(user: User | null) {
    if (!user) {
      return null
    }
    return new UserEntity(user);
  }
}
