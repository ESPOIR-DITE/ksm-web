import { Component, OnInit } from '@angular/core';
import {NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {SellPeriodQuery} from "../../../../../core/queries/sell/sell-period.query";
import {SellPeriod} from "../../../../../core/models/sell/sell-period-model";
import {Sell} from "../../../../../core/models/sell/sell.model";
import {SellQuery} from "../../../../../core/queries/sell/sell.query";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {PeriodTaskQuery} from "../../../../../core/queries/sell/period-task.query";
import {PeriodTask} from "../../../../../core/models/sell/period-task-model";
import {ItemQuery} from "../../../../../core/queries/item/item.query";

@Component({
  selector: 'app-day-sell',
  templateUrl: './day-sell.component.html',
  styleUrls: ['./day-sell.component.scss']
})
export class DaySellComponent implements OnInit {
  // sellPeriod: SellPeriod|undefined;
  periodTask: PeriodTask|undefined;
  sells: Sell[]=[];
  DayDate = new Date();
  loading = true;
  totalSell = 0;
  constructor(private toasterService: NbToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private sellPeriodQuery: SellPeriodQuery,
              private sellQuery: SellQuery,
              private periodTaskQuery: PeriodTaskQuery,
              private itemQuery: ItemQuery
              ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['periodId'];
      console.log(id)
      if(id){
        this.periodTaskQuery.getPeriodTask(id).subscribe(periodTask =>{
          if(periodTask){
            this.periodTask = periodTask;
            this.DayDate= periodTask.date;
          }
        })
        this.sellPeriodQuery.getAllByPeriod(id).subscribe(sellPeriods =>{
          console.log(sellPeriods)
          for (const sellPeriod of sellPeriods) {
            this.sellQuery.getSell(sellPeriod.sellId).subscribe(sell=>{
              if(sell?.itemId){
                this.itemQuery.getItem(sell!.itemId).subscribe(item =>{
                  console.log('sells')
                  console.log(sell)
                  this.totalSell = this.totalSell+(sell.quantity*sell.price)
                  if(sell) this.sells?.push(new Sell(sell.id,sell.customerId,sell.buyerTypeId,sell.price,item!.name,sell.quantity,sell.date))
                })
              }
            })
          }
        })
      }else{
        this.showToast(STATUS.DANGER,'Empty','No Data!')
      }
      this.loading = false;
    });
  }
  onCreate(periodTaskId: string){
    this.router.navigate(['/sell/create/'+periodTaskId])
  }
  readSell(sellId: string){

  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
