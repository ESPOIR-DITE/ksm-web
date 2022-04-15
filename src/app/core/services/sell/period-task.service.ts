import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellPeriod} from "../../models/sell/sell-period-model";
import {SellPeriodStore} from "../../store/sell/sell-period.store";
import {PeriodStore} from "../../store/sell/period.store";
import {Period} from "../../models/sell/period-model";
import {PeriodTaskStore} from "../../store/sell/period-task.store";
import {PeriodTask} from "../../models/sell/period-task-model";

@Injectable({
  providedIn: 'root',
})
export class PeriodTaskService {
  private base = BASE_URL + 'period-task/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: PeriodTaskStore) {
  }
  public createEntity(entity: Period):Observable<PeriodTask>{
    const url = this.base+'create';
    return this.http.post<PeriodTask>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<PeriodTask>('create error'))
      )
  }
  public updateEntity(entity: PeriodTask):Observable<PeriodTask>{
    const url = this.base+'update';
    return this.http.post<PeriodTask>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<PeriodTask>('update error'))
      )
  }
  public readEntity(id: string):Observable<PeriodTask>{
    const url = this.base+'read?id='+id;
    return this.http.get<PeriodTask>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<PeriodTask>('read error'))
      )
  }
  public deleteEntity(entity: PeriodTask):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<PeriodTask[]>{
    const url = this.base+'reads';
    return this.http.get<PeriodTask[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<PeriodTask[]>('reads error'))
      )
  }
}
