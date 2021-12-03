export interface IUser {
  id: string;
  email: string;
  password: string;
  dob: string,
  status: UserStatus,
  zipCode: string,
  firstName: string,
  lastName: string,
}

export enum UserStatus {
  PRISTINE = 'PRISTINE',
  DIRTY = 'DIRTY',
}
