import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserQuery} from "../../../../../../../core/queries/user/user-query";
import {Router} from "@angular/router";
import {TokenService} from "../../../../../../../core/services/user/TokenService";
import {Users} from "../../../../../../../core/models/user/users-model";
import {STATUS, TOASTR_CONFIG} from "../../../../../../../shared/util";
import {UserTokenQuery} from "../../../../../../../core/queries/user/user-token-query";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userSpinner = false;
  userForm = new  FormGroup({
    email: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    middleName: new FormControl('',Validators.required),
  })
  constructor(private userQuery: UserQuery, private route: Router,private toasterService: NbToastrService, private tokenService: TokenService) { }

  ngOnInit(): void {
    const email = this.tokenService.getEmailFromSession();
    if(email){
      this.userQuery.getSUsers(email).subscribe(user =>{
        this.userForm.patchValue({
          'email': user?.email,
          'name': user?.firstName,
          'surname': user?.lastName,
          'middleName': user?.middleName,
        })
      })
    }
  }
  getUser():Users{
    return new Users(this.userForm.value.email,this.userForm.value.name,this.userForm.value.surname,this.userForm.value.middleName)
  }
  onUpdate(){
    this.userSpinner = true
    if(this.userForm.invalid) return;
    const user = this.getUser();
    if(user!=null){
      this.userQuery.createUser(user,true).subscribe(result =>{
        if(result) {
          this.showToast(STATUS.SUCCESS,'Success','You have updated your profile')
          this.userSpinner = false
        } else this.showToast(STATUS.DANGER,'Fail','Try again later!')
      })
    }
  }
  get formFields(){
    return this.userForm.controls;
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
