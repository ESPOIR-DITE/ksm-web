import {Injectable} from "@angular/core";
import {BASE_URL, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {StockHistoryStore} from "../../store/stock/stock-history-store";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Users} from "../../models/user/users-model";
import {UsersStore} from "../../store/user/users-store";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base = BASE_URL + 'user/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: UsersStore) {
  }
  public createEntity(entity: Users):Observable<Users>{
    const url = this.base+'create';
    return this.http.post<Users>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Users>('create error'))
      )
  }
  public updateEntity(entity: Users):Observable<Users>{
    const url = this.base+'update';
    return this.http.post<Users>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.email,entity)),
        catchError(ApiErrors.handleError<Users>('update error'))
      )
  }
  public readEntity(id: string):Observable<Users>{
    const url = this.base+'read?id='+id;
    return this.http.get<Users>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Users>('read error'))
      )
  }
  public deleteEntity(entity: Users):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.email;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.email)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<Users[]>{
    const url = this.base+'reads';
    return this.http.get<Users[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Users[]>('reads error'))
      )
  }
}
