import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MAIN_MENU} from "./core/menus/main-menu";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  title = 'ksm-web';
  menu= MAIN_MENU ;

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    //console.log('we are in app.component')
    this.route.navigate(['/index/home'])
  }
}
