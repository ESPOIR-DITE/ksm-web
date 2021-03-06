import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {DynamicChartComponent} from "./dynamic-chart/dynamic-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {ToggleChartComponent} from "./toggle-chart/toggle-chart.component";
import {NgxEchartsModule} from "ngx-echarts";
import {BasicColumnHighChartsComponent} from "./basic-column-high-charts/basic-column-high-charts.component";
import { MyPieComponent } from './my-pie/my-pie.component';



@NgModule({
  declarations: [BarChartComponent, DynamicChartComponent, PieChartComponent, ToggleChartComponent, BasicColumnHighChartsComponent, MyPieComponent],
    exports: [
        BarChartComponent,
        ToggleChartComponent,
        PieChartComponent,
        DynamicChartComponent,
        BasicColumnHighChartsComponent,
        MyPieComponent
    ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class ChartsModule { }
