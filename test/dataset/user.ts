import { Factory, makeFactory } from 'factory.ts';
import { IUser } from "@/User/interfaces";
import { UserStatus } from "@/User/interfaces/iuser";

export const USER_DEFAULT_PASSWORD = 'testPassword';
export const USER_DEFAULT_PASSWORD_HASH = '$2a$10$lRnuk09tfULhaz6wZteTO.tmiCecmKoiWj9VEjgyWVHzfc0S8Czs.';
// Not actually eternal, expires in 3021
export const MINDED_USER_ETERNAL_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyNWZiODQ4LWZkN2ItNDE4Yi05ZTQ1LWExZGJiZjA2NWQwNSIsImVtYWlsIjoidGVzdEBtaW5kZWQuY29tIiwiZG9iIjoiMTk5MC0wMS0wMSIsInN0YXR1cyI6IlBSSVNUSU5FIiwiemlwQ29kZSI6IjEwMDAxIiwiZmlyc3ROYW1lIjoiSm9lIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE2Mzg1MDY2MjEsImV4cCI6MzMxOTYxMDY2MjF9.e4p1-nQuGNYOS-yvjs-YZiZtxlrtsZQatjchlUz63_s';
export const EXTERNAL_USER_ETERNAL_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImUyNWZiODQ4LWZkN2ItNDE4Yi05ZTQ1LWExZGJiZjA2NWQwNSIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsImRvYiI6IjE5OTAtMDEtMDEiLCJzdGF0dXMiOiJQUklTVElORSIsInppcENvZGUiOiIxMDAwMSIsImZpcnN0TmFtZSI6IkpvZSIsImxhc3ROYW1lIjoiRG9lIiwiaWF0IjoxNjM4NTA3NjE3LCJleHAiOjEwMjc4NTA3NjE3fQ.NPyCsAs1117vN45uPxExskh83JlqyTqpgC6gJLX4Cbo';


export const UserFactory: Factory<IUser> = makeFactory({
  id: 'e25fb848-fd7b-418b-9e45-a1dbbf065d05',
  email: 'test@minded.com',
  password: USER_DEFAULT_PASSWORD_HASH,
  dob: '1990-01-01',
  status: UserStatus.PRISTINE,
  zipCode: '10001',
  firstName: 'Joe',
  lastName: 'Doe'
});
