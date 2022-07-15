import { Component, OnInit } from '@angular/core';
import {MAIN_MENU} from "../../../../core/menus/main-menu";
import {UserTokenQuery} from "../../../../core/queries/user/user-token-query";
import {TokenService} from "../../../../core/services/user/TokenService";
import {UserAccountQuery} from "../../../../core/queries/user/user-account-query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  menu= MAIN_MENU ;
  constructor(private userTokenQuery: UserTokenQuery,
              private tokenService: TokenService,
              private userAccountQuery: UserAccountQuery,
              private toasterService: NbToastrService,
              private route: Router) {
  }
  ngOnInit(): void {

  }

}
