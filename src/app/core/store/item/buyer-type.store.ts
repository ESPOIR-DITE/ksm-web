import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {BuyerType} from "../../models/item/buyer-type.model";
export interface BuyerTypeState extends EntityState<BuyerType, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'buyer-type', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class BuyerTypeStore extends EntityStore<BuyerTypeState, BuyerType>{
  constructor() {
    super();
  }
}
