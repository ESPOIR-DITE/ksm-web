import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbCardModule,
  NbInputModule, NbButtonModule, NbAlertModule, NbUserModule, NbSpinnerModule, NbWindowModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HomeModule} from "./modules/home/home.module";
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BarChartComponent } from './shared/charts/bar-chart/bar-chart.component';
import { UserComponent } from './modules/user/user.component';
import { LoginComponent } from './modules/user/authentication/authentication/view/login/login.component';
import {NbAuthModule} from "@nebular/auth";
import {ReactiveFormsModule} from "@angular/forms";
import {config} from "rxjs";
import { BasicColumnHighChartsComponent } from './shared/charts/basic-column-high-charts/basic-column-high-charts.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
    declarations: [AppComponent, UserComponent, LoginComponent],
    imports: [
      BrowserAnimationsModule,
      NgxSpinnerModule,
      ChartModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NbThemeModule.forRoot({name: 'dark'}),
        NbWindowModule.forRoot(),
        NbLayoutModule,
        HomeModule,
        NbUserModule,
        NbEvaIconsModule,
        HttpClientModule,
        NbSidebarModule.forRoot(),
        NbMenuModule.forRoot(),
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        ChartModule,
        NbAuthModule,
        NbCardModule,
        ReactiveFormsModule,
        NbInputModule,
        NbButtonModule,
        NbAlertModule,
        NbSpinnerModule,
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
