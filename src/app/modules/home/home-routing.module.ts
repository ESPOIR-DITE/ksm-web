import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeViewComponent} from "./pages/home-view/home-view.component";
import {IngredientComponent} from "./components/ingredient/ingredient.component";
import {ItemComponent} from "./components/item/item.component";
import {TransactionsComponent} from "./components/transactions/transactions.component";
import {SellComponent} from "./components/sell/sell.component";
import {EntryComponent} from "./components/entry/entry.component";
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
import {TransactionTypeComponent} from "./components/entry/transaction-type/transaction-type.component";
import {StockComponent} from "./components/stock/stock.component";
import {PeriodComponent} from "./components/period/period.component";
import {DaySellComponent} from "./components/sell/day-sell/day-sell.component";
import {WeekSellComponent} from "./components/sell/week-sell/week-sell.component";
import {MonthSellComponent} from "./components/sell/month-sell/month-sell.component";
import {CreateSellComponent} from "./components/sell/create-sell/create-sell.component";
import {BuyerTypeComponent} from "./components/buyer-type/buyer-type.component";
import {AuthGuard} from "../../core/services/AuthGuard";
import {UserComponent} from "./components/organisation/user/user.component";
import {OrganisationComponent} from "./components/organisation/organisation.component";

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    // { path: '', redirectTo: '', pathMatch: 'full' },
    {path: 'home', component: HomeViewComponent,canActivate: [AuthGuard]},
    {path: 'ingredient', component: IngredientComponent,canActivate: [AuthGuard]},
    {path: 'ingredient/create', component: IngredientCreateFormComponent, canActivate: [AuthGuard] },
    {path: 'ingredient/view/:id', component: IngredientViewFormComponent, canActivate: [AuthGuard]},
    {path: 'item',component: ItemComponent, canActivate: [AuthGuard]},
    {path: 'item/create',component: ItemCreateFormComponent, canActivate: [AuthGuard]},
    {path: 'item/view/:id',component: ItemViewFormComponent, canActivate: [AuthGuard]},
    {path: 'transaction',component: TransactionsComponent, canActivate: [AuthGuard]},
    {path: 'transaction-type',component: TransactionTypeComponent, canActivate: [AuthGuard]},
    {path: 'sell', component: SellComponent, canActivate: [AuthGuard]},
    {path: 'sell/daily/:periodId', component: DaySellComponent, canActivate: [AuthGuard]},
    {path: 'sell/weekly/:periodId', component: WeekSellComponent, canActivate: [AuthGuard]},
    {path: 'sell/monthly/:periodId', component: MonthSellComponent, canActivate: [AuthGuard]},
    {path: 'sell/create/:periodTaskId', component: CreateSellComponent, canActivate: [AuthGuard]},
    {path: 'entry', component: EntryComponent, canActivate: [AuthGuard]},
    {path: 'entry/create', component: EntryCreateFormComponent, canActivate: [AuthGuard]},
    {path: 'entry/view/:id', component: EntryViewFormComponent, canActivate: [AuthGuard]},
    {path: 'quantity-type', component: QuantityTypeComponent, canActivate: [AuthGuard]},
    {path: 'stock', component: StockComponent, canActivate: [AuthGuard]},
    {path: 'period', component: PeriodComponent, canActivate: [AuthGuard]},
    {path: 'buyer-type', component: BuyerTypeComponent, canActivate: [AuthGuard]},
    {path: 'company', component: OrganisationComponent, canActivate: [AuthGuard]},
    {path: 'employees', component: UserComponent, canActivate: [AuthGuard]},

    // { path: '**', redirectTo: '' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
