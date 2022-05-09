import {Component, OnInit} from "@angular/core";
import {MAIN_MENU} from "../../core/menus/main-menu";
import {ADMIN_MENU} from "../../core/menus/admin-menu";
import {ROLE} from "../../shared/util";
import {TECH_ADMIN_MENU} from "../../core/menus/tech-admin-menu";
import {TokenService} from "../../core/services/user/TokenService";
import {TokenDecoder} from "../../shared/security";
import {UserQuery} from "../../core/queries/user/user-query";
import {UserAccountQuery} from "../../core/queries/user/user-account-query";
import {RoleQuery} from "../../core/queries/user/role-query";
import {OrganisationQuery} from "../../core/queries/organisation/organisation.query";

@Component({
  selector: 'app-home',
  template: `
    <style>
      .bg-custom-1 {
        background-color: #85144b;
      }

      .bg-custom-2 {
        background-image: linear-gradient(15deg, #13547a 0%, #80d0c7 100%);
      }
    </style>
    <nb-layout>
      <nb-layout-header fixed>
          <div class="col">
            <h2 class="text-success">{{organisation}}</h2>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
<!--            <img class="rounded-circle" width="10%" alt="100x100" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"-->
<!--                 data-holder-rendered="true">-->
            <nb-user  size="large"
                     name="{{userName}}"
                     title="{{role}}"
                     badgeText="99+"
                     badgeStatus="success"
                     badgePosition="bottom right">
            </nb-user>
            <ng-template #usermenu>
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </ng-template>

          </div>
      </nb-layout-header>
      <nb-sidebar>
        <nb-menu [items]="menu"></nb-menu></nb-sidebar>
      <nb-layout-column>
        <router-outlet></router-outlet>
      </nb-layout-column>
      <nb-layout-footer>Contact us</nb-layout-footer>
    </nb-layout>
  `,
})
export class HomeComponent implements OnInit {
  menu= MAIN_MENU ;
  userName = 'John Doe';
  role = ''
  organisation = ''
  constructor(private tokeService: TokenService,
  private userQuery: UserQuery, private userAccountQuery: UserAccountQuery, private organisationQuery: OrganisationQuery,
  private roleQuery: RoleQuery, private token: TokenDecoder) {
  }
  ngOnInit(): void {
    console.log(this.tokeService.getTokenFromSession())
    if (this.tokeService.getTokenFromSession())
    console.log(this.token.getUserRole(this.tokeService.getTokenFromSession()!));
    this.getUser();
    this.getOrganisationAndRole()
  }
  getUser(){
    const email = this.tokeService.getEmailFromSession()
    if(email!=null){
      this.userQuery.getSUsers(email).subscribe(user =>{
        if(user!=null) this.userName = user.firstName+' '+user.lastName
      })
    }
  }
  getOrganisationAndRole(){
    const email = this.tokeService.getEmailFromSession()
    if(email!=null){
      this.userAccountQuery.getUsersWithEmail(email).subscribe( userAccount => {
      if(userAccount){
        this.roleQuery.getRole(userAccount.roleId).subscribe(role => {
          if(role) this.role = role.role
        })
        this.organisationQuery.getOrganisation(userAccount.organizationId).subscribe( organisation =>{
          if(organisation) this.organisation = organisation.name;
        })
      }
      })
    }
  }

  // private static getMenu(role: string){
  //   switch (role) {
  //     case ROLE.ADMIN: return ADMIN_MENU;
  //     case ROLE.USER: return MAIN_MENU;
  //     case ROLE.TECHADMIN: return  TECH_ADMIN_MENU;
  //   }
  // }

}
