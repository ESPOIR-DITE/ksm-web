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


@NgModule({
  declarations: [
  HomeViewComponent,HomeComponent, ItemComponent, IngredientComponent, EntryComponent, TransactionsComponent, SellComponent, QuantityTypeComponent, IngredientCreateFormComponent, IngredientViewFormComponent, ItemViewFormComponent, ItemCreateFormComponent, EntryCreateFormComponent, EntryViewFormComponent
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
        NbSpinnerModule
    ],
  providers: [NbSidebarService,NbToastrService]
})
export class HomeModule { }
