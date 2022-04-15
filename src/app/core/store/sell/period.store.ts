import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Sell} from "../../models/sell/sell.model";
import {Period} from "../../models/sell/period-model";
export interface PeriodState extends EntityState<Period, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'period', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class PeriodStore extends EntityStore<PeriodState,Period>{
  constructor() {
    super();
  }
}
