import {Component, Input, OnInit} from '@angular/core';
import {EChartsOption} from "echarts";
import {ChartPieData} from "../../util";

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {
  @Input() data: ChartPieData[] | undefined;
  @Input() title: string | undefined
  options: EChartsOption | undefined;
  chartInstance: any;

  dataObject: any[] | undefined;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.data)
    this.data?.forEach(function (value) {
      console.log('this.dataObject!');
      console.log(value);
    })

    this.options = {
      backgroundColor: '#222B45FF',
      title: {
        text: this.title,
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ffffff',
        },
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
          name: 'Counters',
          type: 'pie',
          radius: '65%',
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          center: ['50%', '50%'],
          data: this.data!.sort((a, b) => a.value! - b.value!),
          // data: [
          //   { value: 335, name: 'C-1' },
          //   { value: 310, name: 'C-2' },
          //   { value: 274, name: 'C-3' },
          //   { value: 271, name: 'C-4' },
          //   { value: 272, name: 'C-5' },
          // ].sort((a, b) => a.value - b.value),



          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: () => Math.random() * 200,
        },
      ],
    };
  }

  onChartInit(e: any) {
    this.chartInstance = e;
    console.log('on chart init:', e);
  }

  callMethod(type: string) {
    if (this.chartInstance) {
      const result = this.chartInstance[type]();
      //this.msg.info(`${type}(): ${result || 'void'}`);
      console.log(result);
    }
  }

}
