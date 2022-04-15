import {QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {Observable} from "rxjs";
import {SellPeriodState, SellPeriodStore} from "../../store/sell/sell-period.store";
import {SellPeriod} from "../../models/sell/sell-period-model";
import {SellPeriodService} from "../../services/sell/sell-period.service";

@Injectable({
  providedIn: 'root',
})
export class SellPeriodQuery extends QueryEntity<SellPeriodState, SellPeriod> {
  constructor(
    protected override store: SellPeriodStore,
    private service: SellPeriodService) {
    super(store);
  }
  createSellPeriod(entity: SellPeriod, isUpdate:boolean): Observable<SellPeriod>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else
      return this.service.createEntity(entity)
  }
  getSellPeriod(id: string): Observable<SellPeriod|undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: SellPeriod): Observable<Boolean>{
      return this.service.deleteEntity(entity)
  }
  getEntities():Observable<SellPeriod[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
  getAllByPeriod(period: string):Observable<SellPeriod[]> {
    if(!this.hasEntity()) {
      return this.service.readAllByPeriod(period)
    }
    return this.selectAll({
      filterBy:[ entity => entity.periodId===period]
    })
  }
}

