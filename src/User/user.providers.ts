import { Provider } from "@nestjs/common";
import { UserService } from "@/User/service/user.service";
import { USER_SERVICE_IDENTIFIER } from "@/User/public/constants";

export const UserProviders: Provider[] = [
  {
    provide: USER_SERVICE_IDENTIFIER,
    useClass: UserService,
  }
];
