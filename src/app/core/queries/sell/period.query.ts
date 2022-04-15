import {QueryEntity} from "@datorama/akita";
import {Injectable} from "@angular/core";
import {SellState, SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellService} from "../../services/sell/sell.service";
import {Observable} from "rxjs";
import {SellPeriodState, SellPeriodStore} from "../../store/sell/sell-period.store";
import {SellPeriod} from "../../models/sell/sell-period-model";
import {SellPeriodService} from "../../services/sell/sell-period.service";
import {Period} from "../../models/sell/period-model";
import {PeriodService} from "../../services/sell/period.service";
import {PeriodState, PeriodStore} from "../../store/sell/period.store";

@Injectable({
  providedIn: 'root',
})
export class PeriodQuery extends QueryEntity<PeriodState, Period> {
  constructor(
    protected override store: PeriodStore,
    private service: PeriodService) {
    super(store);
  }
  createPeriod(entity: Period, isUpdate:boolean): Observable<Period>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else
      return this.service.createEntity(entity)
  }
  getSellPeriod(id: string): Observable<Period|undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: Period): Observable<Boolean>{
      return this.service.deleteEntity(entity)
  }
  getEntities():Observable<Period[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
}

