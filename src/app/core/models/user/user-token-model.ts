export class UserToken{
  email: string
  token: string

  constructor(email: string, token: string) {
    this.email = email;
    this.token = token;
  }
}
export interface UserTokenInt {
  email: string
  token: string
}
