import {Injectable} from "@angular/core";
import {BASE_URL, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {StockHistoryStore} from "../../store/stock/stock-history-store";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Users} from "../../models/user/users-model";
import {UsersStore} from "../../store/user/users-store";
import {RoleStore} from "../../store/user/role-store";
import {Role} from "../../models/user/role-model";

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private base = BASE_URL + 'role/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: RoleStore) {
  }
  public createEntity(entity: Role):Observable<Role>{
    const url = this.base+'create';
    return this.http.post<Role>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Role>('create error'))
      )
  }
  public updateEntity(entity: Role):Observable<Role>{
    const url = this.base+'update';
    return this.http.post<Role>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<Role>('update error'))
      )
  }
  public readEntity(id: string):Observable<Role>{
    const url = this.base+'read?id='+id;
    return this.http.get<Role>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Role>('read error'))
      )
  }
  public deleteEntity(entity: Role):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<Role[]>{
    const url = this.base+'reads';
    return this.http.get<Role[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Role[]>('reads error'))
      )
  }
}
