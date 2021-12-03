import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[#¿?¡!@$%^&/()=+{}[\]:;."'`,*\-_<>¬]).{8,}$/;

export class UserCredentialsDto {
  @ApiProperty({
    example: "some@email.com",
    description: "User email",
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: "1990-01-01",
    description: "User DOB, in `YYYY-MM-DD` format",
  })
  @IsOptional()
  dob?: string;

  @ApiProperty({
    example: "10009",
    description: "New York zip code",
  })
  @IsNotEmpty()
  zipCode?: string;

  @ApiProperty({
    example: "5555551234",
    description: "User phone number",
  })
  @IsOptional()
  phoneNumber?: string;
}
