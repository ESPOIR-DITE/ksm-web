import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../../../../../core/services/user/TokenService";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private route: Router, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.tokenService.clearSession()
    this.route.navigate(['auth'])
  }

}
