import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Ingredient} from "../../models/ingredient/ingredient.model";

export interface IngredientState extends EntityState<Ingredient, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'ingredient', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class IngredientStore extends EntityStore<IngredientState, Ingredient>{
  constructor() {
    super();
  }
}
