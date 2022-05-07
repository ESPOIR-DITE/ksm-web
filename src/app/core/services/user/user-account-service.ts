import {Injectable} from "@angular/core";
import {BASE_URL, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {StockHistoryStore} from "../../store/stock/stock-history-store";
import {BehaviorSubject, catchError, observable, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Users} from "../../models/user/users-model";
import {UserAccountStore} from "../../store/user/user-account-store";
import {UserAccount} from "../../models/user/userAccount-model";
import {UserDetails} from "../../models/user/userDetails-model";
import {UserToken, UserTokenInt} from "../../models/user/user-token-model";
import {UserTokenQuery} from "../../queries/user/user-token-query";

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private base = BASE_URL + 'user-account/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: UserAccountStore,
              private userTokenQuery: UserTokenQuery,) {
  }
  public createEntity(entity: UserAccount):Observable<UserAccount>{
    const url = this.base+'create';
    return this.http.post<UserAccount>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<UserAccount>('create error'))
      )
  }
  public registerUser(entity: UserDetails):Observable<boolean>{
    const url = this.base+'register';
    return this.http.post<boolean>(url,entity,this.options)
      .pipe(
        tap(_ => this.store.add(entity.userAccount)),
        catchError(ApiErrors.handleError<boolean>('register error'))
      )
  }
  public updateEntity(entity: UserAccount):Observable<UserAccount>{
    const url = this.base+'update';
    return this.http.post<UserAccount>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<UserAccount>('update error'))
      )
  }
  public readEntity(id: string):Observable<UserAccount>{
    const url = this.base+'read?id='+id;
    return this.http.get<UserAccount>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<UserAccount>('read error'))
      )
  }
  public readEntityWithEmail(id: string):Observable<UserAccount>{
    const url = this.base+'read-with-email?id='+id;
    return this.http.get<UserAccount>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<UserAccount>('read error'))
      )
  }

  public login(email: string,password: string):Observable<UserToken>{
    const url = this.base+'login?email='+email+'&password='+password;
    return this.http.get<UserToken>(url)
      .pipe(
        tap(_ => _),
        catchError(ApiErrors.handleError<UserToken>('read error'))
      )
  }
  public postLogin(entity: UserAccount):Observable<UserToken>{
    // const url = this.base+'login?email='+entity.email+'&password='+entity.password;
    const url = this.base+'post-login';
    return this.http.post<UserToken>(url,entity,this.options)
      .pipe(
        tap(_ => _),
        catchError(ApiErrors.handleError<UserToken>('read error'))
      )
  }
  public postLoginTest(entity: UserAccount){
    const xhr = new XMLHttpRequest();
    let result: UserToken
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          const value : UserToken = JSON.parse(xhr.responseText)
          return value
      }
      return result
    }

    const url = this.base+'login?email='+entity.email+'&password='+entity.password;
    xhr.open('GET', url, true);
    xhr.send(null);
  }
  public deleteEntity(entity: UserAccount):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public validateToken(token: string):Observable<Boolean>{
    const url = this.base+'validate?token='+token
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(_ => _),
        catchError(ApiErrors.handleError<Boolean>('validating error'))
      )
  }
  public  readEntities():Observable<UserAccount[]>{
    const url = this.base+'reads';
    return this.http.get<UserAccount[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<UserAccount[]>('reads error'))
      )
  }
}
