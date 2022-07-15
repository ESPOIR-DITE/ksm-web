import {Injectable} from "@angular/core";
import {QueryEntity} from "@datorama/akita";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {StockHistoryState, StockHistoryStore} from "../../store/stock/stock-history-store";
import {StockHistory} from "../../models/stock/stock-history-model";
import {StockHistoryService} from "../../services/stock/stock-history-service";
import {filter, Observable} from "rxjs";
import {UsersState, UsersStore} from "../../store/user/users-store";
import {Users} from "../../models/user/users-model";
import {UserService} from "../../services/user/user-service";
import {UserAccountState, UserAccountStore} from "../../store/user/user-account-store";
import {UserAccount} from "../../models/user/userAccount-model";
import {UserAccountService} from "../../services/user/user-account-service";
import {UserToken} from "../../models/user/user-token-model";
import {UserTokenService} from "../../services/user/user-token-service";

@Injectable({
  providedIn: 'root',
})
export class UserAccountQuery extends QueryEntity<UserAccountState, UserAccount> {
  constructor(
    protected override store: UserAccountStore,
    private service: UserAccountService,
    private userTokenService: UserTokenService) {
    super(store);
  }
  createUserAccount(entity: UserAccount, isUpdate:boolean): Observable<UserAccount>{
    if(isUpdate)return this.service.updateEntity(entity)
      return this.service.createEntity(entity)
  }
  getUsers(id: string): Observable<UserAccount|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  getUsersWithEmail(email: string): Observable<UserAccount|undefined>{
    if(!this.hasEntity(email))
      return this.service.readEntityWithEmail(email)
    return this.selectEntity(({email}) => email === email)
  }
  getUserAccountsWithOrganisationId(organisationId: string): Observable<UserAccount[]>{
    if(!this.hasEntity())
      return this.service.getUserAccountsWithOrganisationId(organisationId)
    return this.selectAll({
      filterBy: entity => entity.organizationId ===organisationId
    })
  }

  deleteEntity(entity: UserAccount): Observable<Boolean>{
    if(!this.hasEntity(entity.email))
      return this.service.deleteEntity(entity)
    return new Observable<Boolean>()
  }
  getEntities():Observable<UserAccount[]> {
    if(!this.hasEntity())
      return this.service.readEntities()
    return this.selectAll()
  }
  login(email: string ,password: string):Observable<UserToken>{
    return this.service.login(email,password)
  }
  postLogin(entity: UserAccount):Observable<UserToken>{
    return this.service.postLogin(entity)
  }
  postLoginTest(entity: UserAccount){
    return this.service.postLoginTest(entity)
  }
  logout():void{
    this.userTokenService.clearSession()
  }
  validateToken(token: string):Observable<Boolean>{
    return this.service.validateToken(token)
  }
}

