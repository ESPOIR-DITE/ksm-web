import {Component, OnInit} from '@angular/core';
import {MAIN_MENU} from "./core/menus/main-menu";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'ksm-web';
  menu= MAIN_MENU ;

  constructor() {
  }

  ngOnInit(): void {
  }
}
