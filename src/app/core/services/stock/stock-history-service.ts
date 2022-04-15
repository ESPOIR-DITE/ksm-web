import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {StockHistoryStore} from "../../store/stock/stock-history-store";
import {StockHistory} from "../../models/stock/stock-history-model";

@Injectable({
  providedIn: 'root',
})
export class StockHistoryService {
  private base = BASE_URL + 'stock-history/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: StockHistoryStore) {
  }
  public createEntity(entity: StockHistory):Observable<StockHistory>{
    const url = this.base+'create';
    return this.http.post<StockHistory>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<StockHistory>('create error'))
      )
  }
  public updateEntity(entity: StockHistory):Observable<StockHistory>{
    const url = this.base+'update';
    return this.http.post<StockHistory>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<StockHistory>('update error'))
      )
  }
  public readEntity(id: string):Observable<StockHistory>{
    const url = this.base+'read?id='+id;
    return this.http.get<StockHistory>(url,this.options)
      .pipe(
        tap(result => this.store.add(result)),
        catchError(ApiErrors.handleError<StockHistory>('read error'))
      )
  }
  public deleteEntity(entity: StockHistory):Observable<Boolean>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<Boolean>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<Boolean>('delete error'))
      )
  }
  public  readEntities():Observable<StockHistory[]>{
    const url = this.base+'reads';
    return this.http.get<StockHistory[]>(url,this.options)
      .pipe(
        tap(result => this.store.set(result)),
        catchError(ApiErrors.handleError<StockHistory[]>('reads error'))
      )
  }
}
