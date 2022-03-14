import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../../../core/models/entry/transaction.model";
import {IngredientTransaction} from "../../../../core/models/ingredient/ingredient-transaction.model";
import {TransactionQuery} from "../../../../core/queries/entry/transaction.query";
import {Router} from "@angular/router";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {
  loading = true;
  transactions: Transaction[]|undefined;
  ingredientTransactions: IngredientTransaction[]|undefined;
  constructor(private transactionQuery: TransactionQuery,
              private route: Router,
              ) { }

  ngOnInit(): void {
    this.transactionQuery.getEntities().subscribe(result =>{
      if(result)
        this.transactions = result;
      this.loading = false;
    })
  }
  onCreate(){
    this.route.navigate(['/entry/create'])
  }
  readTransaction(transactionId: string){
    this.route.navigate(['/entry/view/'+transactionId])
  }

}
