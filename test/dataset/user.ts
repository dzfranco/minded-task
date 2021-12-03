import { Factory, makeFactory } from 'factory.ts';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from "@/User/interfaces";
import { UserStatus } from "@/User/interfaces/iuser";

export const USER_DEFAULT_PASSWORD = 'testPassword';
export const USER_DEFAULT_PASSWORD_HASH = '$2a$10$lRnuk09tfULhaz6wZteTO.tmiCecmKoiWj9VEjgyWVHzfc0S8Czs.';

export const UserFactory: Factory<IUser> = makeFactory({
  id: uuidv4() as string,
  email: 'test@minded.com',
  password: USER_DEFAULT_PASSWORD_HASH,
  dob: '1990-01-01',
  status: UserStatus.PRISTINE,
  zipCode: '10001',
  firstName: 'Joe',
  lastName: 'Doe'
});
