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
import {UserTokenState, UserTokenStore} from "../../store/user/user-token.session";
import {UserToken} from "../../models/user/user-token-model";
import {UserTokenService} from "../../services/user/user-token-service";

@Injectable({
  providedIn: 'root',
})
export class UserTokenQuery extends QueryEntity<UserTokenState, UserToken> {
  constructor(
    protected override store: UserTokenStore,
    private service: UserTokenService) {
    super(store);
  }
  createUserToken(entity: UserToken): void{
    return this.service.createSession(entity)
  }
  getSUserToken(id: string): Observable<UserToken|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  deleteEntity(entity: UserToken): Observable<Boolean>{
    if(!this.hasEntity(entity.email))
      return this.service.deleteEntity(entity)
    return new Observable<Boolean>()
  }
  getEntities():Observable<UserToken[]> {
    if(!this.hasEntity())
      return this.service.readEntities()
    return this.selectAll()
  }
  isLogin():boolean{
    return this.service.isLogin()
  }


}

