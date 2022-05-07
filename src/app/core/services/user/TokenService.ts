import {UserToken} from "../../models/user/user-token-model";
import {Injectable} from "@angular/core";
@Injectable({
  providedIn: 'root',
})
export class TokenService{

  clearSession(): void {
    localStorage.clear();
  }
  isLogin():boolean{
    if(this.getEmailFromSession()&&this.getTokenFromSession()) return true;
    return false
  }
  getUserToken():UserToken | null{
    if(this.isLogin()) return new UserToken(this.getEmailFromSession()!,this.getTokenFromSession()!)
    return null
  }
  getEmailFromSession(): string|null{
    return localStorage.getItem('email')
  }
   getTokenFromSession() {
    return localStorage.getItem('token')
  }
  getTheTokenFromSession():string|null{
    return localStorage.getItem('token')
  }
  public static getTokenFromSession(): string|null{
    return localStorage.getItem('token')
  }
}
