import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HomeViewComponent} from "./modules/home/pages/home-view/home-view.component";
import {ItemComponent} from "./modules/home/components/item/item.component";
import {IngredientComponent} from "./modules/home/components/ingredient/ingredient.component";
import {EntryComponent} from "./modules/home/components/entry/entry.component";
import {TransactionsComponent} from "./modules/home/components/transactions/transactions.component";
import {HomeModule} from "./modules/home/home.module";
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'dark'}),
        NbLayoutModule,
        HomeModule,
        NbEvaIconsModule,
      HttpClientModule,
      NbSidebarModule.forRoot(),
      NbMenuModule.forRoot(),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
