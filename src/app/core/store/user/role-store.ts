import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {StockHistory} from "../../models/stock/stock-history-model";
import {Users} from "../../models/user/users-model";
import {Role} from "../../models/user/role-model";
export interface RoleState extends EntityState<Role, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'role', idKey: 'id', cache:{
    ttl:STORE_TTL,
  }
})
export class RoleStore extends EntityStore<RoleState, Role>{
  constructor() {
    super();
  }
}
