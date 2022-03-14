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
  createItem(entity: Item, isUpdate:boolean): Observable<Item | undefined>{
    if(isUpdate) return this.service.updateEntity(entity);
      return this.service.createEntity(entity)
  }
  getBuyerType(id: string): Observable<Item | undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: Item): Observable<boolean|undefined>{
     return  this.service.deleteEntity(entity)
  }
  getEntities():Observable<Item[] | undefined> {
    if(!this.hasEntity()) {
     return  this.service.readEntities();
    }
     return this.selectAll();
  }
}

