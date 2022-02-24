import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {SellPrice} from "../../models/sell/sell-price.model";
export interface SellPriceState extends EntityState<SellPrice,string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export  class SellPriceStore extends EntityStore<SellPriceState,SellPrice>{
  constructor() {
    super();
  }
}
