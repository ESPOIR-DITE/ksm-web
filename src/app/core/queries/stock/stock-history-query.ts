import {Injectable} from "@angular/core";
import {QueryEntity} from "@datorama/akita";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {StockHistoryState, StockHistoryStore} from "../../store/stock/stock-history-store";
import {StockHistory} from "../../models/stock/stock-history-model";
import {StockHistoryService} from "../../services/stock/stock-history-service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class StockHistoryQuery extends QueryEntity<StockHistoryState, StockHistory> {
  constructor(
    protected override store: StockHistoryStore,
    private service: StockHistoryService) {
    super(store);
  }
  createStock(entity: StockHistory, isUpdate:boolean): Observable<StockHistory>{
    if(isUpdate)return this.service.updateEntity(entity)
      return this.service.createEntity(entity)
  }
  getStock(id: string): Observable<StockHistory|undefined>{
    if(!this.hasEntity(id))
      return this.service.readEntity(id)
    return this.selectEntity(id)
  }
  deleteEntity(entity: StockHistory): Observable<Boolean>{
    if(!this.hasEntity(entity.id))
      return this.service.deleteEntity(entity)
    return new Observable<Boolean>()
  }
  getEntities():Observable<StockHistory[]> {
    if(!this.hasEntity())
      return this.service.readEntities()
    return this.selectAll()
  }
}

