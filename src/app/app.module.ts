import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NbThemeModule, NbLayoutModule, NbMenuModule, NbSidebarModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {HomeModule} from "./modules/home/home.module";
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'angular-highcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { BarChartComponent } from './shared/charts/bar-chart/bar-chart.component';


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
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        ChartModule
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
