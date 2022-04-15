import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Sell} from "../../models/sell/sell.model";
import {Period} from "../../models/sell/period-model";
import {SellPeriod} from "../../models/sell/sell-period-model";
export interface SellPeriodState extends EntityState<SellPeriod, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'sell-period', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class SellPeriodStore extends EntityStore<SellPeriodState,SellPeriod>{
  constructor() {
    super();
  }
}
