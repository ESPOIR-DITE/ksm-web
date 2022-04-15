import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BarChartComponent} from "./bar-chart/bar-chart.component";
import {DynamicChartComponent} from "./dynamic-chart/dynamic-chart.component";
import {PieChartComponent} from "./pie-chart/pie-chart.component";
import {ToggleChartComponent} from "./toggle-chart/toggle-chart.component";
import {NgxEchartsModule} from "ngx-echarts";



@NgModule({
  declarations: [BarChartComponent, DynamicChartComponent, PieChartComponent, ToggleChartComponent],
  exports: [
    BarChartComponent,
    ToggleChartComponent,
    PieChartComponent,
    DynamicChartComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class ChartsModule { }
