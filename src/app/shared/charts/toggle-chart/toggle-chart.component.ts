import { Component, OnInit } from '@angular/core';
import {EChartsOption} from "echarts/types/dist/echarts";

@Component({
  selector: 'app-toggle-chart',
  templateUrl: './toggle-chart.component.html',
  styleUrls: ['./toggle-chart.component.scss']
})
export class ToggleChartComponent implements OnInit {
  isLoading = false;
  options: EChartsOption|undefined;

  constructor() { }

  ngOnInit(): void {
    this.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: {
        data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'X-1',
          type: 'line',
          stack: 'counts',

          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'X-2',
          type: 'line',
          stack: 'counts',

          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'X-3',
          type: 'line',
          stack: 'counts',

          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'X-4',
          type: 'line',
          stack: 'counts',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'X-5',
          type: 'line',
          stack: 'counts',

          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    };
  }
}
