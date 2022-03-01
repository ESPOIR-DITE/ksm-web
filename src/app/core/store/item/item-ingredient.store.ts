import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {ItemIngredient} from "../../models/item/item-ingredient.model";

export interface ItemIngredientState extends EntityState<ItemIngredient,string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'fakeId', cache: {
    ttl: STORE_TTL,
  },
})
export  class ItemIngredientStore extends EntityStore<ItemIngredientState,ItemIngredient>{
  constructor() {
    super();
  }

  override akitaPreAddEntity(newEntity: ItemIngredient): ItemIngredient {
    return {
      ...newEntity,
      fakeId : [newEntity.entryId, newEntity.ingredientId].join(',')
    };
  }
}
