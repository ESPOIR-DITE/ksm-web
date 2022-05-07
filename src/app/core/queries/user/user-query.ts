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

@Injectable({
  providedIn: 'root',
})
export class UserQuery extends QueryEntity<UsersState, Users> {
  constructor(
    protected override store: UsersStore,
    private service: UserService) {
    super(store);
  }
  createUser(entity: Users, isUpdate:boolean): Observable<Users>{
    if(isUpdate)return this.service.updateEntity(entity)
      return this.service.createEntity(entity)
  }
  getSUsers(id: string): Observable<Users|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  deleteEntity(entity: Users): Observable<Boolean>{
    if(!this.hasEntity(entity.email))
      return this.service.deleteEntity(entity)
    return new Observable<Boolean>()
  }
  getEntities():Observable<Users[]> {
    if(!this.hasEntity())
      return this.service.readEntities()
    return this.selectAll()
  }
}

