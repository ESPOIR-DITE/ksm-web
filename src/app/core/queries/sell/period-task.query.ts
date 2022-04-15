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
import {PeriodTask} from "../../models/sell/period-task-model";
import {PeriodTaskState, PeriodTaskStore} from "../../store/sell/period-task.store";
import {PeriodTaskService} from "../../services/sell/period-task.service";

@Injectable({
  providedIn: 'root',
})
export class PeriodTaskQuery extends QueryEntity<PeriodTaskState, PeriodTask> {
  constructor(
    protected override store: PeriodTaskStore,
    private service: PeriodTaskService) {
    super(store);
  }
  createPeriodTask(entity: PeriodTask, isUpdate:boolean): Observable<PeriodTask>{
    if(isUpdate){
      return this.service.updateEntity(entity)
    }else
      return this.service.createEntity(entity)
  }
  getPeriodTask(id: string): Observable<PeriodTask|undefined>{
    if(!this.hasEntity(id)) {
      return this.service.readEntity(id)
    }
    return this.selectEntity(id)
  }
  deleteEntity(entity: PeriodTask): Observable<Boolean>{
      return this.service.deleteEntity(entity)
  }
  getEntities():Observable<PeriodTask[]> {
    if(!this.hasEntity()) {
      return this.service.readEntities()
    }
    return this.selectAll()
  }
}

