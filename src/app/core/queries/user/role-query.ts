import {Injectable} from "@angular/core";
import {QueryEntity} from "@datorama/akita";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {StockHistoryState, StockHistoryStore} from "../../store/stock/stock-history-store";
import {StockHistory} from "../../models/stock/stock-history-model";
import {StockHistoryService} from "../../services/stock/stock-history-service";
import {Observable} from "rxjs";
import {UsersState, UsersStore} from "../../store/user/users-store";
import {Users} from "../../models/user/users-model";
import {UserService} from "../../services/user/user-service";
import {RoleState, RoleStore} from "../../store/user/role-store";
import {Role} from "../../models/user/role-model";
import {RoleService} from "../../services/user/role-service";

@Injectable({
  providedIn: 'root',
})
export class RoleQuery extends QueryEntity<RoleState, Role> {
  constructor(
    protected override store: RoleStore,
    private service: RoleService) {
    super(store);
  }
  createUser(entity: Role, isUpdate:boolean): Observable<Role>{
    if(isUpdate)return this.service.updateEntity(entity)
      return this.service.createEntity(entity)
  }
  getRole(id: string): Observable<Role|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  deleteEntity(entity: Role): Observable<Boolean>{
    if(!this.hasEntity(entity.id))
      return this.service.deleteEntity(entity)
    return new Observable<Boolean>()
  }
  getEntities():Observable<Role[]> {
    if(!this.hasEntity())
      return this.service.readEntities()
    return this.selectAll()
  }
}

