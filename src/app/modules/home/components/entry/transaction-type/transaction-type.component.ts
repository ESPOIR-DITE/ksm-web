import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionTypeQuery} from "../../../../../core/queries/entry/transaction-type.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {TransactionType} from "../../../../../core/models/entry/transaction-type.model";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";

@Component({
  selector: 'app-transaction-type',
  templateUrl: './transaction-type.component.html',
  styleUrls: ['./transaction-type.component.scss']
})
export class TransactionTypeComponent implements OnInit {
  loading = true;
  transactionTypes: TransactionType[]|undefined;
  transactionTypeForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('',Validators.required),
    description: new FormControl(''),
  });
  constructor(private transactionTypeQuery: TransactionTypeQuery,
              private toasterService: NbToastrService,
              private route: Router
  ) { }

  ngOnInit(): void {
    this.transactionTypeQuery.getTransactionTypes().subscribe(result => {
      if(result){
        this.transactionTypes = result;
        this.loading = false;
      }
    })
  }
  editTransactionType(transactionTypeId: string){

  }
  get formFields(){
    return this.transactionTypeForm.controls;
  }
  getTransactionType():TransactionType {
    return new TransactionType('',this.transactionTypeForm.value.name);
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
  onSubmit(){
    if(this.transactionTypeForm.invalid) return;
    let transactionType =  this.getTransactionType();
    if(transactionType!=null){
      this.transactionTypeQuery.createTransactionType(transactionType, false).subscribe(result =>{
        if(result!=null){
          this.showToast(STATUS.SUCCESS,'Success','Transaction Type created')
        }else {
          this.showToast(STATUS.DANGER,'Fail','Transaction create Fail!')
        }
      })
    }
  }

}
