import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {SellPeriod} from "../../models/sell/sell-period-model";
import {SellPeriodStore} from "../../store/sell/sell-period.store";

@Injectable({
  providedIn: 'root',
})
export class SellPeriodService {
  private base = BASE_URL + 'period-sell/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: SellPeriodStore) {
  }
  public createEntity(entity: SellPeriod):Observable<SellPeriod>{
    const url = this.base+'create';
    return this.http.post<SellPeriod>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<SellPeriod>('create error'))
      )
  }
  public updateEntity(entity: SellPeriod):Observable<SellPeriod>{
    const url = this.base+'update';
    return this.http.post<SellPeriod>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<SellPeriod>('update error'))
      )
  }
  public readEntity(id: string):Observable<SellPeriod>{
    const url = this.base+'read?id='+id;
    return this.http.get<SellPeriod>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<SellPeriod>('read error'))
      )
  }
  public deleteEntity(entity: SellPeriod):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<SellPeriod[]>{
    const url = this.base+'reads';
    return this.http.get<SellPeriod[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<SellPeriod[]>('reads error'))
      )
  }
  public  readAllByPeriod(periodId: string):Observable<SellPeriod[]>{
    const url = this.base+'find-all-by-period?period='+periodId;
    return this.http.get<SellPeriod[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<SellPeriod[]>('reads error'))
      )
  }
}
