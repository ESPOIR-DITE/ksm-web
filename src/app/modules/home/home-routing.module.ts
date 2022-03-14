import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeViewComponent} from "./pages/home-view/home-view.component";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {ItemComponent} from "./components/item/item.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {SellComponent} from "./components/sell/sell.component";
import {EntryComponent} from "./components/entry/entry.component";
import {AppComponent} from "../../app.component";
import {HomeComponent} from "./home.component";
import {QuantityTypeComponent} from "./components/quantity-type/quantity-type.component";
import {
  IngredientCreateFormComponent
} from "./components/ingredient/ingredient-create-form/ingredient-create-form.component";
import {IngredientViewFormComponent} from "./components/ingredient/ingredient-view-form/ingredient-view-form.component";
import {ItemViewFormComponent} from "./components/item/item-view-form/item-view-form.component";
import {ItemCreateFormComponent} from "./components/item/item-create-form/item-create-form.component";
import {EntryCreateFormComponent} from "./components/entry/entry-create-form/entry-create-form.component";
import {EntryViewFormComponent} from "./components/entry/entry-view-form/entry-view-form.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    // { path: '', redirectTo: '', pathMatch: 'full' },
    {path: 'home', component: HomeViewComponent},
    {path: 'ingredient', component: IngredientComponent },
    {path: 'ingredient/create', component: IngredientCreateFormComponent },
    {path: 'ingredient/view/:id', component: IngredientViewFormComponent },
    {path: 'item',component: ItemComponent},
    {path: 'item/create',component: ItemCreateFormComponent},
    {path: 'item/view/:id',component: ItemViewFormComponent},
    {path: 'transaction',component: TransactionsComponent},
    {path: 'sell', component: SellComponent},
    {path: 'entry', component: EntryComponent},
    {path: 'entry/create', component: EntryCreateFormComponent},
    {path: 'entry/view/:id', component: EntryViewFormComponent},
    {path: 'quantity-type', component: QuantityTypeComponent},
    // { path: '**', redirectTo: '' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
