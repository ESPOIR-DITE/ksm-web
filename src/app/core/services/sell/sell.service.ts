import {Injectable} from "@angular/core";
import {BASE_URL, ResponseEntity, Util} from "../../../shared/util";
import {HttpClient} from "@angular/common/http";
import {IngredientTransactionStore} from "../../store/ingredient/ingredient-transaction.store";
import {ItemStore} from "../../store/item/item.store";
import {IngredientTransaction} from "../../models/ingredient/ingredient-transaction.model";
import {catchError, Observable, tap} from "rxjs";
import {ApiErrors} from "../../../shared/ApiErrors";
import {Item} from "../../models/item/item.model";
import {SellStore} from "../../store/sell/sell.store";
import {Sell} from "../../models/sell/sell.model";

@Injectable({
  providedIn: 'root',
})
export class SellService {
  private base = BASE_URL + 'sell/';
  private options = {headers: Util.headers()}

  constructor(private http: HttpClient,
              private store: SellStore) {
  }
  public createEntity(entity: Sell):Observable<ResponseEntity<Sell>>{
    const url = this.base+'create';
    return this.http.post<ResponseEntity<Sell>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Sell>>('create error'))
      )
  }
  public updateEntity(entity: Sell):Observable<ResponseEntity<Sell>>{
    const url = this.base+'update';
    return this.http.post<ResponseEntity<Sell>>(url,entity,this.options)
      .pipe(
        tap(result => this.store.replace(entity.id,entity)),
        catchError(ApiErrors.handleError<ResponseEntity<Sell>>('update error'))
      )
  }
  public readEntity(id: string):Observable<ResponseEntity<Sell>>{
    const url = this.base+'read?id='+id;
    return this.http.get<ResponseEntity<Sell>>(url,this.options)
      .pipe(
        tap(result => this.store.add(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Sell>>('read error'))
      )
  }
  public deleteEntity(entity: Sell):Observable<ResponseEntity<Sell>>{
    const url = this.base+'delete?id='+entity.id;
    return this.http.get<ResponseEntity<Sell>>(url,this.options)
      .pipe(
        tap(result => this.store.remove(entity.id)),
        catchError(ApiErrors.handleError<ResponseEntity<Sell>>('delete error'))
      )
  }
  public  readEntities():Observable<ResponseEntity<Sell[]>>{
    const url = this.base+'reads';
    return this.http.get<ResponseEntity<Sell[]>>(url,this.options)
      .pipe(
        tap(result => this.store.set(result.body)),
        catchError(ApiErrors.handleError<ResponseEntity<Sell[]>>('reads error'))
      )
  }
}
