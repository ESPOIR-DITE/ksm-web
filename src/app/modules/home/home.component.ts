import {Component, OnInit} from "@angular/core";
import {MAIN_MENU} from "../../core/menus/main-menu";

@Component({
  selector: 'app-home',
  template: `
    <nb-layout>
      <nb-layout-header fixed>Company Name</nb-layout-header>
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
  ngOnInit(): void {
  }

}
