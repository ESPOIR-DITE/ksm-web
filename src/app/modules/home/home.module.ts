import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import {HomeViewComponent} from "./pages/home-view/home-view.component";
import {
    NbSidebarModule,
    NbLayoutModule,
    NbSidebarService,
    NbMenuModule,
    NbCardModule,
    NbToastrService, NbToastrModule, NbSpinnerModule
} from "@nebular/theme";
import { ItemComponent } from './components/item/item.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import {CoreModule} from "../../core/core.module";
import { EntryComponent } from './components/entry/entry.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { SellComponent } from './components/sell/sell.component';
import {HomeComponent} from "./home.component";
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import {ReactiveFormsModule} from "@angular/forms";
import { QuantityTypeComponent } from './components/quantity-type/quantity-type.component';
import { IngredientCreateFormComponent } from './components/ingredient/ingredient-create-form/ingredient-create-form.component';
import { IngredientViewFormComponent } from './components/ingredient/ingredient-view-form/ingredient-view-form.component';
import { ItemViewFormComponent } from './components/item/item-view-form/item-view-form.component';
import { ItemCreateFormComponent } from './components/item/item-create-form/item-create-form.component';
import { EntryCreateFormComponent } from './components/entry/entry-create-form/entry-create-form.component';
import { EntryViewFormComponent } from './components/entry/entry-view-form/entry-view-form.component';
import { TransactionTypeComponent } from './components/entry/transaction-type/transaction-type.component';
import { StockComponent } from './components/stock/stock.component';
import {NgxEchartsModule} from "ngx-echarts";
import {AppModule} from "../../app.module";
import {ChartsModule} from "../../shared/charts/charts.module";
import { WeekSellComponent } from './components/sell/week-sell/week-sell.component';
import { DaySellComponent } from './components/sell/day-sell/day-sell.component';
import { PeriodComponent } from './components/period/period.component';
import { CreateSellComponent } from './components/sell/create-sell/create-sell.component';
import { MonthSellComponent } from './components/sell/month-sell/month-sell.component';
import { BuyerTypeComponent } from './components/buyer-type/buyer-type.component';


@NgModule({
  declarations: [
  HomeViewComponent,HomeComponent, ItemComponent, IngredientComponent, EntryComponent, TransactionsComponent, SellComponent, QuantityTypeComponent, IngredientCreateFormComponent, IngredientViewFormComponent, ItemViewFormComponent, ItemCreateFormComponent, EntryCreateFormComponent, EntryViewFormComponent, TransactionTypeComponent, StockComponent, WeekSellComponent, DaySellComponent, PeriodComponent, CreateSellComponent, MonthSellComponent, BuyerTypeComponent
   ],
  imports: [
    CommonModule,
    NbLayoutModule,
    CoreModule,
    NbLayoutModule,
    NbSidebarModule,
    HomeRoutingModule,
    NbMenuModule,
    NbCardModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbSpinnerModule,
    NgxEchartsModule,
    ChartsModule,
  ],
  providers: [NbSidebarService,NbToastrService]
})
export class HomeModule { }
