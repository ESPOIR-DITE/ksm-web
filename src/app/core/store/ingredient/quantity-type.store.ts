import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Ingredient} from "../../models/ingredient/ingredient.model";
import {QuantityType} from "../../models/ingredient/quantity-type.model";

export interface QuantityTypeState extends EntityState<QuantityType, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'quantity-type', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class QuantityTypeStore extends EntityStore<QuantityTypeState, QuantityType>{
  constructor() {
    super();
  }
}
