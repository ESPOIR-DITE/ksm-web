import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Ingredient} from "../../models/ingredient/ingredient.model";
export interface IngredientTransactionState extends EntityState<Ingredient, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class IngredientTransactionStore extends EntityStore<IngredientTransactionState, string>{
  constructor() {
    super();
  }
}
