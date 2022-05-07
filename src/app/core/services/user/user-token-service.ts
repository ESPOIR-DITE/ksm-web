import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BASE_URL, Util} from "../../../shared/util";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {UserToken} from "../../models/user/user-token-model";
import {UserTokenStore} from "../../store/user/user-token.session";

@Injectable({
  providedIn: 'root',
})
export class UserTokenService {
  private base = BASE_URL + 'user-token/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: UserTokenStore) {
  }
  public createEntity(entity: UserToken):Observable<UserToken>{
    const url = this.base+'create';
    return this.http.post<UserToken>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<UserToken>('create error'))
      )
  }
  public updateEntity(entity: UserToken):Observable<UserToken>{
    const url = this.base+'update';
    return this.http.post<UserToken>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.email,entity)),
        catchError(ApiErrors.handleError<UserToken>('update error'))
      )
  }
  public readEntity(id: string):Observable<UserToken>{
    const url = this.base+'read?id='+id;
    return this.http.get<UserToken>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<UserToken>('read error'))
      )
  }
  public deleteEntity(entity: UserToken):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.email;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.email)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<UserToken[]>{
    const url = this.base+'reads';
    return this.http.get<UserToken[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<UserToken[]>('reads error'))
      )
  }
  createSession(entity: UserToken):void{
    this.clearSession()
    localStorage.setItem('email',entity.email)
    localStorage.setItem('token',entity.token)
  }
  getUserToken():UserToken | null{
    if(this.isLogin()) return new UserToken(this.getEmailFromSession()!,this.getTokenFromSession()!)
    return null
  }
  getEmailFromSession(): string|null{
    return localStorage.getItem('email')
  }
  public static getTokenFromSession(): string|null{
    return localStorage.getItem('token')
  }
  clearSession(): void {
    localStorage.clear();
  }
  isLogin():boolean{
    if(this.getEmailFromSession()&&this.getTokenFromSession()) return true;
    return false
  }

  private getTokenFromSession() {
    return localStorage.getItem('token')
  }
}

