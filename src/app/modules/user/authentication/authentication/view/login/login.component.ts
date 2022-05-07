import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {NB_AUTH_OPTIONS, NbAuthService, NbLoginComponent} from "@nebular/auth";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserAccountQuery} from "../../../../../../core/queries/user/user-account-query";
import {UserTokenQuery} from "../../../../../../core/queries/user/user-token-query";
import {NbToastrService} from "@nebular/theme";
import {STATUS, TOASTR_CONFIG} from "../../../../../../shared/util";
import {UserAccount} from "../../../../../../core/models/user/userAccount-model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  implements OnInit {
loginForm = new FormGroup({
  email: new FormControl('',Validators.required),
  password: new FormControl('',Validators.required)
});
//activeUrl: string;
  loginStatus = 'hidden'
  loginStatusMessage = ''
  loginSpinner = false;
  constructor(private userAccountQuery: UserAccountQuery,
              private userTokenQuery: UserTokenQuery,
              private toasterService: NbToastrService,
              private route: Router,
              private router: ActivatedRoute){
  }


  ngOnInit(): void {
    // this.router.url.subscribe(result =>{
    //   console.log(result)
    // })
    this.isLogin()
  }
  myMethod(){}
  submit(){
    this.loginSpinner = true;
    if(this.loginForm.invalid) return
    const email = this.loginForm.value.email
    const password = this.loginForm.value.password
    if(email&&password){
      const userAccount = new UserAccount('',email,'','',password,new Date(),false,'')
      this.userAccountQuery.postLogin(userAccount).subscribe(userToken => {
        if(userToken){
          this.loginForm.reset()
          this.loginStatus = 'success'
          this.loginStatusMessage = 'Login successful'
          this.userTokenQuery.createUserToken(userToken)
          this.route.navigate(['index'])
        }else{
          this.loginStatus = 'warning'
          this.loginStatusMessage = 'Fail to login!'
        }
      })
    }
    this.loginSpinner = false;
    this.loginForm.reset()
  }

  get formFields(){
  return this.loginForm.controls;
  }
  isLogin(){
    if(this.userTokenQuery.isLogin()){
      //if(activeUrl)
      this.route.navigate(['index/home'])
    }
  }
  register(){
    this.route.navigate(['/auth/register'])
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
