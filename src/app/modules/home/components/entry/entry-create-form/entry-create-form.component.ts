import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {NbToastrService} from "@nebular/theme";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Transaction} from "../../../../../core/models/entry/transaction.model";
import {STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {TransactionQuery} from "../../../../../core/queries/entry/transaction.query";
import {TransactionType} from "../../../../../core/models/entry/transaction-type.model";
import {TransactionTypeQuery} from "../../../../../core/queries/entry/transaction-type.query";

@Component({
  selector: 'app-entry-create-form',
  templateUrl: './entry-create-form.component.html',
  styleUrls: ['./entry-create-form.component.scss']
})
export class EntryCreateFormComponent implements OnInit {
  transactionTypes: TransactionType[]|undefined;
  transactionForm = new FormGroup({
    supplier: new FormControl('',Validators.required),
    price: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    transactionType: new FormControl('', Validators.required),
  });

  constructor(private ingredientQuery: IngredientQuery,
              private transactionQuery: TransactionQuery,
              private transactionTypeQuery: TransactionTypeQuery,
              private toasterService: NbToastrService,
              private route: Router
              ) { }

  ngOnInit(): void {
    this.transactionTypeQuery.getTransactionTypes().subscribe(result => {
      this.transactionTypes = result;
    })
  }
  onBack(){
    this.route.navigate(['/entry'])
  }
  onSubmit(){
    if(this.transactionForm?.invalid) return;
    let transaction = this.getTransaction();
    if(transaction!=null){
      this.transactionQuery.createTransaction(transaction,false).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Transaction created')
          this.transactionForm.reset();
          this.route.navigate(['entry/view/'+result.id]);
        }else{
          this.showToast(STATUS.DANGER,'Fail','Transaction Failed to be created')
        }
      });

    }
  }
  getTransaction():Transaction{
    return new Transaction('',this.transactionForm.value.price,this.transactionForm.value.date,this.transactionForm.value.supplier,this.transactionForm.value.transactionTypeId);
  }
  get formFields(){
    return this.transactionForm.controls;
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
