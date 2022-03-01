import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
export interface IngredientTransactionState extends EntityState<IngredientTransaction, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'fakeId', cache: {
    ttl: STORE_TTL,
  },
})
export class IngredientTransactionStore extends EntityStore<IngredientTransactionState, IngredientTransaction>{
  constructor() {
    super();
  }

  override akitaPreAddEntity(newEntity: Readonly<IngredientTransaction>): IngredientTransaction {
    return {
      ...newEntity,
      fakeId : [newEntity.entryId, newEntity.ingredientId].join(',')
    };
  }
}
