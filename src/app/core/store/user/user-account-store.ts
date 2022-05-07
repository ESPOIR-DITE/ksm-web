import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {StockHistory} from "../../models/stock/stock-history-model";
import {Users} from "../../models/user/users-model";
import {UserAccount} from "../../models/user/userAccount-model";
export interface UserAccountState extends EntityState<UserAccount, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'user-account', idKey: 'id', cache:{
    ttl:STORE_TTL,
  }
})
export class UserAccountStore extends EntityStore<UserAccountState, UserAccount>{
  constructor() {
    super();
  }
}
