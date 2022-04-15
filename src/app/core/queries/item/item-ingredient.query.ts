import {Order, QueryConfig, QueryEntity} from "@datorama/akita";
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
import {ItemIngredient} from "../../models/item/item-ingredient.model";
import {ItemIngredientState, ItemIngredientStore} from "../../store/item/item-ingredient.store";
import {ItemIngredientService} from "../../services/item/item-ingredient.service";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";

@Injectable({
  providedIn: 'root',
})
@QueryConfig({
  sortBy: 'quantity',
  sortByOrder: Order.ASC
})
export class ItemIngredientQuery extends QueryEntity<ItemIngredientState, ItemIngredient> {
  constructor(
    protected override store: ItemIngredientStore,
    private service: ItemIngredientService) {
    super(store);
  }
  createItemIngredient(entity: ItemIngredient, isUpdate:boolean):Observable<ItemIngredient | undefined>{
    if(isUpdate){
      return this.service.updateEntity(entity);
    }else
      return this.service.createEntity(entity);

  }
  getBuyerType(id: string): ItemIngredient | undefined{
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
  deleteEntity(entity: ItemIngredient): boolean | undefined{
    if(!this.hasEntity(entity.id)){
      this.service.deleteEntity(entity).subscribe(result => {
        return result.body;
      })
    }
    return false;
  }
  getEntities():ItemIngredient[] | undefined {
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
  findAllByEntryId(entryId: string):Observable<ItemIngredient[]> {
    if(!this.hasEntity()) {
      return this.service.findAllByEntryId(entryId)
    }
    return this.selectAll(
      {
        filterBy: [ entity => entity.entryId === entryId]
      }
    );
  }
  findAllByIngredientId(ingredientId: string):ItemIngredient[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByIngredientId(ingredientId).subscribe( result => {
        return result.body;
      });
    }
    this.selectAll(
      {
        filterBy: [ entity => entity.ingredientId === ingredientId]
      }
    ).subscribe(result =>{
      return result;
    });
    return undefined;
  }
  findAllByOrderByQuantity():ItemIngredient[] | undefined {
    if(!this.hasEntity()) {
      this.service.findAllByOrderByQuantity().subscribe( result => {
        return result.body;
      });
    }
    this.selectAll().subscribe(result =>{
      return result;
    });
    return undefined;
  }
}

