import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../../../../core/models/entry/transaction.model";
import {Ingredient} from "../../../../../core/models/ingredient/ingredient.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TransactionTypeQuery} from "../../../../../core/queries/entry/transaction-type.query";
import {NbToastrService} from "@nebular/theme";
import {ActivatedRoute, Router} from "@angular/router";
import {IngredientQuery} from "../../../../../core/queries/ingredient/ingredient.query";
import {IngredientTransactionQuery} from "../../../../../core/queries/ingredient/ingredient-transaction.query";
import {TransactionQuery} from "../../../../../core/queries/entry/transaction.query";
import {ChartPieData, STATUS, TOASTR_CONFIG} from "../../../../../shared/util";
import {IngredientTransaction} from "../../../../../core/models/ingredient/ingredient-transaction.model";

@Component({
  selector: 'app-entry-view-form',
  templateUrl: './entry-view-form.component.html',
  styleUrls: ['./entry-view-form.component.scss']
})
export class EntryViewFormComponent implements OnInit {
  data: ChartPieData[]=[];
  transaction: Transaction|undefined;
  ingredients: Ingredient[]|undefined;
  ingredientTransactions: IngredientTransaction[] = [];
  transactionLoading = true;
  loading = true;
  ingredientTransactionLoader = true;
  transactionTypeName='';
  transactionId = '';
  transactionForm = new FormGroup({
    id: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required),
    date: new FormControl('',Validators.required),
    supplier: new FormControl('',Validators.required),
    transactionTypeId: new FormControl('',Validators.required),
  });
  ingredientTransactionForm = new FormGroup({
    ingredient: new FormControl('',Validators.required),
    quantity: new FormControl('',Validators.required),
    price: new FormControl('',Validators.required),
    brand: new FormControl(''),
    expiringDate: new FormControl('',Validators.required),
  });

  constructor(
    private transactionQuery: TransactionQuery,
    private ingredientQuery: IngredientQuery,
    private transactionTypeQuery: TransactionTypeQuery,
    private ingredientTransactionQuery: IngredientTransactionQuery,
    private toasterService: NbToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get transactionFormFields(){
    return this.transactionForm.controls;
  }
  get ingredientTransactionFormFields(){
    return this.ingredientTransactionForm.controls;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transactionId = params['id'];
      if(this.transactionId){
        this.transactionQuery.getTransaction(this.transactionId).subscribe( result =>{
          this.transaction = result;
          console.log(result)
          if(result){
            this.transactionTypeQuery.getTransactionType(result!.transactionTypeId)?.subscribe(transactionType =>{
              this.transactionTypeName = transactionType?.name!;
            });
            this.transactionForm.patchValue({
              id: result.id,
              amount: result.amount,
              date: result.date,
              supplier: result.supplier,
              transactionTypeId: this.transactionTypeName,
            });
            this.transactionLoading = false;
          }
        })
      }
    });
    this.ingredientQuery.getEntities().subscribe( result => {
      if(result){
        this.ingredients = result;
      }
      this.loading= false;
    })

    this.ingredientTransactionQuery.findAllByTransactionId(this.transactionId).subscribe(result => {
      if(result){
        for (const ingredientTransaction of result) {
          this.ingredientQuery.getIngredient(ingredientTransaction.ingredientId).subscribe(myIngredient =>{
            if(myIngredient){
              let totalPrice= ingredientTransaction.quantity*ingredientTransaction.price
              this.ingredientTransactions.push(new IngredientTransaction(ingredientTransaction.id,'',ingredientTransaction.transactionId,myIngredient.name,ingredientTransaction.quantity,ingredientTransaction.quantity*ingredientTransaction.price,ingredientTransaction.brand,ingredientTransaction.date,ingredientTransaction.expirationDate))
              this.makeChartPieData(myIngredient.price,myIngredient.name)
            }
          })
        }
      }
      this.ingredientTransactionLoader = false;
      this.data?.forEach(function (value) {
        console.log(value);
      })
    })
  }
  onUpdate(){
  }
  makeChartPieData(values: number,name: string){
    let dataObj = new  ChartPieData(values,name)
    this.data?.push(dataObj);
  }
  onRemoveIngredientTransaction(transactionId: string,ingredientId: string, fakeId: string){
    this.ingredientTransactionQuery.deleteByTransactionAndIngredient(transactionId, ingredientId, fakeId).subscribe(result => {
      console.log(result)
    })
  }
  onBack(){
    this.router.navigate(['/transaction'])
  }
  getIngredientTransaction(): IngredientTransaction{
      return new IngredientTransaction('','',this.transaction!.id,this.ingredientTransactionForm.value.ingredient,this.ingredientTransactionForm.value.quantity,this.ingredientTransactionForm.value.price,this.ingredientTransactionForm.value.brand,new Date,this.ingredientTransactionForm.value.expiringDate)

  }
  onAdd(){
    if(this.ingredientTransactionForm.invalid) return;
    let ingredientTransactionObject = this.getIngredientTransaction();
    console.log(ingredientTransactionObject)
    if(ingredientTransactionObject!=null){
      this.ingredientTransactionQuery.createIngredientTransaction(ingredientTransactionObject,false).subscribe( result =>{
        if(result){
          this.showToast(STATUS.SUCCESS,'Success','Ingredient transaction created')
          this.ingredientTransactionForm.reset();
        }else{
          this.showToast(STATUS.DANGER,'Fail','Ingredient transaction Fail!')
        }
      })
    }
  }
  onDelete(){
    if(this.transaction==null) return;
    this.transactionQuery.deleteEntity(this.transaction).subscribe(result =>{
      if(result){
        this.showToast(STATUS.SUCCESS,'Success','Transaction Deletes successfully')
        this.onBack();
      }else{
        this.showToast(STATUS.DANGER,'Fail','transaction Failed to be Delete')
      }
    })
  }
  private showToast(status: string, title: string, body: string) {
    const toastConfig = TOASTR_CONFIG;
    toastConfig.status = status;
    const titleContent = title ? `${title}` : '';
    this.toasterService.show(body, `${titleContent}`, toastConfig);
  }
}
