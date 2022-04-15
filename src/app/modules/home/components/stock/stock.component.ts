import { Component, OnInit } from '@angular/core';
import {IngredientQuery} from "../../../../core/queries/ingredient/ingredient.query";
import {IngredientTransactionQuery} from "../../../../core/queries/ingredient/ingredient-transaction.query";
import {StockHistoryQuery} from "../../../../core/queries/stock/stock-history-query";
import {StockHistory} from "../../../../core/models/stock/stock-history-model";
import {IngredientTransaction} from "../../../../core/models/ingredient/ingredient-transaction.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  loading = true;
  stocks: IngredientTransaction[]=[]
  ingredientTotalMoney= 0;

  constructor(private ingredientQuery: IngredientQuery,
              private IngredientTransactionQuery: IngredientTransactionQuery,
              private StockHistoryQuery: StockHistoryQuery,
              private route: Router) { }

  ngOnInit(): void {
    // this.StockHistoryQuery.getEntities().subscribe(result =>{
    //   for (const stockHistory of result) {
    //     this.ingredientQuery.getIngredient(stockHistory.ingredientId).subscribe(ingredient => {
    //       this.stocks.push(new StockHistory(stockHistory.id,ingredient!.name,stockHistory.date,stockHistory.movingQuantity,stockHistory.ingredientId+'*'+stockHistory.transactionId))
    //       this.loading = false
    //     })
    //   }
    // })
    this.IngredientTransactionQuery.getEntities().subscribe(result =>{
      for (const ingredientTransaction of result) {
        this.ingredientTotalMoney =this.ingredientTotalMoney+(ingredientTransaction.price*ingredientTransaction.quantity)
        this.ingredientQuery.getIngredient(ingredientTransaction.ingredientId).subscribe(ingredient => {
          this.stocks.push(new IngredientTransaction(ingredientTransaction.id,'',
            ingredientTransaction.transactionId,
            ingredient!.name,ingredientTransaction.quantity,
          ingredientTransaction.price,
            ingredientTransaction.brand,
            ingredientTransaction.date,
            ingredientTransaction.expirationDate))
          this.loading = false
        })
      }
    })
  }
  viewTransaction(transactionId: string){
    this.route.navigate(['entry/view/'+transactionId])
  }

}
