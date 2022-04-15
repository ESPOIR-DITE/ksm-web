import { Component, OnInit } from '@angular/core';
import {Period} from "../../../../core/models/sell/period-model";
import {PeriodQuery} from "../../../../core/queries/sell/period.query";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";
import {STATUS, TOASTR_CONFIG} from "../../../../shared/util";

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  periods: Period[]|undefined;
  loading = true;
  periodForm = new FormGroup({
    period : new FormControl('',Validators.required),
    description : new FormControl('')
  })
  constructor(private periodQuery: PeriodQuery, private toasterService: NbToastrService,) { }

  ngOnInit(): void {
    this.periodQuery.getEntities().subscribe(result => {
      this.periods = result;
    })
    this.loading = false;
  }
  get formFields(){
    return this.periodForm.controls;
  }
  getPeriod(): Period{
    return new Period('',this.periodForm.value.period,this.periodForm.value.description);
  }
  onSave(){
   if(this.periodForm.invalid) return;
   let period = this.getPeriod();
   if(period){
     this.periodQuery.createPeriod(period, false).subscribe(result =>{
       if(result){
         this.showToast(STATUS.SUCCESS,'Success','Period created')
         this.periodForm.reset();
       }else{
         this.showToast(STATUS.DANGER,'Fail','Period Failed to be created')
       }
     })
   }
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }

}
