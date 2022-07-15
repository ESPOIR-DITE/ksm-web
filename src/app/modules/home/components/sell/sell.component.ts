import { Component, OnInit } from '@angular/core';
import {Sell} from "../../../../core/models/sell/sell.model";
import {SellQuery} from "../../../../core/queries/sell/sell.query";
import {Router} from "@angular/router";
import {PeriodQuery} from "../../../../core/queries/sell/period.query";
import {SellPeriod} from "../../../../core/models/sell/sell-period-model";
import {Period} from "../../../../core/models/sell/period-model";
import {SellPeriodQuery} from "../../../../core/queries/sell/sell-period.query";
import {PeriodTaskQuery} from "../../../../core/queries/sell/period-task.query";
import {PeriodTask} from "../../../../core/models/sell/period-task-model";
import {NbToastrService} from "@nebular/theme";
import {STATUS, TOASTR_CONFIG} from "../../../../shared/util";

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {
  loading = true;
  sells: Sell[]=[];
  periods: Period[]|undefined;
  periodLoading = true;
  sellPeriods: SellPeriod[]|undefined;
  tasks: PeriodTask[] = [];

  constructor(private sellQuery: SellQuery,
              private periodQuery: PeriodQuery,
              private sellPeriodQuery: SellPeriodQuery,
              private route: Router,
              private periodTaskQuery: PeriodTaskQuery,
              private toasterService: NbToastrService,) {  }

  ngOnInit(): void {
    this.periodTaskQuery.getEntities().subscribe(tasks =>{
      if(tasks){
        for (const task of tasks) {
          this.periodQuery.getSellPeriod(task.period).subscribe(period =>{
           // console.log(task)
            this.tasks.push(new PeriodTask(task.id,period?.period!,task.date,task.time,task.period))
          })
        }
      }else{
        this.showToast(STATUS.WARNING,'No Data','Empty Tasks')
      }
      this.periodLoading=false;
    })
    this.periodQuery.getEntities().subscribe(result =>{
      if(result) this.periods = result;
      this.periodLoading=false;
    })
    this.sellQuery.getEntities().subscribe(result => {
       if(result) this.sells = result;
      this.loading = false;
    })
  }
  selectedPeriod(periodId: string){
    this.periodTaskQuery.getEntities().subscribe(tasks =>{
      if(tasks){
        this.tasks=[]
        for (const task of tasks) {
          if(periodId === task.period){
            this.periodQuery.getSellPeriod(task.period).subscribe(period =>{
              this.tasks.push(new PeriodTask(task.id,period?.period!,task.date,task.time,task.period))
            })
          }
        }
      }
          this.periodLoading=false;
      this.periodLoading=false;
    })
  }
  onCreate(){
    this.route.navigate(['/entry/create'])
  }
  readWeekSell(periodTaskId: string, periodId: string){
    this.periodQuery.getSellPeriod(periodId).subscribe(period =>{
      if(period){
        let periodLowerCase = period?.period.toLowerCase();
        this.route.navigate(['/sell/'+periodLowerCase+'/'+periodTaskId])
      }else{
        this.showToast(STATUS.WARNING,'Error','Please try again later.')
      }
    })
  }
  getPeriodName(htmlComponent:  HTMLAnchorElement,periodId: string): string{
    //console.log(periodId)
    this.periodQuery.getSellPeriod(periodId).subscribe(result => {
      //console.log(result)
      return result?.period
    })
   return 'NA'
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
