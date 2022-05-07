import { Component, OnInit } from '@angular/core';
import {OrganisationQuery} from "../../../../../../../core/queries/organisation/organisation.query";
import {UserAccountQuery} from "../../../../../../../core/queries/user/user-account-query";
import {Router} from "@angular/router";
import {NbToastrService} from "@nebular/theme";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Organisation} from "../../../../../../../core/models/organisation-model";
import {Role} from "../../../../../../../core/models/user/role-model";
import {TokenService} from "../../../../../../../core/services/user/TokenService";
import {RoleQuery} from "../../../../../../../core/queries/user/role-query";
import {UserAccount} from "../../../../../../../core/models/user/userAccount-model";
import {STATUS, TOASTR_CONFIG} from "../../../../../../../shared/util";

@Component({
  selector: 'app-user-account-form',
  templateUrl: './user-account-form.component.html',
  styleUrls: ['./user-account-form.component.scss']
})
export class UserAccountFormComponent implements OnInit {
  userAccountSpinner = false;
  organisations: Organisation[]|undefined
  roles: Role[]|undefined
  role: string|undefined
  organisation: string|undefined;
  userAccountForm = new  FormGroup({
    id: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    organisationId: new FormControl('',Validators.required),
    roleId: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required),
    stat: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
  })

  constructor(private roleQuery: RoleQuery, private tokenService: TokenService, private organisationQuery: OrganisationQuery, private userAccountQuery: UserAccountQuery,private route: Router,private toasterService: NbToastrService) { }

  ngOnInit(): void {
    const email = this.tokenService.getEmailFromSession()
    if(email){
      this.userAccountQuery.getUsersWithEmail(email).subscribe(userAccount =>{
        if(userAccount){
          this.userAccountForm.patchValue({
            'id': userAccount?.id,
            'email': userAccount?.email,
            'organisationId': userAccount?.organizationId,
            'roleId': userAccount?.roleId,
            'password': userAccount?.password,
            'date': userAccount?.date,
            'stat': userAccount?.state,
            'description': userAccount?.description,
          })
          this.roleQuery.getRole(userAccount?.roleId).subscribe(role=>{
              if(role) this.role = role.role
          })
          this.organisationQuery.getOrganisation(userAccount.organizationId).subscribe(organisation =>{
            if(organisation) this.organisation = organisation.name
          })
        }

      })
    }
    this.getOrganisation();
    this.getRoles();
  }
  getOrganisation(){
    this.organisationQuery.getEntities().subscribe(organisation =>{
      if(organisation) this.organisations = organisation;
    })
  }
  getRoles(){
    this.roleQuery.getEntities().subscribe(roles =>{
      if(roles) this.roles = roles
    })
  }
  get formFields(){
    return this.userAccountForm.controls
  }
  getUserAccount():UserAccount{
    return new UserAccount(this.userAccountForm.value.id,this.userAccountForm.value.email,this.userAccountForm.value.organisationId,this.userAccountForm.value.roleId,this.userAccountForm.value.password,this.userAccountForm.value.date,this.userAccountForm.value.stat,this.userAccountForm.value.description);
  }
  onUpdate(){
    this.userAccountSpinner = true
    if(this.userAccountForm.invalid) return;
    const userAccount = this.getUserAccount()
    if(userAccount!=null){
      this.userAccountQuery.createUser(userAccount,true).subscribe(result=>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','You have updated your profile')
          this.userAccountSpinner = false;
        }else this.showToast(STATUS.DANGER,'Fail','Try again later!')
      })
    }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
