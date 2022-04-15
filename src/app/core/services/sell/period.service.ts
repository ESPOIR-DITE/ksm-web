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

@Injectable({
  providedIn: 'root',
})
export class PeriodService {
  private base = BASE_URL + 'period/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: PeriodStore) {
  }
  public createEntity(entity: Period):Observable<Period>{
    const url = this.base+'create';
    return this.http.post<Period>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Period>('create error'))
      )
  }
  public updateEntity(entity: Period):Observable<Period>{
    const url = this.base+'update';
    return this.http.post<Period>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<Period>('update error'))
      )
  }
  public readEntity(id: string):Observable<Period>{
    const url = this.base+'read?id='+id;
    return this.http.get<Period>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<Period>('read error'))
      )
  }
  public deleteEntity(entity: Period):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<Period[]>{
    const url = this.base+'reads';
    return this.http.get<Period[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<Period[]>('reads error'))
      )
  }
}
