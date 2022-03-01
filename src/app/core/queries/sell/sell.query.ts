import {QueryEntity} from "@datorama/akita";
import {TransactionState, TransactionStore} from "../../store/entry/transaction.store";
import {Transaction} from "../../models/entry/transaction.model";
import {TransactionService} from "../../services/entry/transaction.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {IngredientState, IngredientStore} from "../../store/ingredient/ingredient.store";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientService} from "../../services/ingredient/ingredient.service";
import {BuyerType} from "../../models/item/buyer-type.model";
import {BuyerTypeState, BuyerTypeStore} from "../../store/item/buyer-type.store";
import {BuyerTypeService} from "../../services/item/buyer-type.service";
import {Item} from "../../models/item/item.model";
import {ItemState, ItemStore} from "../../store/item/item.store";
import {ItemService} from "../../services/item/item.service";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";

@Injectable({
  providedIn: 'root',
})
export class SellQuery extends QueryEntity<SellState, Sell> {
  constructor(
    protected override store: SellStore,
    private service: SellService) {
    super(store);
  }
  createBuyerType(entity: Sell, isUpdate:boolean): Sell | undefined{
    if(isUpdate){
      this.service.updateEntity(entity).subscribe(result =>{
        return result.body;
      })
    }else {
      this.service.createEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return undefined;
  }
  getBuyerType(id: string): Sell | undefined{
    if(!this.hasEntity(id)) {
      this.service.readEntity(id).subscribe( result => {
        return result.body;
      });
    }
    this.selectEntity(id).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  deleteEntity(entity: Sell): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():Sell[] | undefined {
    if(!this.hasEntity()) {
      this.service.readEntities().subscribe( result => {
        return result.body;
      });
    }
    this.selectAll().subscribe(result =>{
      return result;
    });
    return undefined;
  }
}

