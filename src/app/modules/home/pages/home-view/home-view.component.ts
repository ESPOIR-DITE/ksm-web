import { Component, OnInit } from '@angular/core';
import {MAIN_MENU} from "../../../../core/menus/main-menu";

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
})
export class HomeViewComponent implements OnInit {
  menu= MAIN_MENU ;
  constructor() { }

  ngOnInit(): void {
  }

}
