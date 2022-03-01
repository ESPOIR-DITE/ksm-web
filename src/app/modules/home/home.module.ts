import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeViewComponent} from "./pages/home-view/home-view.component";
import {NbSidebarModule, NbLayoutModule, NbButtonModule, NbSidebarService} from "@nebular/theme";


@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbSidebarModule
  ],
  providers: [NbSidebarService ]
})
export class HomeModule { }
