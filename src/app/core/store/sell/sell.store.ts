import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Sell} from "../../models/sell/sell.model";
export interface SellState extends EntityState<Sell, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'transaction', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class SellStore extends EntityStore<SellState,Sell>{
  constructor() {
    super();
  }
}
