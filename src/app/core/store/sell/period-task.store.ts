import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {Sell} from "../../models/sell/sell.model";
import {Period} from "../../models/sell/period-model";
import {PeriodTask} from "../../models/sell/period-task-model";
export interface PeriodTaskState extends EntityState<PeriodTask, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'period-task', idKey: 'id', cache: {
    ttl: STORE_TTL,
  },
})
export class PeriodTaskStore extends EntityStore<PeriodTaskState,PeriodTask>{
  constructor() {
    super();
  }
}
