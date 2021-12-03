import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";


export class UserTokenDTO {
  @ApiProperty({
    example: "token12345",
    description: "User token, to be put in the Authorization header as Bearer token",
  })
  @IsEmail()
  access_token: string;
}
