import {UserToken} from "../../models/user/user-token-model";
import {EntityState, EntityStore, Store, StoreConfig} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {STORE_TTL} from "../../../shared/util";
import {Users} from "../../models/user/users-model";
import {UsersState} from "./users-store";

export interface UserTokenState extends EntityState<UserToken, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'user-token', idKey: 'email', cache:{
    ttl:STORE_TTL,
  }
})
export class UserTokenStore extends EntityStore<UserTokenState, UserToken>{
  constructor() {
    super();
  }
}
