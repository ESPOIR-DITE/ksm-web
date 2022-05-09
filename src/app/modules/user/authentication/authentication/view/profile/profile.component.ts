import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {NbIconConfig, NbWindowService} from "@nebular/theme";
import {UserAccountQuery} from "../../../../../../core/queries/user/user-account-query";
import {UserQuery} from "../../../../../../core/queries/user/user-query";
import {OrganisationQuery} from "../../../../../../core/queries/organisation/organisation.query";
import {Organisation} from "../../../../../../core/models/organisation-model";
import {TokenService} from "../../../../../../core/services/user/TokenService";
import {Users} from "../../../../../../core/models/user/users-model";
import {UserAccount} from "../../../../../../core/models/user/userAccount-model";
import {UserFormComponent} from "./user-form/user-form.component";
import {UserAccountFormComponent} from "./user-account-form/user-account-form.component";
import {OrganisationComponent} from "./organisation/organisation.component";
import {UserOrganisationComponent} from "./organisation/user-organisation/user-organisation.component";
import {RoleQuery} from "../../../../../../core/queries/user/role-query";

@Component({
  selector: 'app-profile',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  organisations: Organisation[] | undefined;
  user: Users | undefined;
  userAccount: UserAccount | undefined;
  userOrganisation: Organisation | undefined;
  userRole : string | undefined
  constructor(private roleQuery: RoleQuery, private windowService: NbWindowService, private tokeService: TokenService,private userAccountQuery: UserAccountQuery, private userQuery: UserQuery, private organisationQuery: OrganisationQuery) { }

  ngOnInit(): void {
    const email = this.tokeService.getEmailFromSession()
    if(email){
      this.getUser(email)
      this.getUserAccount(email)
    }

    this.getOrganisations();
  }
  openWindowUser(){
    this.windowService.open(UserFormComponent,{title: `User`})
  }
  openWindowUserOrganisation(){
    this.windowService.open(UserOrganisationComponent,{title: `User Organisation`})
  }
  openWindowNewOrganisation(){
    this.windowService.open(OrganisationComponent,{title: `New Organisation`})
  }
  openWindowUserAccount(){
    this.windowService.open(UserAccountFormComponent,{title: `User`})
  }
  getUser(email: string){
    this.userQuery.getSUsers(email).subscribe(user => {
      if(user)
      this.user = user;
    })
  }
  getUserAccount(email: string){
    this.userAccountQuery.getUsersWithEmail(email).subscribe(userAccount => {
      if(userAccount) {
        this.userAccount = userAccount;
        this.organisationQuery.getOrganisation(userAccount.organizationId).subscribe(userOrganisation => {
          if(userOrganisation) this.userOrganisation = userOrganisation;
        })
        this.roleQuery.getRole(userAccount.roleId).subscribe(role => {
          if(role) this.userRole = role.role
        })
      }
    })

  }
  getOrganisations(){
    this.organisationQuery.getEntities().subscribe(organisation => {
      if(organisation) this.organisations = organisation;
    })
  }

}
