import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Users} from "../../../../../../core/models/user/users-model";
import {UserAccount} from "../../../../../../core/models/user/userAccount-model";
import {UserAccountQuery} from "../../../../../../core/queries/user/user-account-query";
import {UserQuery} from "../../../../../../core/queries/user/user-query";
import {STATUS, TOASTR_CONFIG} from "../../../../../../shared/util";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-registretion',
  templateUrl: './registretion.component.html',
  styleUrls: ['./registretion.component.scss']
})
export class RegistretionComponent implements OnInit {
  createProcess = false;
  userAccountForm = new FormGroup({
    email : new FormControl('',Validators.required),
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  constructor(private route: Router,private userAccountQuery: UserAccountQuery,
              private toasterService: NbToastrService, private userQuery: UserQuery) { }

  ngOnInit(): void {
  }

  get formFields(){
    return this.userAccountForm.controls;
  }
  getOrganisations(){

  }
  getUser(){
    return new Users(this.userAccountForm.value.email,this.userAccountForm.value.name,'','')
  }
  getUserAccount(){
    return new UserAccount('',this.userAccountForm.value.email,'','',this.userAccountForm.value.password, new Date(),false,'')
  }

  onSave(){
    this.createProcess = true;
    if(this.userAccountForm.invalid) return;
    const user = this.getUser()
    const userAccount = this.getUserAccount()

    this.userAccountQuery.createUser(userAccount,false).subscribe(resultUserAccount => {
      if(resultUserAccount!=null){
        this.userQuery.createUser(user,false).subscribe(resultUser => {
          if(resultUser!=null){
            this.showToast(STATUS.SUCCESS,'Success', 'Registered successfully.')
          }
        })
      }else{
        this.showToast(STATUS.DANGER,'Failure', 'Registration Failed!')
      }
    })
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
