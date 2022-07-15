import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {UserTokenQuery} from "../queries/user/user-token-query";
import {TokenService} from "./user/TokenService";
import {UserAccountQuery} from "../queries/user/user-account-query";

@Injectable({providedIn: 'root',})
export class AuthGuard implements CanActivate {
  result=false;
  routeURL: string;
  constructor(private router: Router,
              private userTokenQuery:UserTokenQuery,
              private tokenService: TokenService,
              private userAccountQuery: UserAccountQuery
              ) {
    this.routeURL = this.router.url;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve,reject) => {
      const isloggedIn = this.userTokenQuery.isLogin()
      const token = this.tokenService.getTokenFromSession()
      if(isloggedIn){
        this.userAccountQuery.validateToken(token!).subscribe( voila  =>{
          if(voila){
            this.routeURL = this.router.url;
            return resolve(true)
          } else{
            this.router.navigate(['/auth/login'], {queryParams: {
                return: 'auth/login'
              }});
            return resolve(false)
          }
        });
      }else{
        this.router.navigate(['/auth/login'], {queryParams: {
            return: 'auth/login'
          }});
        return resolve(false)
      }
    })
  }
}
