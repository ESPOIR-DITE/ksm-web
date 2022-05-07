import {UserAccount} from "./userAccount-model";
import {Users} from "./users-model";

export class UserDetails{
  userAccount: UserAccount
  users: Users

  constructor(userAccount: UserAccount, users: Users) {
    this.userAccount = userAccount;
    this.users = users;
  }
}
