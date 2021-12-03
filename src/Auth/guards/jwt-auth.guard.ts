import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * Mapped to JWT Passport Strategy
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {

}
