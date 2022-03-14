import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes } from '@angular/router';
import {HomeViewComponent} from "./modules/home/pages/home-view/home-view.component";
import {IngredientComponent} from "./modules/home/components/ingredient/ingredient.component";
import {ItemComponent} from "./modules/home/components/item/item.component";
import {TransactionsComponent} from "./modules/home/components/transactions/transactions.component";
import {SellComponent} from "./modules/home/components/sell/sell.component";
import {EntryComponent} from "./modules/home/components/entry/entry.component";
import {AppComponent} from "./app.component";

const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
  path: 'index',
    loadChildren: () => import('./modules/home/home.module')
      .then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
