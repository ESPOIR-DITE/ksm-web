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

@Injectable({
  providedIn: 'root',
})
export class ItemQuery extends QueryEntity<ItemState, Item> {
  constructor(
    protected override store: ItemStore,
    private service: ItemService) {
    super(store);
  }
  createBuyerType(entity: Item, isUpdate:boolean): Item | undefined{
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
  getBuyerType(id: string): Item | undefined{
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
  deleteEntity(entity: Item): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():Item[] | undefined {
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

