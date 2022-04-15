import {Injectable} from "@angular/core";
import {EntityState, EntityStore, StoreConfig} from "@datorama/akita";
import {STORE_TTL} from "../../../shared/util";
import {StockHistory} from "../../models/stock/stock-history-model";
export interface StockHistoryState extends EntityState<StockHistory, string>{

}
@Injectable({
  providedIn: 'root',
})
@StoreConfig({
  name: 'stockHistory', idKey: 'id', cache:{
    ttl:STORE_TTL,
  }
})
export class StockHistoryStore extends EntityStore<StockHistoryState, StockHistory>{
  constructor() {
    super();
  }
}
