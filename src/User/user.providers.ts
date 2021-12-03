import { Provider } from "@nestjs/common";
import { UserService } from "@/User/service/user.service";
import { USER_IDENTIFIERS } from "@/User/public/constants";
import { UserRepository } from "@/User/repo/user.repository";

export const UserProviders: Provider[] = [
  UserRepository,
  {
    provide: USER_IDENTIFIERS.UserService,
    useClass: UserService,
  },
];
