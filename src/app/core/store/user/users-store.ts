import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {StockHistory} from "../../models/stock/stock-history-model";
import {Users} from "../../models/user/users-model";
export interface UsersState extends EntityState<Users, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'users', idKey: 'email', cache:{
    ttl:STORE_TTL,
  }
})
export class UsersStore extends EntityStore<UsersState, Users>{
  constructor() {
    super();
  }
}
